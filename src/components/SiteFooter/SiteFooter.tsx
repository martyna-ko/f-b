import hidden from '../visually-hidden.module.css';
import styles from './SiteFooter.module.css';

export interface SiteFooterLink {
  /** Visible text. */
  label: string;
  /** URL. External links open in a new tab. */
  href: string;
}

export interface SiteFooterProps {
  /** Studio name. */
  name: string;
  /** Address lines, in display order. */
  addressLines: string[];
  /** Contact email. */
  email: string;
  /** Heading above the social links, e.g. "Follow us". */
  followLabel: string;
  /** Social media links (open in a new tab). */
  social: SiteFooterLink[];
  /** Screen-reader text for links that open a new tab. */
  newTabLabel: string;
  /** Portfolio notice shown on every page. */
  notice: string;
}

/** SiteFooter — studio contact, social links and the portfolio notice, on every page. */
export function SiteFooter({
  name,
  addressLines,
  email,
  followLabel,
  social,
  newTabLabel,
  notice,
}: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div>
            <img
              src="/brand/find-balans-logo-white.svg"
              alt={name}
              width={112}
              height={69}
              className={styles.logo}
            />
          </div>
          <address className={styles.address}>
            {addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            <a href={`mailto:${email}`} className={styles.link}>
              {email}
            </a>
          </address>
          <div>
            <p className={styles.heading}>{followLabel}</p>
            <ul className={styles.social}>
              {social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {s.label}
                    <span className={hidden.visuallyHidden}> ({newTabLabel})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className={styles.notice}>{notice}</p>
      </div>
    </footer>
  );
}
