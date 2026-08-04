import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const check = process.argv.includes("--check");
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));

const [components, guideContent] = await Promise.all([
  readJson("content/components.json"),
  readJson("content/guides.json"),
]);

const guides = Object.entries(guideContent).map(([slug, guide]) => ({
  slug,
  title: guide.title,
  eyebrow: guide.eyebrow,
  description: guide.description,
}));

const expected = `${JSON.stringify({ components, guides })}\n`;
const output = path.join(root, "public/search-index.json");

if (check) {
  let current = "";
  try {
    current = await readFile(output, "utf8");
  } catch {}

  if (current !== expected) {
    console.error("Search index is stale. Run npm run search:sync.");
    process.exit(1);
  }

  console.log(`Validated search index for ${components.length} components and ${guides.length} guides.`);
} else {
  await writeFile(output, expected);
  console.log(`Generated search index for ${components.length} components and ${guides.length} guides.`);
}
