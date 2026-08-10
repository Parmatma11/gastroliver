import Breadcrumbs from '../ui/Breadcrumbs';
import styles from './PageHero.module.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  bannerImage?: string;
  compact?: boolean;
}

export default function PageHero({ title, subtitle, breadcrumbs, bannerImage, compact }: PageHeroProps) {
  return (
    <section 
      className={`${styles.hero} ${bannerImage ? styles.withImage : ''} ${compact ? styles.compact : ''}`}
      style={bannerImage ? { backgroundImage: `url(${bannerImage})` } : undefined}
    >
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <Breadcrumbs items={breadcrumbs} />
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
    </section>
  );
}
