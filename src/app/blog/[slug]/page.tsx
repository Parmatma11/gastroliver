import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogData } from '../../../../data/blog';
import { parseMarkdownToHtml } from '../../../lib/markdown';
import PageHero from '../../../components/layout/PageHero';
import DoctorProfileSnippet from '../../../components/ui/DoctorProfileSnippet';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData.find(b => b.slug === slug);
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: `/blog/${slug}/`,
    }
  };
}

// Generate static routes for all blog posts
export async function generateStaticParams() {
  return blogData.map(b => ({
    slug: b.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogData.find(b => b.slug === slug);
  if (!post) {
    notFound();
  }

  // Load content file
  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
  let contentHtml = "";
  let rawContent = "";

  if (fs.existsSync(filePath)) {
    rawContent = fs.readFileSync(filePath, 'utf8');
    contentHtml = parseMarkdownToHtml(rawContent);
  } else {
    // Fallback description
    contentHtml = `<p>${post.metaDescription}</p><p>(This article's full content is currently being migrated and will be available shortly.)</p>`;
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog/' },
    { label: post.title }
  ];

  // Helper: Get recent posts for sidebar (exclude current one)
  const recentPosts = blogData.filter(p => p.slug !== slug).slice(0, 3);

  // Group by series names for styling
  const seriesNames: Record<string, string> = {
    'general': 'General GI Health',
    'fatty-liver': 'Fatty Liver Series',
    'acid-reflux': 'Acid Reflux Series',
    'weight-loss': 'Weight Loss Program',
  };

  return (
    <article className={styles.container}>
      <PageHero
        title={post.title}
        subtitle={`${post.publishedDate} • By ${post.author} • ${post.readTime} Read`}
        breadcrumbs={breadcrumbs}
        bannerImage={post.featuredImage}
      />

      <div className={`container ${styles.contentWrapper}`}>
        <div className={styles.mainColumn}>
          {/* Featured Image if available */}
          {post.featuredImage && (
            <div className={styles.imageContainer}>
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className={styles.featuredImage}
                priority
              />
            </div>
          )}

          {/* Article Text Content */}
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Share/Footer Widget */}
          <div className={styles.articleFooter}>
            <div className={styles.tags}>
              <span className={styles.tagLabel}>Series:</span>
              <span className={styles.tagValue}>{post.series ? (seriesNames[post.series] || post.series) : "General"}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Doctor Profile Snippet widget */}
          <div className={styles.widget}>
            <DoctorProfileSnippet />
          </div>

          {/* Recent Articles widget */}
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Recent Articles</h4>
            <div className={styles.recentList}>
              {recentPosts.map((rPost, idx) => (
                <div key={idx} className={styles.recentItem}>
                  {rPost.featuredImage && (
                    <div className={styles.recentImageContainer}>
                      <Image
                        src={rPost.featuredImage}
                        alt={rPost.title}
                        fill
                        sizes="60px"
                        className={styles.recentImage}
                      />
                    </div>
                  )}
                  <div className={styles.recentText}>
                    <Link href={`/blog/${rPost.slug}/`} className={styles.recentLink}>
                      {rPost.title}
                    </Link>
                    <span className={styles.recentDate}>{rPost.publishedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Categories widget */}
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Blog Series</h4>
            <ul className={styles.categoriesMenu}>
              {Object.entries(seriesNames).map(([key, label], idx) => (
                <li key={idx}>
                  <Link href={`/blog/?series=${key}`} className={styles.catLink}>
                    <span>{label}</span>
                    <span className={styles.catCount}>
                      ({blogData.filter(b => b.series === key).length})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Structured Data: Breadcrumb and BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://gastroliver.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://gastroliver.in/blog/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://gastroliver.in/blog/${post.slug}/`
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://gastroliver.in/blog/${post.slug}/`
            },
            "headline": post.title,
            "description": post.metaDescription,
            "image": `https://gastroliver.in${post.featuredImage}`,
            "datePublished": post.publishedDate ? post.publishedDate.split('-').reverse().join('-') : undefined, // Convert DD-MM-YYYY to YYYY-MM-DD
            "dateModified": post.modifiedDate ? post.modifiedDate.split('-').reverse().join('-') : undefined,
            "author": {
              "@type": "Person",
              "name": "Dr. Ankita Gupta",
              "url": "https://gastroliver.in/doctor-profile/"
            },
            "publisher": {
              "@type": "MedicalOrganization",
              "name": "Gastro Liver Endoscopy Centre",
              "logo": {
                "@type": "ImageObject",
                "url": "https://gastroliver.in/images/logo/logo.png"
              }
            }
          })
        }}
      />
    </article>
  );
}
