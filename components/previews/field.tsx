"use client";

import { Field } from "@flowstack-ui/brick/field";
import { Input } from "@flowstack-ui/brick/input";

export default function FieldPreview() {
  return <Field.Root id="preview-email" required><Field.Label>Email</Field.Label><Input type="email" placeholder="you@example.com" /><Field.Description>Use your work address.</Field.Description></Field.Root>;
}
