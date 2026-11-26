# Design tokens

Source of truth for colour, typography, spacing, radius, shadow and breakpoints.
Format: [W3C Design Tokens (DTCG) 2025.10](https://www.designtokens.org/). Built by [Style Dictionary](https://styledictionary.com/) with `npm run tokens`.

| Tier      | Folder       | Named by                 | Example                                                | Who uses it                        |
| --------- | ------------ | ------------------------ | ------------------------------------------------------ | ---------------------------------- |
| Primitive | `primitive/` | what it is               | `color.brand.violet.600` = `#8715FC`                   | Only semantic and component tokens |
| Semantic  | `semantic/`  | its purpose              | `color.action.primary.bg` → `{color.brand.violet.600}` | Components, sections, pages        |
| Component | `component/` | one component's decision | `button.radius` → `{radius.pill}`                      | That component only                |

## Rules

- Components use **semantic or component tokens** in CSS: `var(--color-action-primary-bg)`. Enforced by Stylelint: no hex, no named colours, no primitive colour, font-family or font-size variables in `src/components`, `src/sections`, `src/pages`.
- Exceptions: spacing (`--space-*`) and radius (`--radius-*`) primitives may be used directly — they have no semantic layer yet.
- Every token has a `$description` when its use is not obvious.
- Colour pairs used for text are checked automatically by `npm run tokens:check` (WCAG AA: 4.5:1 text, 3:1 large text and UI).
- Changing a token is a 🔒 protected change: it needs human approval in a pull request (see `AGENTS.md`).

## Output (generated — never edit by hand, not committed)

- `src/tokens/tokens.css` — CSS custom properties
- `src/tokens/tokens.ts` — TypeScript constants
- `src/tokens/tokens.json` — flat values for scripts and docs
