import { Link } from 'react-router';
import { useLocale } from '../i18n/locale';
import styles from './AudiencePaths.module.css';

const PATHS = ['kids', 'family', 'adults'] as const;

/** AudiencePaths — the three entry points on the home page: kids, family, adults. */
export function AudiencePaths() {
  const { t, to } = useLocale();
  return (
    <ul className={styles.paths}>
      {PATHS.map((key) => (
        <li key={key}>
          <Link to={to(`/${key}`)} className={`${styles.card} ${styles[key]}`}>
            <h3 className={styles.title}>
              {t.home.paths[key].title} <span aria-hidden="true">→</span>
            </h3>
            <p className={styles.text}>{t.home.paths[key].text}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
