import syntaxCache from "@/content/syntax-tokens.json";

export type SyntaxToken = {
  content: string;
  color: string;
  fontStyle?: number;
};

export type SyntaxLines = SyntaxToken[][];

type SyntaxEntry = {
  language: string;
  source: string;
  lines: SyntaxLines;
};

const entries = (syntaxCache as { entries: SyntaxEntry[] }).entries;
const entriesBySource = new Map(entries.map((entry) => [`${entry.language}\u0000${entry.source}`, entry.lines]));

export function normalizeCodeSource(source: string) {
  return source.replace(/\r\n?/g, "\n").replace(/\n$/, "");
}

export function languageFromClassName(className?: string) {
  return className?.match(/(?:^|\s)language-([^\s]+)/)?.[1]?.toLowerCase() ?? "text";
}

export function highlightedLines(language: string, source: string): SyntaxLines {
  const normalized = normalizeCodeSource(source);
  return entriesBySource.get(`${language}\u0000${normalized}`)
    ?? normalized.split("\n").map((line) => [{ content: line, color: "var(--brick-syntax-foreground)" }]);
}
