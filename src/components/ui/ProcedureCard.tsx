import Link from 'next/link';
import Image from 'next/image';
import { Procedure } from '../../../types/content';
import styles from './ProcedureCard.module.css';

interface ProcedureCardProps extends Procedure {
  icon?: string;
  descriptionSnippet: string;
}

export default function ProcedureCard({ slug, title, icon, descriptionSnippet }: ProcedureCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {icon ? (
          <div className={styles.iconWrapper}>
            <Image src={icon} alt={title} width={32} height={32} className={styles.icon} />
          </div>
        ) : null}
        <h3 className={styles.title}>{title}</h3>
      </div>
      <p className={styles.description}>{descriptionSnippet}</p>
      <div className={styles.footer}>
        <Link href={`/procedures/${slug}/`} className={styles.link}>
          <span>Learn More</span>
          <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
