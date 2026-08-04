"use client";

import { Chip } from "@flowstack-ui/brick/chip";
import { HStack } from "@flowstack-ui/brick/stack";

export default function ChipPreview() {
  return <HStack gap="2" wrap><Chip.Root><Chip.Label>Riley Chen</Chip.Label><Chip.RemoveTrigger ariaLabel="Remove Riley Chen" /></Chip.Root><Chip.Root tone="accent"><Chip.Label>Design system</Chip.Label></Chip.Root></HStack>;
}
