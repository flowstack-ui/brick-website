# Changelog

## Unreleased

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

## 0.1.0 — 2026-08-02

- Established the independent Brick UI product website.
- Added the product narrative, live composition, 75-component catalog, guides, Themes, and Atom relationship pages.
- Added source provenance, AI-readable documentation, local search, responsive and appearance behavior, social artwork, and verification commands.
- Added a pinned public CI workflow and workspace-readable repository verification contract.
- Updated the Next, React server, Vite, and Cloudflare toolchain to patched releases and pinned safe PostCSS and Sharp transitive versions.
