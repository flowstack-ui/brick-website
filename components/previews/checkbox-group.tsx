"use client";

import { CheckboxGroup } from "@flowstack-ui/brick/checkbox-group";

export default function CheckboxGroupPreview() {
  return <CheckboxGroup.Root aria-label="Features" defaultValue={["search"]}><CheckboxGroup.Item value="search"><CheckboxGroup.ItemLabel>Search</CheckboxGroup.ItemLabel></CheckboxGroup.Item><CheckboxGroup.Item value="themes"><CheckboxGroup.ItemLabel>Themes</CheckboxGroup.ItemLabel></CheckboxGroup.Item></CheckboxGroup.Root>;
}
