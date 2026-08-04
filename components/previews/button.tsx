"use client";

import { Button } from "@flowstack-ui/brick/button";
import { HStack } from "@flowstack-ui/brick/stack";

export default function ButtonPreview() {
  return <HStack gap="3" wrap><Button>Save changes</Button><Button tone="neutral" variant="outline">Cancel</Button><Button variant="ghost">Learn more</Button></HStack>;
}
