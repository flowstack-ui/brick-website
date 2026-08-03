import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Check, Palette, Sparkles } from "lucide-react";
import { InstallCommand } from "@/app/components/InstallCommand";

export const metadata: Metadata = { title: "Themes", description: "See how semantic Brick tokens turn one component anatomy into a complete brand." };

const tokenGroups = [
  { name: "Color", values: ["accent", "surface", "text", "border", "status"] },
  { name: "Shape", values: ["control", "surface", "overlay", "full"] },
  { name: "Typography", values: ["display", "title", "body", "label", "code"] },
  { name: "Motion", values: ["fast", "moderate", "enter", "exit"] },
];

export default function ThemesPage() {
  return (
    <main id="main-content">
      <section className="themes-hero section-shell">
        <div>
          <Badge tone="accent" variant="soft" shape="pill"><Sparkles size={13} /> Theme foundations</Badge>
          <Text as="h1" className="page-title" wrap="balance">Change the voice, not the component.</Text>
          <Text as="p" variant="body-lg" tone="secondary" className="page-lede">Brick themes assign meaningful visual roles. The same Button, Card, Input, and Dialog keep their anatomy, behavior, and tested recipes under every brand.</Text>
          <HStack gap="3" wrap><WebsiteButton href="/docs/theming/" endIcon={<ArrowRight size={15} />}>Read the theme guide</WebsiteButton><WebsiteButton href="/components/" tone="neutral" variant="outline">See the catalog</WebsiteButton></HStack>
        </div>
        <div className="theme-orbit" aria-label="Brick semantic theme layers">
          <div className="orbit-center"><Palette size={28} /><strong>Meaning</strong><span>before color</span></div>
          <span className="orbit-chip chip-one">Accent</span><span className="orbit-chip chip-two">Surface</span><span className="orbit-chip chip-three">Type</span><span className="orbit-chip chip-four">Motion</span>
        </div>
      </section>

      <section className="theme-comparison section-shell" aria-labelledby="comparison-title">
        <div className="section-heading compact-heading"><Badge variant="outline" tone="neutral">One public contract</Badge><Text as="h2" id="comparison-title" variant="display">Two complete expressions</Text></div>
        <Grid.Root columns={2} gap="4" className="comparison-grid">
          <div className="comparison-panel theme-default-scope" data-brick-appearance="light">
            <span className="comparison-label">Brick default</span>
            <Card.Root variant="elevated"><Card.Header><Card.Title as="h3">Invite collaborators</Card.Title><Card.Description>Give your team access to this project.</Card.Description></Card.Header><Card.Content><div className="fake-field"><span>Email address</span><div>designer@example.com</div></div></Card.Content><Card.Footer><WebsiteButton tone="neutral" variant="outline">Cancel</WebsiteButton><WebsiteButton>Send invite</WebsiteButton></Card.Footer></Card.Root>
          </div>
          <div className="comparison-panel studio-theme-scope" data-brick-appearance="dark">
            <span className="comparison-label">Architectural warmth</span>
            <Card.Root variant="elevated"><Card.Header><Card.Title as="h3">Invite collaborators</Card.Title><Card.Description>Give your team access to this project.</Card.Description></Card.Header><Card.Content><div className="fake-field"><span>Email address</span><div>designer@example.com</div></div></Card.Content><Card.Footer><WebsiteButton tone="neutral" variant="outline">Cancel</WebsiteButton><WebsiteButton>Send invite</WebsiteButton></Card.Footer></Card.Root>
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
        <div className="token-grid">
          {tokenGroups.map((group) => <Card.Root key={group.name} size="sm" variant="outline"><Card.Header><Card.Title as="h3">{group.name}</Card.Title></Card.Header><Card.Content><div className="token-values">{group.values.map((value) => <Badge key={value} tone="neutral" variant="soft">{value}</Badge>)}</div></Card.Content></Card.Root>)}
        </div>
      </section>

      <section className="theme-cta section-shell">
        <div><Text as="h2" variant="title-lg">Start with Brick’s defaults.</Text><Text tone="secondary">Then make them unmistakably yours.</Text></div>
        <InstallCommand compact />
      </section>
    </main>
  );
}
