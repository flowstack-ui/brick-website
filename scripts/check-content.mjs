import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));

const [components, docs, provenance, brickManifest, siteManifest, packageLock, guides, llms, llmsFull, previewSource, previewFiles] = await Promise.all([
  readJson("content/components.json"),
  readJson("content/component-docs.json"),
  readJson("content/brick-source.json"),
  readJson("node_modules/@flowstack-ui/brick/package.json"),
  readJson("package.json"),
  readJson("package-lock.json"),
  readJson("content/guides.json"),
  readFile(path.join(root, "public/llms.txt"), "utf8"),
  readFile(path.join(root, "public/llms-full.txt"), "utf8"),
  readFile(path.join(root, "app/components/ComponentPreview.tsx"), "utf8"),
  readdir(path.join(root, "components/previews")),
]);
const previewFileSet = new Set(previewFiles);

if (components.length !== 89) errors.push(`expected 89 components, found ${components.length}`);
const slugs = new Set();
for (const component of components) {
  if (!component.slug || !component.title || !component.category || !component.description) {
    errors.push(`incomplete component record: ${JSON.stringify(component)}`);
    continue;
  }
  if (slugs.has(component.slug)) errors.push(`duplicate component slug: ${component.slug}`);
  slugs.add(component.slug);
  const exportSlug = component.slug === "notification-badge" ? "badge" : component.slug;
  if (!brickManifest.exports[`./${exportSlug}`]) errors.push(`component is not a public Brick export: ${component.slug}`);
  if (!docs[component.slug]?.startsWith("# ")) errors.push(`component has no synchronized documentation: ${component.slug}`);
  if (!docs[component.slug]?.includes('@flowstack-ui/brick/styles.css')) errors.push(`component is missing the complete stylesheet default: ${component.slug}`);
  if (!docs[component.slug]?.includes('@flowstack-ui/brick/styles/core.css')) errors.push(`component is missing the modular CSS foundation: ${component.slug}`);
  if (!docs[component.slug]?.includes(`@flowstack-ui/brick/styles/${exportSlug}.css`)) errors.push(`component is missing its modular stylesheet: ${component.slug}`);
  if (!llms.includes(`/components/${component.slug}`)) errors.push(`component missing from llms.txt: ${component.slug}`);
  if (!llmsFull.includes(docs[component.slug])) errors.push(`component documentation missing from llms-full.txt: ${component.slug}`);
  if (!previewFileSet.has(`${component.slug}.tsx`)) errors.push(`component has no route-scoped live preview: ${component.slug}`);
  if (!previewSource.includes(`previews/${component.slug}`)) errors.push(`component preview is not registered: ${component.slug}`);
}

if (previewFileSet.size !== components.length) errors.push(`expected ${components.length} route-scoped previews, found ${previewFileSet.size}`);

for (const slug of Object.keys(docs)) {
  if (!slugs.has(slug)) errors.push(`unlisted component documentation: ${slug}`);
}
for (const [slug, guide] of Object.entries(guides)) {
  if (!guide.title || !guide.description || !guide.body?.startsWith("## ")) errors.push(`incomplete guide: ${slug}`);
  try { await access(path.join(root, "app/docs/[slug]/page.tsx")); } catch { errors.push("missing guide route"); }
}
if (!guides["getting-started"].body.includes('@flowstack-ui/brick/styles/core.css')) errors.push("getting started is missing the modular CSS path");
if (!guides.theming.body.includes("One theme contract, two delivery modes")) errors.push("theming is missing CSS delivery-mode guidance");
if (provenance.package !== "@flowstack-ui/brick") errors.push("provenance has the wrong package name");
if (provenance.repository !== "https://github.com/flowstack-ui/brick") errors.push("provenance has the wrong source repository");
if (brickManifest.name !== provenance.package) errors.push("installed Brick package identity does not match provenance");
const installedRepository = brickManifest.repository?.url?.replace(/^git\+/u, "").replace(/\.git$/u, "");
if (installedRepository !== provenance.repository) errors.push("installed Brick repository does not match provenance");
if (provenance.version !== brickManifest.version) errors.push(`content reviewed for Brick ${provenance.version}, installed ${brickManifest.version}`);
if (siteManifest.dependencies["@flowstack-ui/brick"] !== brickManifest.version) errors.push("Brick must be installed as the exact reviewed version");
if (packageLock.packages?.[""]?.dependencies?.["@flowstack-ui/brick"] !== provenance.version) errors.push("package-lock root does not pin the reviewed Brick version");
if (packageLock.packages?.["node_modules/@flowstack-ui/brick"]?.version !== provenance.version) errors.push("package-lock archive does not match the reviewed Brick version");
if (!/^[0-9a-f]{40}$/.test(provenance.commit)) errors.push("provenance has no exact source commit");
if (typeof provenance.reviewedAt !== "string" || Number.isNaN(Date.parse(provenance.reviewedAt)) || new Date(provenance.reviewedAt).toISOString() !== provenance.reviewedAt) errors.push("provenance has no exact ISO review time");
const fullHeader = `# Brick UI — complete public documentation\n\nPackage version: ${provenance.version}\nSource commit: ${provenance.commit}\n`;
if (!llmsFull.startsWith(fullHeader)) errors.push("llms-full.txt has stale package provenance");
if (!llms.startsWith("# Brick UI\n\n> ")) errors.push("llms.txt must begin with an H1 and blockquote summary");
if (!llms.includes("## Documentation") || !llms.includes("## Components") || !llms.includes("## Optional")) {
  errors.push("llms.txt is missing its documented link sections");
}
const llmsLinks = [...llms.matchAll(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/gm)];
if (llmsLinks.length < components.length + 10) errors.push("llms.txt must expose descriptive Markdown links");
if (/^- https?:\/\//m.test(llms)) errors.push("llms.txt must not expose unlabeled bare-URL list items");
const unifiedKnowledgeLink = "- [Unified version-aware FLOWSTACK Agent Knowledge](https://agents.brick-ui.com/llms.txt): Resolve exact-version Atom, Brick, Colors, and Theme guidance without changing package ownership.";
if (llms.split(unifiedKnowledgeLink).length !== 2) errors.push("llms.txt must link the unified version-aware Agent Knowledge entrypoint exactly once");
if (llmsFull.includes("agents.brick-ui.com")) errors.push("llms-full.txt must remain the website-owned human documentation corpus");

if (errors.length) {
  console.error(`Content contract failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${components.length} component routes, ${Object.keys(guides).length} guides, and Brick ${provenance.version} provenance.`);
