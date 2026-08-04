"use client";

import "../../app/.generated/previews/number-input.css";

import { Field } from "@flowstack-ui/brick/field";

import { NumberInput } from "@flowstack-ui/brick/number-input";

export default function NumberInputPreview() {
  return <Field.Root id="preview-quantity"><Field.Label>Quantity</Field.Label><NumberInput.Root defaultValue={3} min={1}><NumberInput.Input /><NumberInput.Increment aria-label="Increase quantity" /><NumberInput.Decrement aria-label="Decrease quantity" /></NumberInput.Root></Field.Root>;
}
