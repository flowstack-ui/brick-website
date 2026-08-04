import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const brickRoot = resolve(root, "node_modules/@flowstack-ui/brick");
const outputRoot = resolve(root, "app/.generated");
const previewsRoot = resolve(root, "components/previews");
const websiteManifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const brickManifest = JSON.parse(await readFile(resolve(brickRoot, "package.json"), "utf8"));
const source = JSON.parse(await readFile(resolve(root, "content/brick-source.json"), "utf8"));
const websiteStyles = await readFile(resolve(root, "app/globals.css"), "utf8");

const docsStartMarker = "/* brick-bundle:docs:start */";
const docsEndMarker = "/* brick-bundle:docs:end */";
const relationshipsStartMarker = "/* brick-bundle:relationships:start */";
const relationshipsEndMarker = "/* brick-bundle:relationships:end */";
for (const marker of [docsStartMarker, docsEndMarker, relationshipsStartMarker, relationshipsEndMarker]) {
  if (!websiteStyles.includes(marker)) throw new Error(`Missing website style boundary: ${marker}`);
}

const docsStart = websiteStyles.indexOf(docsStartMarker);
const docsEnd = websiteStyles.indexOf(docsEndMarker);
const relationshipsStart = websiteStyles.indexOf(relationshipsStartMarker);
const relationshipsEnd = websiteStyles.indexOf(relationshipsEndMarker);
if (!(docsStart < docsEnd && docsEnd < relationshipsStart && relationshipsStart < relationshipsEnd)) {
  throw new Error("Website style bundle boundaries are out of order");
}

const shellWebsiteStyles = `${websiteStyles.slice(0, docsStart)}${websiteStyles.slice(relationshipsEnd + relationshipsEndMarker.length)}`;
const docsWebsiteStyles = websiteStyles.slice(docsStart + docsStartMarker.length, docsEnd).trim();
const relationshipsWebsiteStyles = websiteStyles.slice(relationshipsStart + relationshipsStartMarker.length, relationshipsEnd).trim();
const routeWebsiteStyles = {
  "brick-shell.css": shellWebsiteStyles.trim(),
  "brick-docs.css": `@layer site {\n${docsWebsiteStyles}\n}`,
  "brick-components.css": `@layer site {\n${docsWebsiteStyles}\n}`,
  "brick-themes.css": `@layer site {\n${relationshipsWebsiteStyles}\n}`,
  "brick-atom.css": `@layer site {\n${relationshipsWebsiteStyles}\n}`,
};

if (websiteManifest.dependencies["@flowstack-ui/brick"] !== brickManifest.version) {
  throw new Error("Installed Brick version does not match the website dependency");
}
if (source.version !== brickManifest.version) {
  throw new Error("Installed Brick version does not match content provenance");
}

const bundles = {
  "brick-shell.css": [
    "reset.css",
    "styles/core.css",
    "styles/badge.css",
    "styles/button.css",
    "styles/dialog.css",
    "styles/drawer.css",
    "styles/input.css",
    "styles/nav-list.css",
    "styles/text.css",
  ],
  "brick-home.css": [
    "styles/avatar.css",
    "styles/card.css",
    "styles/code.css",
    "styles/divider.css",
    "styles/grid.css",
    "styles/progress.css",
    "styles/stack.css",
    "styles/switch.css",
    "styles/table.css",
    "styles/tabs.css",
  ],
  "brick-themes.css": ["styles/card.css", "styles/code.css", "styles/grid.css", "styles/stack.css"],
  "brick-atom.css": ["styles/card.css", "styles/grid.css"],
  "brick-docs.css": ["styles/card.css", "styles/code.css", "styles/code-block.css", "styles/grid.css", "styles/table.css"],
  "brick-components.css": [
    "styles/accordion.css",
    "styles/avatar.css",
    "styles/breadcrumb.css",
    "styles/card.css",
    "styles/code.css",
    "styles/code-block.css",
    "styles/field.css",
    "styles/hide.css",
    "styles/icon-button.css",
    "styles/link.css",
    "styles/stack.css",
    "styles/surface.css",
    "styles/table.css",
  ],
};

const stripSourceMap = (css) => css.replace(/\n?\/\*# sourceMappingURL=.*?\*\/\s*$/u, "").trim();

async function writeBundle(name, files) {
  const sections = await Promise.all(files.map(async (file) => stripSourceMap(await readFile(resolve(brickRoot, "dist", file), "utf8"))));
  if (routeWebsiteStyles[name]) sections.push(routeWebsiteStyles[name]);
  await writeFile(resolve(outputRoot, name), `/* Generated from @flowstack-ui/brick ${brickManifest.version}. */\n${sections.join("\n")}\n`);
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(resolve(outputRoot, "previews"), { recursive: true });
await Promise.all(Object.entries(bundles).map(([name, files]) => writeBundle(name, files)));

const previewFiles = (await readdir(previewsRoot)).filter((file) => file.endsWith(".tsx"));
await Promise.all(previewFiles.map(async (file) => {
  const preview = await readFile(resolve(previewsRoot, file), "utf8");
  const components = [...preview.matchAll(/from "@flowstack-ui\/brick\/([^"/]+)"/gu)].map((match) => match[1]);
  const styles = [...new Set(components)].map((component) => `styles/${component}.css`);
  if (!styles.length) throw new Error(`${file} has no Brick component styles`);
  await writeBundle(`previews/${file.slice(0, -4)}.css`, styles);
}));

console.log(`Generated ${Object.keys(bundles).length} route bundles and ${previewFiles.length} preview bundles from Brick ${brickManifest.version}.`);
