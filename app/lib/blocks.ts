import catalog from "@/content/blocks.json";

export type PublicBlock = (typeof catalog.items)[number];

export const blocks = catalog.items;

export function blockBySlug(slug: string) {
  return blocks.find((block) => block.slug === slug);
}
