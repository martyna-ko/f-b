# Site images

All photos on the site are **generated with AI** (Higgsfield) for this portfolio case study and are labelled on the page ("Image generated with AI"). They do not show the real studio, its instructors or its clients.

## Rules

- Children's faces may be shown: every person in the images is AI-generated, not a real child (decision by Martyna, 2026-11-27).
- Poses must be simple, with clear contact between body and equipment (e.g. fabric only under the hips), to avoid AI errors such as limbs passing through fabric.
- One shared studio description in every prompt, so all images look like the same room.
- No text or logos inside images.
- Alt text and the AI caption live in `content/en.json` and `content/pl.json`, never in components.
- Files: `public/images/<page>-<name>-<width>.webp`, WebP quality 78, registered in `src/images.ts` (pages never write image paths).

## Shared studio block

> Plain white walls with no interior details, light natural wooden floor, soft daylight from the side, gentle shadows, natural colours. Black fabric aerial hammock(s), black aerial hoop, black gymnastic mat about as thick as a hand. A tall areca palm in a tall dark grey pot with a vertical ribbed texture.

## Images

### Home hero — `home-hero-*.webp`

- **Tool / model:** Higgsfield, GPT Image 2.6 Sunburst, 16:9
- **Used in:** `HomePage` → `PageIntro` `image` prop. From 1024 px the photo fills the intro and the headline sits on the empty left third.
- **Prompt (final):**

> Wide photo of a bright, calm movement studio with high ceilings and soft daylight. An adult woman in a fabric aerial hammock, mid-movement, seen from the side, relaxed and confident. Natural colours, gentle shadows, shallow depth of field, editorial lifestyle photography. Empty space on the left for a headline. No text, no logos. Hammocks need to be black. The plant needs to be an areca palm in a tall dark grey pot with vertical ribbed texture. Do not show interior details: plain white walls and a wooden floor. Behind the woman, slightly right of centre, a black aerial hoop. The left side stays empty. A black gymnastic mat about 10 cm thick, 2 m long and 1.5 m wide. The woman's arms, legs and body are in front of or behind the fabric, never through it. She sits on the hammock gracefully and looks very relaxed.

- **Human review:** chosen by Martyna from several generations; checked for anatomy, fabric physics and empty space for the headline.

### Kids intro — `kids-intro-*.webp`

- **Tool / model:** Higgsfield, GPT Image 2.6 Sunburst, 4:3, High, 2K, home hero as reference
- **Used in:** `KidsPage` → `PageIntro` with `imageLayout="side"` (text left, photo right from 1024 px)
- **Prompt (final):**

> Sharp, realistic editorial photo of a bright, minimal movement studio. Plain white walls with no interior details, light natural wooden floor, soft daylight from the side, gentle shadows, natural colours. Two children about 8 years old play in their own black fabric aerial hammocks, hung low above a large black gymnastic mat, as big as a bed and about as thick as a hand; the mat extends well beyond the hammocks on all sides. The girl hangs upside down: the fabric is only under her hips, her legs open in a wide V in the air, her arms reach down towards the mat, her ponytail hangs down, and she laughs. The boy flies like a superhero: he lies on his stomach on the fabric, which is only under his hips, arms stretched straight forward, legs straight back, and he smiles. They wear light grey sports clothes. Each hammock is one smooth piece of fabric rising in two clean vertical bands to the ceiling, clearly separate from the children's hair, arms and legs. In the background, slightly right, a black aerial hoop hangs from the ceiling. In the corner, a tall areca palm in a tall dark grey pot with a vertical ribbed texture. Joyful, energetic and safe mood of a supervised kids' class. No text, no logos.

- **Lesson:** fabric touching the body in one place (under the hips) gave far fewer AI errors than seated, wrapped poses.
