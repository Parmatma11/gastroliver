'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { proceduresData } from '../../../data/procedures';
import styles from './page.module.css';

export default function ProceduresIndexPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [procedures, setProcedures] = useState<any[]>(proceduresData);
  const [loadingProcedures, setLoadingProcedures] = useState<boolean>(true);
  
  // Modal states
  const [selectedProcedure, setSelectedProcedure] = useState<any | null>(null);
  const [modalContent, setModalContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Procedures & Facilities' }
  ];

  const defaultCategories = [
    { key: 'all', label: 'All Procedures' },
    { key: 'endoscopy', label: 'Endoscopy & EUS' },
    { key: 'liver', label: 'Liver Diagnostics' },
    { key: 'special', label: 'Special GI Procedures' }
  ];

  const [categories, setCategories] = useState<any[]>(defaultCategories);

  // Map slug to category key
  const getProcedureCategory = (slug: string): string => {
    const endoscopySlugs = [
      'ugi-endoscopy', 'colonoscopy', 'ercp', 'capsule-endoscopy', 
      'peroral-endoscopic-myotomy-poem', 'endoscopic-ultrasonography', 
      'double-balloon-enteroscopy-capsule-endoscopy'
    ];
    const liverSlugs = ['fibroscan', 'liver-biopsy'];

    if (endoscopySlugs.includes(slug)) return 'endoscopy';
    if (liverSlugs.includes(slug)) return 'liver';
    return 'special';
  };

  const getCategoryLabel = (slug: string): string => {
    const catKey = getProcedureCategory(slug);
    const cat = categories.find(c => c.key === catKey);
    return cat ? cat.label : 'Diagnostics';
  };

  const getCategoryCount = (key: string): number => {
    if (key === 'all') {
      return procedures.length;
    }
    return procedures.filter(p => (p.category || getProcedureCategory(p.slug)) === key).length;
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'your_project_id_here' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      setProcedures(proceduresData);
      setLoadingProcedures(false);
      return;
    }

    const fetchProceduresAndCategories = async () => {
      try {
        // Fetch categories dynamically
        const categoriesQuery = `*[_type == "procedureCategory"] | order(title asc) {
          "key": slug.current,
          "label": title
        }`;
        const dynamicCategories = await client.fetch(categoriesQuery);
        if (dynamicCategories && dynamicCategories.length > 0) {
          setCategories([{ key: 'all', label: 'All Procedures' }, ...dynamicCategories]);
        }

        // Fetch procedures
        const query = `*[_type == "procedure"] | order(title asc) {
          "slug": slug.current,
          "category": coalesce(category->slug.current, category),
          title,
          metaDescription,
          "sideImage": sideImage.asset->url,
          content,
          seo
        }`;
        const data = await client.fetch(query);
        if (data && data.length > 0) {
          setProcedures(data);
        }
      } catch (err) {
        console.error('Failed to fetch procedures/categories from Sanity, falling back:', err);
        setProcedures(proceduresData);
      } finally {
        setLoadingProcedures(false);
      }
    };

    fetchProceduresAndCategories();
  }, []);

  // Fetch procedure details on card click
  const handleCardClick = (procedure: any) => {
    setSelectedProcedure(procedure);
    setError(null);
    setModalContent('');

    if (!procedure.content) {
      setLoading(true);
      fetch(`/api/procedures/${procedure.slug}/`)
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
    }
  };

  // Handle modal closing
  const closeModal = () => {
    setSelectedProcedure(null);
    setModalContent('');
    setError(null);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProcedure) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProcedure]);

  const handleBookClick = () => {
    closeModal();
    // Dispatch global event for GLEC appointment modal
    const event = new CustomEvent('open-appointment');
    window.dispatchEvent(event);
  };

  // Filter procedures list
  const filteredProcedures = procedures.filter(p => {
    const categoryKey = p.category || getProcedureCategory(p.slug);
    const matchesCategory = activeCategory === 'all' || categoryKey === activeCategory;
    const matchesSearch = (p.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (p.metaDescription?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className={styles.container}>
      <PageHero
        title="Procedures & Facilities"
        subtitle="Advanced diagnostic endoscopy, liver screening, and therapeutic GI procedures"
        breadcrumbs={breadcrumbs}
        compact
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
                {cat.label} ({getCategoryCount(cat.key)})
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
              placeholder="Search GI procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        {filteredProcedures.length > 0 ? (
          <div className={styles.grid}>
            {filteredProcedures.map((p, idx) => (
              <ScrollReveal key={p.slug} direction="up" delay={idx * 30 + 50}>
                <article className={styles.card} onClick={() => handleCardClick(p)}>
                  {p.sideImage && (
                    <div className={styles.cardImageWrapper}>
                      <Image
                        src={p.sideImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                        className={styles.cardImg}
                      />
                      <span className={styles.cardBadge}>
                        {getCategoryLabel(p.slug)}
                      </span>
                    </div>
                  )}
                  <div className={styles.cardContent}>
                    {!p.sideImage && (
                      <span className={styles.cardBadgeInline}>
                        {getCategoryLabel(p.slug)}
                      </span>
                    )}
                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <p className={styles.cardExcerpt}>{p.metaDescription}</p>
                    <button className={styles.viewBtn}>
                      <span>Explore Procedure</span>
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
            <h3>No Procedures Found</h3>
            <p>We couldn&apos;t find any results matching &ldquo;{searchQuery}&rdquo;. Try revising filters or search terms.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Dynamic Detail Modal (Big Card Overlay) */}
      {selectedProcedure && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderTitle}>
                <span className={styles.modalBadge}>{getCategoryLabel(selectedProcedure.slug)}</span>
                <h2>{selectedProcedure.title}</h2>
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
                  <p>Fetching procedure details...</p>
                </div>
              )}

              {error && (
                <div className={styles.errorWrapper}>
                  <p>{error}</p>
                </div>
              )}

              {!loading && !error && (selectedProcedure.content ? (
                <div className={styles.modalHtml}>
                  <PortableText value={selectedProcedure.content} />
                </div>
              ) : modalContent ? (
                <div 
                  className={styles.modalHtml}
                  dangerouslySetInnerHTML={{ __html: modalContent }}
                />
              ) : null)}
            </div>

            {/* Modal Footer (CTAs) */}
            <div className={styles.modalFooter}>
              <Button variant="primary" size="md" onClick={handleBookClick}>
                Book Consultation
              </Button>
              <Link href={`/procedures/${selectedProcedure.slug}/`} className={styles.fullPageLink} onClick={closeModal}>
                Read Standalone Article &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
