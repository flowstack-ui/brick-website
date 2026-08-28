"use client";

import "../../app/.generated/previews/status.css";

import { HStack } from "@flowstack-ui/brick/stack";
import { Status } from "@flowstack-ui/brick/status";

export default function StatusPreview() {
  return <HStack gap="5" wrap><Status.Root tone="success"><Status.Indicator /><Status.Label>Available</Status.Label></Status.Root><Status.Root tone="warning"><Status.Indicator /><Status.Label>Needs review</Status.Label></Status.Root><Status.Root tone="danger"><Status.Indicator /><Status.Label>Blocked</Status.Label></Status.Root></HStack>;
}
