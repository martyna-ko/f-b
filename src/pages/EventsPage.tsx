import { studio } from '../content';
import { useLocale } from '../i18n/locale';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

/** 7.0 Events — birthday parties and photo sessions. */
export function EventsPage() {
  const { t } = useLocale();
  const { email } = studio.studio;
  return (
    <>
      <PageIntro title={t.events.title} lead={t.events.lead} />
      <Section>
        <ul className={list.cards}>
          {[t.events.birthdays, t.events.photo].map((e) => (
            <li key={e.title} className={list.card}>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
            </li>
          ))}
        </ul>
        <p className={list.note}>
          <a href={`mailto:${email}`}>{t.events.ask}</a>
        </p>
      </Section>
    </>
  );
}
