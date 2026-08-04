# Performance contract

The website treats performance as a measured application concern. Local build
sizes are regression evidence, not a substitute for Vercel transfer headers,
Lighthouse lab results, or post-launch field Core Web Vitals.

## Component previews

Each of the 75 live examples owns a client module under `components/previews/`.
`ComponentPreview.tsx` contains only the dynamic registry and fallback, so a
component route loads its own preview rather than the implementation and Brick
subpaths for the entire catalog.

The August 4, 2026 native Next production build first changed the
representative Button route from 1,802,367 raw / 501,885 gzip JavaScript bytes
to 1,341,827 raw / 380,052 gzip by splitting previews. The later client-content
boundary pass reduced the largest current component route, Menubar, to 872,204
raw / 261,595 gzip without removing example behavior or reader content.

The build gate now limits every component route to 950,000 raw and 285,000
gzip JavaScript bytes. It also owns tighter homepage, catalog, and guide
budgets. Rebase those limits only from an explained dependency or architecture
decision; never raise them merely to make CI pass.

## Client content boundaries

Synchronized component Markdown is server-only. Catalog metadata, guide
content, package provenance, and component documents have separate modules so
a client import cannot silently promote the complete content graph into every
route bundle. Guide routes also use a shell that does not statically reference
the client-only component navigator.

Global search is split into two deferred layers. Its interface module loads
only after focus, pointer intent, Command/Control-K, or an explicit open. Its
20,289-byte raw / 5,732-byte gzip generated index is fetched only after the
dialog mounts. The content gate proves that the index is synchronized; the
performance gate proves that representative initial bundles contain neither
the dialog nor the full catalog or component-document payload.

## Lighthouse baseline and modular CSS adoption

The August 4 local production baseline scored 100 Performance on Lighthouse's
desktop profile. Its simulated mobile profile scored 94 with 1.5 s FCP, 3.1 s
LCP, 10 ms TBT, and 0 CLS. The LCP element was the server-rendered homepage
heading. The page did not have a blocking JavaScript or layout-instability
finding; the main critical-path cost was the complete Brick stylesheet plus
the website's global stylesheet.

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

Brick `0.1.2` implements the adopted backward-compatible path: `styles.css`
remains the complete one-import default, while `styles/core.css` and public
component-owner entrypoints support selective consumers. Composed component
entrypoints also include the shared visual recipes they render internally, so
direct loads do not depend on route history. The website pins that exact npm
release and `scripts/generate-brick-style-bundles.mjs` verifies the
installed version against both `package.json` and `content/brick-source.json`
before assembling disposable output under `app/.generated/`.

Loading every selected component entrypoint directly produced 19
render-blocking homepage CSS requests and regressed the simulated mobile score
to 92. The website therefore consolidates public Brick CSS into six
application-route bundles and one exact bundle for each preview module. It also
partitions the canonical website stylesheet at explicit `brick-bundle:*`
markers. A later attempt to extract a broad apparent Home section was rejected:
that source range also owned cross-route typography, actions, section rhythm,
and responsive contracts. The shared rules remain in the shell, and the
performance gate now asserts nine representative cross-route selectors so an
unsafe range split cannot silently remove them again. Generated files are
ignored and recreated during development and production builds.

The final local production route matrix uses Lighthouse 12.8.2's simulated
mobile profile. All six routes score 100 Accessibility, Best Practices, and
SEO with 0 CLS and at most 15 ms total blocking time:

| Route | Performance | FCP | LCP | Transfer |
| --- | ---: | ---: | ---: | ---: |
| Home | 97 | 1.1 s | 2.6 s | 240 KiB |
| Component catalog | 95 | 1.4 s | 2.9 s | 265 KiB |
| Getting Started guide | 97 median | 0.9 s | 2.6 s | 281 KiB |
| Button | 95 | 1.2 s | 2.9 s | 293 KiB |
| Menubar | 94 median | 1.2 s | 3.1 s | 313 KiB |
| Data Grid | 95 | 1.2 s | 2.9 s | 291 KiB |

The Home, guide, and Menubar values are medians of three qualified runs.
Desktop remains qualified at 100 Performance. A rounded 100 is not the optimization boundary:
the checked payload contracts and diagnostics below remain relevant even when
the score is already green.

The initial baseline for the same six routes transferred 252, 407, 451, 437,
455, and 435 KiB respectively. The final pass therefore removes roughly 12
KiB from Home and between 142 and 170 KiB from each catalog, guide, and
component route.

### Remaining Lighthouse diagnostics

| Diagnostic | Finding and ownership | Decision |
| --- | --- | --- |
| Render-blocking requests | Two intentional CSS files on product/guide routes and one additional exact preview stylesheet on component routes. The measured local dependency chain is only about 47 ms, although mobile simulation estimates a larger delay. | Keep the package/application separation. Whole-site inlining, 19 direct modular requests, and broad source-range extraction all regressed. Further critical-CSS work requires selector-level ownership, a bounded prototype, and visual qualification. |
| Reduce unused JavaScript | About 25–27 KiB is attributed exclusively to Next's shared App Router runtime chunk, not Brick, Atom, or website feature code. The actual website content leak was removed and is now regression-tested. | Track framework releases; do not fork generated runtime code or misclassify this as a library defect. |
| Legacy JavaScript | Lighthouse attributes 13,677 bytes of compatibility signals to Next's framework-owned polyfill module (`Array.at`, `flat`, `flatMap`, `Object.fromEntries`, `Object.hasOwn`, and `trimStart`/`trimEnd`). | Keep the supported-browser contract and reassess on Next upgrades. Do not delete framework polyfills from generated output. |
| Minify JavaScript / duplicate modules / cache / font display / third parties | All pass with no estimated savings. | Preserve as verification evidence. |
| Network dependency tree | The document points directly to local CSS; Lighthouse identifies no preconnect candidates. | Do not add speculative preconnects. |
| Forced reflow | Final Menubar runs contain no reportable forced-reflow item; total blocking remains 11–15 ms. | No Atom or Brick change is justified. Reopen only with a repeatable interaction trace. |

The previously protected Vercel preview confirms two HTTP/2 CSS transfers totaling 26,774
bytes and a 15,934-byte gzip homepage response. Its authentication boundary
prevents an unauthenticated remote Lighthouse run, so the local production
profiles and remote delivery/header checks are distinct pieces of evidence.
That preview predates the final content-boundary pass. Performance is accepted
only from repeated production-profile measurements;
a one-off rounded score is not a reason to hide content or weaken the product.

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
