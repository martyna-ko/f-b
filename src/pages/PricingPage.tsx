import { ButtonLink } from '../components/Button';
import { studio } from '../content';
import { useLocale } from '../i18n/locale';
import { PageIntro } from '../sections/PageIntro';
import { PriceList } from '../sections/PriceList';
import { Section } from '../sections/Section';

/** 6.0 Pricing — all prices by audience. */
export function PricingPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro title={t.pricing.title} lead={t.pricing.lead}>
        <ButtonLink href={studio.studio.bookingUrl} external newTabLabel={t.common.opensInNewTab}>
          {t.common.bookIn}
        </ButtonLink>
      </PageIntro>
      <Section title={t.nav.kids} tone="kids">
        <PriceList audience="kids" />
      </Section>
      <Section title={t.nav.family} tone="family">
        <PriceList audience="family" />
      </Section>
      <Section title={t.nav.adults} tone="adults">
        <PriceList audience="adults" />
      </Section>
    </>
  );
}
