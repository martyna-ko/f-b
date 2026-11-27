import { ButtonLink } from '../components/Button';
import { studio } from '../content';
import { useLocale } from '../i18n/locale';
import { RouterLink } from '../i18n/RouterLink';
import { AudiencePaths } from '../sections/AudiencePaths';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

const HERO_SRCSET = [768, 1280, 1920, 2688]
  .map((width) => `/images/home-hero-${width}.webp ${width}w`)
  .join(', ');

/** 1.0 Home — entry points for kids, family and adults. */
export function HomePage() {
  const { t, to } = useLocale();
  return (
    <>
      <PageIntro
        title={t.home.title}
        lead={t.home.lead}
        large
        image={{
          src: '/images/home-hero-1280.webp',
          srcSet: HERO_SRCSET,
          alt: t.home.heroImageAlt,
          caption: t.common.aiImage,
        }}
      >
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
