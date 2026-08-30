"use client";

import "../../app/.generated/previews/highlight.css";

import { useState } from "react";
import { Highlight } from "@flowstack-ui/brick/highlight";
import { Input } from "@flowstack-ui/brick/input";
import { VStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";

const excerpt = "FLOWSTACK keeps C++ and café searches literal, predictable, and accessible.";

export default function HighlightPreview() {
  const [query, setQuery] = useState("flowstack");

  return (
    <VStack align="stretch" gap={4}>
      <Input aria-label="Literal search query" onChange={(event) => setQuery(event.currentTarget.value)} type="search" value={query} />
      <Text as="p" variant="body-lg"><Highlight query={query} text={excerpt} /></Text>
    </VStack>
  );
}
