import { weeklySchedule } from '../content';
import { useLocale } from '../i18n/locale';
import { ClassGrid } from '../sections/ClassGrid';
import { PageIntro } from '../sections/PageIntro';
import { PriceList } from '../sections/PriceList';
import { Section } from '../sections/Section';

/** 4.0 For adults — classes and prices (user flow 2). */
export function AdultsPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro title={t.adults.title} lead={t.adults.lead} tone="adults" />
      <Section title={t.adults.classesTitle}>
        <ClassGrid entries={weeklySchedule('adults')} />
      </Section>
      <Section title={t.pricing.title} tone="subtle">
        <PriceList audience="adults" />
      </Section>
    </>
  );
}
