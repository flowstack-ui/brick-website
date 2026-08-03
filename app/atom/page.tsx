import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Blocks, Eye, Keyboard, Layers3, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Built on Atom", description: "Understand the relationship between Brick’s visual layer and Atom’s headless accessibility foundation." };

const ownership = [
  { icon: Keyboard, title: "Interaction", body: "Keyboard, pointer, controlled state, focus, dismissal, and form behavior." },
  { icon: ShieldCheck, title: "Accessibility", body: "Semantics, ARIA relationships, focus scopes, portals, and assistive-technology contracts." },
  { icon: Eye, title: "Presentation", body: "Brick supplies the finished recipes, semantic tokens, anatomy styling, and visual states." },
  { icon: Layers3, title: "Composition", body: "Applications combine Brick into routes, data, content, workflows, and products." },
];

export default function AtomPage() {
  return (
    <main id="main-content">
      <section className="atom-hero section-shell">
        <div className="atom-copy">
          <Badge tone="accent" variant="soft">Built on Atom</Badge>
          <Text as="h1" className="page-title" wrap="balance">Behavior beneath the surface.</Text>
          <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Brick is the finished visual layer. Atom is the independent headless foundation that owns the difficult interaction and accessibility underneath it.</Text>
          <WebsiteButton href="https://atom-ui.com/" target="_blank" rel="noreferrer" endIcon={<ArrowRight size={15} />}>Visit atom-ui.com</WebsiteButton>
        </div>
        <div className="layer-diagram" aria-label="Atom and Brick product layers">
          <div className="layer application-layer"><span>Application</span><small>brand · routes · data · workflows</small></div>
          <div className="layer brick-layer"><span><Blocks size={18} /> Brick</span><small>finished components · tokens · recipes</small></div>
          <div className="layer atom-layer"><span>Atom</span><small>behavior · semantics · accessibility</small></div>
        </div>
      </section>
      <section className="ownership-section section-shell">
        <div className="section-heading compact-heading"><Badge variant="outline" tone="neutral">Clear ownership</Badge><Text as="h2" variant="display">Each layer has one job.</Text></div>
        <Grid.Root columns={2} gap="4" className="ownership-grid">
          {ownership.map(({ icon: Icon, ...item }) => <Card.Root key={item.title}><Card.Header><span className="pillar-icon"><Icon size={18} /></span><Card.Title as="h3">{item.title}</Card.Title></Card.Header><Card.Content><Text tone="secondary">{item.body}</Text></Card.Content></Card.Root>)}
        </Grid.Root>
      </section>
      <section className="atom-choice section-shell"><div><Text as="h2" variant="title-lg">Choose Atom when you want total visual control.</Text><Text tone="secondary">Choose Brick when you want the same behavioral foundation with a complete styled system already attached.</Text></div><WebsiteButton href="/docs/getting-started/" tone="neutral" variant="outline" endIcon={<ArrowRight size={15} />}>Start with Brick</WebsiteButton></section>
    </main>
  );
}
