"use client";

import { Field } from "@flowstack-ui/brick/field";

import { PasswordToggleField } from "@flowstack-ui/brick/password-toggle-field";

export default function PasswordToggleFieldPreview() {
  return <Field.Root id="preview-password"><Field.Label>Password</Field.Label><PasswordToggleField.Root><PasswordToggleField.Input defaultValue="correct horse" /><PasswordToggleField.Toggle /></PasswordToggleField.Root></Field.Root>;
}
