'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './AppointmentModal.module.css';

export default function AppointmentModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  if (pathname?.startsWith('/studio')) {
    return null;
  }

  useEffect(() => {
    // Intercept clicks on links with href="#appointment-modal"
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href') === '#appointment-modal') {
        e.preventDefault();
        setIsIframeLoading(true);
        setIsOpen(true);
      }
    };

    // Custom event listener for programmatic triggers
    const handleOpenEvent = () => {
      setIsIframeLoading(true);
      setIsOpen(true);
    };

    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('open-appointment', handleOpenEvent);

    return () => {
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('open-appointment', handleOpenEvent);
    };
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h3 className={styles.title}>Book An Appointment</h3>
            <span className={styles.subtitle}>GLEC South Delhi - Dr. Ankita Gupta</span>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close modal">
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {isIframeLoading && (
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
              <p className={styles.spinnerText}>Loading secure booking schedule...</p>
            </div>
          )}
          <iframe
            src="https://kivihealth.com/bookappointment?d=15301&c=Greater%20Kailash&s=no"
            className={styles.iframe}
            onLoad={() => setIsIframeLoading(false)}
            title="Book Appointment with Dr. Ankita Gupta via KiviHealth"
          />
        </div>
        
        {/* Footer info */}
        <div className={styles.footer}>
          <svg className={styles.lockIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          <span className={styles.footerText}>Secure booking system powered by KiviHealth</span>
        </div>
      </div>
    </div>
  );
}
