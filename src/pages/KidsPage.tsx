import { Accordion } from '../components/Accordion';
import { ButtonLink } from '../components/Button';
import { studio, weeklySchedule } from '../content';
import { useLocale } from '../i18n/locale';
import { ClassGrid } from '../sections/ClassGrid';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

/** 2.0 For kids — closed groups, how to enrol, FAQ (user flow 1). */
export function KidsPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro title={t.kids.title} lead={t.kids.lead} tone="kids" />
      <Section title={t.kids.classesTitle}>
        <ClassGrid entries={weeklySchedule('kids')} />
      </Section>
      <Section title={t.kids.benefitsTitle} tone="subtle">
        <ul className={list.list}>
          {t.kids.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </Section>
      <Section title={t.kids.enrolTitle}>
        <ol className={list.steps}>
          {t.kids.enrolSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className={list.actions}>
          <ButtonLink href={studio.studio.bookingUrl} external newTabLabel={t.common.opensInNewTab}>
            {t.kids.enrolCta}
          </ButtonLink>
        </div>
        <p className={list.note}>{t.kids.enrolEmail}</p>
        <p className={list.note}>{t.kids.enrolOrder}</p>
      </Section>
      <Section title={t.kids.faqTitle} tone="subtle">
        <Accordion
          items={t.faq.items.map((item, i) => ({ id: `faq-${i}`, title: item.q, content: item.a }))}
        />
      </Section>
    </>
  );
}
