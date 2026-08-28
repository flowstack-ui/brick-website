# Brick UI Website

The public product and documentation website for [`@flowstack-ui/brick`](https://www.npmjs.com/package/@flowstack-ui/brick).

Brick supplies finished React component recipes on top of Flowstack Atom's accessible behavior. This website proves that proposition with real package components, a complete public catalog, theme demonstrations, and source-backed documentation.

The `/blocks` catalog presents reviewed compiled previews of paid, editable
compositions. It contains no installable Block source, item Agent Knowledge,
source maps, install commands, or access tokens. Those remain behind the
separate authenticated Blocks registry.

## Requirements

- Node.js 22.13 or newer
- npm 10 or newer

## Commands

```bash
npm install
npm run dev             # http://127.0.0.1:3012
npm run dev:network     # LAN access on port 3012
npm run content:sync    # refresh public docs from ../package during maintenance
npm run verify          # content, types, lint, build, rendered routes
npm run check:release   # repository gate plus portable browser smoke tests
```

## Repository contract

- Production reads only committed files and the exact npm dependency. It never reads the sibling package checkout.
- `content/brick-source.json` records the reviewed Brick version and source commit.
- `content/components.json` and `content/component-docs.json` are generated from the 89 public component owners.
- `public/llms.txt` and `public/llms-full.txt` expose AI-readable public documentation.
- `content/blocks.json` contains only allowlisted public marketing and access
  metadata. `public/block-previews/` contains only digest-pinned compiled
  preview artifacts produced by the private Blocks repository.
- Local UI search uses the committed component and guide records; no hosted search service is required.

See [docs/README.md](docs/README.md) for the maintenance map.

The website declares the pinned `baseline 2023 with downstream` browser floor
and qualifies its public shell in current Chromium, Firefox, Playwright WebKit,
and mobile engine profiles. Physical Safari, iOS, Android, and assistive
technology remain separate manual evidence.
