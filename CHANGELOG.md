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

## 0.1.0 — 2026-08-02

- Established the independent Brick UI product website.
- Added the product narrative, live composition, 75-component catalog, guides, Themes, and Atom relationship pages.
- Added source provenance, AI-readable documentation, local search, responsive and appearance behavior, social artwork, and verification commands.
- Added a pinned public CI workflow and workspace-readable repository verification contract.
- Updated the Next, React server, Vite, and Cloudflare toolchain to patched releases and pinned safe PostCSS and Sharp transitive versions.
