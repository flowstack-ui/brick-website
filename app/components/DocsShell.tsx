import { guides } from "@/app/lib/guides";
import Link from "next/link";
import { OnThisPage } from "@/app/components/OnThisPage";
import type { TocItem } from "@/app/lib/toc";

const guideOrder = ["getting-started", "theming", "composition", "accessibility"] as const;

export function DocsShell({ children, current, toc }: { children: React.ReactNode; current?: string; toc: TocItem[] }) {
  return (
    <main id="main-content" className="docs-shell section-shell">
      <aside className="docs-sidebar" aria-label="Guide navigation">
        <nav>
          <span className="docs-nav-label">Guides</span>
          <Link className={current === "guides" ? "is-current" : ""} href="/docs">Overview</Link>
          {guideOrder.map((slug) => {
            const guide = guides[slug];
            return <Link key={slug} className={current === slug ? "is-current" : ""} href={`/docs/${slug}`}>{guide.title}</Link>;
          })}
        </nav>
      </aside>
      <div className="docs-content">{children}</div>
      <aside className="docs-rail" aria-label="On this page">
        <span>On this page</span>
        <OnThisPage items={toc} />
      </aside>
    </main>
  );
}
