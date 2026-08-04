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
