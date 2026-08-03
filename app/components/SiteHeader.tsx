"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { Input } from "@flowstack-ui/brick/input";
import { NavList } from "@flowstack-ui/brick/nav-list";
import { MarkGithubIcon } from "@primer/octicons-react";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Blocks,
  BookOpen,
  Home,
  Menu,
  Moon,
  Package,
  Palette,
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

const drawerNav = [
  { href: "/", label: "Home", description: "See what Brick makes possible", icon: Home },
  { href: "/docs/", label: "Docs", description: "Learn the system", icon: BookOpen },
  { href: "/components/", label: "Components", description: "Explore all 75 component owners", icon: Blocks },
  { href: "/themes/", label: "Themes", description: "Shape the visual voice", icon: Palette },
  { href: "/atom/", label: "Atom", description: "Understand the foundation", icon: Atom },
];

type Appearance = "light" | "dark";

function applyAppearance(value: Appearance) {
  document.documentElement.dataset.brickAppearance = value;
  document.documentElement.style.colorScheme = value;
  localStorage.setItem("brick-website-appearance", value);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [appearance, setAppearance] = useState<Appearance>("light");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("brick-website-appearance") as Appearance | null;
    const resolved = saved ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    // The pre-paint script already applied this external preference; state only synchronizes the control label.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppearance(resolved);
    applyAppearance(resolved);
  }, []);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const componentResults = (normalized
      ? components.filter((component) => `${component.title} ${component.description} ${component.category}`.toLowerCase().includes(normalized))
      : components
    ).slice(0, 6);
    const guideResults = Object.entries(guides)
      .filter(([, guide]) => !normalized || `${guide.title} ${guide.eyebrow} ${guide.description}`.toLowerCase().includes(normalized))
      .slice(0, 4);
    return { componentResults, guideResults };
  }, [query]);

  const resultCount = searchResults.componentResults.length + searchResults.guideResults.length;

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
        <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
          <Dialog.Trigger asChild>
            <Button
              aria-label="Search Brick documentation"
              aria-keyshortcuts="Meta+K Control+K"
              className="search-trigger"
              tone="neutral"
              variant="soft"
              size="sm"
              startIcon={<Search size={15} aria-hidden="true" />}
            >
              Search <kbd className="shortcut">⌘K</kbd>
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content size="lg" className="search-dialog">
              <Dialog.Header className="search-dialog-header">
                <div className="search-dialog-heading">
                  <span className="search-dialog-icon"><Search size={18} aria-hidden="true" /></span>
                  <div>
                    <Dialog.Title>Search Brick</Dialog.Title>
                    <Dialog.Description>Find components, guides, and concepts.</Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <Button aria-label="Close search" className="search-dialog-close" tone="neutral" variant="ghost" size="sm"><X size={18} aria-hidden="true" /></Button>
                  </Dialog.Close>
                </div>
                <Input
                  autoFocus
                  autoComplete="off"
                  id="brick-site-search"
                  name="brick-site-search"
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                  placeholder="Search 75 components…"
                  startAdornment={<Search size={16} aria-hidden="true" />}
                  type="search"
                  clearable
                  onClear={() => setQuery("")}
                />
              </Dialog.Header>
              <Dialog.Body className="search-dialog-body">
                <div className="search-result-groups" aria-live="polite">
                  {searchResults.componentResults.length > 0 && (
                    <section className="search-result-group" aria-labelledby="search-components-label">
                      <div className="search-group-heading"><span id="search-components-label">Components</span><small>{searchResults.componentResults.length}</small></div>
                      <div className="search-result-list">
                        {searchResults.componentResults.map((component) => (
                          <Dialog.Close asChild key={component.slug}>
                            <a href={`/components/${component.slug}/`} className="search-result">
                              <span className="search-result-icon"><Package size={16} aria-hidden="true" /></span>
                              <span className="search-result-copy"><strong>{component.title}</strong><small>{component.description}</small></span>
                              <span className="search-result-meta"><Badge tone="neutral" variant="soft" size="sm">{component.category}</Badge><ArrowRight size={15} aria-hidden="true" /></span>
                            </a>
                          </Dialog.Close>
                        ))}
                      </div>
                    </section>
                  )}
                  {searchResults.guideResults.length > 0 && (
                    <section className="search-result-group" aria-labelledby="search-guides-label">
                      <div className="search-group-heading"><span id="search-guides-label">Guides</span><small>{searchResults.guideResults.length}</small></div>
                      <div className="search-result-list">
                        {searchResults.guideResults.map(([slug, guide]) => (
                          <Dialog.Close asChild key={slug}>
                            <a href={`/docs/${slug}/`} className="search-result">
                              <span className="search-result-icon"><BookOpen size={16} aria-hidden="true" /></span>
                              <span className="search-result-copy"><strong>{guide.title}</strong><small>{guide.description}</small></span>
                              <span className="search-result-meta"><Badge tone="accent" variant="soft" size="sm">Guide</Badge><ArrowRight size={15} aria-hidden="true" /></span>
                            </a>
                          </Dialog.Close>
                        ))}
                      </div>
                    </section>
                  )}
                  {resultCount === 0 && (
                    <div className="search-empty"><span><Search size={18} aria-hidden="true" /></span><strong>No results for “{query}”</strong><small>Try a component, guide, or category such as forms.</small></div>
                  )}
                </div>
              </Dialog.Body>
              <Dialog.Footer className="search-dialog-footer">
                <span>{resultCount} {resultCount === 1 ? "result" : "results"}</span>
                <span className="search-footer-shortcut"><kbd>Esc</kbd> to close</span>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        <div className="header-icon-actions">
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
            <MarkGithubIcon size={17} aria-hidden="true" />
          </Button>

          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button aria-label="Open navigation" className="mobile-menu-trigger" tone="neutral" variant="ghost" size="sm">
                <Menu size={19} aria-hidden="true" />
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content placement="end" size="md" className="mobile-drawer">
                <Drawer.Header className="mobile-drawer-header">
                  <div className="drawer-brand-row">
                    <Drawer.Close asChild>
                      <Link className="drawer-brand" href="/" aria-label="Brick UI home">
                        <BrandMark />
                        <span className="drawer-version">v{source.version}</span>
                      </Link>
                    </Drawer.Close>
                    <Drawer.Close asChild>
                      <Button aria-label="Close navigation" className="drawer-close" tone="neutral" variant="ghost" size="md">
                        <X size={19} aria-hidden="true" />
                      </Button>
                    </Drawer.Close>
                  </div>
                  <span className="drawer-kicker">Finished by default</span>
                  <Drawer.Title>Build interfaces from pieces that belong together.</Drawer.Title>
                  <Drawer.Description>Explore the component system, its visual language, and the accessible foundation beneath it.</Drawer.Description>
                </Drawer.Header>
                <Drawer.Body className="mobile-drawer-body">
                  <div className="drawer-nav-group">
                    <span className="drawer-nav-label">Explore</span>
                    <NavList.Root aria-label="Mobile navigation" className="drawer-primary-nav" size="lg" tone="accent" variant="soft">
                      <NavList.List>
                        {drawerNav.map(({ href, label, description, icon: Icon }) => (
                          <NavList.Item key={href}>
                            <Drawer.Close asChild>
                              <NavList.Link
                                active={href === "/" ? pathname === "/" : pathname.startsWith(href)}
                                description={description}
                                href={href}
                                startIcon={<Icon aria-hidden="true" />}
                              >
                                {label}
                              </NavList.Link>
                            </Drawer.Close>
                          </NavList.Item>
                        ))}
                      </NavList.List>
                    </NavList.Root>
                  </div>

                  <div className="drawer-nav-group drawer-resource-group">
                    <span className="drawer-nav-label">Resources</span>
                    <NavList.Root aria-label="Brick resources" className="drawer-resource-nav" size="md" tone="neutral" variant="soft">
                      <NavList.List>
                        <NavList.Item>
                          <NavList.Link
                            endIcon={<ArrowUpRight aria-hidden="true" />}
                            href="https://github.com/flowstack-ui/brick"
                            startIcon={<MarkGithubIcon aria-hidden="true" />}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub repository
                          </NavList.Link>
                        </NavList.Item>
                        <NavList.Item>
                          <NavList.Link
                            endIcon={<ArrowUpRight aria-hidden="true" />}
                            href="https://www.npmjs.com/package/@flowstack-ui/brick"
                            startIcon={<Package aria-hidden="true" />}
                            target="_blank"
                            rel="noreferrer"
                          >
                            npm package
                          </NavList.Link>
                        </NavList.Item>
                      </NavList.List>
                    </NavList.Root>
                  </div>
                </Drawer.Body>
                <Drawer.Footer className="mobile-drawer-footer">
                  <p className="drawer-proof"><span>75 components</span><span>React 18 + 19</span><span>Static CSS</span></p>
                  <Drawer.Close asChild>
                    <Button href="/docs/getting-started/" endIcon={<ArrowRight size={17} />} fullWidth>Get started</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
