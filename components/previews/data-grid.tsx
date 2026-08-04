"use client";

import "../../app/.generated/previews/data-grid.css";

import { DataGrid } from "@flowstack-ui/brick/data-grid";

export default function DataGridPreview() {
  return <DataGrid.Container><DataGrid.Root aria-label="Projects" columnCount={2} rowCount={3} variant="outline"><DataGrid.Caption>Current projects</DataGrid.Caption><DataGrid.Header><DataGrid.Row rowIndex={1}><DataGrid.ColumnHeader columnIndex={1}>Project</DataGrid.ColumnHeader><DataGrid.ColumnHeader columnIndex={2}>Status</DataGrid.ColumnHeader></DataGrid.Row></DataGrid.Header><DataGrid.Body><DataGrid.Row rowIndex={2} value="atom" selectable><DataGrid.Cell columnIndex={1}>Atom</DataGrid.Cell><DataGrid.Cell columnIndex={2}>Published</DataGrid.Cell></DataGrid.Row><DataGrid.Row rowIndex={3} value="brick" selectable><DataGrid.Cell columnIndex={1}>Brick</DataGrid.Cell><DataGrid.Cell columnIndex={2}>Ready</DataGrid.Cell></DataGrid.Row></DataGrid.Body></DataGrid.Root></DataGrid.Container>;
}
