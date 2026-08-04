"use client";

import "../../app/.generated/previews/textarea.css";

import { Field } from "@flowstack-ui/brick/field";
import { Textarea } from "@flowstack-ui/brick/textarea";

export default function TextareaPreview() {
  return <Field.Root id="preview-summary"><Field.Label>Project summary</Field.Label><Textarea.Root name="summary" placeholder="Explain the intended result." /><Field.Description>Keep it concise and specific.</Field.Description></Field.Root>;
}
