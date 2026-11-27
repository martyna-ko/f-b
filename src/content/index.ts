/**
 * Typed access to site content. Components and pages import from here,
 * never from content/*.json directly, so data stays in one place.
 *
 * Polish texts must have the same shape as English: TypeScript fails the
 * build if a key is missing (and `npm run content:check` also checks list lengths).
 */
import en from '../../content/en.json';
import pl from '../../content/pl.json';
import studio from '../../content/studio.json';

export type Locale = 'en' | 'pl';
export type Messages = typeof en;
export type Studio = typeof studio;
export type ClassType = Studio['classTypes'][number];
export type ScheduleEntry = Studio['schedule'][number];
export type Price = Studio['prices'][number];
export type Day = keyof Messages['common']['days'];
export type Audience = 'kids' | 'family' | 'adults';

const plMessages: Messages = pl;
export const messages: Record<Locale, Messages> = { en, pl: plMessages };
export { studio };

export const DAY_ORDER: Day[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/** Finds the class type for a schedule entry. Throws if content is inconsistent. */
export function classTypeOf(entry: ScheduleEntry): ClassType {
  const type = studio.classTypes.find((c) => c.id === entry.classTypeId);
  if (!type) throw new Error(`Unknown classTypeId "${entry.classTypeId}" in content/studio.json`);
  return type;
}

/** Weekly classes, optionally filtered by audience, sorted by day and start time. */
export function weeklySchedule(audience?: Audience): ScheduleEntry[] {
  return studio.schedule
    .filter((s) => !audience || classTypeOf(s).audience === audience)
    .sort(
      (a, b) =>
        DAY_ORDER.indexOf(a.day as Day) - DAY_ORDER.indexOf(b.day as Day) ||
        a.start.localeCompare(b.start),
    );
}

/** Formats a price for display, e.g. 330 → "330 zł". */
export const formatPrice = (amount: number, locale: Locale) =>
  `${amount.toLocaleString(locale === 'pl' ? 'pl-PL' : 'en-GB')} ${messages[locale].common.currency}`;
