'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { blogData } from '../../../data/blog';
import styles from './page.module.css';

export default function BlogIndexPage() {
  const [activeSeries, setActiveSeries] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [selectedPost, setSelectedPost] = useState<typeof blogData[0] | null>(null);
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

  // Fetch blog details for modal on card click
  const handleCardClick = (post: typeof blogData[0]) => {
    setSelectedPost(post);
    setLoading(true);
    setError(null);
    setModalContent('');

    fetch(`/api/blog/${post.slug}/`)
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
  const filteredPosts = blogData.filter(post => {
    const matchesSeries = activeSeries === 'all' || post.series === activeSeries;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
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
            {Object.entries(seriesNames).map(([key, label], idx) => (
              <button
                key={idx}
                className={`${styles.filterBtn} ${activeSeries === key ? styles.active : ''}`}
                onClick={() => setActiveSeries(key)}
              >
                {label} ({key === 'all' ? blogData.length : blogData.filter(b => b.series === key).length})
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
                        {post.series ? (seriesNames[post.series] || post.series) : "General"}
                      </span>
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {!post.featuredImage && (
                      <span className={styles.cardBadgeInline}>
                        {post.series ? (seriesNames[post.series] || post.series) : "General"}
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
                  {selectedPost.series ? (seriesNames[selectedPost.series] || selectedPost.series) : "General"}
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

              {!loading && !error && modalContent && (
                <div 
                  className={styles.modalHtml}
                  dangerouslySetInnerHTML={{ __html: modalContent }}
                />
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
