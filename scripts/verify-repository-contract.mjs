import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import configuration from "../verification.config.mjs";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const viteConfiguration = await readFile(resolve(root, "vite.config.ts"), "utf8");
const errors = [];
const requirePath = async (file) => {
  try { await access(resolve(root, file)); } catch { errors.push(`missing ${file}`); }
};

if (configuration.schemaVersion !== 1) errors.push("unsupported verification schema");
if (/compatibility_flags\s*:\s*\[[^\]]*nodejs_compat/u.test(viteConfiguration)) {
  errors.push("vite.config.ts explicitly enables the now-default nodejs_compat flag");
}
if (!manifest.scripts?.build?.includes("scripts/finalize-sites-build.mjs")) {
  errors.push("build does not finalize the generated Sites worker configuration");
}
for (const [role, script] of Object.entries(configuration.commands)) {
  if (!manifest.scripts?.[script]) errors.push(`${role} requires npm script ${script}`);
}
for (const workflow of Object.values(configuration.workflows)) {
  await requirePath(workflow);
  try {
    const source = await readFile(resolve(root, workflow), "utf8");
    if (/uses:\s+[^\n#]+@(v\d+|main|master)\b/u.test(source)) errors.push(`${workflow} contains a mutable action reference`);
    if (!source.includes("timeout-minutes:")) errors.push(`${workflow} has no job timeout`);
  } catch {}
}
for (const server of configuration.servers) {
  if (server.testPort - server.developmentPort !== 1000) errors.push(`${server.name} ports do not share a suffix`);
  const sources = [];
  for (const file of server.configurationFiles) {
    await requirePath(file);
    try { sources.push(await readFile(resolve(root, file), "utf8")); } catch {}
  }
  const source = sources.join("\n");
  if (!source.includes(String(server.developmentPort))) errors.push(`${server.name} development port is not configured`);
  if (!source.includes(String(server.testPort))) errors.push(`${server.name} test port is not recorded`);
  if (server.strictPort && !source.includes("strictPort: true")) errors.push(`${server.name} does not enforce a strict port`);
}

if (errors.length) {
  console.error(`Repository contract failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Verified ${configuration.id} repository contract.`);
