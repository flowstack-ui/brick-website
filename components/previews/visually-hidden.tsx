"use client";

import "../../app/.generated/previews/visually-hidden.css";

import { IconButton } from "@flowstack-ui/brick/icon-button";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import { VisuallyHidden } from "@flowstack-ui/brick/visually-hidden";
import { Search } from "lucide-react";

export default function VisuallyHiddenPreview() {
  return <HStack gap="3" align="center"><IconButton aria-label="Search"><Search /><VisuallyHidden.Root>Search</VisuallyHidden.Root></IconButton><Text tone="secondary">The button includes a visually hidden text label.</Text></HStack>;
}
