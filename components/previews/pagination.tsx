"use client";

import { Pagination } from "@flowstack-ui/brick/pagination";

export default function PaginationPreview() {
  return <Pagination.Root totalPages={8} defaultPage={3} aria-label="Result pages"><Pagination.List><Pagination.Previous /><Pagination.Items /><Pagination.Next /></Pagination.List></Pagination.Root>;
}
