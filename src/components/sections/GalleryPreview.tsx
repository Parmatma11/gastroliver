'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { homepageGalleryImages } from '../../../data/gallery';
import styles from './GalleryPreview.module.css';
import ScrollReveal from '../ui/ScrollReveal';

export default function GalleryPreview() {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // We show the first 4 images as homepage preview
  const previewImages = homepageGalleryImages.slice(0, 4).map((src, index) => {
    const titles = [
      "Dispensary & Consultation Area",
      "Awards & Credentials Showcase",
      "Advanced Endoscopy Room Setup",
      "GLEC Clinic Consulting Room"
    ];
    return { src, alt: titles[index] };
  });

  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <h2>Clinic Gallery</h2>
            <p>Peek inside Gastro Liver Endoscopy Centre in Greater Kailash, South Delhi</p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {previewImages.map((img, index) => (
            <ScrollReveal
              key={index}
              delay={index * 100}
              duration={800}
              direction="up"
              className={styles.galleryCard}
            >
              <div onClick={() => setLightboxImage(img.src)} style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.overlay}>
                  <span className={styles.title}>{img.alt}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.zoomIcon}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.636zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.actions}>
          <Link href="/gallery/" className={styles.viewAllLink}>
            <span>View Full Gallery</span>
            <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
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
    </section>
  );
}
