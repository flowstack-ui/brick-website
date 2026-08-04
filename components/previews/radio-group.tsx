"use client";

import "../../app/.generated/previews/radio-group.css";

import { RadioGroup } from "@flowstack-ui/brick/radio-group";

export default function RadioGroupPreview() {
  return <RadioGroup.Root aria-label="Notification channel" defaultValue="email"><RadioGroup.Item value="email">Email</RadioGroup.Item><RadioGroup.Item value="sms">SMS</RadioGroup.Item></RadioGroup.Root>;
}
