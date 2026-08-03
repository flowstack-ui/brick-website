import { guides, categories } from "@/app/lib/content";
import Link from "next/link";

export function DocsShell({ children, current }: { children: React.ReactNode; current?: string }) {
  return (
    <main id="main-content" className="docs-shell section-shell">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <nav>
          <span className="docs-nav-label">Start here</span>
          <Link className={current === "docs" ? "is-current" : ""} href="/docs/">Overview</Link>
          {Object.entries(guides).map(([slug, guide]) => (
            <Link key={slug} className={current === slug ? "is-current" : ""} href={`/docs/${slug}/`}>{guide.title}</Link>
          ))}
          <span className="docs-nav-label">Components</span>
          <Link className={current === "components" ? "is-current" : ""} href="/components/">All components</Link>
          {categories.map((category) => <Link key={category} href={`/components/#${category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`}>{category}</Link>)}
        </nav>
      </aside>
      <div className="docs-content">{children}</div>
      <aside className="docs-rail" aria-label="On this page">
        <span>On this page</span>
        <a href="#main-content">Introduction</a>
        <a href="#details">Details</a>
        <a href="#next">Next steps</a>
      </aside>
    </main>
  );
}
