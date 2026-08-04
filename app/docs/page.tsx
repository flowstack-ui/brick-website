import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, BookOpen, Check, Layers3, Palette, ShieldCheck } from "lucide-react";
import { DocsShell } from "@/app/components/DocsShell";
import { GuidePagination } from "@/app/components/GuidePagination";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { createPageMetadata } from "@/app/lib/seo";
import { source } from "@/app/lib/source";

export const metadata: Metadata = createPageMetadata({
  title: "Brick UI guides",
  description: "Learn how to install, compose, theme, and verify accessible React interfaces with Brick UI's finished component system.",
  path: "/docs",
});

const paths = [
  { id: "getting-started-path", step: "01", time: "Start here", icon: BookOpen, title: "Getting started", body: "Install Brick and build your first finished surface.", outcome: "A working component", href: "/docs/getting-started" },
  { id: "theming-path", step: "02", time: "Then brand it", icon: Palette, title: "Theming", body: "Map your identity onto the complete catalog through semantic tokens.", outcome: "A coherent theme", href: "/docs/theming" },
  { id: "composition-path", step: "03", time: "Build outward", icon: Layers3, title: "Composition", body: "Arrange public parts while keeping application boundaries clear.", outcome: "Maintainable screens", href: "/docs/composition" },
  { id: "accessibility-path", step: "04", time: "Verify together", icon: ShieldCheck, title: "Accessibility", body: "Understand what Atom, Brick, and your application each own.", outcome: "A complete experience", href: "/docs/accessibility" },
];

export default function GuidesOverview() {
  return (
    <DocsShell current="guides" toc={[{ id: "guide-paths", label: "Choose a path" }, { id: "explore-components", label: "Explore components" }]}>
      <article className="docs-article">
        <Badge tone="accent" variant="soft">Guides · v{source.version}</Badge>
        <Text as="h1" className="page-title" wrap="balance">Build with Brick</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Start with a coherent visual system, then customize through explicit public contracts instead of rebuilding every control.</Text>
        <div className="docs-overview-proof" aria-label="Brick documentation scope">
          <span><strong>1</strong> package</span><span><strong>75</strong> component owners</span><span><strong>0</strong> required providers</span>
        </div>
        <section className="docs-paths" id="guide-paths" aria-labelledby="guide-paths-title">
          <div className="docs-path-heading"><div><span>Recommended learning route</span><Text as="h2" id="guide-paths-title" variant="title-lg">Build confidence in four moves</Text></div><Text tone="secondary">Follow the sequence or jump directly to the guide you need.</Text></div>
          <Grid.Root columns={2} gap="4" className="docs-path-grid">
            {paths.map(({ icon: Icon, ...path }) => (
              <Card.Root key={path.href} variant="outline" className="docs-path-card">
                <Card.Header className="docs-path-card-header"><span className="pillar-icon"><Icon size={18} aria-hidden="true" /></span><div><span>{path.step} · {path.time}</span><Card.Title as="h3">{path.title}</Card.Title></div></Card.Header>
                <Card.Content><Text tone="secondary">{path.body}</Text></Card.Content>
                <Card.Footer><span className="docs-path-outcome"><Check size={13} aria-hidden="true" />{path.outcome}</span><Link className="pillar-link" href={path.href}>Read guide<ArrowRight size={14} aria-hidden="true" /></Link></Card.Footer>
              </Card.Root>
            ))}
          </Grid.Root>
        </section>
        <section className="docs-next" id="explore-components">
          <Text as="h2" variant="title-lg">Prefer to explore first?</Text>
          <Text tone="secondary">Browse all 75 component owners and open live examples before installing.</Text>
          <WebsiteButton href="/components" endIcon={<ArrowRight size={15} aria-hidden="true" />}>Explore components</WebsiteButton>
        </section>
        <GuidePagination current="overview" />
      </article>
    </DocsShell>
  );
}
