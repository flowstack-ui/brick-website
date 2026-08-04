"use client";

import { Field } from "@flowstack-ui/brick/field";
import { Input } from "@flowstack-ui/brick/input";

export default function InputPreview() {
  return <Field.Root id="preview-account-email"><Field.Label>Email</Field.Label><Input name="email" placeholder="you@example.com" type="email" /><Field.Description>Use your work address.</Field.Description></Field.Root>;
}
