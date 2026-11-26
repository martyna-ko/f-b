import type { ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeTone = 'kids' | 'family' | 'adults' | 'neutral';

export interface BadgeProps {
  /**
   * Colour meaning. `kids` = orange, `family` = green, `adults` = violet (same as the site map legend).
   * `neutral` for information that is not audience-specific, e.g. "All levels".
   */
  tone?: BadgeTone;
  /** Short label, 1–3 words. */
  children: ReactNode;
}

/** Badge — a small, non-interactive label that classifies content (audience, level, status). */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
