# Design system

The site direction is **architectural warmth**: precise modular geometry without a cold developer-tool aesthetic.

- Iris purple is Brick's identifying accent.
- Warm ivory and charcoal make the system feel editorial and crafted.
- Amber and muted magenta appear only as supporting signals.
- A three-part masonry mark represents styled components assembled into larger products.
- Live interface compositions carry the proof; decorative artwork never substitutes for working components.
- Light and dark appearances remap semantic roles rather than swapping arbitrary colors.

The design supports reduced motion, forced colors, keyboard navigation, narrow mobile layouts, and large editorial screens.

## Product relationship

Brick remains the primary identity in global navigation, the homepage hero,
documentation, and component demonstrations. Flowstack appears only where it
helps explain the Atom-to-Brick product path. Swifty appears as a quiet
ownership endorsement in the global footer.

Until dedicated Flowstack and Swifty marks are approved, both relationships
use readable text rather than provisional artwork. The public language is
`Part of Flowstack` for ecosystem membership, `A Swifty product` for ownership,
and `Built on Atom` for Brick's released technical foundation.

## Responsive contract

Breakpoints follow content pressure rather than named devices. Components use
fluid sizing between these transitions; a breakpoint exists only when the
current composition no longer fits or reads comfortably.

| Width | Header contract | Page contract |
| --- | --- | --- |
| Above 1320px | Full centered navigation, labeled search with shortcut, appearance and GitHub actions | Homepage hero pairs its conversion column with the live composition |
| 1320px and below | Full header remains until its own content transition | Homepage conversion content owns the first viewport through its package badges; the titled live Brick composition follows in the same lane |
| 1180px and below | Primary navigation moves into the drawer; labeled search remains; the menu action appears | Documentation rail is removed; the Atom hero moves its complete layer visual below the copy before either column becomes cramped |
| 1080px and below | Header retains its 1180px contract | The theme story and Flowstack relationship story stack their copy above complete visuals before either column becomes cramped; the Flowstack pathway uses a centered full-width content lane |
| 900px and below | Header height reduces and search becomes icon-only; the complete Brick identity, version, appearance, GitHub, and menu remain available | Documentation becomes in-flow, dense demonstrations simplify, and the three-card promise grid stacks before its reading measure becomes cramped |
| 640px and below | Full wordmark and version remain visible while identity and action spacing compact; search becomes a full-screen task surface | One-column mobile compositions, 1rem gutters, full-width primary actions |

Responsive review must cover 1440px, the 1320px hero boundary, 1280px, the
1180px header boundary, the 1080px theme-story boundary, 1024px, the 900px boundary, 768px, the 640px boundary,
390px, and the supported 320px minimum.
At every width verify navigation reachability, action alignment, wrapping,
horizontal overflow, readable content order, and touch targets. Test both
appearances at 1440px and 390px, plus any width where a color or surface changes.
