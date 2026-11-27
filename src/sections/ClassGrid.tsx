import { ClassCard } from '../components/ClassCard';
import { classTypeOf, formatPrice, studio, type ScheduleEntry } from '../content';
import { useLocale } from '../i18n/locale';
import styles from './ClassGrid.module.css';

export interface ClassGridProps {
  /** Weekly classes to show, already filtered and sorted. */
  entries: ScheduleEntry[];
  /** Heading level of each card title (fits the page outline). */
  headingLevel?: 2 | 3 | 4;
}

const priceFor = {
  adults: studio.prices.find((p) => p.id === 'adults-single'),
  family: studio.prices.find((p) => p.id === 'family-single'),
  kids: undefined,
};

/** ClassGrid — ClassCards for a list of weekly classes, using content and the current language. */
export function ClassGrid({ entries, headingLevel = 3 }: ClassGridProps) {
  const { locale, t } = useLocale();
  return (
    <ul className={styles.grid}>
      {entries.map((entry) => {
        const type = classTypeOf(entry);
        const audience = type.audience as 'kids' | 'family' | 'adults';
        const price = priceFor[audience];
        return (
          <li key={entry.id}>
            <ClassCard
              title={type.name[locale]}
              audience={audience}
              audienceLabel={
                'ages' in type && type.ages ? type.ages.label[locale] : t.common.audiences[audience]
              }
              day={t.common.days[entry.day as keyof typeof t.common.days]}
              startTime={entry.start}
              endTime={entry.end}
              instructor={entry.instructor}
              level={t.common.allLevels}
              price={
                price
                  ? `${formatPrice(price.amount, locale)} ${price.per?.[locale] ?? ''}`.trim()
                  : undefined
              }
              note={
                'requirement' in type && type.requirement ? type.requirement[locale] : undefined
              }
              bookingUrl={studio.studio.bookingUrl}
              headingLevel={headingLevel}
              labels={{
                book: t.common.book,
                waitingList: t.common.waitingList,
                full: t.common.full,
                newTab: t.common.opensInNewTab,
                instructor: t.common.with,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}
