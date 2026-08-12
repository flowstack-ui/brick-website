import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve(import.meta.dirname, "..");
const buildRoot = path.join(root, ".next");
const components = JSON.parse(await readFile(path.join(root, "content/components.json"), "utf8"));
const errors = [];
const componentRouteBudget = { raw: 950_000, gzip: 285_000 };
const representativeRouteBudgets = [
  { name: "home", file: "server/app/index.html", raw: 825_000, gzip: 245_000 },
  { name: "catalog", file: "server/app/components.html", raw: 810_000, gzip: 242_000 },
  { name: "guide", file: "server/app/docs/getting-started.html", raw: 790_000, gzip: 235_000 },
];
const socialCardBudget = 200_000;
const searchIndexBudget = { raw: 25_000, gzip: 7_000 };
let largest = { slug: "", raw: 0, gzip: 0 };

async function initialJavaScript(file) {
  const html = await readFile(path.join(buildRoot, file), "utf8");
  const assets = [...new Set([...html.matchAll(/\/_next\/static\/chunks\/[^" ]+\.js/g)].map((match) => match[0]))];
  const payloads = await Promise.all(assets.map((asset) => readFile(path.join(buildRoot, asset.replace("/_next/", "")))));
  return {
    raw: payloads.reduce((total, payload) => total + payload.length, 0),
    gzip: payloads.reduce((total, payload) => total + gzipSync(payload).length, 0),
    source: Buffer.concat(payloads).toString("utf8"),
  };
}

for (const { slug } of components) {
  const { raw, gzip, source } = await initialJavaScript(`server/app/components/${slug}.html`);
  if (raw > largest.raw) largest = { slug, raw, gzip };
  if (raw > componentRouteBudget.raw || gzip > componentRouteBudget.gzip) {
    errors.push(`${slug} initial JavaScript is ${raw} raw / ${gzip} gzip; budget is ${componentRouteBudget.raw} / ${componentRouteBudget.gzip}`);
  }
  if (source.includes("Use Accordion for settings, FAQs, filters")) errors.push(`${slug} initial JavaScript contains synchronized component-document content`);
  if (source.includes("Loading search index…")) errors.push(`${slug} initial JavaScript eagerly contains the search dialog`);
}

for (const route of representativeRouteBudgets) {
  const { raw, gzip, source } = await initialJavaScript(route.file);
  if (raw > route.raw || gzip > route.gzip) {
    errors.push(`${route.name} initial JavaScript is ${raw} raw / ${gzip} gzip; budget is ${route.raw} / ${route.gzip}`);
  }
  if (route.name !== "catalog" && source.includes('"slug":"accordion","title":"Accordion","category":"Content & status"')) {
    errors.push(`${route.name} initial JavaScript contains the component catalog`);
  }
  if (source.includes("Loading search index…")) errors.push(`${route.name} initial JavaScript eagerly contains the search dialog`);
}

const searchIndex = await readFile(path.join(root, "public/search-index.json"));
const searchIndexGzip = gzipSync(searchIndex).length;
if (searchIndex.length > searchIndexBudget.raw || searchIndexGzip > searchIndexBudget.gzip) {
  errors.push(`search index is ${searchIndex.length} raw / ${searchIndexGzip} gzip; budget is ${searchIndexBudget.raw} / ${searchIndexBudget.gzip}`);
}

const shellCss = await readFile(path.join(root, "app/.generated/brick-shell.css"), "utf8");
const sharedStyleContracts = [
  ".page-title",
  ".page-lede",
  ".install-command",
  ".section-heading",
  ".compact-heading",
  ".token-section",
  ".theme-comparison",
  ".flowstack-context",
  ".ownership-section",
];
for (const selector of sharedStyleContracts) {
  if (!shellCss.includes(selector)) errors.push(`shared shell CSS is missing ${selector}`);
}

const socialCardPath = path.join(root, "public/brick-social-card.jpg");
const socialCard = await readFile(socialCardPath);
const socialCardSize = (await stat(socialCardPath)).size;
if (socialCardSize > socialCardBudget) errors.push(`social card is ${socialCardSize} bytes; budget is ${socialCardBudget}`);

function jpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

const dimensions = jpegDimensions(socialCard);
if (dimensions?.width !== 1200 || dimensions?.height !== 630) {
  errors.push(`social card must remain 1200x630; found ${dimensions ? `${dimensions.width}x${dimensions.height}` : "an unreadable JPEG"}`);
}

if (errors.length) {
  console.error(`Performance contract failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`Verified ${components.length} component routes; largest initial JavaScript is ${largest.slug} at ${largest.raw} raw / ${largest.gzip} gzip.`);
console.log(`Verified representative route budgets and deferred search at ${searchIndex.length} raw / ${searchIndexGzip} gzip.`);
console.log(`Verified ${sharedStyleContracts.length} cross-route style contracts in the shared shell.`);
console.log(`Verified 1200x630 social card at ${socialCardSize} bytes.`);
