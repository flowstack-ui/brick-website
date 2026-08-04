import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Code } from "@flowstack-ui/brick/code";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";
import { ComponentPreview } from "@/app/components/ComponentPreview";
import { DocsShell } from "@/app/components/DocsShell";
import { MarkdownArticle } from "@/app/components/MarkdownArticle";
import { componentBySlug, componentDoc, components, source } from "@/app/lib/content";
import { extractMarkdownToc } from "@/app/lib/toc";

export function generateStaticParams() {
  return components.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const component = componentBySlug(slug);
  if (!component) return {};
  return { title: component.title, description: component.description };
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = componentBySlug(slug);
  const markdown = componentDoc(slug);
  if (!component || !markdown) notFound();
  const index = components.findIndex((entry) => entry.slug === slug);
  const previous = components[index - 1];
  const next = components[index + 1];
  return (
    <DocsShell current="components" toc={[{ id: "live-example", label: "Live example" }, ...extractMarkdownToc(markdown)]}>
      <article className="docs-article component-doc">
        <div className="component-kicker"><Badge tone="accent" variant="soft">{component.category}</Badge><span>Brick {source.version}</span></div>
        <Text as="h1" className="page-title">{component.title}</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">{component.description}</Text>
        <div className="component-install"><Code variant="subtle">import {'{'} {component.title.replaceAll(" ", "")} {'}'} from &quot;@flowstack-ui/brick&quot;;</Code></div>
        <section className="live-example" id="live-example" aria-labelledby="live-example-title">
          <div className="example-header"><div><span>Live example</span><Text as="h2" id="live-example-title" variant="title-sm">Built from the published package</Text></div><Badge tone="success" variant="outline">Interactive</Badge></div>
          <div className="example-canvas"><ComponentPreview slug={component.slug} /></div>
        </section>
        <div><MarkdownArticle markdown={markdown} componentSlug={slug} /></div>
        <div className="component-source-link">
          <WebsiteButton href={`https://github.com/flowstack-ui/brick/tree/main/docs/components/${slug}`} target="_blank" rel="noreferrer" tone="neutral" variant="outline" startIcon={<Code2 size={15} />}>View source documentation</WebsiteButton>
        </div>
        <nav className="component-pagination" aria-label="Component pages">
          {previous ? <a href={`/components/${previous.slug}/`}><ArrowLeft size={15} /><span><small>Previous</small>{previous.title}</span></a> : <span />}
          {next ? <a href={`/components/${next.slug}/`}><span><small>Next</small>{next.title}</span><ArrowRight size={15} /></a> : <span />}
        </nav>
      </article>
    </DocsShell>
  );
}
