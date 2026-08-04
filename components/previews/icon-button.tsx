"use client";

import "../../app/.generated/previews/icon-button.css";

import { IconButton } from "@flowstack-ui/brick/icon-button";
import { HStack } from "@flowstack-ui/brick/stack";
import { Bell, Menu, Search } from "lucide-react";

export default function IconButtonPreview() {
  return <HStack gap="2"><IconButton aria-label="Search workspace"><Search /></IconButton><IconButton aria-label="Notifications" variant="outline"><Bell /></IconButton><IconButton aria-label="Open menu" variant="ghost"><Menu /></IconButton></HStack>;
}
