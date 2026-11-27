import { PricingCard } from '../components/PricingCard';
import { formatPrice, studio, type Audience } from '../content';
import { useLocale } from '../i18n/locale';
import styles from './ClassGrid.module.css';

export interface PriceListProps {
  /** Show only prices for this audience. */
  audience: Audience;
}

/** PriceList — PricingCards for one audience, from content. */
export function PriceList({ audience }: PriceListProps) {
  const { locale, t } = useLocale();
  return (
    <ul className={styles.grid}>
      {studio.prices
        .filter((p) => p.audience === audience)
        .map((p) => (
          <li key={p.id}>
            <PricingCard
              title={p.name[locale]}
              price={formatPrice(p.amount, locale)}
              per={p.per?.[locale]}
              audience={audience}
              audienceLabel={t.common.audiences[audience]}
              highlight={'highlight' in p && p.highlight === true}
              highlightLabel={t.pricing.recommended}
            />
          </li>
        ))}
    </ul>
  );
}
