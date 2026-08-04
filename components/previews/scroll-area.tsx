"use client";

import "../../app/.generated/previews/scroll-area.css";

import { ScrollArea } from "@flowstack-ui/brick/scroll-area";
import { VStack } from "@flowstack-ui/brick/stack";
import { Surface } from "@flowstack-ui/brick/surface";

export default function ScrollAreaPreview() {
  return <ScrollArea.Root className="preview-scroll-area"><ScrollArea.Viewport aria-label="Recent activity" focusable><VStack gap="3">{["Published Brick 0.1.0", "Updated component docs", "Verified theme tokens", "Ran browser checks", "Prepared release notes"].map(item => <Surface inset="sm" level="subtle" key={item}>{item}</Surface>)}</VStack></ScrollArea.Viewport></ScrollArea.Root>;
}
