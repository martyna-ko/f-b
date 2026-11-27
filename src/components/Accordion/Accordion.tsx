import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  /** Stable unique id. */
  id: string;
  /** Question or heading shown when collapsed. */
  title: string;
  /** Content shown when expanded. */
  content: ReactNode;
}

export interface AccordionProps {
  /** Items to show, e.g. FAQ questions and answers. */
  items: AccordionItem[];
  /** Id of an item open on first render. */
  defaultOpenId?: string;
}

/**
 * Accordion — a list of expandable sections, used for the FAQ.
 * Built on native <details>/<summary>, so keyboard and screen-reader support
 * come from the browser and it works even before JavaScript loads.
 */
export function Accordion({ items, defaultOpenId }: AccordionProps) {
  return (
    <div className={styles.accordion}>
      {items.map((item) => (
        <details key={item.id} className={styles.item} open={item.id === defaultOpenId}>
          <summary className={styles.summary}>
            <span>{item.title}</span>
            <span aria-hidden="true" className={styles.icon} />
          </summary>
          <div className={styles.content}>{item.content}</div>
        </details>
      ))}
    </div>
  );
}
