import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, BookOpen, Layers3, Palette, ShieldCheck } from "lucide-react";
import { DocsShell } from "@/app/components/DocsShell";
import { source } from "@/app/lib/content";

export const metadata: Metadata = { title: "Documentation", description: "Learn how to install, compose, theme, and ship interfaces with Brick." };

const paths = [
  { icon: BookOpen, title: "Getting started", body: "Install Brick and build your first finished surface.", href: "/docs/getting-started/" },
  { icon: Layers3, title: "Composition", body: "Understand parts, layout, and application boundaries.", href: "/docs/composition/" },
  { icon: Palette, title: "Theming", body: "Brand the complete catalog through semantic tokens.", href: "/docs/theming/" },
  { icon: ShieldCheck, title: "Accessibility", body: "See how Atom and Brick divide responsibility.", href: "/docs/accessibility/" },
];

export default function DocsOverview() {
  return (
    <DocsShell current="docs">
      <article className="docs-article">
        <Badge tone="accent" variant="soft">Documentation · {source.version}</Badge>
        <Text as="h1" className="page-title" wrap="balance">Build with Brick</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Start with a coherent visual system, then customize through explicit public contracts instead of rebuilding every control.</Text>
        <Grid.Root columns={2} gap="4" className="docs-path-grid" id="details">
          {paths.map(({ icon: Icon, ...path }) => (
            <Card.Root key={path.href} variant="outline" className="docs-path-card">
              <Card.Header><span className="pillar-icon"><Icon size={18} /></span><Card.Title as="h2">{path.title}</Card.Title></Card.Header>
              <Card.Content><Text tone="secondary">{path.body}</Text></Card.Content>
              <Card.Footer><WebsiteButton href={path.href} tone="neutral" variant="ghost" size="sm" endIcon={<ArrowRight size={14} />}>Read guide</WebsiteButton></Card.Footer>
            </Card.Root>
          ))}
        </Grid.Root>
        <section className="docs-next" id="next">
          <Text as="h2" variant="title-lg">Prefer to explore first?</Text>
          <Text tone="secondary">Browse all 75 component owners and open live examples before installing.</Text>
          <WebsiteButton href="/components/" endIcon={<ArrowRight size={15} />}>Explore components</WebsiteButton>
        </section>
      </article>
    </DocsShell>
  );
}
