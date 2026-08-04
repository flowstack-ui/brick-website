# Search discovery

The website keeps its search-facing identity in `app/lib/seo.ts`. Every public
route uses that typed boundary instead of independently assembling metadata.

## Canonical route contract

- Canonical origin: `https://brick-ui.com`.
- The homepage is `/`; every other route is slashless.
- Internal navigation, sitemap entries, generated AI documentation, canonical
  links, Open Graph URLs, and breadcrumb items use the same paths.
- Sitemap entries are generated from the committed guide and component
  manifests and contain only indexable routes.
- `llms.txt` and `llms-full.txt` remain readable but send
  `X-Robots-Tag: noindex` so consolidated documentation does not compete with
  its public pages.

## Page metadata

Every indexable route owns a unique title, concise description,
self-canonical, index/follow policy, page-specific Open Graph and Twitter
identity, and the canonical social image. Component descriptions are authored
separately from their longer visible package summaries.

The not-found route owns its own title and description, emits no canonical or
social URL, returns a real 404, and uses `noindex, nofollow`.

## Structured data

The homepage identifies:

- `WebSite`: Brick UI, with Brick as its alternate name;
- `Organization`: Swifty LLC as the accurate publisher; and
- `SoftwareSourceCode`: the exact Brick package, repository, license, version,
  languages, and supported React runtime.

Guide and component routes emit `BreadcrumbList` data that matches their real
navigation hierarchy. Do not add ratings, reviews, offers, FAQs, people,
profiles, or other schema fields without visible and verified source data.

Swifty logo and `sameAs` profiles remain intentionally absent until final
qualified brand assets and official public profiles are supplied.

## Verification

Rendered-route tests cover every public route and require:

- unique, bounded titles and descriptions;
- self-canonical and page-specific social URLs;
- complete social image metadata;
- no redirecting trailing-slash internal links;
- exact sitemap coverage;
- robots and AI-document indexing policy;
- parseable site, publisher, software, and breadcrumb JSON-LD; and
- real 404 status, recovery content, and noindex behavior.

Production launch still requires external Rich Results, Search Console, social
card, redirect, and crawl verification against the immutable Vercel candidate
and again against `brick-ui.com`.
