'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData } from '../../../data/gallery';
import PageHero from '../../components/layout/PageHero';
import styles from '../../app/gallery/page.module.css';

export default function GalleryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % activeImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + activeImages.length) % activeImages.length);
    }
  };

  return (
    <>
      <PageHero
        title="Clinic Gallery"
        subtitle="A tour of Gastro Liver Endoscopy Centre facilities, equipment, and consulting rooms"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Category Filter Pills */}
        <div className={styles.filterBar}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {activeImages.map((img, idx) => (
            <div
              key={idx}
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
          ))}
        </div>

        {/* Inline Lightbox Zoom Modal */}
        {lightboxIndex !== null && (
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
                  src={activeImages[lightboxIndex].src}
                  alt={activeImages[lightboxIndex].alt}
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
                <span>{activeImages[lightboxIndex].categoryName}</span>
                <p>{activeImages[lightboxIndex].alt}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
