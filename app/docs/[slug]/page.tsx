import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight } from "lucide-react";
import { DocsShell } from "@/app/components/DocsShell";
import { MarkdownArticle } from "@/app/components/MarkdownArticle";
import { guideBySlug, guides } from "@/app/lib/content";
import { extractMarkdownToc } from "@/app/lib/toc";

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();
  return (
    <DocsShell current={slug} toc={[...extractMarkdownToc(guide.body), { id: "continue-with-catalog", label: "Continue with the catalog" }]}>
      <article className="docs-article">
        <Badge tone="accent" variant="soft">{guide.eyebrow}</Badge>
        <Text as="h1" className="page-title" wrap="balance">{guide.title}</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">{guide.description}</Text>
        <div><MarkdownArticle markdown={guide.body} /></div>
        <section className="docs-next" id="continue-with-catalog">
          <Text as="h2" variant="title-md">Continue with the catalog</Text>
          <Text tone="secondary">See these principles expressed through real component APIs and examples.</Text>
          <WebsiteButton href="/components/" endIcon={<ArrowRight size={15} />}>Browse components</WebsiteButton>
        </section>
      </article>
    </DocsShell>
  );
}
