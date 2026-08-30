"use client";

import "../../app/.generated/previews/prose.css";

import { Prose } from "@flowstack-ui/brick/prose";

export default function ProsePreview() {
  return (
    <Prose as="article" measure="narrow">
      <h3>Release notes</h3>
      <p>Build dependable interfaces with exact package guidance.</p>
      <ul><li>Published components</li><li>Closed Agent Knowledge coverage</li></ul>
    </Prose>
  );
}
