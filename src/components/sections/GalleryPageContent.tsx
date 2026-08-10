'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData } from '../../../data/gallery';
import PageHero from '../../components/layout/PageHero';
import ScrollReveal from '../ui/ScrollReveal';
import styles from '../../app/gallery/page.module.css';

export default function GalleryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Gallery' }
  ];

  // Helper: Get all unique categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    ...galleryData.map(cat => ({ id: cat.id, name: cat.name }))
  ];

  // Get all unique images across all categories to calculate 'all' count
  const allUniqueImages: string[] = [];
  galleryData.forEach(cat => {
    cat.images.forEach(img => {
      if (!allUniqueImages.includes(img.src)) {
        allUniqueImages.push(img.src);
      }
    });
  });
  const totalUniqueImagesCount = allUniqueImages.length;

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') {
      return totalUniqueImagesCount;
    }
    const cat = galleryData.find(c => c.id === categoryId);
    if (!cat) return 0;
    
    const uniqueInCat: string[] = [];
    cat.images.forEach(img => {
      if (!uniqueInCat.includes(img.src)) {
        uniqueInCat.push(img.src);
      }
    });
    return uniqueInCat.length;
  };

  // Get active images based on filter
  const activeImages: { src: string; alt: string; categoryName: string }[] = [];

  galleryData.forEach(cat => {
    if (selectedCategory === 'all' || selectedCategory === cat.id) {
      cat.images.forEach(img => {
        // Prevent duplicate images in display list
        if (!activeImages.some(ai => ai.src === img.src)) {
          activeImages.push({
            src: img.src,
            alt: img.alt,
            categoryName: cat.name
          });
        }
      });
    }
  });

  // Filter active images by search query
  const filteredImages = activeImages.filter(img => {
    const matchesSearch = img.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          img.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <>
      <PageHero
        title="Clinic Gallery"
        subtitle="A tour of Gastro Liver Endoscopy Centre facilities, equipment, and consulting rooms"
        breadcrumbs={breadcrumbs}
        compact
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Filters and Search Bar Row (identical to blog page UI) */}
        <div className={styles.searchBarRow}>
          <div className={styles.filterBar}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name} ({getCategoryCount(cat.id)})
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
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredImages.length > 0 ? (
          <div className={styles.grid}>
            {filteredImages.map((img, idx) => (
              <ScrollReveal key={`${img.src}-${idx}`} direction="up" delay={idx * 30 + 50}>
                <div
                  className={styles.card}
                  onClick={() => setLightboxIndex(idx)}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                      className={styles.image}
                    />
                    <div className={styles.overlay}>
                      <span className={styles.catLabel}>{img.categoryName}</span>
                      <p className={styles.zoomText}>Click to Zoom</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <h3>No Images Found</h3>
            <p>We couldn&apos;t find any gallery images matching &ldquo;{searchQuery}&rdquo;. Try revising your filters or search terms.</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}

        {/* Inline Lightbox Zoom Modal */}
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <div className={styles.lightbox} onClick={() => setLightboxIndex(null)}>
            <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
              <button 
                className={styles.closeBtn} 
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Lightbox"
              >
                &times;
              </button>
              
              <button 
                className={`${styles.navBtn} ${styles.prevBtn}`} 
                onClick={handlePrev}
                aria-label="Previous Image"
              >
                &#10094;
              </button>
              
              <div className={styles.lightboxImageWrapper}>
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  fill
                  className={styles.lightboxImage}
                  priority
                />
              </div>
              
              <button 
                className={`${styles.navBtn} ${styles.nextBtn}`} 
                onClick={handleNext}
                aria-label="Next Image"
              >
                &#10095;
              </button>

              <div className={styles.lightboxCaption}>
                <span>{filteredImages[lightboxIndex].categoryName}</span>
                <p>{filteredImages[lightboxIndex].alt}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
