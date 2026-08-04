"use client";

import "../../app/.generated/previews/show.css";

import { Badge } from "@flowstack-ui/brick/badge";
import { Show } from "@flowstack-ui/brick/show";
import { VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function ShowPreview() {
  return <VStack gap="3"><Show from="md"><Badge tone="success">Visible from md</Badge></Show><Text tone="secondary" variant="body-sm">Resize the viewport to see Show respond.</Text></VStack>;
}
