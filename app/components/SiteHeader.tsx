"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
              <Dialog.Header>
                <Dialog.Title>Search Brick</Dialog.Title>
                <Dialog.Description>Find components, guides, and concepts.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
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
