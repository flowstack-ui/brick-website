export type TocItem = {
  id: string;
  label: string;
};

export function headingId(label: string) {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function headingLabel(markdown: string) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .trim();
}

export function extractMarkdownToc(markdown: string): TocItem[] {
  const occurrences = new Map<string, number>();
  const items: TocItem[] = [];

  for (const match of markdown.matchAll(/^##\s+(.+?)\s*#*\s*$/gm)) {
    const label = headingLabel(match[1]);
    const baseId = headingId(label);
    const occurrence = occurrences.get(baseId) ?? 0;
    occurrences.set(baseId, occurrence + 1);
    items.push({ id: occurrence === 0 ? baseId : `${baseId}-${occurrence}`, label });
  }

  return items;
}
