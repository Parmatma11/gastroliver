import Link from 'next/link';
import { Disease } from '../../../types/content';
import styles from './DiseaseCard.module.css';
import Badge from './Badge';

interface DiseaseCardProps extends Disease {
  descriptionSnippet: string;
}

export default function DiseaseCard({ slug, title, category, descriptionSnippet }: DiseaseCardProps) {
  const categoryLabelMap: Record<string, string> = {
    'esophagus-stomach': 'Esophagus & Stomach',
    'intestines': 'Intestines & Colon',
    'liver': 'Liver & Hepatology',
    'pancreas-biliary': 'Pancreas & Biliary'
  };

  return (
    <div className={styles.card}>
      <div className={styles.badgeRow}>
        <Badge variant={category === 'liver' ? 'accent' : 'primary'}>
          {categoryLabelMap[category] || category}
        </Badge>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{descriptionSnippet}</p>
      <div className={styles.footer}>
        <Link href={`/conditions/${slug}/`} className={styles.link}>
          <span>View Guidelines</span>
          <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
