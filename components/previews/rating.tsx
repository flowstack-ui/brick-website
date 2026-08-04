"use client";

import "../../app/.generated/previews/rating.css";

import { Field } from "@flowstack-ui/brick/field";
import { Rating } from "@flowstack-ui/brick/rating";

export default function RatingPreview() {
  return <Field.Root><Field.Label>Product rating</Field.Label><Rating.Root defaultValue={3}>{[1,2,3,4,5].map(value => <Rating.Item key={value} value={value} />)}</Rating.Root></Field.Root>;
}
