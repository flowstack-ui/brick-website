"use client";

import "../../app/.generated/previews/em.css";

import { Em } from "@flowstack-ui/brick/em";
import { Text } from "@flowstack-ui/brick/text";

export default function EmPreview() {
  return <Text as="p" variant="body-lg">Review this <Em>before</Em> publishing the release.</Text>;
}
