import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { blogData } from '../../../../data/blog';
import { contactData } from '../../../../data/contact';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';
import ReadingProgressBar from '../../../components/ui/ReadingProgressBar';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import StickyNav from '../../../components/ui/StickyNav';
import { parseContentToSections, MarkdownSection } from '../../../lib/sectionParser';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function stripTableOfContents(markdown: string): string {
  if (!markdown) return "";
  
  const lines = markdown.split('\n');
  const resultLines: string[] = [];
  let inToc = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect Table of Contents header
    if (trimmed.toLowerCase() === 'table of contents') {
      inToc = true;
      continue;
    }
    
    if (inToc) {
      // Skip empty lines, Toggle button lines, and list items representing links
      if (trimmed === '' || 
          trimmed.includes('[Toggle') || 
          trimmed.includes('](#)') || 
          trimmed.startsWith('- [') || 
          trimmed.startsWith('* [') ||
          (trimmed.startsWith('-') && trimmed.includes('](#'))) {
        continue;
      }
      
      // End of TOC block
      inToc = false;
    }
    
    resultLines.push(line);
  }
  
  return resultLines.join('\n');
}

interface PortableTextSection {
  id: string;
  title: string;
  cleanTitle: string;
  level: number;
  blocks: any[];
  contentHtml?: string; // empty for portable text
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function groupPortableTextIntoSections(blocks: any[]): PortableTextSection[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  const sections: PortableTextSection[] = [];
  
  let currentSection: PortableTextSection = {
    id: 'overview',
    title: 'Overview',
    cleanTitle: 'Overview',
    level: 1,
    blocks: []
  };

  for (const block of blocks) {
    if (block._type === 'block' && block.style === 'h2') {
      sections.push(currentSection);

      const headingText = block.children?.map((c: any) => c.text).join('') || '';
      const sectionId = slugify(headingText) || `section-${sections.length}`;
      
      currentSection = {
        id: sectionId,
        title: headingText,
        cleanTitle: headingText,
        level: 2,
        blocks: []
      };
      continue;
    }

    currentSection.blocks.push(block);
  }

  sections.push(currentSection);

  return sections.filter(s => s.blocks.length > 0 || s.id === 'overview');
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      post = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0] { seo, title, metaDescription }`, { slug });
    } catch (err) {
      console.error('Error generating dynamic SEO metadata from Sanity:', err);
    }
  }

  if (!post) {
    post = blogData.find(b => b.slug === slug);
  }

  if (!post) return {};

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.metaDescription,
    alternates: {
      canonical: `/blog/${slug}/`,
    }
  };
}

// Generate static routes for all blog posts
export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const posts = await client.fetch(`*[_type == "blogPost"] { "slug": slug.current }`);
      if (posts && posts.length > 0) {
        return posts.map((p: any) => ({ slug: p.slug }));
      }
    } catch (err) {
      console.error('Error generating static parameters from Sanity:', err);
    }
  }

  return blogData.map(b => ({
    slug: b.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  let post: any = null;
  let isSanity = false;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const query = `*[_type == "blogPost" && slug.current == $slug][0] {
        "slug": slug.current,
        title,
        "series": coalesce(series->slug.current, series),
        "seriesTitle": coalesce(series->title, series),
        metaDescription,
        "featuredImage": featuredImage.asset->url,
        publishedDate,
        readTime,
        author,
        seo,
        content
      }`;
      post = await client.fetch(query, { slug });
      if (post) {
        isSanity = true;
      }
    } catch (err) {
      console.error('Failed to fetch blog post from Sanity, falling back to local files:', err);
    }
  }

  // Fetch categories dynamically
  let categories = [
    { slug: 'general', title: 'General GI Health' },
    { slug: 'fatty-liver', title: 'Fatty Liver Series' },
    { slug: 'acid-reflux', title: 'Acid Reflux Series' },
    { slug: 'weight-loss', title: 'Weight Loss Program' },
  ];

  let categoryCounts: Record<string, number> = {};

  if (isSanity) {
    try {
      const sanityCats = await client.fetch(`*[_type == "category"] { "slug": slug.current, title }`);
      if (sanityCats && sanityCats.length > 0) {
        const merged = [...categories];
        sanityCats.forEach((cat: any) => {
          if (cat.slug && !merged.some(m => m.slug === cat.slug)) {
            merged.push({ slug: cat.slug, title: cat.title });
          }
        });
        categories = merged;
      }

      // Count posts per category in Sanity
      const postsSeries = await client.fetch(`*[_type == "blogPost"] { "seriesSlug": series->slug.current }`);
      postsSeries.forEach((p: any) => {
        if (p.seriesSlug) {
          categoryCounts[p.seriesSlug] = (categoryCounts[p.seriesSlug] || 0) + 1;
        }
      });
    } catch (err) {
      console.error('Error fetching categories for details sidebar:', err);
    }
  } else {
    blogData.forEach(b => {
      if (b.series) {
        categoryCounts[b.series] = (categoryCounts[b.series] || 0) + 1;
      }
    });
  }

  if (!post) {
    post = blogData.find(b => b.slug === slug);
  }

  if (!post) {
    notFound();
  }

  // Load content section layout
  let sections: any[] = [];

  if (isSanity && post.content) {
    sections = groupPortableTextIntoSections(post.content);
  } else {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = stripTableOfContents(rawContent);
      sections = parseContentToSections(cleanedContent);
    } else {
      sections = [{
        id: "overview",
        title: "Overview",
        cleanTitle: "Overview",
        level: 1,
        contentHtml: `<p>${post.metaDescription}</p><p>(This article's full content is currently being migrated and will be available shortly.)</p>`
      }];
    }
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog/' },
    { label: post.title }
  ];

  // Helper: Get recent posts for sidebar (exclude current one)
  let recentPosts: any[] = [];
  if (isSanity) {
    try {
      recentPosts = await client.fetch(`*[_type == "blogPost" && slug.current != $slug] | order(publishedDate desc)[0...3] {
        "slug": slug.current,
        title,
        publishedDate,
        "featuredImage": featuredImage.asset->url
      }`, { slug });
    } catch (err) {
      console.error('Error fetching dynamic recent posts from Sanity:', err);
    }
  }
  
  if (recentPosts.length === 0) {
    recentPosts = blogData.filter(p => p.slug !== slug).slice(0, 3);
  }

  // Group by series names for styling
  const seriesNames: Record<string, string> = {
    'general': 'General GI Health',
    'fatty-liver': 'Fatty Liver Series',
    'acid-reflux': 'Acid Reflux Series',
    'weight-loss': 'Weight Loss Program',
  };

  // Extract sections
  const introSection = sections.find(s => s.id === 'overview') || sections[0];
  const bodySections = sections.filter(s => s !== introSection);

  // Setup vertical sticky nav sections list
  const navItems = [
    { id: introSection.id, title: 'Overview' },
    ...bodySections.map(sec => ({ id: sec.id, title: sec.cleanTitle }))
  ];

  return (
    <article className={styles.container}>
      <ReadingProgressBar />
      
      <PageHero
        title={post.title}
        subtitle={`${post.publishedDate} • By ${post.author} • ${post.readTime} Read`}
        breadcrumbs={breadcrumbs}
        bannerImage={post.featuredImage}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Left Column: Section Navigation */}
        <aside className={styles.navColumn}>
          <StickyNav sections={navItems} />
        </aside>

        {/* Center Column: Sections Content */}
        <div className={styles.mainColumn}>


          {/* Main article intro content */}
          <ScrollReveal direction="up" delay={50}>
            <section id={introSection.id} className={styles.contentSection}>
              {introSection.contentHtml ? (
                <div 
                  className={styles.sectionBody}
                  dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                />
              ) : (
                <div className={styles.sectionBody}>
                  <PortableText value={introSection.blocks} />
                </div>
              )}
            </section>
          </ScrollReveal>

          {/* Render remaining body sections dynamically */}
          {bodySections.map((sec, idx) => (
            <ScrollReveal key={idx} direction="up" delay={50}>
              <section id={sec.id} className={styles.contentSection}>
                <h2 className={styles.sectionHeading}>{sec.cleanTitle}</h2>
                {sec.contentHtml ? (
                  <div 
                    className={styles.sectionBody}
                    dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
                  />
                ) : (
                  <div className={styles.sectionBody}>
                    <PortableText value={sec.blocks} />
                  </div>
                )}
              </section>
            </ScrollReveal>
          ))}

          {/* Share/Footer Widget */}
          <ScrollReveal direction="up" delay={50}>
            <div className={styles.articleFooter}>
              <div className={styles.tags}>
                <span className={styles.tagLabel}>Series:</span>
                <span className={styles.tagValue}>{post.seriesTitle || (post.series ? (seriesNames[post.series] || post.series) : "General")}</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Consultation CTA Block */}
          <ScrollReveal direction="up" delay={50}>
            <div className={styles.contentCTA}>
              <h3>Need Clinical Advice?</h3>
              <p>Schedule a clinic visit with Dr. Ankita Gupta at Gastro Liver Endoscopy Centre in Greater Kailash, South Delhi.</p>
              <div className={styles.ctaActions}>
                <Button variant="secondary" size="md" href="#appointment-modal">
                  Book Clinic Appointment
                </Button>
                <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className={styles.phoneLink}>
                  Call: {contactData.phone}
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: Sidebar */}
        <aside className={styles.sidebar}>

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
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link href={`/blog/?series=${cat.slug}`} className={styles.catLink}>
                    <span>{cat.title}</span>
                    <span className={styles.catCount}>
                      ({categoryCounts[cat.slug] || 0})
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
            "image": post.featuredImage ? (post.featuredImage.startsWith('http') ? post.featuredImage : `https://gastroliver.in${post.featuredImage}`) : undefined,
            "datePublished": post.publishedDate ? (post.publishedDate.includes('-') ? post.publishedDate.split('-').reverse().join('-') : post.publishedDate) : undefined, // Convert DD-MM-YYYY to YYYY-MM-DD
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
