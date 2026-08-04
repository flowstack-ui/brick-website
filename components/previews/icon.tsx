"use client";

import { Icon } from "@flowstack-ui/brick/icon";
import { HStack } from "@flowstack-ui/brick/stack";
import { Bell, Check, Star } from "lucide-react";

export default function IconPreview() {
  return <HStack gap="4"><Icon tone="success" size="lg"><Check /></Icon><Icon tone="accent" size="lg"><Star /></Icon><Icon size="lg"><Bell /></Icon></HStack>;
}
