import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Heading, Paragraph, Text } from "@flowstack-ui/brick/text";
import { Check, LockKeyhole } from "lucide-react";
import { StructuredData } from "@/app/components/StructuredData";
import { blockBySlug } from "@/app/lib/blocks";
import { breadcrumbStructuredData, createPageMetadata } from "@/app/lib/seo";

const slug = "application/feed/threaded-comments";
const block = blockBySlug(slug);

export const metadata: Metadata = createPageMetadata({
  title: "Threaded Comments Feed Block",
  description: "Preview the paid Threaded Comments Feed composition built entirely with Brick components.",
  path: `/blocks/${slug}`,
});

export default function ThreadedCommentsBlockPage() {
  if (!block) notFound();

  return (
    <>
      <StructuredData data={breadcrumbStructuredData([
        { name: "Brick", path: "/" },
        { name: "Blocks", path: "/blocks" },
        { name: block.name, path: `/blocks/${block.slug}` },
      ])} />
      <main id="main-content" className="block-detail-page section-shell">
        <header className="block-detail-header">
          <VStack align="start" gap="4">
            <HStack gap="2" wrap>
              <Badge tone="accent" variant="soft">Paid Block</Badge>
              <Badge tone="neutral" variant="outline">Lifetime license</Badge>
            </HStack>
            <Heading level={1} variant="display-lg" wrap="balance">{block.name}</Heading>
            <Paragraph tone="secondary" variant="body-lg" wrap="pretty">{block.description}</Paragraph>
          </VStack>
          <Card.Root className="block-access-card" variant="elevated">
            <Card.Header>
              <span className="block-access-icon"><LockKeyhole aria-hidden="true" /></span>
              <Card.Title as="h2">Source is locked</Card.Title>
              <Card.Description>
                The live compiled preview is public. Editable source and its install command require an active individual or team entitlement.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <ul className="block-access-list">
                <li><Check size={15} aria-hidden="true" /> Lifetime access</li>
                <li><Check size={15} aria-hidden="true" /> Individual or team ownership</li>
                <li><Check size={15} aria-hidden="true" /> Consumer-owned React source</li>
              </ul>
            </Card.Content>
            <Card.Footer className="block-access-actions">
              <Button disabled fullWidth>Purchase access — coming soon</Button>
              <Button disabled fullWidth tone="neutral" variant="soft">Sign in to unlock — coming soon</Button>
            </Card.Footer>
          </Card.Root>
        </header>

        <section aria-labelledby="threaded-comments-preview-title" className="block-live-preview">
          <div className="block-preview-heading">
            <div>
              <Text tone="accent" variant="eyebrow">Compiled live preview</Text>
              <Heading id="threaded-comments-preview-title" level={2} variant="display-sm">Follow the parent-and-reply relationship.</Heading>
            </div>
            <Badge tone="success" variant="soft">No source map</Badge>
          </div>
          <div className="block-preview-frame">
            <iframe
              loading="eager"
              sandbox="allow-scripts"
              src={block.preview.src}
              title={`${block.name} live preview`}
            />
          </div>
          <Paragraph className="block-preview-note" tone="secondary" variant="body-sm">
            This sandbox contains a reviewed compiled artifact only. The installable files, item guidance, source text, and installation token are not part of this public website.
          </Paragraph>
        </section>
      </main>
    </>
  );
}
