import { headingId, type TocItem } from "@/app/lib/toc";

export type ComponentDocSection = {
  body: string;
  id: string;
  title: string;
};

export type StructuredComponentDoc = {
  advanced: ComponentDocSection[];
  sections: Map<string, ComponentDocSection>;
};

const advancedTitles = new Set([
  "Anatomy and DOM ownership",
  "Composition, native props, and refs",
]);

const publicOrder = [
  "When and where to use",
  "When not to use",
  "Delivery model",
  "Installation and imports",
  "Quick start",
  "Visual recipes and states",
  "Examples",
  "API",
  "Accessibility",
  "Responsive behavior",
  "Customization",
  "Tokens and CSS hooks",
] as const;

export function consumerComponentMarkdown(markdown: string) {
  const publicDoc = markdown.split(/\n---\n\n# .+ changelog\n/i, 1)[0];
  const maintainerStart = publicDoc.search(/^##\s+(Evidence|Changelog)\s*$/m);
  return (maintainerStart >= 0 ? publicDoc.slice(0, maintainerStart) : publicDoc).trim();
}

export function structureComponentDoc(markdown: string): StructuredComponentDoc {
  const source = consumerComponentMarkdown(markdown).replace(/^# .+\n/, "");
  const matches = [...source.matchAll(/^##\s+(.+?)\s*#*\s*$/gm)];
  const sections = new Map<string, ComponentDocSection>();

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const title = match[1].trim();
    if (title === "Evidence" || title === "Changelog") continue;
    const bodyStart = (match.index ?? 0) + match[0].length;
    const bodyEnd = matches[index + 1]?.index ?? source.length;
    const body = source.slice(bodyStart, bodyEnd).trim();
    const maintainerOnlyExamples = title === "Examples" && /playground/i.test(body) && !/```/.test(body) && !/^###\s+/m.test(body);
    if (maintainerOnlyExamples) continue;
    sections.set(title, {
      body,
      id: headingId(title),
      title,
    });
  }

  return {
    sections: new Map(publicOrder.flatMap((title) => {
      const section = sections.get(title);
      return section ? [[title, section] as const] : [];
    })),
    advanced: [...sections.values()].filter((section) => advancedTitles.has(section.title)),
  };
}

export function componentDocToc(markdown: string): TocItem[] {
  const { sections, advanced } = structureComponentDoc(markdown);
  const items: TocItem[] = [{ id: "live-example", label: "Live example" }];

  if (sections.has("When and where to use") || sections.has("When not to use")) {
    items.push({ id: "choose-this-component", label: "When to use it" });
  }
  for (const title of [
    "Delivery model",
    "Installation and imports",
    "Quick start",
    "Visual recipes and states",
    "Examples",
    "API",
    "Accessibility",
    "Responsive behavior",
  ]) {
    const section = sections.get(title);
    if (section) items.push({ id: section.id, label: section.title });
  }
  if (sections.has("Customization") || sections.has("Tokens and CSS hooks")) {
    items.push({ id: "styling-and-tokens", label: "Styling and tokens" });
  }
  if (advanced.length > 0) items.push({ id: "advanced-reference", label: "Advanced reference" });
  items.push(sections.has("Delivery model")
    ? { id: "source-access", label: "Source access" }
    : { id: "maintainer-resources", label: "Maintainer resources" });
  return items;
}
