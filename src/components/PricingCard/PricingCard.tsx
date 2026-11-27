import { Badge, type BadgeTone } from '../Badge';
import styles from './PricingCard.module.css';

export interface PricingCardProps {
  /** Option name, e.g. "Closed group — every 2 months". */
  title: string;
  /** Formatted price, e.g. "600 zł". */
  price: string;
  /** What the price covers, e.g. "per 2 months (save 60 zł)". */
  per?: string;
  /** Who the price is for; sets the badge colour. */
  audience: Exclude<BadgeTone, 'neutral'>;
  /** Visible audience label, e.g. "Kids". */
  audienceLabel: string;
  /** Mark as the recommended option. */
  highlight?: boolean;
  /** Text of the highlight label, e.g. "Best value". Required when `highlight` is true. */
  highlightLabel?: string;
}

/** PricingCard — one price option: who it is for, what it costs, what it covers. */
export function PricingCard({
  title,
  price,
  per,
  audience,
  audienceLabel,
  highlight = false,
  highlightLabel,
}: PricingCardProps) {
  return (
    <article className={`${styles.card} ${highlight ? styles.highlight : ''}`}>
      <div className={styles.badges}>
        <Badge tone={audience}>{audienceLabel}</Badge>
        {highlight && highlightLabel && <Badge>{highlightLabel}</Badge>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>
        <span className={styles.amount}>{price}</span>
        {per && <span className={styles.per}> {per}</span>}
      </p>
    </article>
  );
}
