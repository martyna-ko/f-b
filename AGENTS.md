# AGENTS.md

Instructions for AI agents (Claude Code, Copilot, Cursor, any agent) working in this repository.
Humans: see `README.md`. This file is the **single source of agent rules** — `CLAUDE.md` only points here.

## 1. What this project is

Find Balans is an AI-native design system and website for a real movement studio in Warsaw (aerial hammocks, aerial hoop, dance, yoga), built as a **portfolio case study**. Two audiences: **parents** looking for children's classes and **adults** looking for classes for themselves. Languages: **English (primary), Polish (secondary)**.

## 2. Repository map

| Path              | Contents                                                                                    | Edit?                                   |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------------------- |
| `tokens/`         | Design tokens, W3C DTCG format (`*.tokens.json`): `primitive/` → `semantic/` → `component/` | 🔒 human approval                       |
| `src/tokens/`     | **Generated** from `tokens/` — never edit by hand                                           | ❌ generated                            |
| `src/styles/`     | Global CSS (reset, base typography)                                                         | ✅                                      |
| `src/components/` | Reusable UI components, one folder each                                                     | ✅                                      |
| `src/sections/`   | Page sections built from components                                                         | ✅                                      |
| `src/pages/`      | Pages built from sections                                                                   | ✅                                      |
| `src/i18n/`       | Language switching                                                                          | ✅                                      |
| `content/`        | All site text and business data (`en.json`, `pl.json`, `classes.json`)                      | 🔒 human approval for facts             |
| `public/brand/`   | Logo files                                                                                  | 🔒 human approval                       |
| `docs/adr/`       | Architecture Decision Records                                                               | ✅ add new, never rewrite accepted ones |
| `scripts/`        | Deterministic automation                                                                    | ✅                                      |
| `.github/`        | CI and templates                                                                            | 🔒 human approval                       |

## 3. Commands

```bash
npm install            # install dependencies
npm run dev            # website at http://localhost:5173
npm run storybook      # component library at http://localhost:6006
npm run tokens         # build design tokens → src/tokens/ (runs automatically before dev, build, storybook, test)
npm run tokens:check   # WCAG contrast check of semantic colour pairs
npm run check          # typecheck + contrast + lint + css lint + format check + build — must pass before a PR
npm run test           # component + accessibility tests (Storybook + Vitest, needs Playwright Chromium)
npm run check:setup    # verify required tools are installed
```

## 4. Design rules

1. **Use tokens, never raw values.** In component CSS use semantic or component tokens only: `var(--color-action-primary-bg)`. No hex colours, no named colours, no primitive colour, font-family or font-size tokens (`--color-brand-violet-600`). Spacing (`--space-*`) and radius (`--radius-*`) may be used directly. Enforced by Stylelint. Token architecture: `tokens/README.md`.
2. **Reuse before you create.** Check `src/components/` and Storybook first. Do not create a new component if an existing one with a new variant solves the need.
3. **Orange (#FB9912) is never text on white** (contrast 2.17:1). Orange backgrounds always use black text.
4. **Typography:** headings Josefin Sans, body DM Sans. Use typography tokens (`--font-role-*`, `--text-*`), not font names in components.
5. **Never invent business facts** (prices, times, addresses, instructor names, class names). Use only `content/*.json`. If something is missing, stop and ask.
6. **Booking is external.** "Book" actions link to Fitssey (`https://app.fitssey.com/findbalans`), open in a new tab, and show the portfolio notice. Never build booking or payment flows.
7. **Responsive:** mobile first. Breakpoints (min-width): 480 / 768 / 1024 / 1280 px. CSS media queries cannot use variables, so write these numbers, in range syntax: `@media (width >= 768px)`.

## 5. Component contract (definition of done)

Each component lives in `src/components/<Name>/` with:

| File                 | Purpose                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| `<Name>.tsx`         | Component + exported `<Name>Props` interface. Every prop has a JSDoc comment. |
| `<Name>.module.css`  | Styles using tokens only                                                      |
| `<Name>.stories.tsx` | One story per variant and state                                               |
| `<Name>.mdx`         | Purpose, anatomy, usage do/don't, accessibility notes                         |
| `index.ts`           | Public export                                                                 |

A component is done when: `npm run check` passes, stories cover all variants and states, the a11y addon shows no violations, it works with keyboard only, and it works from 320 px wide upward.

## 6. Accessibility (WCAG 2.2 AA)

- Semantic HTML first (`<button>` for actions, `<a>` for navigation).
- Every interactive element is reachable and usable by keyboard, with a visible focus style.
- Text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI borders).
- Images have meaningful `alt`, or `alt=""` if decorative.
- Respect `prefers-reduced-motion`.

## 7. Workflow and permissions

| Level      | Agents may                                | Notes                                                    |
| ---------- | ----------------------------------------- | -------------------------------------------------------- |
| 1 READ     | Read any file                             | —                                                        |
| 2 ANALYSE  | Report problems, propose changes          | —                                                        |
| 3 GENERATE | Draft code and docs                       | —                                                        |
| 4 MODIFY   | Change files **on a feature branch only** | Branch names: `feat/…`, `fix/…`, `docs/…`, `chore/…`     |
| 5 VALIDATE | Run `npm run check` and `npm run test`    | Report results honestly; never claim untested code works |
| 6 SUBMIT   | Open a pull request using the template    | —                                                        |
| 7 APPROVE  | **Human only**                            | —                                                        |
| 8 RELEASE  | **Human only**                            | Merging to `main` deploys                                |

Never:

- push to `main` or merge your own pull request;
- change 🔒 paths without saying so in the PR description and getting human approval;
- disable a lint rule, test or accessibility check to make CI pass;
- add a new dependency without explaining why in the PR.

Commit messages follow Conventional Commits: `feat(ClassCard): add full variant`.

## 8. Where decisions are recorded

`docs/adr/` — read these before changing architecture. Propose a new ADR instead of silently changing a decision.
