# Testing

Use `npm run check:repository` for content, Theme, type, lint, build,
performance, and rendered-output verification. Use `npm run check:release` to
add the public-shell browser matrix on reserved port `4012`.

The website pins `baseline 2023 with downstream`. Its portable matrix covers
current Chromium, Firefox, Playwright WebKit, mobile Chromium, and mobile
WebKit. These profiles prove engine behavior and responsive containment; they
do not replace physical Safari, iOS, Android, browser-chrome, permission, or
assistive-technology evidence.
