// Deterministic WCAG contrast check for semantic colour pairs.
// Reads generated tokens (src/tokens/tokens.json) — run `npm run tokens` first.
// Fails (exit 1) if any pair is below its required ratio.
import { readFileSync } from 'node:fs';

const tokens = JSON.parse(readFileSync(new URL('../src/tokens/tokens.json', import.meta.url)));

// [foreground, background, minimum ratio, why]
const PAIRS = [
  ['color-text-default', 'color-background-default', 4.5, 'body text on page'],
  ['color-text-muted', 'color-background-default', 4.5, 'secondary text on page'],
  ['color-text-muted', 'color-background-subtle', 4.5, 'secondary text on subtle section'],
  ['color-text-link', 'color-background-default', 4.5, 'links on page'],
  ['color-text-error', 'color-background-default', 4.5, 'error text'],
  ['color-text-inverse', 'color-background-inverse', 4.5, 'text on dark section'],
  ['color-text-default', 'color-audience-kids-surface', 4.5, 'text on kids section'],
  ['color-text-default', 'color-audience-family-surface', 4.5, 'text on family section'],
  ['color-text-default', 'color-audience-adults-surface', 4.5, 'text on adults section'],
  ['color-action-primary-text', 'color-action-primary-bg', 4.5, 'primary button'],
  ['color-action-primary-text', 'color-action-primary-bg-hover', 4.5, 'primary button hover'],
  ['color-action-secondary-text', 'color-action-secondary-bg', 4.5, 'secondary button'],
  ['color-action-secondary-text', 'color-action-secondary-bg-hover', 4.5, 'secondary button hover'],
  ['color-border-default', 'color-background-default', 3, 'meaningful borders (WCAG 1.4.11)'],
  ['color-focus-ring', 'color-background-default', 3, 'focus ring (WCAG 2.4.13)'],
  ['color-audience-family-accent', 'color-background-default', 3, 'family accent as UI element'],
  ['color-audience-adults-accent', 'color-background-default', 3, 'adults accent as UI element'],
];

const lum = (hex) => {
  const c = hex
    .replace('#', '')
    .slice(0, 6)
    .match(/../g)
    .map((x) => parseInt(x, 16) / 255);
  const [r, g, b] = c.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

let failed = 0;
for (const [fg, bg, min, why] of PAIRS) {
  const camel = (s) => s.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
  const a = tokens[fg] ?? tokens[camel(fg)];
  const b = tokens[bg] ?? tokens[camel(bg)];
  if (!a || !b) {
    console.error(`✘ missing token: ${!a ? fg : bg}`);
    failed++;
    continue;
  }
  const r = ratio(a, b);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? '✔' : '✘'} ${r.toFixed(2).padStart(5)} : 1 (min ${min}) ${why} — ${fg} on ${bg}`,
  );
}
if (failed) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log('\nAll contrast checks passed.');
