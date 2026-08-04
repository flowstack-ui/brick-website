# Current state

Brick UI Website is implemented as a multi-route product and documentation site.

- The application now runs on native Next.js 16 App Router. Its production
  build statically prerenders all 88 routes, including 75 component pages and
  four guides, while preserving client interaction only where the product
  needs it.
- The temporary vinext/Vite/Sites/Cloudflare worker shell and its direct
  dependencies are removed. The clean Node 22 install reports zero known npm
  vulnerabilities, and native rendered-route verification owns the reserved
  `4012` server lifecycle.
- All 84 indexable routes now emit unique titles and descriptions,
  self-canonicals, page-specific Open Graph and Twitter metadata, and one
  slashless URL contract shared by internal navigation, sitemap, and generated
  AI documentation.
- The homepage emits accurate `WebSite`, Swifty LLC `Organization`, and Brick
  `SoftwareSourceCode` JSON-LD. Guides and components emit canonical
  `BreadcrumbList` data. The consolidated AI documents remain readable with a
  response-level noindex policy.
- Unknown paths return a designed Brick recovery page with real 404 status,
  explicit noindex/no-follow metadata, no inherited canonical/social identity,
  and useful home, catalog, guide, and theme destinations.
- All 75 live examples now cross route-scoped dynamic boundaries instead of
  sharing one monolithic client implementation. The representative Button
  route is 25.5% smaller raw and 24.3% smaller gzip, and every component route
  is protected by a build-time JavaScript budget.
- The canonical 1200×630 social card preserves the approved artwork as a
  110,597-byte JPEG, an 89.5% reduction from the previous PNG, and its size and
  dimensions are enforced during verification.

- Home page demonstrates a composed, stateful website-project workspace made from the published Brick package, with a conversion-first stacked viewport and a compact mobile presentation.
- All 75 component owners have routes sourced from reviewed package documentation and a dedicated live example built from that component's public package export.
- All 75 live examples are presented through one light/dark architectural stage with explicit compact, form, overlay, expanding, structural, or interaction geometry; disclosures remain top-anchored and grow only downward.
- The component catalog is a full-width, outcome-led discovery hub without documentation rails; scoped search, category filters, source-backed results, and a query-aware empty state replace one undifferentiated card wall.
- Component routes use a searchable, route-aware category navigator with aligned category groups on desktop and a paired Components/On-this-page toolbar with full-height Brick drawers on narrow screens.
- Component drawers use Brick's `lg` responsive visibility boundary, close their controlled modal state when that boundary is crossed, and present body-sized category and component navigation on mobile and tablet screens.
- Component guides present source-backed consumer guidance, setup, examples, a single-lane usage decision, roomier multi-part API sections, accessibility, responsive behavior, grouped styling references, and optional advanced reference before linking to maintainer evidence and changelogs.
- Source sections that only redirect to a playground are routed to the shared Maintainer resources footer; real Examples sections with code or additional consumer guidance remain in the reading path.
- Breadcrumbs and category-relative previous/category/next navigation preserve a clear return path from every component route; the center category destination is a labeled quiet control rather than an ambiguous icon action.
- On narrow screens, component previous/category/next navigation remains one compact row, and the centered maintainer card keeps its three equally weighted GitHub destinations together.
- Markdown API matrices render through Brick Table, inline technical literals render through Brick Code with restrained semantic token roles, and fenced examples retain the website's Shiki-to-Brick Code Block adapter.
- Documentation tables preserve their authored column measure and expose contained horizontal touch scrolling instead of clipping narrow-screen content.
- Guides cover installation, theming, accessibility, and composition.
- Theme and Atom relationship pages explain visual and behavioral ownership boundaries, with Atom and Brick presented as independent layers in the larger Flowstack ecosystem.
- The global footer preserves Brick identity while identifying Flowstack membership and Swifty ownership through a restrained text endorsement.
- The Atom hero presents its three ownership layers as readable connected interface nodes, with Brick emphasized between Atom behavior and application composition.
- The Atom hero stacks its diagram below the copy at the 1180px content-pressure boundary and uses a compact mobile-first top rhythm.
- The following Flowstack relationship story stacks at 1080px and centers both its copy and pathway on one shared responsive lane.
- The Clear Ownership section shares one centered editorial lane between its explanatory heading and cards, with a restrained transition from the Flowstack story.
- The final Atom-versus-Brick choice lets its copy wrap before compressing the action and preserves the existing narrow stacked layout.
- The Themes hero uses a true circular semantic instrument with precise axes, spectrum arcs, a meaning-first core, and four role nodes; its eyebrow and actions own explicit spacing.
- The Themes story presents two visual expressions as one unchanged Brick component contract and maps Color, Shape, Typography, and Motion as four connected semantic systems with restrained section rhythm.
- The Themes closing callout stacks at 900px and gives its copy and install command the full available width before either becomes compressed.
- Documentation sidebar and page-rail navigation use a readable scalable type size and target height, with the right rail removed at 1180px and the remaining navigation reflowed at 900px.
- The right documentation rail mirrors each page's real sections, generates guide and component entries from source-backed Markdown headings, and identifies the active section while scrolling.
- Website-authored focus indicators use the semantic purple focus token; documentation-rail links use inset outlines to prevent clipping, while Forced Colors preserves the system highlight.
- Footer navigation retains full touch targets while its focus indicator wraps only the visible text-and-icon label.
- Markdown fences are pre-tokenized with a fine-grained build-time Shiki adapter and rendered through the published Brick Code Block with language metadata, a compact stateful copy action, and a WCAG-qualified light/dark syntax palette; the deployed browser does not receive the tokenizer.
- Code Block overflow landmarks retain keyboard scrolling and receive unique article-scoped names such as `TSX code example 1`, preventing repeated-language examples from sharing one landmark label.
- Component-section Code Block landmarks include their component and section context so separately rendered document sections remain uniquely named.
- Icon-led Cards use one website-owned header composition with explicit spacing; Docs overview card actions use animated editorial links while the closing exploration CTA remains a primary Brick button.
- The Docs overview presents Getting Started, Theming, Composition, and Accessibility as one compact outcome-led learning route, with its introduction on one reading axis and cards sized by content.
- Each reader-facing guide begins with its own compact visual map whose uppercase eyebrow, primary title, and normal-case secondary body-large paragraph share one centered axis; quiet outlined metadata remains centered beneath the setup map before practical consumer examples or verification checkpoints.
- Every Docs-shell route, including guides and component pages, clearly retains the subtle branded grid around the introduction before fading it into an opaque semantic reading plane ahead of sustained content.
- Local search, light/dark appearance, responsive navigation, sitemap, robots,
  complete page metadata, structured data, social card, favicon, and
  AI-readable documentation are present.
- The site accent theme explicitly pairs purple solid actions with a white foreground in both appearances and verifies every solid interaction state at WCAG AA contrast.
- The reviewed dependency is `@flowstack-ui/brick@0.1.0` at source commit `3351412342c6e0cd6af9f7403e2e7535bdfe72a0`.

Local development uses port 3012. The paired automated browser-test port is 4012.
