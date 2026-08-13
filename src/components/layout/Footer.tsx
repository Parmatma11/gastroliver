'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerNavigation, socialLinks } from '../../../data/navigation';
import { contactData } from '../../../data/contact';
import styles from './Footer.module.css';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        {/* Brand Widget */}
        <div className={styles.brandWidget}>
          <h3 className={styles.brandTitle}>GLEC Clinic</h3>
          <span className={styles.brandSubtitle}>Gastro Liver Endoscopy Centre</span>
          <p className={styles.description}>
            GLEC is South Delhi&apos;s premier clinic for gastrointestinal, liver, and biliary health. Directed by Dr. Ankita Gupta, gold-medalist gastroenterologist, providing advanced medical care.
          </p>
          <div className={styles.hospitalAffiliations}>
            <span className={styles.affiliationLabel}>Clinical Affiliations:</span>
            <p className={styles.affiliationText}>Associated with Primus Super Speciality Hospital &amp; Sir Ganga Ram Hospital network.</p>
          </div>
        </div>

        {/* Quick Links Widget */}
        <div className={styles.widget}>
          <h4 className={styles.widgetTitle}>Quick Links</h4>
          <ul className={styles.linksList}>
            {footerNavigation.map((item, index) => (
              <li key={index} className={styles.linkItem}>
                <Link href={item.path || '#'} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info Widget */}
        <div className={styles.widget}>
          <h4 className={styles.widgetTitle}>Clinic Contacts</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className={styles.contactText}>
                {contactData.address}
              </span>
            </li>
            <li className={styles.contactItem}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className={styles.contactText}>
                <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`}>{contactData.phone}</a>
              </span>
            </li>
            <li className={styles.contactItem}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className={styles.contactText}>
                <a href={`mailto:${contactData.emailPrimary}`}>{contactData.emailPrimary}</a>
              </span>
            </li>
          </ul>
        </div>

        {/* Subscribe & Social Widget */}
        <div className={styles.widget}>
          <h4 className={styles.widgetTitle}>Get Latest Updates</h4>
          <p className={styles.widgetDesc}>Subscribe to our health newsletter for gastro & liver care updates.</p>
          
          <form className={styles.subscribeForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              required
              className={styles.subscribeInput}
              aria-label="Email Address for Newsletter"
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>

          <div className={styles.socialsRow}>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLink}
                aria-label={`Follow us on ${social.platform}`}
              >
                {/* Fallback inline SVG rendering helper based on icon type */}
                {social.icon === 'facebook' && (
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h3.6L18 8h-3V6.2c0-.5.2-.7.8-.7H18V2h-2.5C12.8 2 11 3.5 11 6.5V8z" />
                  </svg>
                )}
                {social.icon === 'twitter' && (
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.2 2.4h3.3l-7.2 8.2 8.5 11h-6.6l-5.2-6.8-5.9 6.8H1.8l7.7-8.8-8.1-10.4h6.8l4.7 6.2 5.2-6.2zm-1.2 17.3h1.8L7.1 4.2H5.1l11.9 15.5z" />
                  </svg>
                )}
                {social.icon === 'instagram' && (
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.5 1.3-.1 1.6-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4.1.7c-.8.3-1.4.7-2.1 1.4C1.3 2.8.9 3.5.7 4.3c-.3.7-.5 1.6-.6 2.9C0 8.5 0 8.9 0 12.2s0 3.7.1 5c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.1.7.7 1.4 1.1 2.1 1.4.7.3 1.6.5 2.9.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.4 1.4-2.1.3-.7.5-1.6.6-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.1-.7-.7-1.4-1.1-2.1-1.4-.7-.3-1.6-.5-2.9-.6C15.7 0 15.3 0 12 0zm0 5.9c-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3-2.8-6.3-6.3-6.3zm0 10.5c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2 4.2 1.9 4.2 4.2-1.9 4.2-4.2 4.2zm6.5-11.2c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z" />
                  </svg>
                )}
                {social.icon === 'youtube' && (
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.5 6.2c-.3-1-1-1.8-2-2.1C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.5.6c-1 .3-1.7 1.1-2 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1 1.8 2 2.1 1.8.6 9.5.6 9.5.6s7.7 0 9.5-.6c1-.3 1.7-1.1 2-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zm-14.2 9.5V8.3l6.2 3.7-6.2 3.7z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Sub-row */}
      <div className={styles.subFooter}>
        <div className={`container ${styles.subFooterContent}`}>
          <p className={styles.copyright}>
            Copyright &copy; {currentYear} Gastroliver. All Rights Reserved.
          </p>
          <div className={styles.footerInfo}>
            <span>GLEC Clinic, GK Part1, South Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
