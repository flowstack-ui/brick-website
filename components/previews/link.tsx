"use client";

import "../../app/.generated/previews/link.css";

import { Link } from "@flowstack-ui/brick/link";
import { HStack } from "@flowstack-ui/brick/stack";

export default function LinkPreview() {
  return <HStack gap="4" wrap><Link href="/docs">Read the guides</Link><Link href="/components" variant="plain">Browse components</Link></HStack>;
}
