import componentRecords from "@/content/components.json";

export type ComponentDelivery = "package" | "source";
export type ComponentEntry = Omit<(typeof componentRecords)[number], "delivery"> & { delivery: ComponentDelivery };

export const components = componentRecords as ComponentEntry[];

export const categories = [
  "Actions & selection",
  "Forms & choices",
  "Typography",
  "Content & status",
  "Overlays & menus",
  "Navigation & layout",
  "Data & collections",
  "Accessibility",
] as const;

export function componentBySlug(slug: string) {
  return components.find((component) => component.slug === slug);
}
