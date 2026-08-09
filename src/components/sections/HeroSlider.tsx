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
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${activeSlide === index ? styles.slideActive : ''}`}
        >
          <div 
            className={styles.slideBg}
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
          />
          <div className={styles.slideOverlay}></div>
          <div className={`container ${styles.slideContent}`}>
            <span className={`${styles.slideSubtitle} ${activeSlide === index ? 'fade-up-stagger delay-1' : ''}`}>{slide.subtitle}</span>
            <h2 className={`${styles.slideTitle} ${activeSlide === index ? 'fade-up-stagger delay-2' : ''}`}>{slide.title}</h2>
            <p className={`${styles.slideDesc} ${activeSlide === index ? 'fade-up-stagger delay-3' : ''}`}>{slide.description}</p>
            <div className={`${styles.slideActions} ${activeSlide === index ? 'fade-up-stagger delay-4' : ''}`}>
              <Button variant="secondary" size="lg" onClick={handleOpenAppointment}>
                {slide.ctaText}
              </Button>
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
        </div>
      ))}
      
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
