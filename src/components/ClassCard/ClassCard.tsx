import { Badge, type BadgeTone } from '../Badge';
import { ButtonLink } from '../Button';
import { defaultClassCardLabels, type ClassCardLabels } from './labels';
import styles from './ClassCard.module.css';

export type ClassAudience = Exclude<BadgeTone, 'neutral'>;

export interface ClassCardProps {
  /** Class name, e.g. "Aerial hammocks". */
  title: string;
  /** Who the class is for. Sets the colour accent and badge tone. */
  audience: ClassAudience;
  /** Visible audience label, e.g. "Kids 7–10". Must name the audience in words, not only by colour. */
  audienceLabel: string;
  /** Day of the week, already translated, e.g. "Wednesday". */
  day: string;
  /** Start time, 24-hour format "HH:MM". */
  startTime: string;
  /** End time, 24-hour format "HH:MM". */
  endTime: string;
  /** Instructor's first name. */
  instructor?: string;
  /** Level label, e.g. "All levels". */
  level?: string;
  /** Price for a single class, already formatted, e.g. "60 zł". */
  price?: string;
  /** Important requirement shown before booking, e.g. "Minimum height 140 cm". */
  note?: string;
  /** Places left. Omit when unknown; 0 means full. */
  spotsLeft?: number;
  /** Fitssey URL for this class. Opens in a new tab. */
  bookingUrl: string;
  /** Heading level of the title, so the card fits the page outline. Default 3. */
  headingLevel?: 2 | 3 | 4;
  /** Text overrides for translation. */
  labels?: Partial<ClassCardLabels>;
}

/**
 * ClassCard — one class in the weekly schedule: what, who for, when, and how to book.
 * Based on the class row in the studio's existing Figma schedule ("Zajęcia").
 */
export function ClassCard({
  title,
  audience,
  audienceLabel,
  day,
  startTime,
  endTime,
  instructor,
  level,
  price,
  note,
  spotsLeft,
  bookingUrl,
  headingLevel = 3,
  labels: labelOverrides,
}: ClassCardProps) {
  const labels = { ...defaultClassCardLabels, ...labelOverrides };
  const Heading = `h${headingLevel}` as const;
  const isFull = spotsLeft === 0;
  const isFew = spotsLeft !== undefined && spotsLeft > 0 && spotsLeft <= 2;
  const status =
    spotsLeft === undefined
      ? null
      : isFull
        ? labels.full
        : isFew
          ? labels.fewSpotsLeft(spotsLeft)
          : labels.spotsLeft(spotsLeft);

  return (
    <article className={`${styles.card} ${styles[audience]}`}>
      <div className={styles.badges}>
        <Badge tone={audience}>{audienceLabel}</Badge>
        {level && <Badge>{level}</Badge>}
      </div>

      <Heading className={styles.title}>{title}</Heading>

      <p className={styles.time}>
        {day} <time>{startTime}</time>–<time>{endTime}</time>
      </p>

      {(instructor || price) && (
        <ul className={styles.meta}>
          {instructor && (
            <li>
              {labels.instructor} {instructor}
            </li>
          )}
          {price && <li>{price}</li>}
        </ul>
      )}

      {note && <p className={styles.note}>{note}</p>}

      <div className={styles.footer}>
        {status && (
          <p className={`${styles.status} ${isFew ? styles.statusFew : ''}`} aria-live="polite">
            {status}
          </p>
        )}
        <ButtonLink
          href={bookingUrl}
          external
          newTabLabel={labels.newTab}
          variant={isFull ? 'outline' : 'primary'}
          aria-label={`${isFull ? labels.waitingList : labels.book}: ${title}, ${day} ${startTime} (${labels.newTab})`}
        >
          {isFull ? labels.waitingList : labels.book}
        </ButtonLink>
      </div>
    </article>
  );
}
