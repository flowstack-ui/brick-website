import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const catalogPath = resolve(root, "content/source-components.json");
const previewRoot = resolve(root, "public/component-previews");
const reviewedPreviewRoot = resolve(previewRoot, "rich-text-editor");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const allowedArtifactPaths = new Set([
  "rich-text-editor/index.html",
  "rich-text-editor/preview.css",
  "rich-text-editor/preview.js",
]);

assert.equal(catalog.$schema, "flowstack.components.source-catalog.v1");
assert.equal(catalog.items.length, 1, "the reviewed public source-component catalog currently contains one item");

const [component] = catalog.items;
assert.deepEqual(
  Object.keys(component).sort(),
  ["accessTier", "category", "delivery", "description", "id", "name", "preview", "slug"].sort(),
  "public source-component metadata must stay on the reviewed allowlist",
);
assert.equal(component.id, "components/rich-text-editor/basic");
assert.equal(component.slug, "rich-text-editor");
assert.equal(component.category, "Typography");
assert.equal(component.accessTier, "paid");
assert.equal(component.delivery, "source");
assert.deepEqual(Object.keys(component.preview).sort(), ["sha256", "sourceCommit", "src"], "preview metadata must stay on the reviewed allowlist");
assert.equal(component.preview.src, "/component-previews/rich-text-editor/index.html");
assert.match(component.preview.sourceCommit, /^[a-f0-9]{40}$/u, "preview provenance must pin the reviewed private source revision");

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
assert.deepEqual(new Set(artifactPaths), allowedArtifactPaths, "public source-component output must contain only reviewed compiled files");

const digest = createHash("sha256");
let artifactText = "";
for (const file of artifactFiles) {
  const pathname = relative(reviewedPreviewRoot, file).split(sep).join("/");
  const bytes = await readFile(file);
  digest.update(pathname).update("\0").update(String((await stat(file)).size)).update("\0").update(bytes);
  artifactText += bytes.toString("utf8");
}

assert.equal(component.preview.sha256, digest.digest("hex"), "public source-component digest must match its reviewed private export");
assert.doesNotMatch(artifactText, /sourceMappingURL|sourceURL|\.map(?:["'\s]|$)/u, "source maps are forbidden");
assert.doesNotMatch(artifactText, /(?:^|["'/])(?:registry[/'/]|rich-text-editor\.tsx|component\.json|index\.ts|agent\.json|agent\.md|PROVENANCE\.md)/u, "source and private authoring paths are forbidden");
assert.doesNotMatch(artifactText, /flowstack\.source-artifact-agent|applicationResponsibilities|requiredComposition|qualification/u, "item Agent Knowledge is forbidden");
assert.doesNotMatch(artifactText, /RichTextEditorProps|from\s+["']@flowstack-ui|export\s+(?:function|interface|type)|import\s*\{/u, "installable TypeScript source text is forbidden");
assert.doesNotMatch(artifactText, /(?:npx\s+@flowstack-ui\/blocks|flowstack-blocks\s+add|@flowstack-ui\/blocks\s+add|\.flowstack-(?:block|component)\.json)/u, "install commands and receipts are forbidden");
assert.doesNotMatch(artifactText, /FLOWSTACK_BLOCKS_TOKEN|Bearer\s+[A-Za-z0-9._~-]+/u, "tokens are forbidden");

const publicSurfaceFiles = [
  catalogPath,
  ...await walk(resolve(root, "app/components")),
  ...artifactFiles,
];
const publicSurface = (await Promise.all(publicSurfaceFiles.map((file) => readFile(file, "utf8")))).join("\n");
assert.doesNotMatch(publicSurface, /npx\s+@flowstack-ui\/blocks|@flowstack-ui\/blocks\s+add/u, "paid source-component install commands must not be public");
assert.doesNotMatch(publicSurface, /FLOWSTACK_BLOCKS_TOKEN/u, "install tokens must not be public");

console.log(`Verified one paid source component and ${artifactFiles.length} allowlisted compiled preview files.`);
