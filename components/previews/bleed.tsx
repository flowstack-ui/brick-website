"use client";

import "../../app/.generated/previews/bleed.css";

import { Bleed } from "@flowstack-ui/brick/bleed";
import { Stack } from "@flowstack-ui/brick/stack";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

export default function BleedPreview() {
  return <Surface bordered inset="lg"><Stack gap="4"><Text as="h3" variant="title-md">Release story</Text><Text tone="secondary">The parent keeps its reading inset while selected artwork reaches the edge.</Text><Bleed inline={6} blockEnd={6}><Surface aria-label="Edge-to-edge color study" inset="lg" tone="accent"><Text>Edge media</Text></Surface></Bleed></Stack></Surface>;
}
