"use client";

import "../../app/.generated/previews/multi-select.css";

import { Field } from "@flowstack-ui/brick/field";

import { MultiSelect } from "@flowstack-ui/brick/multi-select";

export default function MultiSelectPreview() {
  return <Field.Root id="preview-skills"><Field.Label>Team skills</Field.Label><MultiSelect.Root defaultValue={["design"]}><MultiSelect.Trigger><MultiSelect.Value placeholder="Choose skills" /><MultiSelect.Icon /></MultiSelect.Trigger><MultiSelect.Content><MultiSelect.Viewport><MultiSelect.Group><MultiSelect.Label>Disciplines</MultiSelect.Label><MultiSelect.Item value="design"><MultiSelect.ItemText>Design</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item><MultiSelect.Item value="engineering"><MultiSelect.ItemText>Engineering</MultiSelect.ItemText><MultiSelect.ItemIndicator /></MultiSelect.Item></MultiSelect.Group></MultiSelect.Viewport></MultiSelect.Content></MultiSelect.Root></Field.Root>;
}
