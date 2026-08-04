"use client";

import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";

export default function CardPreview() {
  return <Card.Root><Card.Header><Card.Title as="h3">Quarterly report</Card.Title><Card.Description>Updated five minutes ago</Card.Description></Card.Header><Card.Content>Conversion improved across every checkout step.</Card.Content><Card.Footer><Button>Open report</Button></Card.Footer></Card.Root>;
}
