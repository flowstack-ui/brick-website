"use client";

import "../../app/.generated/previews/section.css";

import { Section } from "@flowstack-ui/brick/section";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

export default function SectionPreview() {
  return <Surface bordered level="raised"><Section spacing={{ initial: "md", lg: "lg" }}><Text as="h3" variant="title-md">Responsive section rhythm</Text><Text tone="secondary">The region owns block spacing while its parent owns paint.</Text></Section></Surface>;
}
