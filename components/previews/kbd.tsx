"use client";

import "../../app/.generated/previews/kbd.css";

import { Kbd } from "@flowstack-ui/brick/kbd";
import { Text } from "@flowstack-ui/brick/text";

export default function KbdPreview() {
  return <Text as="p" variant="body-lg">Press <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> to open commands.</Text>;
}
