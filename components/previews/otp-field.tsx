"use client";

import { Field } from "@flowstack-ui/brick/field";

import { OTPField } from "@flowstack-ui/brick/otp-field";

export default function OtpFieldPreview() {
  return <Field.Root id="preview-code"><Field.Label>Verification code</Field.Label><OTPField.Root length={6} name="code"><OTPField.Group>{[0,1,2].map(index => <OTPField.Input index={index} key={index} />)}</OTPField.Group><OTPField.Separator /><OTPField.Group>{[3,4,5].map(index => <OTPField.Input index={index} key={index} />)}</OTPField.Group></OTPField.Root></Field.Root>;
}
