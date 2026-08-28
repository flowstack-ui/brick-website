import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const catalogPath = resolve(root, "content/blocks.json");
const previewRoot = resolve(root, "public/block-previews");
const reviewedPreviewRoot = resolve(previewRoot, "application-feed-threaded-comments");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const allowedArtifactPaths = new Set([
  "application-feed-threaded-comments/index.html",
  "application-feed-threaded-comments/preview.css",
  "application-feed-threaded-comments/preview.js",
]);

assert.equal(catalog.$schema, "flowstack.blocks.public-catalog.v1");
assert.equal(catalog.items.length, 1, "the reviewed public catalog currently contains one Block");

const [block] = catalog.items;
assert.deepEqual(
  Object.keys(block).sort(),
  ["accessTier", "description", "entitlementScopes", "id", "license", "name", "preview", "purchase", "signIn", "slug"].sort(),
  "public metadata must stay on the reviewed allowlist",
);
assert.equal(block.id, "application/feed/threaded-comments");
assert.equal(block.slug, block.id);
assert.equal(block.accessTier, "paid", "current Blocks must remain paid");
assert.equal(block.license, "lifetime");
assert.deepEqual(block.entitlementScopes, ["individual", "team"]);
assert.equal(block.purchase.state, "coming-soon");
assert.equal(block.signIn.state, "coming-soon");
assert.deepEqual(Object.keys(block.preview).sort(), ["sha256", "sourceCommit", "src"], "preview metadata must stay on the reviewed allowlist");
assert.equal(block.preview.src, "/block-previews/application-feed-threaded-comments/index.html");
assert.match(block.preview.sourceCommit, /^[a-f0-9]{40}$/u, "preview provenance must pin the reviewed private source revision");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true }).catch(() => [])) {
    const pathname = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(pathname));
    else files.push(pathname);
  }
  return files;
}

const artifactFiles = (await walk(previewRoot)).sort();
const artifactPaths = artifactFiles.map((file) => relative(previewRoot, file).split(sep).join("/"));
assert.deepEqual(new Set(artifactPaths), allowedArtifactPaths, "public preview output must contain only reviewed compiled files");

const digest = createHash("sha256");
let artifactText = "";
for (const file of artifactFiles) {
  const pathname = relative(reviewedPreviewRoot, file).split(sep).join("/");
  const bytes = await readFile(file);
  digest.update(pathname).update("\0").update(String((await stat(file)).size)).update("\0").update(bytes);
  artifactText += bytes.toString("utf8");
}

assert.equal(block.preview.sha256, digest.digest("hex"), "public preview digest must match its reviewed private export");
assert.doesNotMatch(artifactText, /sourceMappingURL|sourceURL|\.map(?:["'\s]|$)/u, "source maps are forbidden");
assert.doesNotMatch(artifactText, /(?:^|["'/])registry[/'/]|block\.tsx|block\.css|index\.ts|agent\.json|agent\.md|PROVENANCE\.md/u, "source and private authoring paths are forbidden");
assert.doesNotMatch(artifactText, /flowstack\.block-agent|applicationResponsibilities|requiredComposition|qualification/u, "item Agent Knowledge is forbidden");
assert.doesNotMatch(artifactText, /ThreadedCommentsFeedBlockProps|ThreadedCommentAction|from\s+["']@flowstack-ui|export\s+(?:function|interface|type)|import\s*\{/u, "installable TypeScript source text is forbidden");
assert.doesNotMatch(artifactText, /FLOWSTACK_BLOCKS_TOKEN|Bearer\s+[A-Za-z0-9._~-]+/u, "tokens are forbidden");

const publicSurfaceFiles = [
  catalogPath,
  ...await walk(resolve(root, "app/blocks")),
  ...artifactFiles,
];
const publicSurface = (await Promise.all(publicSurfaceFiles.map((file) => readFile(file, "utf8")))).join("\n");
assert.doesNotMatch(publicSurface, /npx\s+@flowstack-ui\/blocks|@flowstack-ui\/blocks\s+add/u, "paid install commands must not be public");
assert.doesNotMatch(publicSurface, /FLOWSTACK_BLOCKS_TOKEN/u, "install tokens must not be public");

console.log(`Verified one paid public Block and ${artifactFiles.length} allowlisted compiled preview files.`);
