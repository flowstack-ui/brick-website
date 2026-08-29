# AGENTS.md — Brick UI Website

This repository owns the independent public website for `@flowstack-ui/brick`.

## Read first

- `README.md`
- `CURRENT.md`
- `TODO.md`
- `docs/README.md`
- `content/brick-source.json`

## FLOWSTACK Agent Workflows

Choose the primary workflow before doing task work. Review-only or diagnostic
requests use `$flowstack-ui-review`. Cross-repository package release,
dependency provenance, or Agent Knowledge synchronization uses
`$flowstack-ui-maintainer`. Implementation from a supplied Blueprint or
explicit application plan uses `$flowstack-ui-compose`. Other website,
component-example, or Block-preview implementation uses
`$flowstack-ui-builder`. The more specific route wins; a missing public package
capability is returned to Maintainer instead of being recreated in website
code.

If the matching skill is not discoverable, read its canonical `SKILL.md` from
an installed or checked-out `flowstack-ui/agent-tools` repository and follow
that workflow manually. If neither is available, preserve the mapping, use the
configured exact-version FLOWSTACK MCP and installed package Agent Knowledge,
and report the missing skill instead of substituting remembered guidance.

## Durable rules

- Keep the repository independently installable and deployable. Runtime and production builds must not read from `../package`.
- Install Brick from npm at the exact version recorded in `content/brick-source.json`.
- Use Brick components for finished interface examples and Atom-owned behavior. Prefer public component subpath imports to keep route bundles narrow and package ownership explicit.
- Treat `app/.generated/` as disposable build output. Never edit or commit it;
  `npm run styles:sync` regenerates route and preview CSS bundles exclusively
  from the exact published Brick dependency and the marked sections of
  `app/globals.css`.
- Keep the `brick-bundle:*` markers in `app/globals.css` balanced. They are the
  canonical ownership boundaries for website-authored route CSS, not copied
  stylesheets or package-private imports.
- Keep search local and content static. Do not introduce hosted search, CMS, analytics, or identity dependencies without approval.
- Maintain keyboard, reduced-motion, forced-colors, light/dark, narrow mobile, and wide layout behavior.
- Run `npm run verify` before completing implementation changes.
- Update `CURRENT.md`, `TODO.md`, and `CHANGELOG.md` when project state changes.

## Content synchronization

`npm run content:sync` is a maintainer command that reads the sibling Brick package documentation and commits the result here. The sibling checkout is never a production dependency.
