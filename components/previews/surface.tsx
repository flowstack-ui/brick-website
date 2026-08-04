"use client";

import "../../app/.generated/previews/surface.css";

import { HStack } from "@flowstack-ui/brick/stack";
import { Surface } from "@flowstack-ui/brick/surface";

export default function SurfacePreview() {
  return <HStack gap="3" wrap><Surface bordered inset="md" level="base">Base</Surface><Surface bordered inset="md" level="subtle">Subtle</Surface><Surface bordered inset="md" level="raised">Raised</Surface></HStack>;
}
