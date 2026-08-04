import components from "@/content/components.json";

export type ComponentEntry = (typeof components)[number];

export { components };

export const categories = [
  "Actions & selection",
  "Forms & choices",
  "Content & status",
  "Overlays & menus",
  "Navigation & layout",
  "Data & collections",
  "Accessibility",
] as const;

export function componentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}
