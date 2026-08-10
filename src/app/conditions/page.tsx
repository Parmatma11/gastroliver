'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { diseasesData } from '../../../data/diseases';
import styles from './page.module.css';

export default function ConditionsIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [selectedDisease, setSelectedDisease] = useState<typeof diseasesData[0] | null>(null);
  const [modalContent, setModalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Diseases We Treat' }
  ];

  const categories = [
    { key: 'all', label: 'All Conditions' },
    { key: 'esophagus-stomach', label: 'Esophagus & Stomach' },
    { key: 'intestines', label: 'Intestinal Diseases' },
    { key: 'liver', label: 'Liver & Hepatology' },
    { key: 'pancreas-biliary', label: 'Pancreas & Biliary' }
  ];

  // Fetch disease details for modal on card click (event-driven to avoid cascading renders inside effects)
  const handleCardClick = (disease: typeof diseasesData[0]) => {
    setSelectedDisease(disease);
    setLoading(true);
    setError(null);
    setModalContent('');

    fetch(`/api/conditions/${disease.slug}/`)
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
    setSelectedDisease(null);
    setModalContent('');
    setError(null);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDisease) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDisease]);

  const handleBookClick = () => {
    closeModal();
    // Dispatch global event for GLEC appointment modal
    const event = new CustomEvent('open-appointment');
    window.dispatchEvent(event);
  };

  // Filter diseases list
  const filteredDiseases = diseasesData.filter(d => {
    const matchesCategory = activeCategory === 'all' || d.category === activeCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.metaDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (key: string) => {
    const cat = categories.find(c => c.key === key);
    return cat ? cat.label : 'Gastroenterology';
  };

  return (
    <main className={styles.container}>
      <PageHero
        title="Diseases We Treat"
        subtitle="Comprehensive clinical guide, diagnostics, and advanced treatment options"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Filters and Search Bar Row */}
        <div className={styles.searchBarRow}>
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
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
              placeholder="Search digestive conditions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredDiseases.length > 0 ? (
          <div className={styles.grid}>
            {filteredDiseases.map((d, idx) => (
              <ScrollReveal key={d.slug} direction="up" delay={idx * 30 + 50}>
                <article className={styles.card} onClick={() => handleCardClick(d)}>
                  {d.sideImage && (
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={d.sideImage}
                        alt={d.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                        className={styles.cardImg}
                      />
                      <span className={styles.cardBadge}>
                        {getCategoryLabel(d.category)}
                      </span>
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {!d.sideImage && (
                      <span className={styles.cardBadgeInline}>
                        {getCategoryLabel(d.category)}
                      </span>
                    )}
                    <h2 className={styles.cardTitle}>{d.title}</h2>
                    <p className={styles.cardExcerpt}>{d.metaDescription}</p>
                    <button className={styles.viewBtn}>
                      <span>Explore Details</span>
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
            <h3>No Conditions Found</h3>
            <p>We couldn&apos;t find any results matching &ldquo;{searchQuery}&rdquo;. Try revising filters or search terms.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Dynamic Detail Modal (Big Card Overlay) */}
      {selectedDisease && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <span className={styles.modalBadge}>{getCategoryLabel(selectedDisease.category)}</span>
                <h2>{selectedDisease.title}</h2>
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
                  <p>Fetching clinical details...</p>
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
              <Link href={`/conditions/${selectedDisease.slug}/`} className={styles.fullPageLink} onClick={closeModal}>
                Read Standalone Article &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
