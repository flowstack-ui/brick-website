"use client";

import "../../app/.generated/previews/link-box.css";

import { Button } from "@flowstack-ui/brick/button";
import { LinkBox } from "@flowstack-ui/brick/link-box";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function LinkBoxPreview() {
  return <LinkBox.Root as="article"><VStack align="start" gap="3"><Text as="h3" variant="title-md"><LinkBox.Link href="/docs/getting-started">Build with Brick</LinkBox.Link></Text><Text tone="secondary">Open the installation guide, or keep a secondary action independently interactive.</Text><LinkBox.Action><HStack><Button size="sm" tone="neutral" variant="outline">Save for later</Button></HStack></LinkBox.Action></VStack></LinkBox.Root>;
}
