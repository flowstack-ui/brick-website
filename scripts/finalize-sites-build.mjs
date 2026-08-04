import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const wranglerPath = resolve(import.meta.dirname, "../dist/server/wrangler.json");
const configuration = JSON.parse(await readFile(wranglerPath, "utf8"));

// Cloudflare's Vite plugin currently serializes an empty compatibility flag
// array. Sites rejects that legacy field now that nodejs_compat is the default.
if (Array.isArray(configuration.compatibility_flags) && configuration.compatibility_flags.length === 0) {
  delete configuration.compatibility_flags;
}

await writeFile(wranglerPath, `${JSON.stringify(configuration)}\n`);
console.log("Finalized the Sites worker configuration.");
