# Find Balans — AI-native design system & website

A design system, component library and responsive website for **Find Balans**, a movement studio in Bemowo, Warsaw (aerial hammocks, aerial hoop, dance, yoga — for children and adults).

> **Portfolio case study.** This project shows how human designers, developers and AI agents can work from one shared source of truth. Content is a snapshot of the 2026/27 season. Booking links go to the studio's real booking system (Fitssey).

## What's inside

| Part              | Tool                                                 | Status     |
| ----------------- | ---------------------------------------------------- | ---------- |
| Design tokens     | W3C DTCG format → CSS variables                      | planned    |
| Component library | React + TypeScript                                   | planned    |
| Component docs    | Storybook                                            | scaffolded |
| Website           | React + Vite, English + Polish                       | scaffolded |
| Quality checks    | TypeScript, Oxlint, Stylelint, Prettier, Vitest, axe | scaffolded |
| CI / deploy       | GitHub Actions, Netlify                              | planned    |

## Run it locally

Requires **Node.js 22.22+** and **Git**. Check with `npm run check:setup`.

```bash
git clone https://github.com/martyna-ko/find-balans.git
cd find-balans
npm install
npm run dev          # website → http://localhost:5173
npm run storybook    # component library → http://localhost:6006
```

## Quality checks

```bash
npm run check        # typecheck, lint, CSS lint, formatting, build
npm run test         # component and accessibility tests
```

Before running tests the first time: `npx playwright install chromium`.

## How work happens

1. Every change starts on a **feature branch** (`feat/class-card`).
2. It is proposed as a **pull request**, which runs the automatic checks.
3. A **human reviews and approves** before anything is merged into `main`.

AI agents follow the same process — their rules are in [`AGENTS.md`](./AGENTS.md).

## Folder structure

```
tokens/          design tokens (source)
content/         site text and studio data (EN/PL)
src/components/  reusable components
src/sections/    page sections
src/pages/       pages
src/styles/      global styles
public/brand/    logo files
docs/adr/        architecture decisions
scripts/         automation
```

## Brand

Logo and colours © Find Balans. Fonts: Josefin Sans and DM Sans (SIL Open Font License).
