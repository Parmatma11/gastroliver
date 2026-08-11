'use client';

import { useState, useRef, useEffect } from 'react';
import { testimonialsData } from '../../../data/testimonials';
import TestimonialCard from '../ui/TestimonialCard';
import styles from '../../app/patient-testimonials/page.module.css';

export default function TestimonialsPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const headerOffset = 80;
      const stickyTrackHeight = window.innerHeight - headerOffset;
      const stickyRange = container.scrollHeight - stickyTrackHeight;

      if (stickyRange <= 0) return;

      const scrolled = headerOffset - rect.top;
      let progress = scrolled / stickyRange;
      progress = Math.max(0, Math.min(1, progress));

      setScrollProgress(progress);

      const viewportWidth = track.parentElement?.clientWidth || window.innerWidth;
      const maxTranslate = track.scrollWidth - viewportWidth;

      if (maxTranslate > 0) {
        setTranslateX(progress * maxTranslate);
      } else {
        setTranslateX(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    handleScroll();

    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Rating Overview widget - static above the scroll container */}
      <div className="container" style={{ marginTop: 'var(--space-xl)' }}>
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.number}>4.9</span>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles.label}>Google Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.number}>9,980+</span>
            <div className={styles.stars}>Happy Patients</div>
            <span className={styles.label}>Treated Successfully</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.number}>15+</span>
            <div className={styles.stars}>Years Experience</div>
            <span className={styles.label}>Of Clinical Practice</span>
          </div>
        </div>
      </div>

      <section ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.stickyTrack}>
          {/* Header section with small tag */}
          <div className={styles.timelineHeader}>
            <div className={styles.sectionTag}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              Patient Reviews
            </div>
          </div>

          <div className={styles.horizontalTrackWrapper}>
            <div
              ref={trackRef}
              className={styles.horizontalTrack}
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {/* Central connecting line background */}
              <div className={styles.timelinePath}>
                <div
                  className={styles.timelineProgress}
                  style={{ width: `${scrollProgress * 100}%` }}
                ></div>
              </div>

              {testimonialsData.map((test, idx) => {
              const stepFraction = idx / Math.max(1, testimonialsData.length - 1);
              const isActive = scrollProgress >= stepFraction - 0.05;

              return (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.cardWrapper}>
                    <TestimonialCard
                      name={test.name}
                      text={test.text}
                      rating={test.rating}
                      avatar={test.avatar}
                      compact
                      active={isActive}
                    />
                  </div>
                    <div className={`${styles.timelineConnector} ${isActive ? styles.timelineConnectorActive : ''}`}></div>
                    <div className={styles.timelineNode}>
                      <div className={`${styles.timelineDot} ${isActive ? styles.timelineDotActive : ''}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
