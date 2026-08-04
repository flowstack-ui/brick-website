"use client";

import { Container } from "@flowstack-ui/brick/container";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

export default function ContainerPreview() {
  return <Container measure="narrow"><Surface bordered inset="md"><Text as="h3" variant="title-sm">A centered, bounded content region</Text></Surface></Container>;
}
