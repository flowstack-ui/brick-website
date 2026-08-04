# Current state

Brick UI Website is implemented as a multi-route product and documentation site.

- Home page demonstrates a composed, stateful website-project workspace made from the published Brick package, with a conversion-first stacked viewport and a compact mobile presentation.
- All 75 component owners have routes sourced from reviewed package documentation and a dedicated live example built from that component's public package export.
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
- Icon-led Cards use one website-owned header composition with explicit spacing; Docs overview card actions use animated editorial links while the closing exploration CTA remains a primary Brick button.
- The Docs overview presents Getting Started, Theming, Composition, and Accessibility as one outcome-led learning route instead of four undifferentiated destinations.
- Each reader-facing guide begins with its own compact visual map and follows with practical consumer examples or verification checkpoints; maintenance evidence remains outside this guide layer.
- Every Docs-shell route, including guides and component pages, clearly retains the subtle branded grid around the introduction before fading it into an opaque semantic reading plane ahead of sustained content.
- Local search, light/dark appearance, responsive navigation, sitemap, robots, social card, favicon, and AI-readable documentation are present.
- The site accent theme explicitly pairs purple solid actions with a white foreground in both appearances and verifies every solid interaction state at WCAG AA contrast.
- The reviewed dependency is `@flowstack-ui/brick@0.1.0` at source commit `3351412342c6e0cd6af9f7403e2e7535bdfe72a0`.

Local development uses port 3012. The paired automated browser-test port is 4012.
