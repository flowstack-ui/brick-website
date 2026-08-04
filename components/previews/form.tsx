"use client";

import "../../app/.generated/previews/form.css";

import { Button } from "@flowstack-ui/brick/button";
import { Field } from "@flowstack-ui/brick/field";
import { Form } from "@flowstack-ui/brick/form";
import { Input } from "@flowstack-ui/brick/input";

export default function FormPreview() {
  return <Form className="preview-form" preventDefaultOnSubmit><Field.Root id="preview-name"><Field.Label>Name</Field.Label><Input name="name" defaultValue="Flowstack" /></Field.Root><Button type="submit">Save</Button></Form>;
}
