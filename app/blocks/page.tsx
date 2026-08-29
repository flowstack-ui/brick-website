import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Heading, Paragraph, Text } from "@flowstack-ui/brick/text";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { StructuredData } from "@/app/components/StructuredData";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { blocks } from "@/app/lib/blocks";
import { breadcrumbStructuredData, createPageMetadata } from "@/app/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Brick Blocks",
  description: "Preview paid, editable interface compositions made entirely from Brick components.",
  path: "/blocks",
});

export default function BlocksCatalogPage() {
  return (
    <>
      <StructuredData data={breadcrumbStructuredData([
        { name: "Brick", path: "/" },
        { name: "Blocks", path: "/blocks" },
      ])} />
      <main id="main-content" className="blocks-page section-shell">
        <header className="blocks-hero">
          <Badge tone="accent" variant="soft">Built with Brick</Badge>
          <Heading level={1} variant={{ initial: "display-sm", sm: "display-md", lg: "display-lg" }} wrap="balance">Start from a complete interface, then make the source yours.</Heading>
          <Paragraph tone="secondary" variant="body-lg" wrap="pretty">
            Blocks are paid, editable React compositions assembled from Brick’s public components. Preview the finished result here; source and installation unlock only with an active lifetime entitlement.
          </Paragraph>
          <HStack gap="2" wrap>
            <Badge tone="neutral" variant="outline">Individual lifetime access</Badge>
            <Badge tone="neutral" variant="outline">Team lifetime access</Badge>
          </HStack>
        </header>

        <section aria-labelledby="blocks-catalog-title" className="blocks-catalog">
          <VStack align="start" gap="2" className="blocks-section-heading">
            <Text tone="accent" variant="eyebrow">Live catalog</Text>
            <Heading id="blocks-catalog-title" level={2} variant="display-sm">See the composition before you buy.</Heading>
          </VStack>
          <Grid.Root columns={{ initial: 1, lg: 2 }} gap="5">
            {blocks.map((block) => (
              <Card.Root className="block-catalog-card" key={block.id} variant="outline">
                <div className="block-catalog-preview" aria-hidden="true">
                  <iframe
                    loading="lazy"
                    sandbox="allow-scripts"
                    src={block.preview.src}
                    tabIndex={-1}
                    title=""
                  />
                </div>
                <Card.Header>
                  <HStack gap="2" wrap>
                    <Badge tone="accent" variant="soft">Paid</Badge>
                    <Badge tone="neutral" variant="outline">Lifetime</Badge>
                  </HStack>
                  <Card.Title as="h3">{block.name}</Card.Title>
                  <Card.Description>{block.description}</Card.Description>
                </Card.Header>
                <Card.Footer>
                  <WebsiteButton href={`/blocks/${block.slug}`} endIcon={<ArrowRight size={16} />}>
                    View live preview
                  </WebsiteButton>
                  <span className="block-locked-note"><LockKeyhole size={14} aria-hidden="true" /> Source locked</span>
                </Card.Footer>
              </Card.Root>
            ))}
          </Grid.Root>
        </section>
      </main>
    </>
  );
}
