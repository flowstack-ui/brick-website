"use client";

import { VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function TextPreview() {
  return <VStack gap="2"><Text as="h3" variant="title-md">Account settings</Text><Text tone="secondary">Manage the details used across your workspace.</Text><Text variant="body-sm" tone="muted">Last updated today</Text></VStack>;
}
