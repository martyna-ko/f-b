import type { ReactNode } from 'react';
import styles from './Section.module.css';

export interface SectionProps {
  /** Section heading (h2). Omit for sections without a visible title. */
  title?: string;
  /** Background: default white, subtle off-white, or an audience tint. */
  tone?: 'default' | 'subtle' | 'kids' | 'family' | 'adults';
  children: ReactNode;
}

/** Section — a full-width band with a centred, max-width content column. */
export function Section({ title, tone = 'default', children }: SectionProps) {
  return (
    <section className={`${styles.section} ${styles[tone]}`}>
      <div className={styles.inner}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
