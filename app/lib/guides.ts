import guides from "@/content/guides.json";

export type GuideSlug = keyof typeof guides;

export const guideOrder = ["getting-started", "theming", "composition", "accessibility"] as const satisfies readonly GuideSlug[];

const guideSequence = [
  { slug: "overview", title: "Overview", href: "/docs" },
  ...guideOrder.map((slug) => ({ slug, title: guides[slug].title, href: `/docs/${slug}` })),
];

export { guides };

export function guideBySlug(slug: string) {
  return guides[slug as GuideSlug];
}

export function guideNeighbors(slug: string) {
  const index = guideSequence.findIndex((guide) => guide.slug === slug);
  return {
    previous: index > 0 ? guideSequence[index - 1] : undefined,
    next: index >= 0 && index < guideSequence.length - 1 ? guideSequence[index + 1] : undefined,
  };
}
