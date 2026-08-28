"use client";

import "../../app/.generated/previews/color-swatch.css";

import { ColorSwatch } from "@flowstack-ui/brick/color-swatch";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

export default function ColorSwatchPreview() {
  return <VStack align="start" gap="3"><HStack gap="2"><ColorSwatch.Root value="#5b5bd6" /><Text>Indigo</Text></HStack><HStack gap="2"><ColorSwatch.Root value="rgb(229 72 77 / 55%)" /><Text>Coral at 55%</Text></HStack><HStack gap="2"><ColorSwatch.Mix values={["#5b5bd6", "#30a46c", "#f5a623"]} /><Text>Campaign palette</Text></HStack></VStack>;
}
