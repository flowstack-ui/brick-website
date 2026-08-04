"use client";

import "../../app/.generated/previews/accordion.css";

import { Accordion } from "@flowstack-ui/brick/accordion";

export default function AccordionPreview() {
  return <Accordion.Root defaultValue="foundations"><Accordion.Item value="foundations"><Accordion.Header><Accordion.Trigger>Foundations <Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner>Tokens, type, spacing, and motion.</Accordion.ContentInner></Accordion.Content></Accordion.Item><Accordion.Item value="components"><Accordion.Header><Accordion.Trigger>Components <Accordion.Indicator /></Accordion.Trigger></Accordion.Header><Accordion.Content><Accordion.ContentInner>Finished UI built on Atom behavior.</Accordion.ContentInner></Accordion.Content></Accordion.Item></Accordion.Root>;
}
