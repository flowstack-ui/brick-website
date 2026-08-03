import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Blocks, CircleDot, Eye, Keyboard, Layers3, PanelsTopLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = { title: "Built on Atom", description: "Understand how Atom and Brick form independent layers in the Flowstack ecosystem." };

const ownership = [
  { icon: Keyboard, title: "Interaction", body: "Keyboard, pointer, controlled state, focus, dismissal, and form behavior." },
  { icon: ShieldCheck, title: "Accessibility", body: "Semantics, ARIA relationships, focus scopes, portals, and assistive-technology contracts." },
  { icon: Eye, title: "Presentation", body: "Brick supplies the finished recipes, semantic tokens, anatomy styling, and visual states." },
  { icon: Layers3, title: "Composition", body: "Applications combine Brick into routes, data, content, workflows, and products." },
];

const flowstackLayers = [
  { step: "01", role: "Behavior", name: "Atom", body: "Accessible primitives own interaction, semantics, state, focus, and keyboard behavior." },
  { step: "02", role: "Presentation", name: "Brick", body: "Finished components add visual recipes, semantic tokens, responsive anatomy, and states." },
  { step: "03", role: "Application", name: "Your product", body: "Your brand, routes, data, content, and workflows turn those layers into a real experience." },
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
        <div className="layer-diagram" role="img" aria-label="Product layers: application composition, Brick presentation, and Atom behavior">
          <div className="layer-diagram-heading" aria-hidden="true"><span>Flowstack layers</span><small>foundation to finished product</small></div>
          <div className="layer application-layer">
            <span className="layer-symbol"><PanelsTopLeft size={20} aria-hidden="true" /></span>
            <span className="layer-copy"><small>03 · Application</small><strong>Your product</strong><span>brand · routes · data · workflows</span></span>
          </div>
          <div className="layer brick-layer">
            <span className="layer-symbol"><Blocks size={20} aria-hidden="true" /></span>
            <span className="layer-copy"><small>02 · Presentation</small><strong>Brick</strong><span>finished components · tokens · recipes</span></span>
          </div>
          <div className="layer atom-layer">
            <span className="layer-symbol"><CircleDot size={20} aria-hidden="true" /></span>
            <span className="layer-copy"><small>01 · Behavior</small><strong>Atom</strong><span>semantics · accessibility · interaction</span></span>
          </div>
        </div>
      </section>
      <section className="flowstack-context section-shell" aria-labelledby="flowstack-context-title">
        <div className="flowstack-context-copy">
          <Badge tone="accent" variant="soft">Part of Flowstack</Badge>
          <Text as="h2" id="flowstack-context-title" variant="display" wrap="balance">Independent layers. One product path.</Text>
          <Text as="p" variant="body-lg" tone="secondary" wrap="pretty">Flowstack is the larger ecosystem that keeps foundations, finished interface, and product composition interoperable without collapsing their ownership.</Text>
        </div>
        <ol className="flowstack-path" aria-label="Flowstack product path from Atom to a finished application">
          {flowstackLayers.map((layer) => (
            <li key={layer.name}>
              <span className="flowstack-step" aria-hidden="true">{layer.step}</span>
              <span className="flowstack-layer-copy">
                <small>{layer.role}</small>
                <strong>{layer.name}</strong>
                <span>{layer.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className="ownership-section section-shell" aria-labelledby="ownership-title">
        <div className="section-heading compact-heading ownership-heading">
          <Badge variant="outline" tone="neutral">Clear ownership</Badge>
          <Text as="h2" id="ownership-title" variant="display">Each layer has one job.</Text>
          <Text as="p" variant="body-lg" tone="secondary" align="start" wrap="pretty">Atom owns the behavioral contract. Brick owns the finished visual system. Applications combine both without asking either layer to own product decisions.</Text>
        </div>
        <Grid.Root columns={2} gap="4" className="ownership-grid">
          {ownership.map(({ icon: Icon, ...item }) => <Card.Root key={item.title} className="ownership-card"><Card.Header><span className="pillar-icon"><Icon size={18} aria-hidden="true" /></span><Card.Title as="h3">{item.title}</Card.Title></Card.Header><Card.Content><Text tone="secondary">{item.body}</Text></Card.Content></Card.Root>)}
        </Grid.Root>
      </section>
      <section className="atom-choice section-shell"><div><Text as="h2" variant="title-lg">Choose Atom when you want total visual control.</Text><Text tone="secondary">Choose Brick when you want the same behavioral foundation with a complete styled system already attached.</Text></div><WebsiteButton href="/docs/getting-started/" tone="neutral" variant="outline" endIcon={<ArrowRight size={15} />}>Start with Brick</WebsiteButton></section>
    </main>
  );
}
