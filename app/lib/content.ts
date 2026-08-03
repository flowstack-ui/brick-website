import componentDocs from "@/content/component-docs.json";
import components from "@/content/components.json";
import guides from "@/content/guides.json";
import source from "@/content/brick-source.json";

export type ComponentEntry = (typeof components)[number];
export type GuideSlug = keyof typeof guides;

export { componentDocs, components, guides, source };

export const categories = Array.from(
  new Set(components.map((component) => component.category)),
);

export function componentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}

export function componentDoc(slug: string) {
  return componentDocs[slug as keyof typeof componentDocs];
}

export function guideBySlug(slug: string) {
  return guides[slug as GuideSlug];
}

