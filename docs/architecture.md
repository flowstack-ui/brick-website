# Architecture

The website is a vinext/React application deployed as a Cloudflare-compatible worker. It uses committed JSON and Markdown-derived content at build time and the exact published Brick npm package at runtime.

The sibling `../package` repository is an input to the maintainer-only synchronization script, never to the application build. This keeps a clean clone independently installable while preserving exact provenance.

Routes are intentionally separated by audience:

- `/` explains and demonstrates the product.
- `/components/` and `/components/[slug]/` expose the full component catalog.
- `/docs/` and `/docs/[slug]/` teach core workflows.
- `/themes/` demonstrates the semantic theme contract.
- `/atom/` explains the Atom/Brick ownership relationship.
