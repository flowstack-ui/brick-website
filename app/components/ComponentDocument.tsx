import { Card } from "@flowstack-ui/brick/card";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowUpRight, CheckCircle2, Code2, GitBranch, Route, ShieldCheck } from "lucide-react";
import { ComponentAdvancedDisclosure } from "@/app/components/ComponentAdvancedDisclosure";
import { MarkdownArticle } from "@/app/components/MarkdownArticle";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { structureComponentDoc, type ComponentDocSection } from "@/app/lib/component-docs";

function SectionBody({ comfortableTable = false, componentSlug, section }: { comfortableTable?: boolean; componentSlug: string; section: ComponentDocSection }) {
  return <MarkdownArticle bodyOnly codeLabelPrefix={`${componentSlug} ${section.id}`} componentSlug={componentSlug} markdown={section.body} tableDensity={comfortableTable ? "comfortable" : "compact"} tableSize={comfortableTable ? "md" : "sm"} />;
}

function StandardSection({ componentSlug, section }: { componentSlug: string; section?: ComponentDocSection }) {
  if (!section) return null;
  return (
    <section className="component-doc-section" id={section.id}>
      <Text as="h2" variant="title-lg">{section.title}</Text>
      <SectionBody componentSlug={componentSlug} section={section} />
    </section>
  );
}

export function ComponentDocument({ componentSlug, componentTitle, markdown }: { componentSlug: string; componentTitle: string; markdown: string }) {
  const { advanced, sections } = structureComponentDoc(markdown);
  const useSection = sections.get("When and where to use");
  const avoidSection = sections.get("When not to use");
  const customization = sections.get("Customization");
  const tokens = sections.get("Tokens and CSS hooks");

  return (
    <div className="component-document">
      {(useSection || avoidSection) && (
        <section className="component-doc-section component-guidance" id="choose-this-component">
          <div className="component-section-heading">
            <span>Choose with confidence</span>
            <Text as="h2" variant="title-lg">Know when {componentTitle} is the right part</Text>
          </div>
          <div className="component-guidance-list">
            {useSection && (
              <article className="component-guidance-item">
                <div className="component-guidance-item-heading"><span><CheckCircle2 size={18} aria-hidden="true" /></span><Text as="h3" variant="title-sm">Use it when</Text></div>
                <SectionBody componentSlug={componentSlug} section={useSection} />
              </article>
            )}
            {avoidSection && (
              <article className="component-guidance-item component-guidance-item--alternate">
                <div className="component-guidance-item-heading"><span><Route size={18} aria-hidden="true" /></span><Text as="h3" variant="title-sm">Choose another path when</Text></div>
                <SectionBody componentSlug={componentSlug} section={avoidSection} />
              </article>
            )}
          </div>
        </section>
      )}

      <StandardSection componentSlug={componentSlug} section={sections.get("Installation and imports")} />
      <StandardSection componentSlug={componentSlug} section={sections.get("Quick start")} />
      <StandardSection componentSlug={componentSlug} section={sections.get("Visual recipes and states")} />
      <StandardSection componentSlug={componentSlug} section={sections.get("Examples")} />
      {sections.get("API") && (
        <section className="component-doc-section component-api" id="api">
          <div className="component-section-heading">
            <span>Public contract</span>
            <Text as="h2" variant="title-lg">API</Text>
            <Text as="p" className="component-section-description" tone="secondary">Start with the public parts and root options below. Components with multiple parts separate each area into its own named subsection.</Text>
          </div>
          <SectionBody comfortableTable componentSlug={componentSlug} section={sections.get("API")!} />
        </section>
      )}

      {sections.get("Accessibility") && (
        <section className="component-doc-section component-accessibility" id="accessibility">
          <div className="component-accessibility-heading"><span><ShieldCheck size={20} aria-hidden="true" /></span><div><small>Shared responsibility</small><Text as="h2" variant="title-lg">Accessibility</Text></div></div>
          <SectionBody componentSlug={componentSlug} section={sections.get("Accessibility")!} />
        </section>
      )}

      <StandardSection componentSlug={componentSlug} section={sections.get("Responsive behavior")} />

      {(customization || tokens) && (
        <section className="component-doc-section component-styling" id="styling-and-tokens">
          <div className="component-section-heading">
            <span>Stable visual contract</span>
            <Text as="h2" variant="title-lg">Styling and tokens</Text>
          </div>
          {customization && <div className="component-styling-part"><Text as="h3" variant="title-md">Customization</Text><SectionBody componentSlug={componentSlug} section={customization} /></div>}
          {tokens && <div className="component-styling-part"><Text as="h3" variant="title-md">Tokens and CSS hooks</Text><SectionBody componentSlug={componentSlug} section={tokens} /></div>}
        </section>
      )}

      {advanced.length > 0 && (
        <section className="component-doc-section component-advanced" id="advanced-reference">
          <div className="component-section-heading component-advanced-heading">
            <Text as="h2" variant="title-lg">Advanced reference</Text>
            <Text as="p" tone="secondary">Open these details only when you need to inspect DOM ownership, native forwarding, or lower-level composition.</Text>
          </div>
          <ComponentAdvancedDisclosure items={advanced.map((section) => ({
            content: <SectionBody componentSlug={componentSlug} section={section} />,
            id: section.id,
            title: section.title,
          }))} />
        </section>
      )}

      <section className="component-doc-section component-maintainer" id="maintainer-resources">
        <Card.Root as="article" size="md" variant="outline">
          <Card.Header><div><span className="component-maintainer-icon"><GitBranch size={18} aria-hidden="true" /></span><Card.Title as="h2">Maintainer resources</Card.Title></div></Card.Header>
          <Card.Content><Text tone="secondary">Tests, playground evidence, source notes, and release history remain available without crowding the plug-and-play guide.</Text></Card.Content>
          <Card.Footer className="component-maintainer-actions">
            <WebsiteButton href={`https://github.com/flowstack-ui/brick/tree/main/docs/components/${componentSlug}`} target="_blank" rel="noreferrer" tone="neutral" variant="soft" startIcon={<Code2 size={15} aria-hidden="true" />}>Source docs</WebsiteButton>
            <WebsiteButton href={`https://github.com/flowstack-ui/brick/blob/main/docs/components/${componentSlug}/CHANGELOG.md`} target="_blank" rel="noreferrer" tone="neutral" variant="ghost" endIcon={<ArrowUpRight size={15} aria-hidden="true" />}>Changelog</WebsiteButton>
            <WebsiteButton href={`https://github.com/flowstack-ui/brick/tree/main/playground/src/components/${componentSlug}`} target="_blank" rel="noreferrer" tone="neutral" variant="ghost" endIcon={<ArrowUpRight size={15} aria-hidden="true" />}>Playground</WebsiteButton>
          </Card.Footer>
        </Card.Root>
      </section>
    </div>
  );
}
