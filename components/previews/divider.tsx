"use client";

import { Divider } from "@flowstack-ui/brick/divider";
import { VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function DividerPreview() {
  return <VStack gap="4"><Text>Current workspace</Text><Divider /><Text tone="secondary">Archived workspace</Text></VStack>;
}
