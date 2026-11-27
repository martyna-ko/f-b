import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { studio } from '../content';
import { LOCALES, localizedPath, useLocale } from '../i18n/locale';
import { RouterLink } from '../i18n/RouterLink';

const NAV_PAGES = ['kids', 'family', 'adults', 'schedule', 'pricing', 'events', 'visit'] as const;
const LANGUAGE_NAMES = { en: 'English', pl: 'Polski' };

/** Layout — header, main content and footer shared by every page. */
export function Layout() {
  const { locale, page, t, to } = useLocale();
  const { address } = studio.studio;

  // Keep the document language and title in sync with the current page.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.meta.siteTitle;
  }, [locale, t]);

  return (
    <>
      <SiteHeader
        homeHref={to('/')}
        homeLabel={t.nav.homeLabel}
        items={NAV_PAGES.map((p) => ({ label: t.nav[p], href: to(`/${p}`) }))}
        currentPath={to(page)}
        languages={LOCALES.map((l) => ({
          code: l,
          name: LANGUAGE_NAMES[l],
          href: localizedPath(page, l),
        }))}
        currentLanguage={locale}
        bookingUrl={studio.studio.bookingUrl}
        mainContentId="main"
        labels={{
          menu: t.nav.menu,
          closeMenu: t.nav.closeMenu,
          book: t.nav.book,
          language: t.nav.language,
          skipToContent: t.nav.skipToContent,
          opensInNewTab: t.common.opensInNewTab,
          navigation: t.nav.mainLabel,
        }}
        linkComponent={RouterLink}
      />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter
        name={studio.studio.name}
        addressLines={[
          `${address.street}, ${address.floor[locale]}`,
          address.district[locale],
          `${address.postcode} ${address.city[locale]}`,
        ]}
        email={studio.studio.email}
        followLabel={t.footer.follow}
        social={[
          { label: 'Instagram', href: studio.studio.social.instagram },
          { label: 'Facebook', href: studio.studio.social.facebook },
        ]}
        newTabLabel={t.common.opensInNewTab}
        notice={t.meta.portfolioNotice}
      />
    </>
  );
}
