import { studio } from '../content';
import { useLocale } from '../i18n/locale';
import { PageIntro } from '../sections/PageIntro';
import { Section } from '../sections/Section';
import list from '../sections/List.module.css';

/** 8.0 Visit & contact — address, parking, email, map link. */
export function VisitPage() {
  const { locale, t } = useLocale();
  const { address, email, parking, social } = studio.studio;
  const fullAddress = `${address.street}, ${address.postcode} ${address.city[locale]}`;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <>
      <PageIntro title={t.visit.title} lead={address.district[locale]} />
      <Section>
        <ul className={list.cards}>
          <li className={list.card}>
            <h2>{t.visit.addressTitle}</h2>
            <address className={list.address}>
              {address.street}, {address.floor[locale]}
              <br />
              {address.district[locale]}
              <br />
              {address.postcode} {address.city[locale]}
            </address>
            <p>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                {t.visit.mapLink} <span aria-hidden="true">↗</span>
                <span className="visually-hidden"> ({t.common.opensInNewTab})</span>
              </a>
            </p>
          </li>
          <li className={list.card}>
            <h2>{t.visit.parkingTitle}</h2>
            <p>{parking[locale]}</p>
          </li>
          <li className={list.card}>
            <h2>{t.visit.contactTitle}</h2>
            <p>
              {t.visit.emailLabel}: <a href={`mailto:${email}`}>{email}</a>
            </p>
          </li>
          <li className={list.card}>
            <h2>{t.visit.followTitle}</h2>
            <p>
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                Instagram<span className="visually-hidden"> ({t.common.opensInNewTab})</span>
              </a>
              {' · '}
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook<span className="visually-hidden"> ({t.common.opensInNewTab})</span>
              </a>
            </p>
          </li>
        </ul>
      </Section>
    </>
  );
}
