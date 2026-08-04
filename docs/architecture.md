# Architecture

The website is a native Next.js App Router application deployed through
Vercel. Public product and documentation routes are generated statically from
committed JSON and Markdown-derived content; interactive search, appearance,
navigation, and examples use narrow client boundaries. A route becomes dynamic
only when a documented request-time requirement exists.

Cloudflare is authoritative DNS for the canonical `brick-ui.com` apex. It is
not part of the application build or runtime dependency graph.

The sibling `../package` repository is an input to the maintainer-only synchronization script, never to the application build. This keeps a clean clone independently installable while preserving exact provenance.

Routes are intentionally separated by audience:

- `/` explains and demonstrates the product.
- `/components/` and `/components/[slug]/` expose the full component catalog.
- `/docs/` and `/docs/[slug]/` teach core workflows.
- `/themes/` demonstrates the semantic theme contract.
- `/atom/` explains the Atom/Brick ownership relationship.

Component documentation has two presentation layers over the synchronized
package source:

- `/components/` is a website-owned discovery surface with local, static
  search, outcome shortcuts, and category filters.
- `/components/[slug]/` parses the canonical component guide into consumer,
  advanced-reference, and maintainer-resource layers. It does not duplicate or
  rewrite the package authority. Evidence and full release history remain in
  the public Brick repository and are linked from the route.

The component navigator and advanced disclosures are small client adapters
because they own interactive search, expansion, and narrow-screen drawers.
The document parser, section ordering, syntax tokens, and Markdown rendering
remain build/server work. Published Brick components own the resulting visual
anatomy; application routing and content selection remain website-owned.

Live examples use a route-scoped dynamic registry. Every component preview is
an independent client module under `components/previews/`; the shared registry
does not import all 75 implementations into one browser bundle. Build-time
budgets and the social-asset contract are recorded in
[performance.md](performance.md).
