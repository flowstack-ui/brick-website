"use client";

import "../../app/.generated/previews/tree-grid.css";

import { TreeGrid } from "@flowstack-ui/brick/tree-grid";

export default function TreeGridPreview() {
  return <TreeGrid.Container><TreeGrid.Root aria-label="Release files" columnCount={2} rowCount={3} defaultExpandedValue={["src"]} variant="outline"><TreeGrid.Caption>Release files</TreeGrid.Caption><TreeGrid.Header><TreeGrid.Row value="header" rowIndex={1} selectable={false}><TreeGrid.ColumnHeader columnIndex={1}>Name</TreeGrid.ColumnHeader><TreeGrid.ColumnHeader columnIndex={2}>Type</TreeGrid.ColumnHeader></TreeGrid.Row></TreeGrid.Header><TreeGrid.Body><TreeGrid.Row value="src" rowIndex={2} level={1} expandable selectable><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />src</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>Folder</TreeGrid.Cell></TreeGrid.Row><TreeGrid.Row value="index" parentValue="src" rowIndex={3} level={2} selectable><TreeGrid.RowHeader columnIndex={1}><TreeGrid.Indicator />index.ts</TreeGrid.RowHeader><TreeGrid.Cell columnIndex={2}>TypeScript</TreeGrid.Cell></TreeGrid.Row></TreeGrid.Body></TreeGrid.Root></TreeGrid.Container>;
}
