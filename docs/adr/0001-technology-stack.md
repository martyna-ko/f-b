# ADR 0001 — Technology stack

- **Status:** Accepted (approved by Martyna, 2026-11-25)
- **Deciders:** Martyna (product/design lead), Claude (AI engineering partner)

## Context

We need a design system, component library and responsive website that both humans and AI agents can understand and extend, delivered as a working MVP in two days.

## Decision

| Layer           | Choice                                                 |
| --------------- | ------------------------------------------------------ |
| Language        | TypeScript (strict)                                    |
| UI              | React                                                  |
| Build tool      | Vite                                                   |
| Styling         | CSS Modules + CSS custom properties                    |
| Tokens          | W3C DTCG 2025.10 JSON → Style Dictionary               |
| Component docs  | Storybook (docs, a11y and Vitest addons)               |
| Tests           | Vitest + Storybook interaction and accessibility tests |
| Hosting         | Netlify (deploy preview per pull request)              |
| Repository / CI | GitHub (public) + GitHub Actions                       |
| Web Components  | Not now — no non-React consumer                        |

## Consequences

- TypeScript prop types become a machine-readable contract for agents.
- Tokens map 1:1 to CSS variables, so designers can read component styles.
- No server features (no Next.js) — fine for a static portfolio site.
