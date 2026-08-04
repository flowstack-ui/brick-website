import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { Text } from "@flowstack-ui/brick/text";
import { ComponentCatalog } from "@/app/components/ComponentCatalog";
import { createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "React component catalog",
  description: "Explore 75 finished, accessible React component owners with live examples, practical guidance, APIs, styling hooks, and package provenance.",
  path: "/components",
});

export default function ComponentsPage() {
  return (
    <main id="main-content" className="catalog-shell section-shell">
      <div className="catalog-page">
        <Badge tone="accent" variant="soft">75 component owners</Badge>
        <Text as="h1" className="page-title" wrap="balance">The complete Brick catalog</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Search when you know the name, or start with the interface problem you need to solve. Every result opens a live example and a consumer-first guide.</Text>
        <ComponentCatalog />
      </div>
    </main>
  );
}
