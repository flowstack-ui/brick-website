"use client";

import "../../app/.generated/previews/badge.css";

import { Badge } from "@flowstack-ui/brick/badge";
import { HStack } from "@flowstack-ui/brick/stack";

export default function BadgePreview() {
  return <HStack gap="2" wrap><Badge>Draft</Badge><Badge tone="success">Ready</Badge><Badge tone="accent" variant="outline">Brick</Badge></HStack>;
}
