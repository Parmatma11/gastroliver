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

  return (
    <div className={styles.container}>
      <div className={styles.profileGrid}>
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
            <span className={styles.badgeTitle}>Academic Excellence</span>
            <span className={styles.badgeDesc}>DM Gold Medalist</span>
          </div>
        </div>

        <div className={styles.infoColumn}>
          <span className={styles.subtitle}>{doctorData.designation}</span>
          <h2 className={styles.title}>{doctorData.name}</h2>
          
          <ul className={styles.qualifications}>
            {doctorData.qualifications.map((q, i) => (
              <li key={i} className={styles.qualItem}>
                <svg className={styles.qualIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708.522L4.547 7.05h1.907a.75.75 0 000-1.5H5.82l.487-1.46c.073-.22.288-.34.484-.34h6.417c.196 0 .411.12.484.34l.487 1.46h-.634a.75.75 0 000 1.5h1.907l-1.012-3.073a.75.75 0 00-.708-.522H6.267zM3.46 9.05a.75.75 0 00-.708.522L1.51 13.31A3.75 3.75 0 005.116 18h9.767a3.75 3.75 0 003.606-4.69l-1.242-3.738a.75.75 0 00-.708-.522H3.46zm1.258 4.2c.218 0 .417-.11.528-.292L6.1 11.55h7.8l.854 1.408a.625.625 0 00.528.292h.001c.345 0 .625-.28.625-.625a.62.62 0 00-.094-.326l-.808-1.332H4.995l-.808 1.332a.62.62 0 00-.094.326c0 .345.28.625.625.625h.001z" clipRule="evenodd" />
                </svg>
                {q}
              </li>
            ))}
          </ul>

          <div className={styles.bio}>
            <p>{doctorData.bio}</p>
          </div>

          <div className={styles.specialties}>
            <h4 className={styles.sectionHeading}>Special Training & Affiliations</h4>
            <div className={styles.specGrid}>
              <div className={styles.specCard}>
                <h5>GI Motility Specialist</h5>
                <p>Medical College of Georgia, USA</p>
              </div>
              <div className={styles.specCard}>
                <h5>Advanced Endoscopy</h5>
                <p>Sir Ganga Ram Hospital, Delhi</p>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('open-appointment'))}>
              Request Consultation
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/doctor-profile/')}>
              View Full Profile
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.certificatesSection}>
        <h3 className={styles.certificatesTitle}>Licensures & Academic Certificates</h3>
        <p className={styles.certificatesSubtitle}>Click to preview credentials and recognitions</p>
        
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
