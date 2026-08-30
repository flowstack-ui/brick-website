# Testing

Use `npm run check:repository` for content, Theme, type, lint, build,
performance, and rendered-output verification. Use `npm run check:release` to
add the public-shell browser matrix on reserved port `4012`.

The website pins `baseline 2023 with downstream`. Its portable matrix covers
current Chromium, Firefox, Playwright WebKit, mobile Chromium, and mobile
WebKit. These profiles prove engine behavior and responsive containment; they
do not replace physical Safari, iOS, Android, browser-chrome, permission, or
assistive-technology evidence.

`npm run blocks:check` independently verifies the paid preview boundary before
the application build: exact artifact allowlist, deterministic digest, no
source maps or authoring paths, no item Agent Knowledge, no token material, and
no public paid install command. Browser release coverage then verifies that
the sandbox renders, the paid source remains locked, and preview/page response
headers preserve their different framing policies.

`npm run source-components:check` independently applies the same fixed-file,
digest, provenance, source-map, authoring-path, item-guidance, install-command,
receipt, and token leak checks to the paid Rich Text Editor preview. Release
browser coverage verifies its same-origin/no-network headers, sandboxed iframe,
editable textbox, narrow-screen containment, and serious/critical axe result.
