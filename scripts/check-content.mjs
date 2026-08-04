import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const errors = [];
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));

const [components, docs, provenance, brickManifest, siteManifest, guides, llms, llmsFull, previewSource, previewFiles] = await Promise.all([
  readJson("content/components.json"),
  readJson("content/component-docs.json"),
  readJson("content/brick-source.json"),
  readJson("node_modules/@flowstack-ui/brick/package.json"),
  readJson("package.json"),
  readJson("content/guides.json"),
  readFile(path.join(root, "public/llms.txt"), "utf8"),
  readFile(path.join(root, "public/llms-full.txt"), "utf8"),
  readFile(path.join(root, "app/components/ComponentPreview.tsx"), "utf8"),
  readdir(path.join(root, "components/previews")),
]);
const previewFileSet = new Set(previewFiles);

if (components.length !== 75) errors.push(`expected 75 components, found ${components.length}`);
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
  if (!llms.includes(`/components/${component.slug}`)) errors.push(`component missing from llms.txt: ${component.slug}`);
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
if (provenance.package !== "@flowstack-ui/brick") errors.push("provenance has the wrong package name");
if (provenance.version !== brickManifest.version) errors.push(`content reviewed for Brick ${provenance.version}, installed ${brickManifest.version}`);
if (siteManifest.dependencies["@flowstack-ui/brick"] !== brickManifest.version) errors.push("Brick must be installed as the exact reviewed version");
if (!/^[0-9a-f]{40}$/.test(provenance.commit)) errors.push("provenance has no exact source commit");
if (!llmsFull.includes(`Source commit: ${provenance.commit}`)) errors.push("llms-full.txt has stale provenance");
if (!llms.startsWith("# Brick UI\n\n> ")) errors.push("llms.txt must begin with an H1 and blockquote summary");
if (!llms.includes("## Documentation") || !llms.includes("## Components") || !llms.includes("## Optional")) {
  errors.push("llms.txt is missing its documented link sections");
}
const llmsLinks = [...llms.matchAll(/^- \[[^\]]+\]\(https:\/\/[^)]+\)(?:: .+)?$/gm)];
if (llmsLinks.length < components.length + 10) errors.push("llms.txt must expose descriptive Markdown links");
if (/^- https?:\/\//m.test(llms)) errors.push("llms.txt must not expose unlabeled bare-URL list items");

if (errors.length) {
  console.error(`Content contract failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Validated ${components.length} component routes, ${Object.keys(guides).length} guides, and Brick ${provenance.version} provenance.`);
