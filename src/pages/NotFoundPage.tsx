import { ButtonLink } from '../components/Button';
import { useLocale } from '../i18n/locale';
import { RouterLink } from '../i18n/RouterLink';
import { PageIntro } from '../sections/PageIntro';

/** Shown for unknown URLs. */
export function NotFoundPage() {
  const { t, to } = useLocale();
  return (
    <PageIntro title={t.notFound.title} lead={t.notFound.text}>
      <ButtonLink href={to('/')} variant="outline" linkComponent={RouterLink}>
        {t.notFound.back}
      </ButtonLink>
    </PageIntro>
  );
}
