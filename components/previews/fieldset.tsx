"use client";

import { Checkbox } from "@flowstack-ui/brick/checkbox";
import { Fieldset } from "@flowstack-ui/brick/fieldset";

import { VStack } from "@flowstack-ui/brick/stack";

export default function FieldsetPreview() {
  return <Fieldset.Root><Fieldset.Legend>Notifications</Fieldset.Legend><Fieldset.Description>Select all that apply.</Fieldset.Description><VStack gap="2"><Checkbox>Email</Checkbox><Checkbox>Product updates</Checkbox></VStack></Fieldset.Root>;
}
