# Changelog

## 2026-08-04 — llms.txt discovery contract

- Replaced unlabeled URL entries with descriptive Markdown links that follow the
  emerging `llms.txt` proposal and satisfy Lighthouse's agentic-discovery audit.
- Added primary guide links, component descriptions, and an optional section for
  the complete reference, Atom foundation, and public Brick source.
- Added content and rendered-response assertions that prevent bare-link regressions.
- Pinned the deployment runtime to the Node 22 release line so Vercel cannot
  silently advance the website to an unqualified future major.
- Aligned GitHub Actions with the same Node 22 release line used locally and on
  Vercel.
- Removed the header and drawer brand links' conflicting forced accessible name;
  their visible Brick name and version now provide the label directly.

## Unreleased

- Upgraded the exact reviewed dependency to published
  `@flowstack-ui/brick@0.1.1` and adopted its public modular CSS entrypoints.
  Added deterministic predev/prebuild generation of consolidated shell,
  route, and per-preview bundles from the installed package, with provenance
  validation and repository-contract guards against full or sibling-source
  imports.
- Partitioned website-authored CSS without duplicating its canonical source,
  reduced the homepage to two render-blocking CSS requests, and improved the
  repeatable local simulated-mobile result from 94 to 96 (FCP 1.5 s to 1.1 s,
  LCP 3.1 s to 2.8 s) while retaining desktop Performance 100, zero CLS, and
  full Accessibility and Best Practices scores.
- Integrated the owner-enabled Vercel Web Analytics product through its native
  Next.js adapter, restricted emission to Vercel builds so local development
  remains free of failed insights requests, and added a repository-contract
  guard for the integration.
- Qualified Lighthouse separately on mobile and desktop: desktop Performance
  is 100, while mobile is 94 with a text LCP and negligible blocking/layout
  work. Rejected whole-site CSS inlining after it worsened transfer and FCP;
  recorded a disposable modular Brick CSS proof that raised mobile to 99 and
  the package-first route required to retain it safely.
- Added verified baseline browser security headers across every route and a
  bounded social-card cache policy, while explicitly preserving CSP as a
  nonce-strategy decision instead of shipping a misleading broad inline allow.
- Pinned the Vercel framework preset to native Next.js so new and relinked
  deployments cannot inherit generic static-project defaults.
- Split all 75 component examples into route-scoped dynamic client modules,
  reducing representative component-route JavaScript by 25.5% raw and 24.3%
  gzip; replaced the 1.05 MB social PNG with a visually qualified 111 KB JPEG;
  and added build-time budgets for every component route plus the canonical
  social image dimensions and size.
- Centralized production discovery metadata for all 84 indexable routes with
  unique search titles/descriptions, self-canonicals, page-specific Open Graph
  and Twitter cards, slashless internal and generated URLs, exact sitemap and
  robots policy, noindexed AI-document aggregates, accurate WebSite/Swifty LLC/
  SoftwareSourceCode/Breadcrumb JSON-LD, repaired legacy demo references, and
  exhaustive rendered-route verification. Rebuilt the real 404 as a responsive
  missing-brick recovery composition with dedicated noindex metadata and no
  inherited canonical or social identity.
- Migrated the finished product from the temporary vinext/Vite/Sites worker
  shell to native Next.js App Router, retained static generation for all 88
  routes, replaced worker-import HTML checks with an owned Next production
  server on port 4012, removed obsolete Cloudflare/Vite dependencies and
  hosting artifacts, and restored a zero-vulnerability clean-install CI graph.
- Closed open component-navigation drawers when their Brick `lg` responsive boundary leaves the layout, aligned the component docs toolbar to that breakpoint, and increased category and component labels to a readable mobile navigation scale.
- Corrected documentation table overflow so wide API content scrolls horizontally on narrow screens, kept component previous/category/next navigation in one compact mobile row, and stacked the maintainer icon and title on a true center axis above a single row of resource actions.
- Moved the keyboard-scrollable Code Block content outline farther inward and matched its lower corner radii to the clipped root so its focus indicator remains complete through both rounded corners without changing the Copy action.
- Moved the component rail's Input and Accordion focus indicators inside their geometry so the independently scrollable navigation no longer clips keyboard focus at either inline edge, including Forced Colors.
- Migrated component-rail destinations to client navigation and preserved the desktop rail's independent scroll position across component routes, while allowing each newly opened component article to begin at its introduction.
- Corrected compact and overlay example centering by shrink-wrapping their neutral specimen owner, and added a restrained appearance-aware contrast pedestal for compact, form, overlay, and expanding previews so transparent controls remain legible over the colorful stage.
- Increased the component stage's visual separation with a bright pastel light gradient and a saturated purple-blue dark gradient so examples remain clearly legible instead of sinking into the surrounding dark canvas.
- Replaced the generic dotted component canvas and one-off layout exceptions with one light/dark architectural example stage, explicitly classified all 75 component owners across six behavior modes, kept disclosures top-anchored while the stage grows downward, and preserved natural trigger sizing, full-width structures, responsive geometry, and Forced Colors.
- Anchored the desktop search dialog to a stable safe viewport offset so changing result counts only move its bottom edge, while preserving the full-screen narrow-mobile composition.
- Connected the Command/Control-K search dialog to Brick Dialog's explicit `initialFocus` contract so its search input is immediately ready for typing without racing native autofocus.
- Renamed the public Docs destination to Guides across desktop, mobile, metadata, and overview identity, and removed the duplicated component catalog and category links from the Guides rail while retaining the established `/docs/` URLs.
- Replaced the ambiguous grid icon between component pagination links with a clearly labeled, quiet category-return control.
- Normalized Source docs, Changelog, and Playground as one equally weighted set of external maintainer links.
- Corrected the Field live example to rely on Label's automatic required-state indicator instead of composing a duplicate RequiredIndicator.
- Kept catalog outcome arrows attached to their action labels so they no longer read as detached edge decoration.
- Corrected the component-discovery explanation to normal-case secondary body typography instead of inheriting the purple uppercase eyebrow treatment.
- Removed the redundant divider above the first API subsection while retaining separation between later API parts.
- Routed playground-only source Examples sections, including Visually Hidden, to the shared Maintainer resources footer while preserving substantive example sections.
- Corrected the Swipeable Item preview with padded responsive content and bounded small ghost actions so its interactive state remains fully legible.
- Gave Data Grid, Tree, and Tree Grid a natural-height full-width structure canvas; added complete outlined data and a real Tree Grid child row so expansion grows downward without recentering the preview.
- Rebuilt the Sidebar preview as a finished Northstar application shell with structured Nav List navigation, branded regions, main-content controls, responsive metrics, and an honest offcanvas collapse state.
- Rebuilt the Context Menu preview trigger as a clearly dashed project-canvas interaction region with purposeful content and explicit pointer and keyboard instructions.
- Rebuilt Hover Card as a related profile trigger and structured passive profile preview with an Arrow, and gave Menubar commands their proper label/shortcut anatomy and stable popup width.
- Moved generic example width onto a neutral specimen wrapper so Popover, Tooltip, Dropdown Menu, and other hostless-root triggers retain their natural control width.
- Replaced the Navigation Menu's ordinary live-route links and empty Viewport with real Guides and Components disclosure triggers, populated destination panels, Indicator, and in-place example links.
- Separated the Hover Card trigger's profile identity from its preview affordance, and anchored Collapsible to a natural-height canvas so disclosure content opens downward without moving its trigger.
- Removed the redundant Docs rails from the component catalog, rebuilt its no-results treatment as query-aware guidance, and let discovery results use the full reading width.
- Simplified and aligned the component navigator, replaced the dense two-column usage comparison with a single readable decision lane, and moved advanced-reference framing back to normal-case prose.
- Gave API content a proper public-contract introduction, roomier tables, and named subsections for compound APIs; grouped dense stable-class and token runs into scannable technical clusters.
- Rebuilt the 75-component catalog as an outcome-led discovery hub with scoped search, accessible category filters, compact results, and an explicit empty state.
- Added a searchable, route-aware component navigator with collapsible Brick category groups, current-page state, category return paths, and responsive Components/On-this-page drawers.
- Reorganized every component route into a consumer-first reading path while keeping package docs canonical; maintainer evidence and full changelogs now remain linked resources instead of inline article content.
- Added Brick Breadcrumb and category-relative previous/category/next navigation so component readers retain meaningful context when arriving from search or moving between peers.
- Rendered Markdown API matrices through Brick Table and inline identifiers through Brick Code with semantic CSS-token, attribute, command, component, and value treatments while retaining the existing highlighted Brick Code Block adapter.
- Grouped DOM ownership and native composition under optional advanced disclosures and gave accessibility, styling, usage guidance, and maintainer resources distinct Brick-powered presentation surfaces.
- Scoped `nodejs_compat` to local development so Cloudflare emulation can run while production uses the hosting platform's compatibility default.
- Reframed the Themes comparison and token sections as a coordinated semantic system, tightened their transitions, and replaced the grid-transparent secondary action with the homepage's quiet filled treatment.
- Moved the Themes closing callout to its stacked full-width composition at the 900px content-pressure breakpoint so its copy and complete install command remain readable.
- Raised both documentation rails from compact metadata sizing to readable rem-based navigation text, increased target height and line height, and preserved their existing zoom-responsive reflow boundaries.
- Prefixed the Docs overview release with `v`, standardized icon-led Card headers across three routes, replaced padded ghost actions inside cards with animated editorial links, and retained primary-button emphasis for the closing exploration CTA.
- Added a shared documentation reading plane that visibly retains the subtle branded grid around page introductions and fades to an opaque semantic canvas before long-form content and component examples.
- Replaced the generic Docs right rail with page-aware section navigation generated from overview cards, guide Markdown headings, catalog categories, and component documentation; the rail now tracks the active section and exposes it with `aria-current`.
- Unified authored focus indicators through the semantic purple focus token and moved documentation-rail outlines inward so scroll containers cannot clip their left or right edges; Forced Colors continues to use the system highlight.
- Kept footer destinations touch-friendly while moving their visible focus ring onto the compact text-and-icon label instead of the expanded mobile link row.
- Added a build-time Shiki adapter for the website's six documented language families, migrated Markdown fences onto the published Brick Code Block, and introduced a restrained WCAG-qualified light/dark syntax palette without shipping the tokenizer to browsers or Brick core.
- Upgraded documentation Code Blocks from a generic text copy control to a stable-width icon-and-label action with copying, copied, and retry states driven by Atom's existing clipboard status contract.
- Reframed the Docs overview as an outcome-led four-guide learning route and gave Getting Started, Theming, Accessibility, and Composition distinct visual maps plus practical setup, theming, accessibility, and ownership guidance for package consumers.
- Tightened the overview learning-route cards to their natural content height, moved its supporting description below the title, increased visual-guide summary clarity, and replaced nested filled setup badges with quiet outlined metadata.
- Centered every guide-map eyebrow, title, and balanced body-large summary as one visual introduction, and restored the outlined setup qualities to their centered position beneath the three-step map.
- Corrected guide summaries to render as full-width centered paragraphs with secondary text color so they no longer inherit the uppercase eyebrow treatment, and explicitly centered full-width guide titles so longer Theming and Composition headings align when wrapped.
- Gave every documentation Code Block overflow landmark a readable language-and-ordinal label so multiple examples of the same language remain uniquely identifiable.
- Replaced category-level component placeholders with dedicated examples for all 75 component routes.
- Added a content-contract check that prevents component routes from shipping without an explicit preview.
- Corrected solid accent-button contrast by defining the paired white foreground token in light and dark appearances.
- Darkened the Studio dark-appearance accent interaction scale and added automated WCAG AA contrast verification for solid actions.
- Gave the homepage theme swatches valid grouped-image semantics and a descriptive accessible name.
- Replaced the homepage demo's nested main landmark with a named section and repaired its internal heading hierarchy.
- Prevented the website's global anchor rule from overriding Brick Button-link foregrounds and strengthened meaningful small text on light tinted surfaces.
- Kept the embedded Studio theme demonstrations synchronized with the qualified dark accent interaction scale.
- Corrected the Atom relationship diagram's caption contrast in both appearances and gave the grouped diagram valid image semantics.
- Made the browser favicon host-relative and removed the duplicate shortcut declaration so preview deployments do not request the unresolved future custom domain twice.
- Added stable browser identity and explicit search semantics to the homepage workspace filter and site-search field.
- Implemented the advertised Command/Control-K search shortcut, aligned the header action cluster and compact search icon, replaced the generic code glyph with the GitHub mark, and documented content-driven responsive breakpoints.
- Rebuilt the mobile drawer as a branded, route-aware Brick composition with semantic surface treatment, aligned and comfortably spaced icon navigation, product resources, a centered action footer, and a full-screen narrow-mobile state.
- Reworked the homepage hero around viewport height so its complete conversion column remains visible on ordinary desktops while the live workspace compresses only to a usable minimum and may continue naturally on shorter layouts.
- Moved the hero composition transition ahead of workspace crowding, aligned its stacked content lane, gave the secondary action a quiet filled surface, and made the narrow demonstration explicitly identify itself as a live Brick composition.
- Refined the stacked hero into a conversion-first viewport, replaced its line separator with whitespace, presented package qualities as neutral badges, titled the live Northstar section, protected the gradient headline punctuation, and prefixed the release version with `v`.
- Made the Northstar sidebar, preview, settings handoff, and publishing preference genuinely interactive; added Brick identity to its title bar; simplified its owner presence; and corrected the auto-publish card’s action scale and alignment.
- Centered the package-quality badges only at the 640px narrow-mobile transition and added explicit spacing between each badge icon and label.
- Gave the responsive search trigger a stable accessible name when its visible label collapses at the icon-only breakpoint.
- Rebuilt the Northstar Preview and Publish dialogs with consistent icon-led headers, a structured preview summary, a launch checklist, and balanced actions instead of stretched status badges.
- Rebuilt search as a structured command surface with a dedicated header and close action, grouped component and guide results, separated rows, an honest result-count footer, an empty state, and a full-screen narrow-mobile presentation.
- Tightened the transition into The Brick Promise, aligned its heading on one centered axis, authored feature-card icon spacing, reduced card dead space, and replaced padded ghost actions with precise editorial links.
- Explicitly centered The Brick Promise title and description through Brick Text alignment props so their different measure widths share one visible axis.
- Balanced The Brick Promise copy on one shared measure and moved its three-card layout to a content-driven 900px stack transition.
- Replaced The Brick Promise's centered pyramid with an editorial introduction aligned to the feature-card grid.
- Replaced the separate dark-tile favicon artwork with a larger transparent rendering of the established three-part Brick mark.
- Tightened the promise-to-theme transition, gave the theme action a quiet filled surface over the page grid, and stacked the theme comparison at its 1080px content-pressure boundary.
- Tightened the theme-to-catalog transition and replaced oversized generic icon tiles with a compact, labeled component constellation centered on the source-backed catalog count.
- Isolated the catalog constellation's internal blueprint grid on an opaque semantic surface so it no longer overlaps the page grid.
- Reworked the narrow-mobile footer around one centered axis with a stable two-column destination grid, touch-friendly link height, and centered metadata.
- Added the source-backed version badge beside the complete footer wordmark and kept both visible at every responsive size.
- Kept the complete header wordmark and source-backed version visible through the supported 320px minimum by compacting spacing instead of hiding identity.
- Added a supporting Flowstack product-path explanation to the Atom relationship page and a persistent `Part of Flowstack · A Swifty product` footer endorsement without changing the Brick-owned header or hero.
- Replaced the Atom hero's flattened perspective rectangles with a connected, readable three-node layer composition and strengthened the light-appearance footer version foreground.
- Removed the Atom layer frame's competing internal grid while retaining an opaque surface and soft depth treatment over the page grid.
- Raised the Atom hero, added explicit description-to-action spacing, and moved its layer visual below the copy at the 1180px content-pressure boundary with tighter mobile rhythm.
- Moved the Flowstack relationship story to one centered, near-full-width lane at 1080px before its two-column composition becomes squeezed.
- Rebuilt the Clear Ownership introduction with explanatory copy, a shared centered card lane, tighter section transition, and comfortable icon-to-title spacing.
- Kept the final `Start with Brick` action on one line by assigning intermediate-width compression to the wrapping copy column.
- Replaced the Themes hero's distorted playful orbit with a true circular semantic instrument and repaired eyebrow-icon and description-to-action spacing.
- Removed the obsolete explicit `nodejs_compat` flag after the hosting platform made that compatibility mode the default.

## 0.1.0 — 2026-08-02

- Established the independent Brick UI product website.
- Added the product narrative, live composition, 75-component catalog, guides, Themes, and Atom relationship pages.
- Added source provenance, AI-readable documentation, local search, responsive and appearance behavior, social artwork, and verification commands.
- Added a pinned public CI workflow and workspace-readable repository verification contract.
- Updated the Next, React server, Vite, and Cloudflare toolchain to patched releases and pinned safe PostCSS and Sharp transitive versions.
