"use client";

import "../../app/.generated/previews/file-upload.css";

import { Field } from "@flowstack-ui/brick/field";
import { FileUpload } from "@flowstack-ui/brick/file-upload";
import { Text } from "@flowstack-ui/brick/text";

export default function FileUploadPreview() {
  return <Field.Root id="preview-files"><Field.Label>Attachments</Field.Label><FileUpload.Root accept="image/*,.pdf" maxSize={5000000} multiple><FileUpload.HiddenInput /><FileUpload.Dropzone><Text>Drop files here</Text><FileUpload.Trigger /></FileUpload.Dropzone></FileUpload.Root><Field.Description>PDF or image, up to 5 MB.</Field.Description></Field.Root>;
}
