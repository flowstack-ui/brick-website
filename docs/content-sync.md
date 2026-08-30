# Content synchronization

Run `npm run content:sync` only from a workspace where `../package` is the reviewed Brick source checkout. The script:

For an isolated release checkout, set `FLOWSTACK_BRICK_PACKAGE_ROOT` to that
checkout before running the same command. The recorded version and commit must
identify the exact public release being adopted.

1. Reads the 95 package-owner documentation folders.
2. Produces committed catalog and full-document records, then appends only the
   reviewed allowlisted metadata for source-installed components.
3. Records the package version and exact Git commit.
4. Regenerates `llms.txt` and `llms-full.txt`.

`llms.txt` remains Brick's concise website mirror. It links to
`https://agents.brick-ui.com/llms.txt` as the unified, version-aware public
Agent Knowledge entrypoint without copying that corpus or changing package
authority. `llms-full.txt` remains a website-only consolidation of synchronized
human component documentation; it is not a unified FLOWSTACK knowledge dump.

Review and commit every generated change. `npm run content:check` verifies the committed records against the installed package without requiring the sibling checkout.

Source-installed component metadata is maintained separately in
`content/source-components.json`. Its compiled preview must be exported from
the pinned private Blocks revision, copied into `public/component-previews/`,
and pass `npm run source-components:check`. Never synchronize editable source,
item Agent Knowledge, private dependency/API details, or usable install
commands into this repository.

The committed full-document record is intentionally broader than the primary
website reading path. Component routes parse its named sections at render time:

- consumer guidance, setup, recipes, API, accessibility, responsive behavior,
  customization, and tokens remain in the main guide;
- DOM ownership and native composition remain available as optional advanced
  reference;
- evidence, playground protocols, tests, and complete changelogs stay in the
  package repository and are exposed as maintainer-resource links.

This presentation adapter must not become a second documentation authority.
Change public component facts in the package documentation, synchronize them,
and let the route adapter determine audience-appropriate placement.
