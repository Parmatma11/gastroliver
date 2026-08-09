import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../../types/content';
import styles from './BlogCard.module.css';
import Badge from './Badge';

export default function BlogCard({ slug, title, series, metaDescription, featuredImage, publishedDate, readTime }: BlogPost) {
  const seriesLabelMap: Record<string, string> = {
    'fatty-liver': 'Fatty Liver Series',
    'acid-reflux': 'Acidity & GERD',
    'weight-loss': 'Weight Loss Clinic',
    'liver-biopsy': 'Diagnostic Tests',
    'general': 'General Digestive Health'
  };

  // Format date nicely
  const formatDate = (dateStr: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <article className={styles.card}>
      <Link href={`/blog/${slug}/`} className={styles.imageLink} aria-label={`Read ${title}`}>
        <div className={styles.imageWrapper}>
          <Image
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
      </Link>
      
      <div className={styles.content}>
        <div className={styles.metaRow}>
          {series ? (
            <Badge variant="secondary">{seriesLabelMap[series] || series}</Badge>
          ) : null}
          <div className={styles.dateMeta}>
            <span>{formatDate(publishedDate)}</span>
            <span className={styles.dot}>•</span>
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className={styles.title}>
          <Link href={`/blog/${slug}/`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>
        
        <p className={styles.description}>{metaDescription}</p>
        
        <div className={styles.footer}>
          <Link href={`/blog/${slug}/`} className={styles.readMoreLink}>
            <span>Read Article</span>
            <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
