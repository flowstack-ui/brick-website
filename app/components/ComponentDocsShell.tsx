import { ComponentDocsNavigation } from "@/app/components/ComponentDocsNavigation";
import { OnThisPage } from "@/app/components/OnThisPage";
import type { TocItem } from "@/app/lib/toc";

export function ComponentDocsShell({ children, componentSlug, toc }: { children: React.ReactNode; componentSlug: string; toc: TocItem[] }) {
  return (
    <main id="main-content" className="docs-shell section-shell docs-shell--component">
      <ComponentDocsNavigation currentSlug={componentSlug} toc={toc} />
      <div className="docs-content">{children}</div>
      <aside className="docs-rail" aria-label="On this page">
        <span>On this page</span>
        <OnThisPage items={toc} />
      </aside>
    </main>
  );
}
