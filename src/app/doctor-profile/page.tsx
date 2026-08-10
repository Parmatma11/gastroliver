'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { doctorData } from '../../../data/doctor';
import PageHero from '../../components/layout/PageHero';
import ScrollReveal from '../../components/ui/ScrollReveal';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export default function DoctorProfilePage() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

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

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Doctor Profile' }
  ];

  const statCards = [
    { value: `${doctorData.experienceYears}+`, label: 'Years Experience', icon: '🩺' },
    { value: '🥇', label: 'DM Gold Medalist', icon: '' },
    { value: 'USA', label: 'Motility Training', icon: '🌎' },
    { value: '10K+', label: 'Patients Treated', icon: '❤️' },
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Doctor Profile"
        subtitle="Dr. Ankita Gupta – Chief Consultant Gastroenterologist & Hepatologist"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/doctor/intro_1.jpg"
      />

      {/* ══════ SECTION 1: Identity Card ══════ */}
      <section className={`container ${styles.identitySection}`}>
        <ScrollReveal direction="up" delay={0} duration={800}>
          <div className={styles.identityCard}>
            <div className={styles.identityLeft}>
              <div className={styles.portraitFrame}>
                <Image
                  src={doctorData.profileImage}
                  alt={doctorData.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.portrait}
                  priority
                />
                <div className={styles.goldBadge}>
                  <span>🏅</span>
                  <span>Gold Medalist</span>
                </div>
              </div>
            </div>
            <div className={styles.identityRight}>
              <span className={styles.roleTag}>Chief Consultant</span>
              <h1 className={styles.doctorName}>{doctorData.name}</h1>
              <p className={styles.doctorDesignation}>{doctorData.designation}</p>
              
              <div className={styles.qualPills}>
                {doctorData.qualifications.map((q, i) => (
                  <span key={i} className={styles.qualPill}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.pillIcon}>
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {q}
                  </span>
                ))}
              </div>

              <div className={styles.identityActions}>
                <Button variant="primary" size="lg" onClick={() => window.dispatchEvent(new CustomEvent('open-appointment'))}>
                  Book Consultation
                </Button>
                <a href="tel:+918447663380" className={styles.phoneLink}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.phoneSvg}>
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                  </svg>
                  +91 844-766-3380
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════ SECTION 2: Stats Row ══════ */}
      <section className={`container ${styles.statsSection}`}>
        <div className={styles.statsGrid}>
          {statCards.map((stat, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 100} duration={700}>
              <div className={styles.statCard}>
                <span className={styles.statIcon}>{stat.icon || stat.value}</span>
                <div className={styles.statInfo}>
                  {stat.icon && <span className={styles.statValue}>{stat.value}</span>}
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════ SECTION 3: About / Biography ══════ */}
      <section className={`container ${styles.aboutSection}`}>
        <ScrollReveal direction="up" delay={0} duration={800}>
          <div className={styles.sectionTag}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            About Dr. Ankita Gupta
          </div>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={100} duration={800}>
          <div className={styles.aboutCard}>
            <blockquote className={styles.bioQuote}>
              &ldquo;Dedicated to providing high-quality, compassionate clinical care to patients suffering from complex digestive, liver, and biliary disorders.&rdquo;
            </blockquote>
            <div className={styles.bioBody}>
              {doctorData.bio.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════ SECTION 4: Training & Specialties ══════ */}
      <section className={`container ${styles.specialtiesSection}`}>
        <ScrollReveal direction="up" delay={0} duration={800}>
          <div className={styles.sectionTag}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
              <path d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5a18.558 18.558 0 00-4.191.477.75.75 0 01-.339-1.462 20.01 20.01 0 013.78-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.981 4.981 0 015 14a4.981 4.981 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 33.053 33.053 0 016.668-.829V2.75A.75.75 0 0110 2zM5 12.662l-1.395-6.177C4.402 6.32 5.181 6.5 6 6.5c.818 0 1.598-.18 2.395-.015L5 12.662zm10 0l-1.395-6.177C14.402 6.32 15.181 6.5 16 6.5c.818 0 1.598-.18 2.395-.015L15 12.662z" />
            </svg>
            Training & Specializations
          </div>
        </ScrollReveal>
        <div className={styles.specialtyGrid}>
          <ScrollReveal direction="up" delay={0} duration={700}>
            <div className={styles.specialtyCard}>
              <div className={styles.specialtyIconWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.specialtySvg}>
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.607 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                </svg>
              </div>
              <h4>Fellowship in Advanced Endoscopy</h4>
              <p>Sir Ganga Ram Hospital, New Delhi (2016–17)</p>
              <span className={styles.specialtyBadge}>Fellowship</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100} duration={700}>
            <div className={styles.specialtyCard}>
              <div className={styles.specialtyIconWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.specialtySvg}>
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 01-2.288 4.04l-.723.724a1.125 1.125 0 01-1.298.21l-.153-.076a1.125 1.125 0 01-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 01-.21-1.298L9.75 12l-1.64-1.64a6 6 0 01-1.676-3.257l-.172-1.03z" clipRule="evenodd" />
                </svg>
              </div>
              <h4>GI Motility Specialist</h4>
              <p>Medical College of Georgia, Digestive Health Centre, USA</p>
              <span className={styles.specialtyBadge}>International</span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200} duration={700}>
            <div className={styles.specialtyCard}>
              <div className={styles.specialtyIconWrap}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.specialtySvg}>
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </div>
              <h4>European Society of Medical Oncology</h4>
              <p>Professional Membership & Continuing Education</p>
              <span className={styles.specialtyBadge}>Member</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════ SECTION 5: Academic Background ══════ */}
      <section className={`container ${styles.educationSection}`}>
        <ScrollReveal direction="up" delay={0} duration={800}>
          <div className={styles.sectionTag}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
              <path d="M10 2a.75.75 0 01.75.75v.258a33.186 33.186 0 016.668.83.75.75 0 01-.336 1.461 31.28 31.28 0 00-1.103-.232l1.702 7.545a.75.75 0 01-.387.832A4.981 4.981 0 0115 14c-.825 0-1.606-.2-2.294-.556a.75.75 0 01-.387-.832l1.77-7.849a31.743 31.743 0 00-3.339-.254v11.505a20.01 20.01 0 013.78.501.75.75 0 11-.339 1.462A18.558 18.558 0 0010 17.5a18.558 18.558 0 00-4.191.477.75.75 0 01-.339-1.462 20.01 20.01 0 013.78-.501V4.509c-1.129.026-2.243.112-3.34.254l1.771 7.85a.75.75 0 01-.387.83A4.981 4.981 0 015 14a4.981 4.981 0 01-2.294-.556.75.75 0 01-.387-.832L4.02 5.067c-.37.07-.738.148-1.103.232a.75.75 0 01-.336-1.462 33.053 33.053 0 016.668-.829V2.75A.75.75 0 0110 2z" />
            </svg>
            Academic Background
          </div>
        </ScrollReveal>
        <div className={styles.eduGrid}>
          {doctorData.education.map((edu, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 120} duration={700}>
              <div className={styles.eduCard}>
                <div className={styles.eduYearBadge}>
                  {edu.year ? edu.year : '—'}
                </div>
                <h4 className={styles.eduDegree}>{edu.degree}</h4>
                <p className={styles.eduInstitution}>{edu.institution}</p>
                {idx === 2 && <span className={styles.goldMedalTag}>🥇 Gold Medal</span>}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════ SECTION 6: Career Timeline (Horizontal Scroll) ══════ */}
      <section ref={containerRef} className={styles.scrollContainer}>
        <div className={styles.stickyTrack}>
          <div className={styles.timelineHeader}>
            <ScrollReveal direction="up" delay={0} duration={800}>
              <div className={styles.sectionTag}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
                  <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-7.86-3.83.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6.5 10.202a31.983 31.983 0 013.5 2.234 31.983 31.983 0 013.5-2.234V14a.75.75 0 01-.314.61 41.423 41.423 0 00-6.372 0A.75.75 0 016.5 14v-3.798z" clipRule="evenodd" />
                </svg>
                Professional Journey
              </div>
            </ScrollReveal>
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

              {doctorData.careerTimeline.map((item, idx) => {
                const stepFraction = idx / Math.max(1, doctorData.careerTimeline.length - 1);
                const isActive = scrollProgress >= stepFraction - 0.05;

                return (
                  <div key={idx} className={styles.timelineItem}>
                    <div className={`${styles.timelineCard} ${isActive ? styles.timelineCardActive : ''}`}>
                      <div className={styles.timelinePeriod}>{item.period}</div>
                      <h4 className={styles.timelineRole}>{item.role}</h4>
                      <p className={styles.timelineInstitution}>{item.institution}</p>
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

      {/* ══════ SECTION 7: Certificates Gallery ══════ */}
      {doctorData.certificates && doctorData.certificates.length > 0 && (
        <section className={`container ${styles.certsSection}`}>
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className={styles.sectionTag}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.tagIcon}>
                <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l7.5 7.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-7.5-7.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Certificates & Accreditations
            </div>
          </ScrollReveal>
          <div className={styles.certsGrid}>
            {doctorData.certificates.map((cert, idx) => (
              <ScrollReveal key={idx} direction="up" delay={(idx % 4) * 80} duration={600}>
                <div className={styles.certCard} onClick={() => setActiveCert(cert)}>
                  <div className={styles.certImageWrap}>
                    <Image
                      src={cert}
                      alt={`Certificate ${idx + 1}`}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 200px"
                      className={styles.certImage}
                    />
                    <div className={styles.certOverlay}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.zoomSvg}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.636zM10.5 7.5v6m3-3h-6" />
                      </svg>
                    </div>
                  </div>
                  <div className={styles.certMeta}>
                    <span>Certificate</span>
                    <span className={styles.certIdx}>#{idx + 1}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* ══════ Lightbox Modal ══════ */}
      {activeCert && (
        <div className={styles.lightbox} onClick={() => setActiveCert(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.lightboxClose} onClick={() => setActiveCert(null)} aria-label="Close">&times;</button>
            <div className={styles.lightboxImageWrap}>
              <Image src={activeCert} alt="Certificate" fill className={styles.lightboxImage} />
            </div>
          </div>
        </div>
      )}

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": doctorData.name,
            "image": `https://gastroliver.in${doctorData.profileImage}`,
            "medicalSpecialty": "Gastroenterology",
            "telephone": "+91 8447663380",
            "email": "gastroclinic1234@gmail.com",
            "url": "https://gastroliver.in/doctor-profile/",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Part1, E-20, Greater Kailash",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "postalCode": "110048",
              "addressCountry": "IN"
            },
            "alumniOf": doctorData.education.map(edu => ({
              "@type": "EducationalOrganization",
              "name": edu.institution
            })),
            "knowsAbout": [
              "Gastroenterology", "Hepatology", "Endoscopy",
              "GI Motility Studies", "Liver Diseases", "Therapeutic Endoscopy"
            ],
            "memberOf": doctorData.memberships.map(m => ({
              "@type": "MedicalOrganization",
              "name": m
            }))
          })
        }}
      />
    </main>
  );
}
