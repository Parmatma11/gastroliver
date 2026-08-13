'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { blogData } from '../../../data/blog';
import styles from './page.module.css';

export default function BlogIndexPage() {
  const [activeSeries, setActiveSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<any[]>(blogData);
  const [loadingBlogs, setLoadingBlogs] = useState<boolean>(true);
  
  // Modal states
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [modalContent, setModalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  const [categories, setCategories] = useState<{ slug: string; title: string }[]>([
    { slug: 'all', title: 'All Articles' },
    { slug: 'general', title: 'General GI Health' },
    { slug: 'fatty-liver', title: 'Fatty Liver Series' },
    { slug: 'acid-reflux', title: 'Acid Reflux Series' },
    { slug: 'weight-loss', title: 'Weight Loss Program' },
  ]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your_project_id_here' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      setPosts(blogData);
      setLoadingBlogs(false);
      return;
    }

    const fetchBlogs = async () => {
      try {
        const query = `*[_type == "blogPost"] | order(publishedDate desc) {
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
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setPosts(data);

          // Dynamically fetch and merge categories from Sanity
          try {
            const categoriesData = await client.fetch(`*[_type == "category"] { "slug": slug.current, title }`);
            if (categoriesData && categoriesData.length > 0) {
              setCategories(prev => {
                const merged = [...prev];
                categoriesData.forEach((cat: any) => {
                  if (cat.slug && !merged.some(m => m.slug === cat.slug)) {
                    merged.push({ slug: cat.slug, title: cat.title });
                  }
                });
                return merged;
              });
            }
          } catch (catErr) {
            console.error('Failed to fetch categories:', catErr);
          }
        }
      } catch (err) {
        console.error('Failed to fetch from Sanity, falling back to local data:', err);
        setPosts(blogData);
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch blog details for modal on card click
  const handleCardClick = (post: any) => {
    setSelectedPost(post);
    setError(null);
    setModalContent('');

    if (post.content) {
      setLoading(false);
      return;
    }

    if (post._id || (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)) {
      setLoading(true);
      client.fetch(`*[_type == "blogPost" && slug.current == $slug][0].content`, { slug: post.slug })
        .then(content => {
          if (content) {
            setSelectedPost((prev: any) => prev ? { ...prev, content } : null);
          } else {
            return fetchLocalPreview(post.slug);
          }
        })
        .catch(err => {
          console.error('Error fetching blog details from Sanity:', err);
          return fetchLocalPreview(post.slug);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    setLoading(true);
    fetchLocalPreview(post.slug);
  };

  const fetchLocalPreview = (slug: string) => {
    fetch(`/api/blog/${slug}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch details');
        }
        return res.json();
      })
      .then(data => {
        setModalContent(data.html);
      })
      .catch(err => {
        console.error(err);
        setError('Could not load description. Please try again or visit the full page article.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle modal closing
  const closeModal = () => {
    setSelectedPost(null);
    setModalContent('');
    setError(null);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost]);

  const handleBookClick = () => {
    closeModal();
    // Dispatch global event for GLEC appointment modal
    const event = new CustomEvent('open-appointment');
    window.dispatchEvent(event);
  };

  // Filter posts list
  const filteredPosts = posts.filter(post => {
    const matchesSeries = activeSeries === 'all' || post.series === activeSeries;
    const matchesSearch = (post.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (post.metaDescription?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesSeries && matchesSearch;
  });

  return (
    <main className={styles.container}>
      <PageHero
        title="Medical Articles & Insights"
        subtitle="Professional gastrointestinal health updates, diet charts, and liver care guidelines"
        breadcrumbs={breadcrumbs}
        compact
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Filters and Search Bar Row */}
        <div className={styles.searchBarRow}>
          <div className={styles.filterBar}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`${styles.filterBtn} ${activeSeries === cat.slug ? styles.active : ''}`}
                onClick={() => setActiveSeries(cat.slug)}
              >
                {cat.title} ({cat.slug === 'all' ? posts.length : posts.filter(b => b.series === cat.slug).length})
              </button>
            ))}
          </div>

          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className={styles.grid}>
            {filteredPosts.map((post, idx) => (
              <ScrollReveal key={post.slug} direction="up" delay={idx * 30 + 50}>
                <article className={styles.card} onClick={() => handleCardClick(post)}>
                  {post.featuredImage && (
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                        className={styles.cardImg}
                        loading={idx < 6 ? "eager" : "lazy"}
                      />
                      <span className={styles.cardBadge}>
                        {post.seriesTitle || (post.series ? (seriesNames[post.series] || post.series) : "General")}
                      </span>
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {!post.featuredImage && (
                      <span className={styles.cardBadgeInline}>
                        {post.seriesTitle || (post.series ? (seriesNames[post.series] || post.series) : "General")}
                      </span>
                    )}
                    <span className={styles.cardDate}>{post.publishedDate}</span>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.metaDescription}</p>
                    <button className={styles.viewBtn}>
                      <span>Read Article Preview</span>
                      <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No Articles Found</h3>
            <p>We couldn&apos;t find any medical articles matching &ldquo;{searchQuery}&rdquo;. Try revising filters or search terms.</p>
            <button onClick={() => { setSearchQuery(''); setActiveSeries('all'); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Dynamic Detail Modal (Big Card Overlay) */}
      {selectedPost && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <span className={styles.modalBadge}>
                  {selectedPost.seriesTitle || (selectedPost.series ? (seriesNames[selectedPost.series] || selectedPost.series) : "General")}
                </span>
                <span className={styles.modalDate}>{selectedPost.publishedDate}</span>
                <h2>{selectedPost.title}</h2>
              </div>
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Close Modal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={styles.closeIcon}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className={styles.modalBody}>
              {loading && (
                <div className={styles.loaderWrapper}>
                  <div className={styles.spinner} />
                  <p>Fetching article details...</p>
                </div>
              )}

              {error && (
                <div className={styles.errorWrapper}>
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && (
                selectedPost.content ? (
                  <div className="prose">
                    <PortableText value={selectedPost.content} />
                  </div>
                ) : modalContent ? (
                  <div 
                    className={styles.modalHtml}
                    dangerouslySetInnerHTML={{ __html: modalContent }}
                  />
                ) : null
              )}
            </div>

            {/* Modal Footer (CTAs) */}
            <div className={styles.modalFooter}>
              <Button variant="primary" size="md" onClick={handleBookClick}>
                Book Consultation
              </Button>
              <Link href={`/blog/${selectedPost.slug}/`} className={styles.fullPageLink} onClick={closeModal}>
                Read Standalone Article &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
