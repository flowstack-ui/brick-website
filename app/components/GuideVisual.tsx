import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Text } from "@flowstack-ui/brick/text";
import {
  Accessibility,
  AppWindow,
  Boxes,
  Braces,
  Check,
  CircleDot,
  Layers3,
  MousePointer2,
  PackageCheck,
  Palette,
  ShieldCheck,
  SwatchBook,
  Type,
} from "lucide-react";

const guideCopy = {
  "getting-started": {
    kicker: "Your first working surface",
    title: "Three steps from package to product",
    body: "Brick is intentionally a short setup: install the package, load its static visual foundation once, then compose public parts.",
  },
  theming: {
    kicker: "One semantic pipeline",
    title: "Change the brand, keep the component contract",
    body: "Your brand choices map to semantic roles. Every Brick component consumes those roles without needing a new recipe.",
  },
  accessibility: {
    kicker: "Shared responsibility",
    title: "A complete experience has three owners",
    body: "Atom supplies the mechanism, Brick makes states visible, and your application supplies the meaning users actually need.",
  },
  composition: {
    kicker: "Clear product boundaries",
    title: "Compose outward from stable public parts",
    body: "Brick owns finished components. Layout arranges them. Your application connects those surfaces to real product behavior.",
  },
} as const;

export function GuideVisual({ slug }: { slug: keyof typeof guideCopy }) {
  const copy = guideCopy[slug];

  return (
    <section className={`guide-visual guide-visual--${slug}`} id="guide-map" aria-labelledby="guide-map-title">
      <header className="guide-visual-heading">
        <span>{copy.kicker}</span>
        <Text as="h2" id="guide-map-title" variant="title-lg" wrap="balance">{copy.title}</Text>
        <Text tone="secondary">{copy.body}</Text>
      </header>

      {slug === "getting-started" ? <GettingStartedMap /> : null}
      {slug === "theming" ? <ThemeMap /> : null}
      {slug === "accessibility" ? <AccessibilityMap /> : null}
      {slug === "composition" ? <CompositionMap /> : null}
    </section>
  );
}

function GettingStartedMap() {
  const steps = [
    { icon: PackageCheck, label: "Install", detail: "One npm package" },
    { icon: SwatchBook, label: "Load styles", detail: "Static CSS once" },
    { icon: AppWindow, label: "Compose", detail: "Public React parts" },
  ];
  return (
    <>
      <ol className="guide-setup-track">
        {steps.map(({ icon: Icon, label, detail }, index) => (
          <li key={label}>
            <span className="guide-step-number">0{index + 1}</span>
            <span className="guide-step-icon"><Icon size={18} aria-hidden="true" /></span>
            <strong>{label}</strong>
            <small>{detail}</small>
          </li>
        ))}
      </ol>
      <div className="guide-proof-row" role="group" aria-label="Brick setup qualities">
        <Badge tone="neutral" variant="outline"><Check size={13} aria-hidden="true" />No provider required</Badge>
        <Badge tone="neutral" variant="outline"><Check size={13} aria-hidden="true" />React 18 and 19</Badge>
        <Badge tone="neutral" variant="outline"><Check size={13} aria-hidden="true" />Tree-shakable exports</Badge>
      </div>
    </>
  );
}

function ThemeMap() {
  return (
    <div className="guide-theme-map">
      <div className="guide-theme-input">
        <span className="guide-map-label">Brand choices</span>
        <div className="guide-swatch-row" role="img" aria-label="Example purple, lavender, and warm neutral brand palette">
          <i className="guide-swatch guide-swatch--one" /><i className="guide-swatch guide-swatch--two" /><i className="guide-swatch guide-swatch--three" />
        </div>
        <span><Type size={15} aria-hidden="true" />Type</span>
        <span><CircleDot size={15} aria-hidden="true" />Shape</span>
      </div>
      <div className="guide-theme-roles">
        <span className="guide-map-label">Semantic roles</span>
        <code>accent-solid</code><code>surface-canvas</code><code>text-primary</code><code>radius-control</code>
      </div>
      <Card.Root className="guide-theme-output" variant="elevated">
        <Card.Header><span className="guide-map-label">Stable output</span><Card.Title as="h3">Project ready</Card.Title><Card.Description>Same anatomy, your visual language.</Card.Description></Card.Header>
        <Card.Footer><span className="guide-output-status"><Check size={14} aria-hidden="true" />Ready to publish</span></Card.Footer>
      </Card.Root>
    </div>
  );
}

function AccessibilityMap() {
  const owners = [
    { icon: CircleDot, label: "Atom", title: "Mechanism", items: ["Keyboard behavior", "Focus and ARIA", "State contracts"] },
    { icon: ShieldCheck, label: "Brick", title: "Visible states", items: ["Focus appearance", "Invalid and selected", "Motion alternatives"] },
    { icon: MousePointer2, label: "Your app", title: "Meaning", items: ["Useful labels", "Heading structure", "Clear feedback"] },
  ];
  return (
    <div className="guide-a11y-map">
      {owners.map(({ icon: Icon, label, title, items }) => (
        <article key={label}>
          <span className="guide-owner-icon"><Icon size={18} aria-hidden="true" /></span>
          <small>{label}</small>
          <strong>{title}</strong>
          <ul>{items.map((item) => <li key={item}><Check size={13} aria-hidden="true" />{item}</li>)}</ul>
        </article>
      ))}
      <div className="guide-a11y-result"><Accessibility size={18} aria-hidden="true" /><strong>Complete experience</strong><span>Test the three together.</span></div>
    </div>
  );
}

function CompositionMap() {
  return (
    <div className="guide-composition-map">
      <div className="guide-composition-frame" role="img" aria-label="Application contains layout, which composes public Brick parts backed by Atom behavior">
        <span><AppWindow size={15} aria-hidden="true" />Application</span>
        <div className="guide-composition-layout">
          <span><Layers3 size={15} aria-hidden="true" />Layout</span>
          <div className="guide-composition-parts">
            <span><Boxes size={15} aria-hidden="true" />Brick parts</span>
            <i>Header</i><i>Content</i><i>Actions</i>
          </div>
        </div>
      </div>
      <div className="guide-boundary-list">
        <span className="guide-map-label">Keep the seams explicit</span>
        <p><Palette size={16} aria-hidden="true" /><span><strong>Brick</strong> owns finished visual recipes.</span></p>
        <p><Braces size={16} aria-hidden="true" /><span><strong>Your app</strong> owns routes, data, and workflows.</span></p>
        <p><Layers3 size={16} aria-hidden="true" /><span><strong>Blocks</strong> begin only after a pattern repeats.</span></p>
      </div>
    </div>
  );
}
