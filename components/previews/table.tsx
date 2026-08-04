"use client";

import { Table } from "@flowstack-ui/brick/table";

export default function TablePreview() {
  return <Table.Container><Table.Root><Table.Caption>Release results</Table.Caption><Table.Header><Table.Row><Table.Head>Package</Table.Head><Table.Head>Status</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell>Atom</Table.Cell><Table.Cell>Published</Table.Cell></Table.Row><Table.Row><Table.Cell>Brick</Table.Cell><Table.Cell>Published</Table.Cell></Table.Row></Table.Body></Table.Root></Table.Container>;
}
