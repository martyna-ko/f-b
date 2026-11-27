import { ButtonLink } from '../components/Button';
import { studio } from '../content';
import { useLocale } from '../i18n/locale';
import { RouterLink } from '../i18n/RouterLink';
import { AudiencePaths } from '../sections/AudiencePaths';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

/** 1.0 Home — entry points for kids, family and adults. */
export function HomePage() {
  const { t, to } = useLocale();
  return (
    <>
      <PageIntro title={t.home.title} lead={t.home.lead} large>
        <ButtonLink href={studio.studio.bookingUrl} external newTabLabel={t.common.opensInNewTab}>
          {t.common.bookIn}
        </ButtonLink>
        <ButtonLink href={to('/schedule')} variant="outline" linkComponent={RouterLink}>
          {t.home.ctaSchedule}
        </ButtonLink>
      </PageIntro>
      <Section title={t.home.pathsTitle} tone="subtle">
        <AudiencePaths />
      </Section>
      <Section title={t.home.whyTitle}>
        <ul className={list.list}>
          {t.home.why.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    </>
  );
}
