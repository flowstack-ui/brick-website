"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Input } from "@flowstack-ui/brick/input";
import { ArrowRight, BookOpen, Package, Search, X } from "lucide-react";

type SearchIndex = {
  components: Array<{ slug: string; title: string; category: string; description: string }>;
  guides: Array<{ slug: string; title: string; eyebrow: string; description: string }>;
};

export function SiteSearchContent() {
  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<SearchIndex | null>(null);
  const [searchError, setSearchError] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/search-index.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed with ${response.status}`);
        return response.json() as Promise<SearchIndex>;
      })
      .then(setSearchIndex)
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) setSearchError(true);
      });

    return () => controller.abort();
  }, []);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const components = searchIndex?.components ?? [];
    const guides = searchIndex?.guides ?? [];
    const componentResults = (normalized
      ? components.filter((component) => `${component.title} ${component.description} ${component.category}`.toLowerCase().includes(normalized))
      : components
    ).slice(0, 6);
    const guideResults = guides
      .filter((guide) => !normalized || `${guide.title} ${guide.eyebrow} ${guide.description}`.toLowerCase().includes(normalized))
      .slice(0, 4);
    return { componentResults, guideResults };
  }, [query, searchIndex]);
  const resultCount = searchResults.componentResults.length + searchResults.guideResults.length;

  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content size="lg" className="search-dialog" initialFocus={searchInputRef}>
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
            autoComplete="off"
            id="brick-site-search"
            name="brick-site-search"
            ref={searchInputRef}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Search 89 components…"
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
                      <a href={`/components/${component.slug}`} className="search-result">
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
                  {searchResults.guideResults.map((guide) => (
                    <Dialog.Close asChild key={guide.slug}>
                      <a href={`/docs/${guide.slug}`} className="search-result">
                        <span className="search-result-icon"><BookOpen size={16} aria-hidden="true" /></span>
                        <span className="search-result-copy"><strong>{guide.title}</strong><small>{guide.description}</small></span>
                        <span className="search-result-meta"><Badge tone="accent" variant="soft" size="sm">Guide</Badge><ArrowRight size={15} aria-hidden="true" /></span>
                      </a>
                    </Dialog.Close>
                  ))}
                </div>
              </section>
            )}
            {!searchIndex && !searchError && (
              <div className="search-empty" role="status"><span><Search size={18} aria-hidden="true" /></span><strong>Loading search index…</strong><small>You can start typing while Brick prepares the results.</small></div>
            )}
            {searchError && (
              <div className="search-empty" role="alert"><span><Search size={18} aria-hidden="true" /></span><strong>Search is unavailable.</strong><small>Close the dialog and try again.</small></div>
            )}
            {searchIndex && resultCount === 0 && (
              <div className="search-empty"><span><Search size={18} aria-hidden="true" /></span><strong>No results for “{query}”</strong><small>Try a component, guide, or category such as forms.</small></div>
            )}
          </div>
        </Dialog.Body>
        <Dialog.Footer className="search-dialog-footer">
          <span>{searchIndex ? `${resultCount} ${resultCount === 1 ? "result" : "results"}` : "Search index"}</span>
          <span className="search-footer-shortcut"><kbd>Esc</kbd> to close</span>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
