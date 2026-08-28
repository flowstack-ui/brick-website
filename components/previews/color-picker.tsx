"use client";

import "../../app/.generated/previews/color-picker.css";

import { useState } from "react";
import { ColorPicker } from "@flowstack-ui/brick/color-picker";
import { ColorSwatch } from "@flowstack-ui/brick/color-swatch";
import { Text } from "@flowstack-ui/brick/text";

const presets = [
  { label: "Indigo", value: "#5b5bd6" },
  { label: "Coral", value: "#e5484d" },
  { label: "Grass", value: "#30a46c" },
] as const;

export default function ColorPickerPreview() {
  const [value, setValue] = useState("#5b5bd6");
  return <ColorPicker.Root name="previewAccent" onValueChange={setValue} value={value}><ColorPicker.Label>Accent color</ColorPicker.Label><ColorPicker.Control><ColorPicker.Input /><ColorPicker.NativeInput aria-label="Open native accent color chooser" /><ColorPicker.Trigger aria-label="Choose an accent preset"><ColorSwatch.Root value={value} /></ColorPicker.Trigger></ColorPicker.Control><ColorPicker.Content align="start" aria-label="Accent presets">{presets.map((preset) => <ColorPicker.SwatchTrigger aria-label={`Use ${preset.label}`} key={preset.value} value={preset.value}><ColorSwatch.Root value={preset.value} /><Text as="span">{preset.label}</Text></ColorPicker.SwatchTrigger>)}</ColorPicker.Content><ColorPicker.HiddenInput /></ColorPicker.Root>;
}
