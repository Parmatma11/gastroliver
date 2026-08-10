'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { doctorData } from '../../../data/doctor';
import styles from './DoctorProfileSnippet.module.css';
import Button from './Button';

export default function DoctorProfileSnippet() {
  const router = useRouter();
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [certsExpanded, setCertsExpanded] = useState(false);

  // Split bio into sentences and show first 2 when collapsed
  const bioSentences = doctorData.bio.split(/(?<=\.)\s+/);
  const shortBio = bioSentences.slice(0, 2).join(' ');
  const hasMoreBio = bioSentences.length > 2;

  return (
    <div className={styles.container}>
      {/* ── HERO ZONE: Photo + Identity ── */}
      <div className={styles.heroZone}>
        <div className={styles.imageColumn}>
          <div className={styles.imageFrame}>
            <Image
              src={doctorData.profileImage}
              alt={doctorData.name}
              width={400}
              height={500}
              className={styles.profileImage}
              priority
            />
          </div>
          <div className={styles.credentialBadge}>
            <span className={styles.badgeIcon}>🏅</span>
            <span className={styles.badgeDesc}>DM Gold Medalist</span>
          </div>
        </div>

        <div className={styles.identityColumn}>
          <span className={styles.subtitle}>{doctorData.designation}</span>
          <h2 className={styles.title}>{doctorData.name}</h2>

          {/* Qualification Pills */}
          <ul className={styles.qualifications}>
            {doctorData.qualifications.map((q, i) => (
              <li key={i} className={styles.qualItem}>
                <svg className={styles.qualIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {q}
              </li>
            ))}
          </ul>

          {/* Experience Badge */}
          <div className={styles.expBadge}>
            <span className={styles.expNumber}>{doctorData.experienceYears}+</span>
            <span className={styles.expLabel}>Years of Experience</span>
          </div>
        </div>
      </div>

      {/* ── ABOUT ZONE: Collapsible Bio ── */}
      <div className={styles.aboutZone}>
        <h4 className={styles.zoneHeading}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.zoneIcon}>
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          About
        </h4>
        <div className={styles.bioContent}>
          <p>{bioExpanded ? doctorData.bio : shortBio}</p>
          {hasMoreBio && (
            <button
              className={styles.readMoreBtn}
              onClick={() => setBioExpanded(!bioExpanded)}
              aria-expanded={bioExpanded}
            >
              {bioExpanded ? 'Show Less' : 'Read More'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`${styles.chevronIcon} ${bioExpanded ? styles.chevronUp : ''}`}
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── HIGHLIGHTS ZONE: Specialties as visual cards ── */}
      <div className={styles.highlightsZone}>
        <div className={styles.highlightCard}>
          <div className={styles.highlightIconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.highlightSvg}>
              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
              <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.607 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
              <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
            </svg>
          </div>
          <div className={styles.highlightText}>
            <h5>GI Motility Specialist</h5>
            <p>Medical College of Georgia, USA</p>
          </div>
        </div>

        <div className={styles.highlightCard}>
          <div className={styles.highlightIconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.highlightSvg}>
              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.highlightText}>
            <h5>Advanced Endoscopy Fellowship</h5>
            <p>Sir Ganga Ram Hospital, Delhi</p>
          </div>
        </div>

        <div className={styles.highlightCard}>
          <div className={styles.highlightIconWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.highlightSvg}>
              <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
              <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3 0a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm-9 0a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
            </svg>
          </div>
          <div className={styles.highlightText}>
            <h5>Director & Chief Consultant</h5>
            <p>GLEC — Gastro Liver Endoscopy Centre</p>
          </div>
        </div>
      </div>

      {/* ── ACTIONS ── */}
      <div className={styles.actions}>
        <Button variant="primary" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('open-appointment'))}>
          Request Consultation
        </Button>
        <Button variant="outline" size="lg" onClick={() => router.push('/doctor-profile/')}>
          View Full Profile
        </Button>
      </div>

      {/* ── CERTIFICATES ACCORDION ── */}
      <div className={styles.certsAccordion}>
        <button
          className={styles.certsToggle}
          onClick={() => setCertsExpanded(!certsExpanded)}
          aria-expanded={certsExpanded}
        >
          <span className={styles.certsToggleText}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.certsToggleIcon}>
              <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l7.5 7.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-7.5-7.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Licensures & Academic Certificates
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`${styles.chevronIcon} ${certsExpanded ? styles.chevronUp : ''}`}
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>

        {certsExpanded && (
          <div className={styles.certsContent}>
            <div className={styles.certGrid}>
              {doctorData.certificates.slice(0, 6).map((cert, index) => (
                <div key={index} className={styles.certCard} onClick={() => setActiveCert(cert)}>
                  <Image
                    src={cert}
                    alt={`Certificate ${index + 1}`}
                    width={150}
                    height={100}
                    className={styles.certThumb}
                  />
                  <div className={styles.certOverlay}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.zoomIcon}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.636zM10.5 7.5v6m3-3h-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeCert && (
        <div className={styles.lightbox} onClick={() => setActiveCert(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveCert(null)} aria-label="Close Preview">
              &times;
            </button>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={activeCert}
                alt="Certificate Zoom"
                fill
                className={styles.lightboxImage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
