'use client';

import { useState } from 'react';
import Image from 'next/image';
import { homepageGalleryImages } from '../../../data/gallery';
import styles from './GalleryLightbox.module.css';

export default function GalleryLightbox() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Compile all images with metadata
  const allImages = homepageGalleryImages.map((src, index) => {
    // Distribute categories to make filterable mockup work nicely
    let category = 'interior';
    if (index % 3 === 0) category = 'endoscopy';
    else if (index % 3 === 1) category = 'waiting-area';

    let alt = "Gastro Liver Endoscopy Centre Clinic Photo";
    if (category === 'endoscopy') alt = "HD Endoscopy Suite & Equipment";
    else if (category === 'waiting-area') alt = "Spacious Waiting Area Lounge";
    else alt = "Clinic Dispensary & Consultation Desk";

    return { src, category, alt };
  });

  const categories = [
    { id: 'all', label: 'All Images' },
    { id: 'endoscopy', label: 'Endoscopy Room' },
    { id: 'waiting-area', label: 'Waiting Lounge' },
    { id: 'interior', label: 'Clinic Interiors' }
  ];

  const filteredImages = activeCategory === 'all'
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  return (
    <div className={styles.container}>
      {/* Category Filters */}
      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={styles.grid}>
        {filteredImages.map((img, index) => (
          <div
            key={index}
            className={styles.galleryCard}
            onClick={() => setLightboxImage(img.src)}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className={styles.galleryImage}
              />
            </div>
            <div className={styles.overlay}>
              <span className={styles.categoryLabel}>
                {img.category === 'endoscopy' ? 'Endoscopy Room' : img.category === 'waiting-area' ? 'Waiting Lounge' : 'Clinic Interior'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.zoomIcon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.636zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className={styles.lightbox} onClick={() => setLightboxImage(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setLightboxImage(null)} aria-label="Close Lightbox">
              &times;
            </button>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={lightboxImage}
                alt="Clinic Lightbox Zoom"
                fill
                className={styles.lightboxImage}
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
