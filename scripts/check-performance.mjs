import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve(import.meta.dirname, "..");
const buildRoot = path.join(root, ".next");
const components = JSON.parse(await readFile(path.join(root, "content/components.json"), "utf8"));
const errors = [];
const routeBudget = { raw: 1_500_000, gzip: 425_000 };
const socialCardBudget = 200_000;
let largest = { slug: "", raw: 0, gzip: 0 };

for (const { slug } of components) {
  const html = await readFile(path.join(buildRoot, `server/app/components/${slug}.html`), "utf8");
  const assets = [...new Set([...html.matchAll(/\/_next\/static\/chunks\/[^" ]+\.js/g)].map((match) => match[0]))];
  const payloads = await Promise.all(assets.map((asset) => readFile(path.join(buildRoot, asset.replace("/_next/", "")))));
  const raw = payloads.reduce((total, payload) => total + payload.length, 0);
  const gzip = payloads.reduce((total, payload) => total + gzipSync(payload).length, 0);
  if (raw > largest.raw) largest = { slug, raw, gzip };
  if (raw > routeBudget.raw || gzip > routeBudget.gzip) {
    errors.push(`${slug} initial JavaScript is ${raw} raw / ${gzip} gzip; budget is ${routeBudget.raw} / ${routeBudget.gzip}`);
  }
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

console.log(`Verified 75 component routes; largest initial JavaScript is ${largest.slug} at ${largest.raw} raw / ${largest.gzip} gzip.`);
console.log(`Verified 1200x630 social card at ${socialCardSize} bytes.`);
