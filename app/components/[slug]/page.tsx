import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { Code } from "@flowstack-ui/brick/code";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ComponentBreadcrumb } from "@/app/components/ComponentBreadcrumb";
import { ComponentDocument } from "@/app/components/ComponentDocument";
import { ComponentExampleCanvas } from "@/app/components/ComponentExampleCanvas";
import { DocsShell } from "@/app/components/DocsShell";
import { componentBySlug, componentDoc, components, source } from "@/app/lib/content";
import { componentDocToc, consumerComponentMarkdown } from "@/app/lib/component-docs";

function categoryId(category: string) {
  return category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

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
  const consumerMarkdown = consumerComponentMarkdown(markdown);
  const categoryComponents = components.filter((entry) => entry.category === component.category);
  const index = categoryComponents.findIndex((entry) => entry.slug === slug);
  const previous = categoryComponents[index - 1];
  const next = categoryComponents[index + 1];
  return (
    <DocsShell componentSlug={slug} current="components" toc={componentDocToc(consumerMarkdown)}>
      <article className="docs-article component-doc">
        <ComponentBreadcrumb category={component.category} categoryHref={`/components/#${categoryId(component.category)}`} title={component.title} />
        <div className="component-kicker"><Badge tone="accent" variant="soft">{component.category}</Badge><span>Brick {source.version}</span></div>
        <Text as="h1" className="page-title">{component.title}</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">{component.description}</Text>
        <div className="component-install"><Code variant="subtle">import {'{'} {component.title.replaceAll(" ", "")} {'}'} from &quot;@flowstack-ui/brick&quot;;</Code></div>
        <section className="live-example" id="live-example" aria-labelledby="live-example-title">
          <div className="example-header"><div><span>Live example</span><Text as="h2" id="live-example-title" variant="title-sm">Built from the published package</Text></div><Badge tone="success" variant="outline">Interactive</Badge></div>
          <ComponentExampleCanvas slug={component.slug} />
        </section>
        <ComponentDocument componentSlug={slug} componentTitle={component.title} markdown={consumerMarkdown} />
        <nav className="component-pagination" aria-label={`${component.category} component pages`}>
          {previous ? <a href={`/components/${previous.slug}/`}><ArrowLeft size={15} /><span><small>Previous</small>{previous.title}</span></a> : <span />}
          <a className="component-category-return" href={`/components/#${categoryId(component.category)}`}><span><small>Back to category</small><strong>{component.category}</strong></span></a>
          {next ? <a href={`/components/${next.slug}/`}><span><small>Next</small>{next.title}</span><ArrowRight size={15} /></a> : <span />}
        </nav>
      </article>
    </DocsShell>
  );
}
