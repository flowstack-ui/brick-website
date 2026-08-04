"use client";

import { Breadcrumb } from "@flowstack-ui/brick/breadcrumb";

export function ComponentBreadcrumb({ category, categoryHref, title }: { category: string; categoryHref: string; title: string }) {
  return (
    <Breadcrumb.Root ariaLabel={`${title} documentation path`} className="component-breadcrumb" size="sm">
      <Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="/components/">Components</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Link href={categoryHref}>{category}</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Page>{title}</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
