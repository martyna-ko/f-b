import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface SharedProps {
  /** Visual style. `primary` = main action (e.g. Book), `secondary` = supporting action, `outline` = low emphasis. */
  variant?: ButtonVariant;
  /** Stretch to the full width of the container (useful on mobile). */
  fullWidth?: boolean;
  /** Button text. Keep it short and start with a verb ("Book", "See schedule"). */
  children: ReactNode;
}

export interface ButtonProps
  extends SharedProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** HTML button type. Defaults to `button` so it never submits a form by accident. */
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonLinkProps
  extends SharedProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Destination URL. */
  href: string;
  /**
   * Opens in a new tab and tells screen-reader users so.
   * Use for links that leave the site, such as Fitssey booking.
   */
  external?: boolean;
  /** Screen-reader text added to external links. Translate it for Polish pages. */
  newTabLabel?: string;
}

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/**
 * Button — triggers an action on the current page (open a menu, filter a list).
 * For navigation, use `ButtonLink` instead.
 */
export function Button({
  variant = 'primary',
  fullWidth = false,
  type = 'button',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * ButtonLink — looks like a button, behaves like a link (goes to another page or site).
 * Use `external` for Fitssey booking links.
 */
export function ButtonLink({
  variant = 'primary',
  fullWidth = false,
  external = false,
  newTabLabel = 'opens in a new tab',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && (
        <>
          <span aria-hidden="true" className={styles.externalIcon}>
            ↗
          </span>
          <span className={styles.visuallyHidden}>({newTabLabel})</span>
        </>
      )}
    </a>
  );
}
