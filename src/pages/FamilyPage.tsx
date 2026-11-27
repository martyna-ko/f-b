import { weeklySchedule } from '../content';
import { useLocale } from '../i18n/locale';
import { ClassGrid } from '../sections/ClassGrid';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

/** 3.0 Family — who can come and when. */
export function FamilyPage() {
  const { t } = useLocale();
  return (
    <>
      <PageIntro title={t.family.title} lead={t.family.lead} tone="family" />
      <Section title={t.family.rulesTitle}>
        <ul className={list.list}>
          {t.family.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Section>
      <Section title={t.family.classesTitle} tone="subtle">
        <ClassGrid entries={weeklySchedule('family')} />
      </Section>
    </>
  );
}
