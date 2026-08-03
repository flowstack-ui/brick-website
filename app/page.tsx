import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import {
  ArrowRight,
  Blocks,
  Braces,
  Check,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { InstallCommand } from "./components/InstallCommand";
import { ProductWorkspace } from "./components/ProductWorkspace";
import { components, source } from "./lib/content";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Accessible by foundation",
    body: "Behavior, semantics, focus, keyboard, portals, and interaction come from published Atom primitives.",
    link: "/atom/",
    label: "Meet Atom",
  },
  {
    icon: Sparkles,
    title: "Finished by default",
    body: "Coherent recipes, complete states, and responsive visual quality arrive in one static stylesheet.",
    link: "/components/",
    label: "Explore components",
  },
  {
    icon: Palette,
    title: "Branded through meaning",
    body: "Map your identity onto semantic tokens while keeping the same trusted component anatomy.",
    link: "/themes/",
    label: "See the theme",
  },
];

export default function Home() {
  return (
    <>
      <main id="main-content">
        <section className="hero section-shell">
          <div className="hero-copy">
            <Badge tone="accent" variant="soft" shape="pill">Brick v{source.version} is here</Badge>
            <Text as="h1" className="hero-title" wrap="balance">
              Build interfaces that already feel <span>finished.</span>
            </Text>
            <Text as="p" variant="body-lg" tone="secondary" className="hero-lede" wrap="pretty">
              A complete React component library with accessible behavior, coherent visual defaults, and a customization contract designed for real products.
            </Text>
            <HStack gap="3" wrap className="hero-actions">
              <WebsiteButton href="/docs/getting-started/" size="lg" endIcon={<ArrowRight size={17} />}>Get started</WebsiteButton>
              <WebsiteButton href="/components/" size="lg" tone="neutral" variant="soft">Explore 75 components</WebsiteButton>
            </HStack>
            <InstallCommand />
            <ul className="hero-proof" aria-label="Brick package qualities">
              <li><Badge tone="neutral" variant="soft" size="sm"><Check size={13} aria-hidden="true" /> React 18 and 19</Badge></li>
              <li><Badge tone="neutral" variant="soft" size="sm"><Check size={13} aria-hidden="true" /> Static CSS</Badge></li>
              <li><Badge tone="neutral" variant="soft" size="sm"><Check size={13} aria-hidden="true" /> MIT licensed</Badge></li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-intro">
              <Badge tone="accent" variant="soft" size="sm">Live Brick composition</Badge>
              <Text as="h2" variant="title-lg">Meet Northstar, built entirely with Brick.</Text>
              <Text as="p" variant="body-sm" tone="secondary">
                Northstar is a demo website project assembled from published Brick components.
              </Text>
            </div>
            <div className="hero-glow" aria-hidden="true" />
            <ProductWorkspace />
          </div>
        </section>

        <section className="principles section-shell" aria-labelledby="principles-title">
          <div className="section-heading">
            <Badge variant="outline" tone="neutral">The Brick promise</Badge>
            <Text as="h2" id="principles-title" variant="display" wrap="balance">A strong visual layer, without the platform weight.</Text>
            <Text as="p" variant="body-lg" tone="secondary">Brick sits between headless primitives and a sprawling UI platform: focused, polished, and explicit about what your application still owns.</Text>
          </div>
          <Grid.Root columns={3} gap="4" className="pillar-grid">
            {pillars.map(({ icon: Icon, ...pillar }, index) => (
              <Card.Root key={pillar.title} variant={index === 1 ? "elevated" : "outline"} className="pillar-card">
                <Card.Header>
                  <span className="pillar-icon"><Icon size={19} aria-hidden="true" /></span>
                  <Card.Title as="h3">{pillar.title}</Card.Title>
                </Card.Header>
                <Card.Content><Text tone="secondary">{pillar.body}</Text></Card.Content>
                <Card.Footer><a className="pillar-link" href={pillar.link}>{pillar.label}<ArrowRight size={14} aria-hidden="true" /></a></Card.Footer>
              </Card.Root>
            ))}
          </Grid.Root>
        </section>

        <section className="theme-story section-shell" aria-labelledby="theme-story-title">
          <div className="theme-story-copy">
            <Badge tone="accent" variant="soft">The first Brick theme</Badge>
            <Text as="h2" id="theme-story-title" variant="display" wrap="balance">One anatomy. A completely different voice.</Text>
            <Text as="p" variant="body-lg" tone="secondary">The website theme changes public semantic roles—not component internals. Purple expression, warm surfaces, and softened geometry flow through the whole catalog.</Text>
            <WebsiteButton href="/themes/" tone="neutral" variant="outline" endIcon={<ArrowRight size={15} />}>Explore theming</WebsiteButton>
          </div>
          <div className="theme-pair">
            <div className="theme-sample theme-sample-default" data-brick-appearance="light">
              <span className="sample-label">Brick default</span>
              <Card.Root size="sm">
                <Card.Header><Card.Title as="h3">Project ready</Card.Title><Card.Description>All release checks passed.</Card.Description></Card.Header>
                <Card.Content><HStack gap="2"><Badge tone="success">Ready</Badge><Badge tone="neutral">3 pages</Badge></HStack></Card.Content>
                <Card.Footer><WebsiteButton size="sm">Open project</WebsiteButton></Card.Footer>
              </Card.Root>
            </div>
            <div className="theme-sample theme-sample-studio" data-brick-appearance="dark">
              <span className="sample-label">Architectural warmth</span>
              <Card.Root size="sm">
                <Card.Header><Card.Title as="h3">Project ready</Card.Title><Card.Description>All release checks passed.</Card.Description></Card.Header>
                <Card.Content><HStack gap="2"><Badge tone="success">Ready</Badge><Badge tone="accent">3 pages</Badge></HStack></Card.Content>
                <Card.Footer><WebsiteButton size="sm">Open project</WebsiteButton></Card.Footer>
              </Card.Root>
            </div>
          </div>
        </section>

        <section className="catalog-story section-shell" aria-labelledby="catalog-title">
          <div className="catalog-art" aria-hidden="true">
            <span className="catalog-block block-a"><Braces size={22} /></span>
            <span className="catalog-block block-b"><Layers size={22} /></span>
            <span className="catalog-block block-c"><Blocks size={22} /></span>
            <span className="catalog-count">{components.length}</span>
          </div>
          <div className="catalog-copy">
            <Badge variant="outline" tone="neutral">Complete catalog</Badge>
            <Text as="h2" id="catalog-title" variant="display" wrap="balance">From a single Button to a complete product shell.</Text>
            <Text as="p" variant="body-lg" tone="secondary">Forms, overlays, menus, navigation, data surfaces, layout, feedback, and mobile-first composition—each with documented APIs and public customization hooks.</Text>
            <WebsiteButton href="/components/" endIcon={<ArrowRight size={15} />}>Browse every component</WebsiteButton>
          </div>
        </section>

        <section className="closing-cta section-shell">
          <div>
            <Text as="h2" variant="display" wrap="balance">Start with components that already belong together.</Text>
            <Text as="p" variant="body-lg" tone="secondary">Install Brick once, then spend your time building the product only you can make.</Text>
          </div>
          <div className="closing-actions">
            <InstallCommand compact />
            <WebsiteButton href="/docs/getting-started/" size="lg" endIcon={<ArrowRight size={17} />}>Read the guide</WebsiteButton>
          </div>
        </section>
      </main>
    </>
  );
}
