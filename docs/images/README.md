# Site images

All photos on the site are **generated with AI** (Higgsfield) for this portfolio case study and are labelled on the page ("Image generated with AI"). They do not show the real studio, its instructors or its clients.

## Rules

- No recognisable children's faces (children seen from behind or in motion blur).
- One shared studio description in every prompt, so all images look like the same room.
- No text or logos inside images.
- Alt text and the AI caption live in `content/en.json` and `content/pl.json`, never in components.
- Files: `public/images/<page>-<name>-<width>.webp`, widths 768 / 1280 / 1920 / original, WebP quality 78.

## Shared studio block

> Plain white walls with no interior details, light natural wooden floor, soft daylight from the side, gentle shadows, natural colours. Black fabric aerial hammock(s), black aerial hoop, black gymnastic mat about as thick as a hand. A tall areca palm in a tall dark grey pot with a vertical ribbed texture.

## Images

### Home hero — `home-hero-*.webp`

- **Tool / model:** Higgsfield, GPT Image 2.6 Sunburst, 16:9
- **Used in:** `HomePage` → `PageIntro` `image` prop. From 1024 px the photo fills the intro and the headline sits on the empty left third.
- **Prompt (final):**

> Wide photo of a bright, calm movement studio with high ceilings and soft daylight. An adult woman in a fabric aerial hammock, mid-movement, seen from the side, relaxed and confident. Natural colours, gentle shadows, shallow depth of field, editorial lifestyle photography. Empty space on the left for a headline. No text, no logos. Hammocks need to be black. The plant needs to be an areca palm in a tall dark grey pot with vertical ribbed texture. Do not show interior details: plain white walls and a wooden floor. Behind the woman, slightly right of centre, a black aerial hoop. The left side stays empty. A black gymnastic mat about 10 cm thick, 2 m long and 1.5 m wide. The woman's arms, legs and body are in front of or behind the fabric, never through it. She sits on the hammock gracefully and looks very relaxed.

- **Human review:** chosen by Martyna from several generations; checked for anatomy, fabric physics and empty space for the headline.
