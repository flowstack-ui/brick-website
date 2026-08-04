"use client";

import "../../app/.generated/previews/combobox.css";

import { Combobox } from "@flowstack-ui/brick/combobox";
import { Field } from "@flowstack-ui/brick/field";

const cities = [{ label: "New York", value: "new-york" }, { label: "Madrid", value: "madrid" }];

export default function ComboboxPreview() {
  return <Field.Root id="preview-city"><Field.Label>City</Field.Label><Combobox.Root options={cities}><Combobox.Control><Combobox.Input placeholder="Search cities" /><Combobox.Clear aria-label="Clear city" /><Combobox.Trigger aria-label="Toggle city options" /></Combobox.Control><Combobox.Portal><Combobox.Content><Combobox.Listbox>{cities.map(city => <Combobox.Item key={city.value} label={city.label} value={city.value}>{city.label}</Combobox.Item>)}<Combobox.Empty>No matching cities</Combobox.Empty></Combobox.Listbox></Combobox.Content></Combobox.Portal></Combobox.Root></Field.Root>;
}
