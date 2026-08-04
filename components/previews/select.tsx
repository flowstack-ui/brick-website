"use client";

import { Field } from "@flowstack-ui/brick/field";

import { Select } from "@flowstack-ui/brick/select";

export default function SelectPreview() {
  return <Field.Root id="preview-plan"><Field.Label>Plan</Field.Label><Select.Root defaultValue="team"><Select.Trigger><Select.Value placeholder="Choose a plan" /><Select.Icon /></Select.Trigger><Select.Content><Select.Viewport><Select.Group><Select.Label>Available plans</Select.Label><Select.Item value="starter"><Select.ItemText>Starter</Select.ItemText><Select.ItemIndicator /></Select.Item><Select.Item value="team"><Select.ItemText>Team</Select.ItemText><Select.ItemIndicator /></Select.Item></Select.Group></Select.Viewport></Select.Content></Select.Root></Field.Root>;
}
