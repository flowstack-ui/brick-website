import type { Metadata } from "next";
import "../.generated/brick-themes.css";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { createPageMetadata } from "@/app/lib/seo";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Box, Check, Gauge, Palette, Sparkles, Type } from "lucide-react";
import { InstallCommand } from "@/app/components/InstallCommand";

export const metadata: Metadata = createPageMetadata({
  title: "Themes for Brick components",
  description: "See how Brick UI's semantic CSS tokens turn stable React component anatomy into a coherent light and dark product theme.",
  path: "/themes",
});

const tokenGroups = [
  { name: "Color", description: "Intent and hierarchy", icon: Palette, values: ["accent", "surface", "text", "border", "status"] },
  { name: "Shape", description: "A consistent silhouette", icon: Box, values: ["control", "surface", "overlay", "full"] },
  { name: "Typography", description: "Voice at every scale", icon: Type, values: ["display", "title", "body", "label", "code"] },
  { name: "Motion", description: "Timing with purpose", icon: Gauge, values: ["fast", "moderate", "enter", "exit"] },
];

export default function ThemesPage() {
  return (
    <main id="main-content">
      <section className="themes-hero section-shell">
        <div className="theme-copy">
          <Badge tone="accent" variant="soft" shape="pill"><Sparkles size={13} aria-hidden="true" /> Theme foundations</Badge>
          <Text as="h1" className="page-title" wrap="balance">Change the voice, not the component.</Text>
          <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Brick themes assign meaningful visual roles. The same Button, Card, Input, and Dialog keep their anatomy, behavior, and tested recipes under every brand.</Text>
          <HStack gap="3" wrap className="theme-actions"><WebsiteButton href="/docs/theming" endIcon={<ArrowRight size={15} />}>Read the theme guide</WebsiteButton><WebsiteButton href="/components" tone="neutral" variant="soft">See the catalog</WebsiteButton></HStack>
        </div>
        <div className="theme-orbit" role="img" aria-label="Brick semantic theme instrument with Accent, Surface, Type, and Motion roles surrounding a meaning-first core">
          <span className="orbit-aura" aria-hidden="true" />
          <span className="orbit-axis orbit-axis-x" aria-hidden="true" />
          <span className="orbit-axis orbit-axis-y" aria-hidden="true" />
          <div className="orbit-center">
            <span className="orbit-center-icon"><Palette size={22} aria-hidden="true" /></span>
            <small>Semantic core</small>
            <strong>Meaning</strong>
            <span>before color</span>
            <span className="orbit-spectrum" aria-hidden="true"><i /><i /><i /><i /></span>
          </div>
          <span className="orbit-chip chip-one"><i aria-hidden="true" /><span><strong>Accent</strong><small>emphasis</small></span></span>
          <span className="orbit-chip chip-two"><i aria-hidden="true" /><span><strong>Surface</strong><small>elevation</small></span></span>
          <span className="orbit-chip chip-three"><i aria-hidden="true" /><span><strong>Type</strong><small>hierarchy</small></span></span>
          <span className="orbit-chip chip-four"><i aria-hidden="true" /><span><strong>Motion</strong><small>feedback</small></span></span>
        </div>
      </section>

      <section className="theme-comparison section-shell" aria-labelledby="comparison-title">
        <div className="section-heading theme-comparison-heading"><Badge variant="outline" tone="neutral">One public contract</Badge><Text as="h2" id="comparison-title" variant="display" align="center">Two complete expressions.</Text><Text as="p" variant="body-lg" tone="secondary" align="center" wrap="balance">A theme is not a coat of paint. It is one coordinated decision system applied to the same accessible component anatomy.</Text></div>
        <Grid.Root columns={2} gap="4" className="comparison-grid">
          <div className="comparison-panel theme-default-scope" data-brick-appearance="light" role="group" aria-label="Brick default theme expression">
            <div className="comparison-signature"><span><small>Expression 01</small><strong>Brick default</strong></span><span className="comparison-swatches" aria-hidden="true"><i /><i /><i /><i /></span></div>
            <Card.Root variant="elevated"><Card.Header><Card.Title as="h3">Invite collaborators</Card.Title><Card.Description>Give your team access to this project.</Card.Description></Card.Header><Card.Content><div className="fake-field"><span>Email address</span><div>designer@example.com</div></div></Card.Content><Card.Footer><WebsiteButton tone="neutral" variant="outline">Cancel</WebsiteButton><WebsiteButton>Send invite</WebsiteButton></Card.Footer></Card.Root>
            <span className="comparison-contract"><Check size={14} aria-hidden="true" /> Same Brick component tree</span>
          </div>
          <div className="comparison-panel studio-theme-scope" data-brick-appearance="dark" role="group" aria-label="Architectural warmth theme expression">
            <div className="comparison-signature"><span><small>Expression 02</small><strong>Architectural warmth</strong></span><span className="comparison-swatches" aria-hidden="true"><i /><i /><i /><i /></span></div>
            <Card.Root variant="elevated"><Card.Header><Card.Title as="h3">Invite collaborators</Card.Title><Card.Description>Give your team access to this project.</Card.Description></Card.Header><Card.Content><div className="fake-field"><span>Email address</span><div>designer@example.com</div></div></Card.Content><Card.Footer><WebsiteButton tone="neutral" variant="outline">Cancel</WebsiteButton><WebsiteButton>Send invite</WebsiteButton></Card.Footer></Card.Root>
            <span className="comparison-contract"><Check size={14} aria-hidden="true" /> Same Brick component tree</span>
          </div>
        </Grid.Root>
      </section>

      <section className="token-section section-shell">
        <div className="token-copy">
          <Badge tone="accent" variant="soft">CSS-first</Badge>
          <Text as="h2" variant="display" wrap="balance">A small vocabulary with complete reach.</Text>
          <Text as="p" variant="body-lg" tone="secondary">Override stable semantic roles in ordinary CSS. No required provider, render-time palette engine, or application storage policy.</Text>
          <div className="theme-checks"><span><Check size={15} /> Static and server-safe</span><span><Check size={15} /> Scoped through inheritance</span><span><Check size={15} /> Light and dark together</span></div>
        </div>
        <div className="token-map" aria-label="Brick semantic token families">
          <div className="token-map-heading"><span>Semantic map</span><small>04 connected systems</small></div>
          {tokenGroups.map(({ icon: Icon, ...group }, index) => <div className="token-family" key={group.name}><span className="token-family-index">0{index + 1}</span><span className="token-family-icon"><Icon size={18} aria-hidden="true" /></span><span className="token-family-copy"><strong>{group.name}</strong><small>{group.description}</small></span><div className="token-values">{group.values.map((value) => <Badge key={value} tone="neutral" variant="soft">{value}</Badge>)}</div></div>)}
        </div>
      </section>

      <section className="theme-cta section-shell">
        <div><Text as="h2" variant="title-lg">Start with Brick’s defaults.</Text><Text tone="secondary">Then make them unmistakably yours.</Text></div>
        <InstallCommand compact />
      </section>
    </main>
  );
}
