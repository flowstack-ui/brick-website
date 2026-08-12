"use client";

import "../../app/.generated/previews/frame.css";

import { Frame } from "@flowstack-ui/brick/frame";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

export default function FramePreview() {
  return <Frame maxInlineSize={{ initial: "100%", lg: "48ch" }}><Surface bordered inset="lg"><Text as="h3" variant="title-sm">A readable local measure</Text><Text tone="secondary">Frame constrains this content without taking over paint or child layout.</Text></Surface></Frame>;
}
