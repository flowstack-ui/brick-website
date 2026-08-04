"use client";

import "../../app/.generated/previews/stack.css";

import { Button } from "@flowstack-ui/brick/button";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function StackPreview() {
  return <VStack gap="3"><Text as="h3" variant="title-md">Account settings</Text><Text tone="secondary">Manage your workspace details.</Text><HStack gap="2" wrap><Button>Save changes</Button><Button tone="neutral" variant="outline">Cancel</Button></HStack></VStack>;
}
