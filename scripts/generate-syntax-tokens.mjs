import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import typescript from "@shikijs/langs/typescript";
import tsx from "@shikijs/langs/tsx";
import html from "@shikijs/langs/html";
import css from "@shikijs/langs/css";
import shellscript from "@shikijs/langs/shellscript";

const root = path.resolve(import.meta.dirname, "..");
const outputPath = path.join(root, "content/syntax-tokens.json");
const checkOnly = process.argv.includes("--check");

const theme = {
  name: "brick-syntax",
  type: "dark",
  colors: {
    "editor.background": "transparent",
    "editor.foreground": "var(--brick-syntax-foreground)",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "var(--brick-syntax-comment)", fontStyle: "italic" } },
    { scope: ["keyword", "storage.type", "storage.modifier"], settings: { foreground: "var(--brick-syntax-keyword)" } },
    { scope: ["string", "constant.other.symbol"], settings: { foreground: "var(--brick-syntax-string)" } },
    { scope: ["constant.numeric", "constant.language", "constant.character", "support.constant"], settings: { foreground: "var(--brick-syntax-constant)" } },
    { scope: ["entity.name.function", "support.function", "variable.function", "support.function.builtin"], settings: { foreground: "var(--brick-syntax-function)" } },
    { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class", "entity.name.tag"], settings: { foreground: "var(--brick-syntax-type)" } },
    { scope: ["variable.parameter", "variable.other.property", "support.type.property-name", "entity.other.attribute-name"], settings: { foreground: "var(--brick-syntax-property)" } },
    { scope: ["keyword.operator", "punctuation", "meta.brace", "meta.delimiter"], settings: { foreground: "var(--brick-syntax-punctuation)" } },
  ],
};

function normalizeCode(source) {
  return source.replace(/\r\n?/g, "\n").replace(/\n$/, "");
}

function collectFences(markdown, entries) {
  for (const match of markdown.matchAll(/^\s{0,3}```([^\s`]*)[^\n]*\n([\s\S]*?)^\s{0,3}```\s*$/gm)) {
    const language = (match[1] || "text").toLowerCase();
    const source = normalizeCode(match[2]);
    entries.set(`${language}\u0000${source}`, { language, source });
  }
}

const [guides, componentDocs] = await Promise.all([
  readFile(path.join(root, "content/guides.json"), "utf8").then(JSON.parse),
  readFile(path.join(root, "content/component-docs.json"), "utf8").then(JSON.parse),
]);

const entriesBySource = new Map();
for (const guide of Object.values(guides)) collectFences(guide.body, entriesBySource);
for (const markdown of Object.values(componentDocs)) collectFences(markdown, entriesBySource);

const highlighter = await createHighlighterCore({
  themes: [theme],
  langs: [typescript, tsx, html, css, shellscript],
  engine: createJavaScriptRegexEngine(),
});

const entries = [];
for (const entry of [...entriesBySource.values()].sort((a, b) => a.language.localeCompare(b.language) || a.source.localeCompare(b.source))) {
  const lines = entry.language === "text"
    ? entry.source.split("\n").map((line) => [{ content: line, color: "var(--brick-syntax-foreground)" }])
    : highlighter.codeToTokensBase(entry.source, { lang: entry.language, theme: "brick-syntax" }).map((line) => line.map(({ content, color, fontStyle }) => ({
      content,
      color: color ?? "var(--brick-syntax-foreground)",
      ...(fontStyle ? { fontStyle } : {}),
    })));
  entries.push({ ...entry, lines });
}
highlighter.dispose();

const output = `${JSON.stringify({ version: 1, theme: "brick-syntax", entries })}\n`;
if (checkOnly) {
  const current = await readFile(outputPath, "utf8").catch(() => "");
  if (current !== output) {
    console.error("Syntax token cache is stale. Run npm run syntax:sync.");
    process.exit(1);
  }
  console.log(`Verified ${entries.length} highlighted code examples.`);
} else {
  await writeFile(outputPath, output);
  console.log(`Generated ${entries.length} highlighted code examples.`);
}
