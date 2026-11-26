# User flows

- **Status:** Draft for review, 2026-11-26
- **Visual version:** same FigJam board as the site map — https://www.figma.com/board/tGPi2ehB7RWNQ9CBBaI4mJ
- **Use:** every page and component must support at least one step in these flows. If a component does not serve a flow, question whether it is needed.

## Flow 1 — Parent enrolling a child

Context: mobile first; arrives from a Facebook post.

```mermaid
flowchart LR
    post["Facebook post (phone)"] --> home["1.0 Home"] --> kids["2.0 For kids"]
    kids --> age{"Right age group?"}
    age -->|"Yes"| schedule["5.0 Schedule: Kids"] --> pricing["6.0 Pricing"]
    age -->|"No"| contact["8.0 Contact"]
    pricing --> account{"Fitssey account?"}
    account -->|"Yes"| book["Book group in Fitssey"]
    account -->|"No"| signup["Sign up in Fitssey"] --> book
```

Key worries: right age group · safety · fixed place for the season · price · getting there and parking.

Design implications (proposed by Claude — review in this PR):

- Age groups must be visible on the For kids page without scrolling far.
- The Fitssey account step is explained in two simple steps before the user leaves our site.
- Parking and address appear on the kids page, not only on Visit & contact.

## Flow 2 — Adult trying aerial hoop

Context: arrives from an Instagram reel.

```mermaid
flowchart LR
    reel["Instagram reel"] --> home["1.0 Home"] --> adults["4.0 For adults"] --> hoop["4.2 Aerial hoop"]
    hoop --> schedule["5.0 Schedule: Adults"] --> first{"First class?"}
    first -->|"Yes"| single["Single class in Fitssey"]
    first -->|"No"| pass["Monthly pass in Fitssey"]
```

Key worries: "I'm not fit enough" · minimum height 140 cm · what to wear · price of one try.

Design implications (proposed by Claude — review in this PR):

- "All levels welcome" and the 140 cm minimum height appear next to the aerial hoop description.
- The single-class price (60 zł) is shown on the class card, so there is no need to visit Pricing first.
