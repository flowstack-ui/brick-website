import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight } from "lucide-react";
import { DocsShell } from "@/app/components/DocsShell";
import { categories, components } from "@/app/lib/content";

export const metadata: Metadata = { title: "Components", description: "Explore all 75 finished Brick component owners." };

function categoryId(category: string) {
  return category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

export default function ComponentsPage() {
  return (
    <DocsShell current="components" toc={categories.map((category) => ({ id: categoryId(category), label: category }))}>
      <div className="catalog-page">
        <Badge tone="accent" variant="soft">75 component owners</Badge>
        <Text as="h1" className="page-title" wrap="balance">The complete Brick catalog</Text>
        <Text as="p" variant="body-lg" tone="secondary" className="page-lede">From compact actions to full application shells, every component is documented, responsive, and built on published Atom behavior.</Text>
        <div className="catalog-groups" id="details">
          {categories.map((category) => (
            <section key={category} id={categoryId(category)} className="catalog-group">
              <div className="catalog-group-heading">
                <Text as="h2" variant="title-lg">{category}</Text>
                <Badge tone="neutral" variant="outline">{components.filter((component) => component.category === category).length}</Badge>
              </div>
              <Grid.Root columns={2} gap="3" className="component-card-grid">
                {components.filter((component) => component.category === category).map((component) => (
                  <Card.Root key={component.slug} as="article" size="sm" variant="outline" className="component-card">
                    <Card.Header>
                      <Card.Title as="h3">{component.title}</Card.Title>
                      <Card.Action><ArrowRight size={16} aria-hidden="true" /></Card.Action>
                    </Card.Header>
                    <Card.Content><Text variant="body-sm" tone="secondary" lineClamp={3}>{component.description}</Text></Card.Content>
                    <a className="card-cover-link" href={`/components/${component.slug}/`} aria-label={`Open ${component.title} documentation`} />
                  </Card.Root>
                ))}
              </Grid.Root>
            </section>
          ))}
        </div>
      </div>
    </DocsShell>
  );
}
