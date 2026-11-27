# Content

All business facts and site text. Pages and components read them through `src/content/index.ts`.

| File                        | Contents                                                       | Changed by                                   |
| --------------------------- | -------------------------------------------------------------- | -------------------------------------------- |
| `studio.json`               | Studio details, class types, weekly schedule, prices           | 🔒 Human approval — these are business facts |
| `en.json`                   | All English site text                                          | Human approval for any fact in the text      |
| `pl.json`                   | All Polish site text — same keys and list lengths as `en.json` | Human approval for any fact in the text      |
| `schema/studio.schema.json` | JSON Schema describing `studio.json`                           | Pull request                                 |

## Rules

- **Never invent facts.** Prices, times, ages, addresses and rules come only from the studio (Fitssey, official social posts, or the owner).
- English is the source; every English key must exist in Polish (`npm run content:check`).
- Source of this snapshot: Fitssey back office and the studio's Facebook page, read on 25 Nov 2026, confirmed by the owner.
