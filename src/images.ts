/**
 * Registry of site photos in `public/images/`. One entry per photo; pages read from here
 * instead of writing file paths. Alt text and captions live in `content/*.json`.
 * How the photos were made: `docs/images/README.md`.
 */
export interface SiteImage {
  /** Fallback URL. */
  src: string;
  /** Responsive sources for `srcset`. */
  srcSet: string;
}

function siteImage(name: string, widths: number[], fallbackWidth: number): SiteImage {
  return {
    src: `/images/${name}-${fallbackWidth}.webp`,
    srcSet: widths.map((width) => `/images/${name}-${width}.webp ${width}w`).join(', '),
  };
}

export const images = {
  /** Home hero, 16:9, empty left third for the headline. */
  homeHero: siteImage('home-hero', [768, 1280, 1920, 2688], 1280),
  /** Kids page, 4:3, two children in aerial hammocks. */
  kidsIntro: siteImage('kids-intro', [768, 1280, 1920], 1280),
} satisfies Record<string, SiteImage>;
