"use client";

import "../../app/.generated/previews/z-stack.css";

import { Badge } from "@flowstack-ui/brick/badge";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";
import { ZStack } from "@flowstack-ui/brick/z-stack";

export default function ZStackPreview() {
  return (
    <ZStack.Root align="center" justify="center">
      <Surface bordered inset="lg" level="raised"><Text as="h3" variant="title-md">Layered campaign</Text><Text tone="secondary">Authored layers share one grid cell.</Text></Surface>
      <ZStack.Item align="start" justify="end"><Badge tone="accent" variant="solid">New</Badge></ZStack.Item>
    </ZStack.Root>
  );
}
