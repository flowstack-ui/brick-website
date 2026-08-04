"use client";

import "../../app/.generated/previews/slider.css";

import { Field } from "@flowstack-ui/brick/field";
import { Slider } from "@flowstack-ui/brick/slider";

export default function SliderPreview() {
  return <Field.Root><Field.Label>Volume</Field.Label><Slider.Root defaultValue={[40]} name="volume"><Slider.Track><Slider.Range /><Slider.Thumb /></Slider.Track></Slider.Root><Field.Description>Choose from 0 to 100.</Field.Description></Field.Root>;
}
