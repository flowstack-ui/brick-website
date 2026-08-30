import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = process.env.FLOWSTACK_BRICK_PACKAGE_ROOT
  ? path.resolve(process.env.FLOWSTACK_BRICK_PACKAGE_ROOT)
  : path.resolve(root, "../package");
const componentRoot = path.join(packageRoot, "docs/components");
const outputRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");
const packageOwnerCount = 95;
const sourceComponents = JSON.parse(await readFile(path.join(outputRoot, "source-components.json"), "utf8"));

const categories = {
  "Actions & selection": new Set(["button", "icon-button", "toggle", "toggle-group", "segment-group", "toolbar", "pagination", "reorderable-list"]),
  "Forms & choices": new Set(["color-picker", "form", "field", "fieldset", "input", "number-input", "otp-field", "password-toggle-field", "textarea", "select", "combobox", "multi-select", "file-upload", "checkbox", "checkbox-group", "radio-group", "switch", "slider", "rating"]),
  Typography: new Set(["text", "em", "mark", "kbd", "blockquote", "highlight", "prose", "code", "code-block"]),
  "Content & status": new Set(["icon", "image", "avatar", "badge", "notification-badge", "chip", "status", "color-swatch", "card", "list", "table", "divider", "collapsible", "accordion", "skeleton", "progress", "progress-circle", "toast"]),
  "Overlays & menus": new Set(["tooltip", "hover-card", "popover", "dropdown-menu", "context-menu", "menubar", "dialog", "alert-dialog", "drawer"]),
  "Navigation & layout": new Set(["appearance", "breadcrumb", "tabs", "navigation-menu", "bottom-navigation", "link", "link-box", "nav-list", "sidebar", "app-bar", "stack", "group", "grid", "container", "section", "frame", "bleed", "z-stack", "show", "hide", "surface", "scroll-area"]),
  "Data & collections": new Set(["data-list", "data-grid", "tree-grid", "tree", "feed", "swipeable-item", "carousel"]),
  Accessibility: new Set(["skip-link", "visually-hidden", "aspect-ratio"]),
};

const displayNames = {
  "alert-dialog": "Alert Dialog",
  "app-bar": "App Bar",
  "aspect-ratio": "Aspect Ratio",
  "bottom-navigation": "Bottom Navigation",
  "checkbox-group": "Checkbox Group",
  "code-block": "Code Block",
  "context-menu": "Context Menu",
  "data-grid": "Data Grid",
  "dropdown-menu": "Dropdown Menu",
  "file-upload": "File Upload",
  "hover-card": "Hover Card",
  "icon-button": "Icon Button",
  "multi-select": "Multi Select",
  "nav-list": "Nav List",
  "navigation-menu": "Navigation Menu",
  "notification-badge": "Notification Badge",
  "number-input": "Number Input",
  "otp-field": "OTP Field",
  "password-toggle-field": "Password Toggle Field",
  "progress-circle": "Progress Circle",
  "radio-group": "Radio Group",
  "scroll-area": "Scroll Area",
  "skip-link": "Skip Link",
  "swipeable-item": "Swipeable Item",
  "toggle-group": "Toggle Group",
  "tree-grid": "Tree Grid",
  "visually-hidden": "Visually Hidden",
  "z-stack": "ZStack",
};

function titleize(slug) {
  return displayNames[slug] ?? slug.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

function categoryFor(slug) {
  for (const [category, members] of Object.entries(categories)) {
    if (members.has(slug)) return category;
  }
  throw new Error(`Missing category for ${slug}`);
}

function descriptionFrom(markdown) {
  const paragraphs = markdown.split(/\n\s*\n/).slice(1);
  return paragraphs.find((paragraph) => paragraph.trim() && !paragraph.trim().startsWith("#"))
    ?.replace(/\s+/g, " ").trim() ?? "A finished Brick component.";
}

await mkdir(outputRoot, { recursive: true });
await mkdir(publicRoot, { recursive: true });

const entries = (await readdir(componentRoot, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name !== "_template")
  .map((entry) => entry.name)
  .sort();

if (entries.length !== packageOwnerCount) {
  throw new Error(`Expected ${packageOwnerCount} public component owners, found ${entries.length}`);
}

const components = [];
const docs = {};

for (const slug of entries) {
  const readme = await readFile(path.join(componentRoot, slug, "README.md"), "utf8");
  let changelog = "";
  try {
    changelog = await readFile(path.join(componentRoot, slug, "CHANGELOG.md"), "utf8");
  } catch {}

  const title = titleize(slug);
  components.push({ slug, title, category: categoryFor(slug), description: descriptionFrom(readme), delivery: "package" });
  docs[slug] = `${readme.trim()}\n\n---\n\n${changelog.trim()}\n`;
}

if (sourceComponents.$schema !== "flowstack.components.source-catalog.v1" || sourceComponents.items.length !== 1) {
  throw new Error("Expected one reviewed public source component");
}
for (const item of sourceComponents.items) {
  components.push({
    slug: item.slug,
    title: item.name,
    category: item.category,
    description: item.description,
    delivery: "source",
  });
  docs[item.slug] = `# ${item.name}

${item.description}

## When and where to use

Use this source component when a product needs a focused rich-text writing
surface with headings, paragraphs, inline emphasis, lists, and undo or redo.
The installed composition becomes consumer-owned application source.

## When not to use

Use Textarea for plain text, Prose for read-only trusted editorial content,
and an application-selected editor platform when collaboration, comments,
tables, media, or other product-specific authoring behavior is required.

## Delivery model

Rich Text Editor is not exported by the Brick runtime package. It is a paid,
source-installed component composed from published Brick parts and Tiptap. The
public page serves only a reviewed compiled sandbox; editable files, the API
contract, item guidance, and the usable install command remain behind the
entitlement boundary.

## Responsive behavior

The document surface stays within the available inline size. The formatting
toolbar owns deliberate horizontal command reachability at compact widths
without creating page-level overflow.

## Accessibility

The compiled preview exposes one named formatting toolbar followed by one
named multiline document textbox. Brick owns the finished controls and focus
presentation; Tiptap owns document editing; the application owns content
policy, persistence, validation, collaboration, and submission.
`;
}

const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
const sitePackageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
if (packageJson.name !== "@flowstack-ui/brick") {
  throw new Error(`Expected @flowstack-ui/brick source, found ${packageJson.name ?? "an unnamed package"}`);
}
if (sitePackageJson.dependencies?.["@flowstack-ui/brick"] !== packageJson.version) {
  throw new Error(`Brick source ${packageJson.version} does not match the website's exact dependency`);
}
const dirtySource = execFileSync(
  "git",
  ["-C", packageRoot, "status", "--porcelain", "--untracked-files=all", "--", "package.json", "docs/components"],
  { encoding: "utf8" },
).trim();
if (dirtySource) {
  throw new Error(`Brick source documentation is not committed:\n${dirtySource}`);
}
const sourceCommit = execFileSync("git", ["-C", packageRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[0-9a-f]{40}$/.test(sourceCommit)) {
  throw new Error("Brick source HEAD is not an exact commit");
}
const source = {
  package: "@flowstack-ui/brick",
  version: packageJson.version,
  repository: "https://github.com/flowstack-ui/brick",
  commit: sourceCommit,
  reviewedAt: new Date().toISOString(),
};

await writeFile(path.join(outputRoot, "components.json"), `${JSON.stringify(components, null, 2)}\n`);
await writeFile(path.join(outputRoot, "component-docs.json"), `${JSON.stringify(docs)}\n`);
await writeFile(path.join(outputRoot, "brick-source.json"), `${JSON.stringify(source, null, 2)}\n`);

const llmsIndex = [
  "# Brick UI",
  "",
  "> Finished, accessible React components built on Flowstack Atom.",
  "",
  "## Documentation",
  "",
  "- [Brick UI overview](https://brick-ui.com/docs): Understand the package, its layers, and where to begin.",
  "- [Unified version-aware FLOWSTACK Agent Knowledge](https://agents.brick-ui.com/llms.txt): Resolve exact-version Atom, Brick, Colors, and Theme guidance without changing package ownership.",
  "- [Getting started](https://brick-ui.com/docs/getting-started): Install Brick and compose a finished interface.",
  "- [Theming](https://brick-ui.com/docs/theming): Customize Brick through its semantic CSS contract.",
  "- [Accessibility](https://brick-ui.com/docs/accessibility): Learn the responsibilities shared by Atom, Brick, and applications.",
  "- [Composition](https://brick-ui.com/docs/composition): Build interfaces from stable public parts.",
  "- [Component catalog](https://brick-ui.com/components): Browse all finished React components.",
  "- [Themes](https://brick-ui.com/themes): Explore Brick's first theme and theming direction.",
  "",
  "## Components",
  "",
  ...components.map((component) => `- [${component.title}](https://brick-ui.com/components/${component.slug}): ${component.delivery === "source" ? "Source-installed component with a public compiled preview. " : ""}${component.description}`),
  "",
  "## Optional",
  "",
  "- [Complete Brick UI reference](https://brick-ui.com/llms-full.txt): Full synchronized component documentation for larger context windows.",
  "- [Flowstack Atom](https://atom-ui.com/): The headless behavior and accessibility foundation beneath Brick.",
  "- [Brick UI source](https://github.com/flowstack-ui/brick): Public package source, changelog, and maintainer documentation.",
  "",
].join("\n");

const llmsFull = [
  "# Brick UI — complete public documentation",
  "",
  `Package version: ${source.version}`,
  `Source commit: ${source.commit}`,
  "",
  ...components.flatMap((component) => [
    `# ${component.title}`,
    "",
    docs[component.slug],
    "",
  ]),
].join("\n");

await writeFile(path.join(publicRoot, "llms.txt"), llmsIndex);
await writeFile(path.join(publicRoot, "llms-full.txt"), llmsFull);

console.log(`Synchronized ${entries.length} Brick component owners and ${sourceComponents.items.length} source component from ${source.version}.`);
