"use client";

import type { ReactNode } from "react";
import { Accordion } from "@flowstack-ui/brick/accordion";

export function ComponentAdvancedDisclosure({ items }: { items: { content: ReactNode; id: string; title: string }[] }) {
  return (
    <Accordion.Root size="md" type="multiple" variant="outline">
      {items.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Header as="h3"><Accordion.Trigger>{item.title}<Accordion.Indicator /></Accordion.Trigger></Accordion.Header>
          <Accordion.Content landmark={false}><Accordion.ContentInner>{item.content}</Accordion.ContentInner></Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
