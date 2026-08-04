# Performance contract

The website treats performance as a measured application concern. Local build
sizes are regression evidence, not a substitute for Vercel transfer headers,
Lighthouse lab results, or post-launch field Core Web Vitals.

## Component previews

Each of the 75 live examples owns a client module under `components/previews/`.
`ComponentPreview.tsx` contains only the dynamic registry and fallback, so a
component route loads its own preview rather than the implementation and Brick
subpaths for the entire catalog.

The August 4, 2026 native Next production build changed the representative
Button route from 1,802,367 raw / 501,885 gzip JavaScript bytes to 1,341,827
raw / 380,052 gzip bytes. That is a 25.5% raw and 24.3% gzip reduction without
removing any example behavior. The largest current component route is Menubar
at 1,421,862 raw / 406,246 gzip bytes.

The build gate limits every component route to 1,500,000 raw and 425,000 gzip
JavaScript bytes. Rebase those limits only from an explained dependency or
architecture decision; never raise them merely to make CI pass.

## Lighthouse baseline and CSS finding

The August 4 local production baseline scores 100 Performance on Lighthouse's
desktop profile. Its simulated mobile profile scores 94 with 1.5 s FCP, 3.1 s
LCP, 10 ms TBT, and 0 CLS. The LCP element is the server-rendered homepage
heading. The page does not have a blocking JavaScript or layout-instability
finding; the main critical-path cost is the complete Brick stylesheet plus the
website's global stylesheet.

Inlining the complete CSS with Next's experimental `inlineCss` option was
rejected. It increased the document transfer to roughly 218 KB, raised total
transfer to roughly 500 KB, worsened FCP, and left Performance at 94 while also
weakening repeat-visit caching.

A disposable source-only prototype bundled Brick foundations and only the
components used by the shell and homepage. It reduced the Brick CSS transfer
from roughly 49.7 KB to 16.3 KB, improved mobile LCP from 3.1 s to 2.1 s, and
raised Performance from 94 to 99 while retaining 100 Accessibility, Best
Practices, SEO, and Agentic Browsing. The prototype was removed because a
production website cannot read or copy package-private component CSS.

The adopted path is backward-compatible public modular Brick CSS: retain
`styles.css` as the complete one-import default, add an optional foundation
entrypoint plus component-owned style entrypoints, release them through the
Brick package, and let the website load only the styles its route needs. The
remaining website-authored global CSS can then be split by shell and route.
Performance is accepted only from repeated production-profile measurements;
a one-off rounded Lighthouse score is not a reason to hide content or weaken
the product.

## Social image

The canonical 1200×630 social artwork is a visually qualified JPEG at 110,597
bytes. It replaces the equivalent 1,048,254-byte PNG, reducing transfer size by
89.5% while retaining the approved composition and legible embedded text. The
build gate requires the asset to remain 1200×630 and at or below 200,000 bytes.

## Launch verification

The immutable Vercel candidate must still verify actual Brotli/gzip transfer,
cache headers, request count, Lighthouse performance, layout stability, and
interaction latency on the representative route matrix. Those deployment and
field results remain the authority for further optimization.
