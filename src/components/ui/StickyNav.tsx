'use client';

import React, { useEffect, useState } from 'react';
import styles from './StickyNav.module.css';

interface StickyNavProps {
  sections: { id: string; title: string }[];
}

export default function StickyNav({ sections }: StickyNavProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [sections]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100; // Account for fixed navbar
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
      
      // Update browser URL hash cleanly
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav className={styles.navContainer} aria-label="Section navigation">
      {/* Mobile Horizontal scroll bar */}
      <div className={styles.mobileScrollMenu}>
        {sections.map((sec) => (
          <a
            key={sec.id}
            href={`#${sec.id}`}
            onClick={(e) => handleLinkClick(e, sec.id)}
            className={`${styles.mobileLink} ${activeId === sec.id ? styles.activeMobile : ''}`}
          >
            {sec.title}
          </a>
        ))}
      </div>

      {/* Desktop Vertical Menu */}
      <div className={styles.desktopMenu}>
        <h4 className={styles.navTitle}>Table of Contents</h4>
        <ul className={styles.navList}>
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                onClick={(e) => handleLinkClick(e, sec.id)}
                className={`${styles.desktopLink} ${activeId === sec.id ? styles.activeDesktop : ''}`}
              >
                <span className={styles.indicator} />
                <span className={styles.linkText}>{sec.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
