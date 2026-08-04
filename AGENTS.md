# AGENTS.md — Brick UI Website

This repository owns the independent public website for `@flowstack-ui/brick`.

## Read first

- `README.md`
- `CURRENT.md`
- `TODO.md`
- `docs/README.md`
- `content/brick-source.json`

## Durable rules

- Keep the repository independently installable and deployable. Runtime and production builds must not read from `../package`.
- Install Brick from npm at the exact version recorded in `content/brick-source.json`.
- Use Brick components for finished interface examples and Atom-owned behavior. Prefer public component subpath imports to keep route bundles narrow and package ownership explicit.
- Keep search local and content static. Do not introduce hosted search, CMS, analytics, or identity dependencies without approval.
- Maintain keyboard, reduced-motion, forced-colors, light/dark, narrow mobile, and wide layout behavior.
- Run `npm run verify` before completing implementation changes.
- Update `CURRENT.md`, `TODO.md`, and `CHANGELOG.md` when project state changes.

## Content synchronization

`npm run content:sync` is a maintainer command that reads the sibling Brick package documentation and commits the result here. The sibling checkout is never a production dependency.
