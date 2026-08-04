import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const css = await readFile(path.resolve(import.meta.dirname, "../app/globals.css"), "utf8");

function scope(pattern, label) {
  const match = css.match(pattern);
  assert(match, `Could not find the ${label} theme scope`);
  return match[1];
}

function token(source, name) {
  const match = source.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert(match, `Could not find ${name}`);
  return match[1];
}

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrast(first, second) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const light = scope(/:root\s*\{([\s\S]*?)\n\s*\}/, "light Studio");
const dark = scope(/:root\[data-brick-appearance="dark"\]\s*\{([\s\S]*?)\n\s*\}/, "dark Studio");

for (const [appearance, source] of [["light", light], ["dark", dark]]) {
  const foreground = token(source, "--brick-color-accent-on-solid");
  for (const state of ["solid", "solid-hover", "solid-pressed"]) {
    const background = token(source, `--brick-color-accent-${state}`);
    const ratio = contrast(foreground, background);
    assert(ratio >= 4.5, `${appearance} accent ${state} contrast is ${ratio.toFixed(2)}:1; expected at least 4.5:1`);
  }
  for (const [label, foregroundToken, backgroundToken] of [
    ["Brick layer caption", "--brick-color-accent-text", "--brick-color-accent-soft"],
    ["Atom layer caption", "--brick-color-surface-canvas", "--brick-color-text-primary"],
  ]) {
    const ratio = contrast(token(source, foregroundToken), token(source, backgroundToken));
    assert(ratio >= 4.5, `${appearance} ${label} contrast is ${ratio.toFixed(2)}:1; expected at least 4.5:1`);
  }
  for (const syntaxToken of ["foreground", "comment", "keyword", "string", "constant", "function", "type", "property", "punctuation"]) {
    const ratio = contrast(token(source, `--brick-syntax-${syntaxToken}`), token(source, "--brick-color-surface-subtle"));
    assert(ratio >= 4.5, `${appearance} syntax ${syntaxToken} contrast is ${ratio.toFixed(2)}:1; expected at least 4.5:1`);
  }
}

const lightSecondary = token(light, "--brick-color-text-secondary");
for (const surface of ["--brick-color-surface-base", "--brick-color-surface-subtle"]) {
  const background = token(light, surface);
  const ratio = contrast(lightSecondary, background);
  assert(ratio >= 4.5, `light secondary text on ${surface} is ${ratio.toFixed(2)}:1; expected at least 4.5:1`);
}

assert.match(css, /a:not\(\.brick-button\)\s*\{\s*color:\s*inherit/, "global link color must not override Brick Button links");
for (const selector of ["\\.shortcut", "\\.workspace-project small", "\\.footer-meta"]) {
  assert.match(css, new RegExp(`${selector}\\s*\\{[^}]*color:\\s*var\\(--brick-color-text-secondary\\)`), `${selector} must use secondary text on its tinted light surface`);
}
for (const selector of ["\\.guide-step-number", "\\.guide-setup-track small", "\\.guide-map-label", "\\.guide-a11y-map article small"]) {
  assert.match(css, new RegExp(`${selector}\\s*\\{[^}]*color:\\s*var\\(--brick-color-text-secondary\\)`), `${selector} must use qualified secondary text on its compact guide surface`);
}
assert.match(css, /\.brick-layer \.layer-copy small\s*\{\s*color:\s*var\(--brick-color-accent-text\)/, "Brick layer caption must use its paired accent foreground");
assert.match(css, /\.atom-layer \.layer-copy small,[^}]*color:\s*var\(--brick-color-surface-canvas\)/, "Atom layer copy must use its inverse surface foreground");
assert.match(css, /\.footer-version\s*\{\s*color:\s*var\(--brick-color-text-secondary\)/, "footer version must use qualified secondary text rather than muted compact text");

console.log("Verified Studio action and authored small-text contrast assignments.");
