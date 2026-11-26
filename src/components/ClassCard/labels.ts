export interface ClassCardLabels {
  /** Call to action when places are available. */
  book: string;
  /** Call to action when the class is full: join the waiting list in Fitssey. */
  waitingList: string;
  /** Status when no places are left. */
  full: string;
  /** Status text for available places. Receives the number of places left. */
  spotsLeft: (n: number) => string;
  /** Status text when only a few places are left (≤ 2). */
  fewSpotsLeft: (n: number) => string;
  /** Screen-reader text for links that open a new tab. */
  newTab: string;
  /** Label before the instructor's name. */
  instructor: string;
}

/** English defaults. Pass Polish labels on Polish pages. */
export const defaultClassCardLabels: ClassCardLabels = {
  book: 'Book',
  waitingList: 'Join the waiting list',
  full: 'Full',
  spotsLeft: (n) => `${n} places left`,
  fewSpotsLeft: (n) => (n === 1 ? 'Last place!' : `Only ${n} places left`),
  newTab: 'opens in a new tab',
  instructor: 'With',
};
