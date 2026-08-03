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
}

console.log("Verified Studio solid-accent contrast in light and dark interaction states.");
