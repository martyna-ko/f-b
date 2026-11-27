import type { ReactNode } from 'react';
import styles from './PageIntro.module.css';

/** A photo shown in the page intro. */
export interface PageIntroImage {
  /** Fallback image URL. */
  src: string;
  /** Responsive sources, e.g. `"/images/a-768.webp 768w, /images/a-1280.webp 1280w"`. */
  srcSet?: string;
  /** Meaningful description of the photo (from content, never hard-coded). */
  alt: string;
  /** Short visible note under the photo, e.g. that it was generated with AI. */
  caption?: string;
}

export interface PageIntroProps {
  /** Page title (the only h1 on the page). */
  title: string;
  /** Short lead paragraph. */
  lead: string;
  /** Background tint matching the audience. */
  tone?: 'default' | 'kids' | 'family' | 'adults';
  /** Optional actions, e.g. buttons. */
  children?: ReactNode;
  /** Larger title, for the home page. */
  large?: boolean;
  /**
   * Optional photo. Below 1024 px it sits under the text; from 1024 px it fills the
   * intro and the text sits on its left side, so the photo needs empty space there.
   */
  image?: PageIntroImage;
}

/** PageIntro — the top of every page: title, lead, optional actions and photo. */
export function PageIntro({
  title,
  lead,
  tone = 'default',
  children,
  large = false,
  image,
}: PageIntroProps) {
  return (
    <div className={`${styles.intro} ${styles[tone]} ${image ? styles.withImage : ''}`}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 className={large ? styles.large : undefined}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {children && <div className={styles.actions}>{children}</div>}
        </div>
      </div>
      {image && (
        <figure className={styles.figure}>
          <img
            className={styles.image}
            src={image.src}
            srcSet={image.srcSet}
            sizes="100vw"
            alt={image.alt}
            fetchPriority="high"
            decoding="async"
          />
          {image.caption && <figcaption className={styles.caption}>{image.caption}</figcaption>}
        </figure>
      )}
    </div>
  );
}
