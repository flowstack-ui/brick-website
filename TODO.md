# TODO

## Next

- Add the qualified Swifty organization logo and verified public `sameAs`
  profiles to structured data when those final brand inputs are supplied.
- Grant the Vercel GitHub App access to the private repository and complete the
  project Git-source connection. The Vercel project, CLI deployment path, and
  protected immutable preview are already qualified.
- Repeat mobile and desktop Lighthouse plus visual interaction review in the
  authenticated final preview browser, then repeat delivery and crawl checks
  after the canonical domain is promoted. Local production Lighthouse and the
  remote protected route/header matrix are already qualified.
- Add backward-compatible modular CSS entrypoints to the published Brick
  package, qualify and release that package change, then replace the website's
  all-component root stylesheet with route-owned imports. A source-only proof
  reduced the homepage mobile LCP from 3.1 s to 2.1 s and raised Lighthouse
  Performance from 94 to 99; the website must not depend on sibling source or
  an unpublished package to retain that result.
- Split website-authored global CSS into shell and route-owned layers after the
  Brick modular entrypoints land, then remeasure the mobile score. Desktop is
  already 100; the remaining target is a repeatable mobile 100 without hiding
  content or relaxing functionality.
- Review page-level spacing rhythm across the home, catalog, guide, and component layouts.
- Deepen component examples with additional states and recipes as component work evolves.
- Complete owner visual review of the refined full-width component discovery, behavior-aware example stage, aligned navigator, usage guidance, API, token, and advanced-reference layouts across representative compact, expanding, overlay, form, interaction, and structural components.
- Correct the canonical Field quick-start documentation, which currently combines Label's automatic required marker with an explicit RequiredIndicator; then refresh the synchronized website content through the normal package-doc workflow.
- Add automated cross-browser visual and accessibility coverage when the browser runtime is available in CI.
- Connect the final `brick-ui.com` custom domain only after the Vercel preview
  passes the production-readiness audit.

## Later

- Test the page-aware documentation rail in a second reference product before extracting a reusable documentation-shell Block.
- Test the website-owned Shiki-to-Brick adapter, syntax palette, and stateful copy presentation in a second documentation product before deciding on a reusable adapter or Brick Theme contract.
- Test the searchable category navigator, narrow-screen documentation toolbar, and structured consumer-document adapter in Atom before deciding whether any anatomy belongs in a reusable Docs Block or content adapter.
- Introduce installable Brick themes when their package boundary is approved.
- Add Blocks as a first-class catalog only after the block contract exists.
- Link to future Flowstack packs without moving their ownership into this repository.
