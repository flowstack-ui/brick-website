"use client";

import "../../app/.generated/previews/appearance.css";

import { Appearance } from "@flowstack-ui/brick/appearance";
import { Card } from "@flowstack-ui/brick/card";

export default function AppearancePreview() {
  return (
    <Appearance value="dark">
      <Card.Root variant="elevated">
        <Card.Header>
          <Card.Title as="h3">Night review</Card.Title>
          <Card.Description>One existing host owns this explicit dark appearance.</Card.Description>
        </Card.Header>
      </Card.Root>
    </Appearance>
  );
}
