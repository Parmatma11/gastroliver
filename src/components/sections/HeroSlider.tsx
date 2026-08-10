'use client';

import { useState, useEffect } from 'react';
import { heroSlides } from '../../../data/homepage';
import Button from '../ui/Button';
import styles from './HeroSlider.module.css';

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto slide hero banner every 6s
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleOpenAppointment = () => {
    const event = new CustomEvent('open-appointment');
    window.dispatchEvent(event);
  };

  return (
    <section className={styles.heroSection} aria-label="Welcome banner">
      <div className={`container ${styles.sliderContainer}`}>
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`${styles.slide} ${activeSlide === index ? styles.slideActive : ''}`}
          >
            {/* Left: Text Content */}
            <div className={styles.textContent}>
              <span className={`${styles.slideSubtitle} ${activeSlide === index ? 'fade-up-stagger delay-1' : ''}`}>
                {slide.subtitle}
              </span>
              <h2 className={`${styles.slideTitle} ${activeSlide === index ? 'fade-up-stagger delay-2' : ''}`}>
                {slide.title}
              </h2>
              <p className={`${styles.slideDesc} ${activeSlide === index ? 'fade-up-stagger delay-3' : ''}`}>
                {slide.description}
              </p>
              <div className={`${styles.slideActions} ${activeSlide === index ? 'fade-up-stagger delay-4' : ''}`}>
                {slide.ctaLink === "#appointment-modal" ? (
                  <Button variant="secondary" size="lg" onClick={handleOpenAppointment}>
                    {slide.ctaText}
                  </Button>
                ) : (
                  <Button variant="secondary" size="lg" href="/procedures/">
                    {slide.ctaText}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className={styles.heroOutlineBtn}
                  onClick={() => {
                    const target = document.getElementById('treatments');
                    target?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Services
                </Button>
              </div>
            </div>

            {/* Right: Framed Image */}
            <div className={styles.imageContent}>
              <div className={styles.imageWrapper}>
                <img
                  src={slide.backgroundImage}
                  alt={slide.title}
                  className={styles.slideImage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider dots */}
      <div className={styles.sliderDots}>
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${activeSlide === i ? styles.dotActive : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
