import guides from "@/content/guides.json";

export type GuideSlug = keyof typeof guides;

export { guides };

export function guideBySlug(slug: string) {
  return guides[slug as GuideSlug];
}
