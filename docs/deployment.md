# Deployment

- Development: `127.0.0.1:3012`
- LAN review: `0.0.0.0:3012`
- Automated browser preview allocation: `127.0.0.1:4012`

Run `npm run verify` before preview or production deployment. Vercel project
identifiers remain local to Vercel's ignored configuration; application
secrets belong in ignored environment files. Preview and generated deployment
URLs stay protected. The reviewed production deployment is live at the
canonical `brick-ui.com` apex; `www.brick-ui.com` permanently redirects to it
with status 308. Cloudflare remains authoritative DNS and uses the unproxied
Vercel records approved through Domain Connect.

`prebuild` regenerates ignored route and component-preview CSS bundles from the
exact published Brick dependency. A deployment must fail if the installed npm
version, the declared dependency, and `content/brick-source.json` disagree;
never bypass that provenance check by importing from the sibling package.

`vercel.json` pins the native Next.js framework preset so a newly created or
relinked project cannot fall back to generic static-output defaults. It does
not contain account, project, domain, or credential identifiers.

`package.json` declares the qualified desktop and iOS browser floor used by
Next's CSS optimizer. Keep iOS Safari explicit: WebKit still requires the
prefixed `-webkit-text-size-adjust` form for the Code Block mobile-sizing
contract. Rendered verification inspects the generated `.next` CSS chunks so a
source declaration that is removed during optimization cannot pass release.

The application emits `nosniff`, strict-origin referrer policy, frame denial,
and a least-privilege browser feature policy on every route. The social card
uses a bounded one-day browser cache with stale revalidation. Vercel owns TLS,
HSTS, compression, immutable fingerprinted-asset caching, and preview-level
`noindex` protection. A blocking Content Security Policy remains deferred until
a tested Next nonce strategy can preserve static-first rendering and hydration;
do not substitute a broad `unsafe-inline` script policy merely to claim CSP.

The one exception to page-level frame denial is the compiled artifact namespace
under `/block-previews/`. Those files use `SAMEORIGIN`, an explicit
same-origin-only `frame-ancestors` policy, no connections or form actions,
immutable caching, and a response-level noindex/noarchive policy. Never broaden
that exception to an application route or add `allow-same-origin` to the public
preview iframe sandbox. Compiled subresources permit anonymous cross-origin
reads because the sandbox gives the document an opaque origin; this does not
change the paid-source boundary because those reviewed compiled files are the
intentionally public artifact.

Vercel Web Analytics is the approved production measurement dependency. The
root layout uses `@vercel/analytics/next` only when `VERCEL=1`, so local and
non-Vercel builds do not request a nonexistent `/_vercel/insights/` endpoint.
Vercel Analytics is cookieless and does not collect or store visitors' IP
addresses. Speed Insights is not enabled because the current free account
allows only one enabled project; it is useful field telemetry, not a launch or
Lighthouse prerequisite.
