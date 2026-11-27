/**
 * Language is part of the URL: English pages have no prefix (/kids),
 * Polish pages use /pl (/pl/kids). The same page exists in both languages.
 */
import { useLocation } from 'react-router';
import { messages, type Locale, type Messages } from '../content';

export const LOCALES: Locale[] = ['en', 'pl'];
export const DEFAULT_LOCALE: Locale = 'en';

/** Splits a path into its language and the language-neutral page path ("/pl/kids" → pl, "/kids"). */
export function parsePath(pathname: string): { locale: Locale; page: string } {
  const match = pathname.match(/^\/pl(\/.*)?$/);
  if (match) return { locale: 'pl', page: match[1] || '/' };
  return { locale: DEFAULT_LOCALE, page: pathname || '/' };
}

/** Builds the URL of a page in a language ("/kids", pl → "/pl/kids"). */
export function localizedPath(page: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return page;
  return page === '/' ? '/pl' : `/pl${page}`;
}

export interface LocaleContext {
  locale: Locale;
  /** Language-neutral path of the current page, e.g. "/kids". */
  page: string;
  /** All texts in the current language. */
  t: Messages;
  /** URL of a page in the current language. */
  to: (page: string) => string;
}

/** Current language, texts and a helper to build links in that language. */
export function useLocale(): LocaleContext {
  const { pathname } = useLocation();
  const { locale, page } = parsePath(pathname);
  return { locale, page, t: messages[locale], to: (p) => localizedPath(p, locale) };
}
