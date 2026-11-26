# ADR 0002 — Oxlint for code, Stylelint for CSS (instead of ESLint)

- **Status:** Accepted (approved by Martyna in PR #1, 2026-11-25)
- **Changes:** ADR 0001 planned ESLint

## Context

The current official Vite React template ships with **Oxlint**, a fast linter, instead of ESLint. Our most important design-system rule — _no raw colours in components_ — lives in CSS files, which a JavaScript linter does not check.

## Decision

- **Oxlint** for TypeScript/React code, with the `react`, `typescript` and `jsx-a11y` (accessibility) plugins.
- **Stylelint** for CSS, with `color-no-hex` and `color-named` enforced in `src/components`, `src/sections` and `src/pages`.
- **Prettier** for formatting.

## Consequences

- Fewer tools to configure: we keep the template's default instead of replacing it.
- The token rule is enforced by a machine, not only written in `AGENTS.md`.
- Trade-off: Oxlint has fewer third-party plugins than ESLint. If we need one, we can add ESLint later for that rule only.
