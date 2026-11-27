import { Link } from 'react-router';
import type { NavLinkProps } from '../components/SiteHeader';

/** Adapter: lets design-system components navigate without reloading the page. */
export function RouterLink({ href, children, ...rest }: NavLinkProps) {
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
