"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { Input } from "@flowstack-ui/brick/input";
import {
  ArrowUpRight,
  Code2,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { components, guides, source } from "@/app/lib/content";

const nav = [
  { href: "/docs/", label: "Docs" },
  { href: "/components/", label: "Components" },
  { href: "/themes/", label: "Themes" },
  { href: "/atom/", label: "Atom" },
];

type Appearance = "light" | "dark";

function applyAppearance(value: Appearance) {
  document.documentElement.dataset.brickAppearance = value;
  document.documentElement.style.colorScheme = value;
  localStorage.setItem("brick-website-appearance", value);
}

export function SiteHeader() {
  const [appearance, setAppearance] = useState<Appearance>("light");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("brick-website-appearance") as Appearance | null;
    const resolved = saved ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    // The pre-paint script already applied this external preference; state only synchronizes the control label.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppearance(resolved);
    applyAppearance(resolved);
  }, []);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return components.slice(0, 8);
    const componentResults = components
      .filter((component) => `${component.title} ${component.description} ${component.category}`.toLowerCase().includes(normalized))
      .slice(0, 8);
    return componentResults;
  }, [query]);

  const toggleAppearance = () => {
    const next = appearance === "light" ? "dark" : "light";
    setAppearance(next);
    applyAppearance(next);
  };

  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label="Brick UI home">
        <BrandMark />
        <span className="version-pill">v{source.version}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>

      <div className="header-actions">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button className="search-trigger" tone="neutral" variant="soft" size="sm" startIcon={<Search size={15} />}>
              Search <span className="shortcut">⌘K</span>
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content size="lg" className="search-dialog">
              <Dialog.Header>
                <Dialog.Title>Search Brick</Dialog.Title>
                <Dialog.Description>Find components, guides, and concepts.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <Input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Search 75 components…"
                  startAdornment={<Search size={16} aria-hidden="true" />}
                  clearable
                  onClear={() => setQuery("")}
                />
                <div className="search-results" aria-live="polite">
                  {results.map((component) => (
                    <Dialog.Close asChild key={component.slug}>
                      <a href={`/components/${component.slug}/`} className="search-result">
                        <span>
                          <strong>{component.title}</strong>
                          <small>{component.category}</small>
                        </span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </Dialog.Close>
                  ))}
                  {query && results.length === 0 && (
                    <p className="search-empty">No component matches “{query}”. Try a category such as forms or navigation.</p>
                  )}
                </div>
                <div className="search-guides">
                  {Object.entries(guides).map(([slug, guide]) => (
                    <Dialog.Close asChild key={slug}>
                      <a href={`/docs/${slug}/`}>{guide.title}</a>
                    </Dialog.Close>
                  ))}
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close asChild>
                  <Button tone="neutral" variant="ghost" size="sm">Close</Button>
                </Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <Button
          aria-label={`Use ${appearance === "light" ? "dark" : "light"} appearance`}
          className="icon-action"
          tone="neutral"
          variant="ghost"
          size="sm"
          onPress={toggleAppearance}
        >
          {appearance === "light" ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
        </Button>

        <Button
          aria-label="Brick on GitHub"
          className="icon-action github-action"
          href="https://github.com/flowstack-ui/brick"
          target="_blank"
          rel="noreferrer"
          tone="neutral"
          variant="ghost"
          size="sm"
        >
          <Code2 size={17} aria-hidden="true" />
        </Button>

        <Drawer.Root>
          <Drawer.Trigger asChild>
            <Button aria-label="Open navigation" className="mobile-menu-trigger" tone="neutral" variant="ghost" size="sm">
              <Menu size={19} aria-hidden="true" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay />
            <Drawer.Content placement="end" size="sm" className="mobile-drawer">
              <Drawer.Header>
                <Drawer.Title>Explore Brick</Drawer.Title>
                <Drawer.Description>Product, components, and foundations.</Drawer.Description>
                <Drawer.Close asChild>
                  <Button aria-label="Close navigation" className="drawer-close" tone="neutral" variant="ghost" size="sm">
                    <X size={18} aria-hidden="true" />
                  </Button>
                </Drawer.Close>
              </Drawer.Header>
              <Drawer.Body>
                <nav className="mobile-nav" aria-label="Mobile navigation">
                  <Drawer.Close asChild><Link href="/">Home</Link></Drawer.Close>
                  {nav.map((item) => (
                    <Drawer.Close asChild key={item.href}><a href={item.href}>{item.label}</a></Drawer.Close>
                  ))}
                </nav>
              </Drawer.Body>
              <Drawer.Footer>
                <Button href="/docs/getting-started/" fullWidth>Get started</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </header>
  );
}
