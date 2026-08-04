"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Accordion } from "@flowstack-ui/brick/accordion";
import { Button } from "@flowstack-ui/brick/button";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { Input } from "@flowstack-ui/brick/input";
import { ArrowLeft, ListTree, Menu, Search, X } from "lucide-react";
import { categories, componentBySlug, components } from "@/app/lib/content";
import type { TocItem } from "@/app/lib/toc";

const componentRailScrollKey = "brick-component-navigation-scroll";

function categoryId(category: string) {
  return category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

function NavigationLink({ children, closeOnNavigate, ...props }: React.ComponentProps<typeof Link> & { closeOnNavigate?: boolean }) {
  const link = <Link {...props}>{children}</Link>;
  return closeOnNavigate ? <Drawer.Close asChild>{link}</Drawer.Close> : link;
}

function ComponentNavigationList({ closeOnNavigate = false, currentSlug }: { closeOnNavigate?: boolean; currentSlug: string }) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const current = componentBySlug(currentSlug);
  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => components.filter((component) => !normalized || `${component.title} ${component.description} ${component.category}`.toLowerCase().includes(normalized)), [normalized]);

  return (
    <nav className="component-nav" aria-label="Component documentation">
      <NavigationLink className="component-nav-back" closeOnNavigate={closeOnNavigate} href={`/components/#${current ? categoryId(current.category) : "component-results"}`}>
        <ArrowLeft size={15} aria-hidden="true" />All components
      </NavigationLink>
      <div className="component-nav-heading"><span>Browse components</span><small>{components.length} total</small></div>
      <Input
        autoComplete="off"
        clearable
        id={inputId}
        name={`component-navigation-${inputId.replaceAll(":", "")}`}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onClear={() => setQuery("")}
        placeholder="Find a component…"
        size="sm"
        startAdornment={<Search size={15} aria-hidden="true" />}
        type="search"
        value={query}
      />
      {normalized ? (
        <div className="component-nav-results" aria-live="polite">
          <span>{matches.length} {matches.length === 1 ? "match" : "matches"}</span>
          {matches.map((component) => (
            <NavigationLink
              aria-current={component.slug === currentSlug ? "page" : undefined}
              className={component.slug === currentSlug ? "is-current" : undefined}
              closeOnNavigate={closeOnNavigate}
              href={`/components/${component.slug}/`}
              key={component.slug}
            >
              {component.title}<small>{component.category}</small>
            </NavigationLink>
          ))}
          {matches.length === 0 && <p>No component matches “{query}”.</p>}
        </div>
      ) : (
        <Accordion.Root className="component-nav-groups" defaultValue={current ? [current.category] : []} size="sm" type="multiple" variant="plain">
          {categories.map((category) => {
            const categoryComponents = components.filter((component) => component.category === category);
            return (
              <Accordion.Item key={category} value={category}>
                <Accordion.Header as="h2">
                  <Accordion.Trigger>
                    <span>{category}<small>{categoryComponents.length}</small></span>
                    <Accordion.Indicator />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content landmark={false}>
                  <Accordion.ContentInner>
                    {categoryComponents.map((component) => (
                      <NavigationLink
                        aria-current={component.slug === currentSlug ? "page" : undefined}
                        className={component.slug === currentSlug ? "is-current" : undefined}
                        closeOnNavigate={closeOnNavigate}
                        href={`/components/${component.slug}/`}
                        key={component.slug}
                      >
                        {component.title}
                      </NavigationLink>
                    ))}
                  </Accordion.ContentInner>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      )}
    </nav>
  );
}

function DocsDrawer({ children, description, title, trigger }: { children: ReactNode; description: string; title: string; trigger: ReactNode }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content className="docs-mobile-drawer" placement="start" size="md">
          <Drawer.Header className="docs-mobile-drawer-header">
            <div><Drawer.Title>{title}</Drawer.Title><Drawer.Description>{description}</Drawer.Description></div>
            <Drawer.Close asChild><Button aria-label={`Close ${title.toLowerCase()}`} tone="neutral" variant="ghost" size="sm"><X size={18} aria-hidden="true" /></Button></Drawer.Close>
          </Drawer.Header>
          <Drawer.Body>{children}</Drawer.Body>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function ComponentDocsNavigation({ currentSlug, toc }: { currentSlug: string; toc: TocItem[] }) {
  const current = componentBySlug(currentSlug);
  const desktopRailRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const rail = desktopRailRef.current;
    const savedPosition = sessionStorage.getItem(componentRailScrollKey);
    if (!rail || savedPosition === null) return;
    const scrollTop = Number(savedPosition);
    if (!Number.isFinite(scrollTop)) return;
    rail.scrollTop = scrollTop;
  }, []);

  return (
    <>
      <aside
        className="docs-sidebar component-docs-sidebar"
        onScroll={(event) => sessionStorage.setItem(componentRailScrollKey, String(event.currentTarget.scrollTop))}
        ref={desktopRailRef}
      >
        <ComponentNavigationList currentSlug={currentSlug} />
      </aside>
      <div className="docs-mobile-toolbar" aria-label="Component documentation tools">
        <DocsDrawer
          description="Search all 75 components or browse by category."
          title="Components"
          trigger={<Button startIcon={<Menu size={16} aria-hidden="true" />} tone="neutral" variant="soft">Components</Button>}
        >
          <ComponentNavigationList closeOnNavigate currentSlug={currentSlug} />
        </DocsDrawer>
        <span aria-current="page">{current?.title}</span>
        <DocsDrawer
          description={`Jump to a section in the ${current?.title ?? "component"} guide.`}
          title="On this page"
          trigger={<Button aria-label="Open sections on this page" tone="neutral" variant="soft"><ListTree size={17} aria-hidden="true" /></Button>}
        >
          <nav className="docs-mobile-toc" aria-label="Sections on this page">
            {toc.map((item) => <Drawer.Close asChild key={item.id}><a href={`#${item.id}`}>{item.label}</a></Drawer.Close>)}
          </nav>
        </DocsDrawer>
      </div>
    </>
  );
}
