'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mainNavigation } from '../../../data/navigation';
import { contactData } from '../../../data/contact';
import styles from './Header.module.css';
import Button from '../ui/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when shifting routes
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index: number) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Banner Strip */}
      <div className={styles.topStrip}>
        <div className={`container ${styles.topStripContent}`}>
          <div className={styles.topInfo}>
            <span className={styles.topInfoItem}>
              <svg className={styles.topIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`}>{contactData.phone}</a>
            </span>
            <span className={styles.topInfoItem}>
              <svg className={styles.topIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Mon - Sat: 8 AM - 9 PM | Sun: 8 AM - 2 PM
            </span>
          </div>
          <div className={styles.topSocials}>
            <Link href="/payments/" className={styles.topLink}>Online Payments</Link>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className={styles.mainNavRow}>
        <div className={`container ${styles.navContainer}`}>
          {/* Logo / Branding */}
          <Link href="/" className={styles.branding} onClick={handleNavClick}>
            <div className={styles.logoWrapper}>
              <Image
                src="/images/logo/favicon.png"
                alt="GLEC Logo"
                width={36}
                height={36}
                className={styles.logo}
              />
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>GLEC</span>
              <span className={styles.brandSubtitle}>Gastro Liver Endoscopy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {mainNavigation.map((item, index) => {
                const hasChildren = item.children && item.children.length > 0;
                return (
                  <li key={index} className={`${styles.navItem} ${hasChildren ? styles.hasDropdown : ''}`}>
                    {hasChildren ? (
                      <>
                        <button className={styles.dropdownTrigger}>
                          {item.label}
                          <svg className={styles.chevron} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        <ul className={styles.dropdownMenu}>
                          {item.children!.map((subItem, subIndex) => (
                            <li key={subIndex} className={styles.dropdownItem}>
                              <Link href={subItem.path || '#'} className={styles.dropdownLink}>
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link href={item.path || '#'} className={styles.link}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className={styles.rightActions}>
            <Button variant="secondary" size="md" className={styles.ctaBtn} onClick={() => {
              const event = new CustomEvent('open-appointment');
              window.dispatchEvent(event);
            }}>
              Book Appointment
            </Button>

            {/* Mobile Menu Button */}
            <button
              className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.isOpen : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.drawerOpen : ''}`}>
        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          <ul className={styles.mobileNavList}>
            {mainNavigation.map((item, index) => {
              const hasChildren = item.children && item.children.length > 0;
              const isDropdownOpen = activeDropdown === index;
              return (
                <li key={index} className={styles.mobileNavItem}>
                  {hasChildren ? (
                    <div className={styles.mobileDropdownWrapper}>
                      <button className={styles.mobileDropdownTrigger} onClick={() => toggleDropdown(index)}>
                        <span>{item.label}</span>
                        <svg className={`${styles.mobileChevron} ${isDropdownOpen ? styles.rotated : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <ul className={`${styles.mobileDropdownMenu} ${isDropdownOpen ? styles.menuVisible : ''}`}>
                        {item.children!.map((subItem, subIndex) => (
                          <li key={subIndex} className={styles.mobileDropdownItem}>
                            <Link href={subItem.path || '#'} className={styles.mobileDropdownLink} onClick={handleNavClick}>
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link href={item.path || '#'} className={styles.mobileLink} onClick={handleNavClick}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={styles.mobileCtaWrapper}>
            <Button variant="secondary" size="lg" className={styles.mobileCtaBtn} onClick={() => {
              handleNavClick();
              const event = new CustomEvent('open-appointment');
              window.dispatchEvent(event);
            }}>
              Book Appointment
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
