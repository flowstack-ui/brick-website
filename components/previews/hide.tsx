"use client";

import "../../app/.generated/previews/hide.css";

import { Badge } from "@flowstack-ui/brick/badge";
import { Hide } from "@flowstack-ui/brick/hide";
import { VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function HidePreview() {
  return <VStack gap="3"><Hide from="md"><Badge tone="accent">Visible below md</Badge></Hide><Text tone="secondary" variant="body-sm">Resize the viewport to see Hide respond.</Text></VStack>;
}
