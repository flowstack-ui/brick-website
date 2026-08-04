"use client";

import { HStack } from "@flowstack-ui/brick/stack";
import { Toggle } from "@flowstack-ui/brick/toggle";
import { Bell, Star } from "lucide-react";

export default function TogglePreview() {
  return <HStack gap="2"><Toggle aria-label="Favorite" defaultPressed><Star /> Favorite</Toggle><Toggle aria-label="Notifications"><Bell /> Alerts</Toggle></HStack>;
}
