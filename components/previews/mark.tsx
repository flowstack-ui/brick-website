"use client";

import "../../app/.generated/previews/mark.css";

import { Mark } from "@flowstack-ui/brick/mark";
import { Text } from "@flowstack-ui/brick/text";

export default function MarkPreview() {
  return <Text as="p" variant="body-lg">The review found <Mark>zero critical issues</Mark> in the release candidate.</Text>;
}
