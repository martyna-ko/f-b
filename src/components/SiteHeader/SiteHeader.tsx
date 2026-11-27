import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type MouseEventHandler,
} from 'react';
import { ButtonLink } from '../Button';
import hidden from '../visually-hidden.module.css';
import styles from './SiteHeader.module.css';

export interface NavLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  'aria-current'?: 'page';
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  lang?: string;
  hrefLang?: string;
}

/** Default link: a plain <a>. Pages pass a router link so navigation does not reload the page. */
const PlainLink = ({ children, ...rest }: NavLinkProps) => <a {...rest}>{children}</a>;

export interface SiteHeaderNavItem {
  /** Visible label, already translated. */
  label: string;
  /** Destination path, e.g. "/kids" or "/pl/kids". */
  href: string;
}

export interface SiteHeaderLanguage {
  /** Language code, e.g. "en". Shown as the link text in capitals. */
  code: string;
  /** Full language name for screen readers, e.g. "English". */
  name: string;
  /** Same page in this language. */
  href: string;
}

export interface SiteHeaderLabels {
  menu: string;
  closeMenu: string;
  book: string;
  language: string;
  skipToContent: string;
  opensInNewTab: string;
  /** Accessible name of the main navigation, e.g. "Main". */
  navigation: string;
}

export interface SiteHeaderProps {
  /** Link target of the logo (home page in the current language). */
  homeHref: string;
  /** Accessible name of the logo link, e.g. "Find Balans — home". */
  homeLabel: string;
  /** Main navigation items. */
  items: SiteHeaderNavItem[];
  /** Path of the current page; the matching item gets aria-current="page". */
  currentPath: string;
  /** Available languages. */
  languages: SiteHeaderLanguage[];
  /** Code of the current language. */
  currentLanguage: string;
  /** Fitssey booking URL for the Book button (opens in a new tab). */
  bookingUrl: string;
  /** Id of the main content element, target of the skip link. */
  mainContentId: string;
  /** Translated interface texts. */
  labels: SiteHeaderLabels;
  /** Link component, e.g. a React Router wrapper. Defaults to <a>. */
  linkComponent?: ComponentType<NavLinkProps>;
}

/**
 * SiteHeader — logo, main navigation, language switch and Book button on every page.
 * From 1024px the navigation is shown inline; below that it opens from a Menu button.
 */
export function SiteHeader({
  homeHref,
  homeLabel,
  items,
  currentPath,
  languages,
  currentLanguage,
  bookingUrl,
  mainContentId,
  labels,
  linkComponent: Link = PlainLink,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu with Escape and return focus to the Menu button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <a className={styles.skip} href={`#${mainContentId}`}>
        {labels.skipToContent}
      </a>
      <div className={styles.bar}>
        <Link href={homeHref} className={styles.logo} onClick={close}>
          <img src="/brand/find-balans-logo-black.svg" alt={homeLabel} width={112} height={69} />
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          <span aria-hidden="true" className={styles.burger} data-open={open} />
          {open ? labels.closeMenu : labels.menu}
        </button>

        <div id={menuId} className={styles.panel} data-open={open}>
          <nav aria-label={labels.navigation}>
            <ul className={styles.nav}>
              {items.map((item) => {
                const current = item.href === currentPath;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      aria-current={current ? 'page' : undefined}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ul className={styles.languages} aria-label={labels.language}>
              {languages.map((lang) => {
                const current = lang.code === currentLanguage;
                return (
                  <li key={lang.code}>
                    <Link
                      href={lang.href}
                      className={styles.langLink}
                      aria-current={current ? 'page' : undefined}
                      lang={lang.code}
                      hrefLang={lang.code}
                      onClick={close}
                    >
                      <span aria-hidden="true">{lang.code.toUpperCase()}</span>
                      <span className={hidden.visuallyHidden}>{lang.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ButtonLink href={bookingUrl} external newTabLabel={labels.opensInNewTab}>
              {labels.book}
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
