import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogData } from '../../../data/blog';
import PageHero from '../../components/layout/PageHero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Digestive & Hepatology Care Blog | Gastroliver Clinic Delhi",
  description: "Keep up-to-date with medical guidelines on fatty liver, acidity, acid reflux, weight loss diets, and gastrointestinal diagnostics by Dr. Ankita Gupta.",
  alternates: {
    canonical: "/blog/",
  }
};

interface PageProps {
  searchParams: Promise<{
    series?: string;
  }>;
}

export default async function BlogIndexPage({ searchParams }: PageProps) {
  const { series } = await searchParams;

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog' }
  ];

  const seriesNames: Record<string, string> = {
    'all': 'All Articles',
    'general': 'General GI Health',
    'fatty-liver': 'Fatty Liver Series',
    'acid-reflux': 'Acid Reflux Series',
    'weight-loss': 'Weight Loss Program',
  };

  // Filter posts if category parameter is present
  const activeSeries = series && Object.keys(seriesNames).includes(series) ? series : 'all';
  const filteredPosts = activeSeries === 'all'
    ? blogData
    : blogData.filter(post => post.series === activeSeries);

  return (
    <main className={styles.container}>
      <PageHero
        title="Medical Articles & Insights"
        subtitle="Professional gastrointestinal health updates, diet charts, and liver care guidelines"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Series Filter Navigation */}
        <div className={styles.filterBar}>
          {Object.entries(seriesNames).map(([key, label], idx) => (
            <Link
              key={idx}
              href={key === 'all' ? '/blog/' : `/blog/?series=${key}`}
              className={`${styles.filterLink} ${activeSeries === key ? styles.active : ''}`}
            >
              {label} ({key === 'all' ? blogData.length : blogData.filter(b => b.series === key).length})
            </Link>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className={styles.grid}>
          {filteredPosts.map((post, idx) => (
            <article key={idx} className={styles.card}>
              {post.featuredImage && (
                <div className={styles.imageContainer}>
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className={styles.image}
                    loading={idx < 6 ? "eager" : "lazy"}
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <div className={styles.meta}>
                  <span className={styles.date}>{post.publishedDate}</span>
                  <span className={styles.badge}>
                    {post.series ? (seriesNames[post.series] || post.series) : "General"}
                  </span>
                </div>
                
                <h2 className={styles.title}>
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h2>
                
                <p className={styles.excerpt}>{post.metaDescription}</p>
                
                <Link href={`/blog/${post.slug}/`} className={styles.readMore}>
                  Read Full Article &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
