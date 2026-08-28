import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import configuration from "../verification.config.mjs";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const rootLayout = await readFile(resolve(root, "app/layout.tsx"), "utf8");
const styleGenerator = await readFile(resolve(root, "scripts/generate-brick-style-bundles.mjs"), "utf8");
const errors = [];
const browserConfigSources = [];
const requirePath = async (file) => {
  try { await access(resolve(root, file)); } catch { errors.push(`missing ${file}`); }
};

if (configuration.schemaVersion !== 1) errors.push("unsupported verification schema");
if (manifest.scripts?.build !== "next build") {
  errors.push("production build must use native next build");
}
if (!manifest.scripts?.dev?.startsWith("next dev ")) {
  errors.push("development command must use native next dev");
}
if (!manifest.scripts?.start?.startsWith("next start ")) {
  errors.push("production command must use native next start");
}
for (const dependency of [
  "@cloudflare/vite-plugin",
  "@vitejs/plugin-react",
  "@vitejs/plugin-rsc",
  "react-server-dom-webpack",
  "vinext",
  "vite",
  "wrangler",
]) {
  if (manifest.dependencies?.[dependency] || manifest.devDependencies?.[dependency]) {
    errors.push(`obsolete deployment dependency remains: ${dependency}`);
  }
}
if (!manifest.dependencies?.["@vercel/analytics"]) {
  errors.push("Vercel Web Analytics integration dependency is missing");
}
if (!rootLayout.includes('from "@vercel/analytics/next"')) {
  errors.push("root layout must use the Next.js Vercel Analytics entrypoint");
}
if (!rootLayout.includes('process.env.VERCEL === "1" ? <Analytics /> : null')) {
  errors.push("Vercel Analytics must remain production-host conditional");
}
if (!rootLayout.includes('./.generated/brick-shell.css')) {
  errors.push("root layout must load the generated Brick shell bundle");
}
if (styleGenerator.includes('"styles.css"')) {
  errors.push("Brick style bundles must not load the complete stylesheet");
}
for (const stylesheet of ["reset.css", "styles/core.css"]) {
  if (!styleGenerator.includes(`"${stylesheet}"`)) {
    errors.push(`Brick style generator is missing ${stylesheet}`);
  }
}

const previewsDirectory = resolve(root, "components/previews");
for (const file of await readdir(previewsDirectory)) {
  if (!file.endsWith(".tsx")) continue;
  const source = await readFile(resolve(previewsDirectory, file), "utf8");
  const owner = file.slice(0, -4);
  if (!source.includes(`"../../app/.generated/previews/${owner}.css"`)) {
    errors.push(`${file} does not load its generated preview style bundle`);
  }
  if (source.includes('"@flowstack-ui/brick/styles/')) {
    errors.push(`${file} bypasses the generated preview style bundle`);
  }
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
  if (server.strictPort) {
    if (!manifest.scripts?.dev?.includes(`--port ${server.developmentPort}`)) {
      errors.push(`${server.name} development command does not pin its port`);
    }
    if (!manifest.scripts?.["start:test"]?.includes(`--port ${server.testPort}`)) {
      errors.push(`${server.name} test command does not pin its port`);
    }
  }
}
for (const path of configuration.browserConfigs) {
  await requirePath(path);
  try {
    const source = await readFile(resolve(root, path), "utf8");
    browserConfigSources.push(source);
    if (!source.includes("reuseExistingServer: false")) errors.push(`${path} may reuse a stale server`);
  } catch {}
}
if (manifest.browserslist?.length !== 1 || manifest.browserslist[0] !== configuration.browserSupport.query) {
  errors.push(`package.json must declare ${configuration.browserSupport.query}`);
}
const browserConfiguration = browserConfigSources.join("\n");
for (const engine of configuration.browserSupport.portableEngines) {
  if (!browserConfiguration.includes(engine)) errors.push(`browser evidence is missing ${engine}`);
}

if (errors.length) {
  console.error(`Repository contract failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Verified ${configuration.id} repository contract.`);
