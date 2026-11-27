import type { ReactNode } from 'react';
import styles from './PageIntro.module.css';

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
}

/** PageIntro — the top of every page: title, lead and optional actions. */
export function PageIntro({
  title,
  lead,
  tone = 'default',
  children,
  large = false,
}: PageIntroProps) {
  return (
    <div className={`${styles.intro} ${styles[tone]}`}>
      <div className={styles.inner}>
        <h1 className={large ? styles.large : undefined}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </div>
  );
}
