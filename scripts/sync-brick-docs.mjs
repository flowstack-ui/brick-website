import { execFileSync } from "node:child_process";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageRoot = path.resolve(root, "../package");
const componentRoot = path.join(packageRoot, "docs/components");
const outputRoot = path.join(root, "content");
const publicRoot = path.join(root, "public");

const categories = {
  "Actions & selection": new Set(["button", "icon-button", "toggle", "toggle-group", "toolbar", "pagination"]),
  "Forms & choices": new Set(["form", "field", "fieldset", "input", "number-input", "otp-field", "password-toggle-field", "textarea", "select", "combobox", "multi-select", "file-upload", "checkbox", "checkbox-group", "radio-group", "switch", "slider", "rating"]),
  "Content & status": new Set(["text", "icon", "image", "code", "code-block", "avatar", "badge", "notification-badge", "chip", "card", "list", "table", "divider", "collapsible", "accordion", "skeleton", "progress", "progress-circle", "toast"]),
  "Overlays & menus": new Set(["tooltip", "hover-card", "popover", "dropdown-menu", "context-menu", "menubar", "dialog", "alert-dialog", "drawer"]),
  "Navigation & layout": new Set(["breadcrumb", "tabs", "navigation-menu", "bottom-navigation", "link", "nav-list", "sidebar", "app-bar", "stack", "grid", "container", "show", "hide", "surface", "scroll-area"]),
  "Data & collections": new Set(["data-grid", "tree-grid", "tree", "feed", "swipeable-item"]),
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

if (entries.length !== 75) {
  throw new Error(`Expected 75 public component owners, found ${entries.length}`);
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
  components.push({ slug, title, category: categoryFor(slug), description: descriptionFrom(readme) });
  docs[slug] = `${readme.trim()}\n\n---\n\n${changelog.trim()}\n`;
}

const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
const sourceCommit = execFileSync("git", ["-C", packageRoot, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
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
  "- [Getting started](https://brick-ui.com/docs/getting-started): Install Brick and compose a finished interface.",
  "- [Theming](https://brick-ui.com/docs/theming): Customize Brick through its semantic CSS contract.",
  "- [Accessibility](https://brick-ui.com/docs/accessibility): Learn the responsibilities shared by Atom, Brick, and applications.",
  "- [Composition](https://brick-ui.com/docs/composition): Build interfaces from stable public parts.",
  "- [Component catalog](https://brick-ui.com/components): Browse all finished React components.",
  "- [Themes](https://brick-ui.com/themes): Explore Brick's first theme and theming direction.",
  "",
  "## Components",
  "",
  ...components.map((component) => `- [${component.title}](https://brick-ui.com/components/${component.slug}): ${component.description}`),
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

console.log(`Synchronized ${components.length} Brick component owners from ${source.version}.`);
