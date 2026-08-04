"use client";

import { HStack } from "@flowstack-ui/brick/stack";
import { Switch } from "@flowstack-ui/brick/switch";
import { Text } from "@flowstack-ui/brick/text";

export default function SwitchPreview() {
  return <HStack gap="3" align="center"><Switch.Root aria-label="Weekly reports" defaultChecked><Switch.Thumb /></Switch.Root><Text>Weekly reports</Text></HStack>;
}
