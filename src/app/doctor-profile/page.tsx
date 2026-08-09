import { Metadata } from 'next';
import Image from 'next/image';
import { doctorData } from '../../../data/doctor';
import PageHero from '../../components/layout/PageHero';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Dr. Ankita Gupta - Gastroenterologist, Hepatologist, Endoscopist in Delhi",
  description: "Learn more about Dr. Ankita Gupta, Gold Medalist (DM Gastroenterology), trained in Motility studies (USA), fellow at Sir Ganga Ram Hospital, Delhi.",
  alternates: {
    canonical: "/doctor-profile/",
  }
};

export default function DoctorProfilePage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Doctor Profile' }
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Doctor Profile"
        subtitle="Dr. Ankita Gupta – Chief Consultant Gastroenterologist & Hepatologist"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/doctor/intro_1.jpg"
      />

      <section className={`container ${styles.profileWrapper}`}>
        {/* Left Column: Portrait & Stats Cards */}
        <div className={styles.leftColumn}>
          <div className={styles.imageCard}>
            <div className={styles.portraitContainer}>
              <Image
                src={doctorData.profileImage}
                alt={doctorData.name}
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                className={styles.portrait}
                priority
              />
            </div>
            <div className={styles.quickInfo}>
              <h2>{doctorData.name}</h2>
              <p className={styles.designation}>{doctorData.designation}</p>
              <div className={styles.yearsBadge}>
                <span className={styles.badgeNumber}>{doctorData.experienceYears}+</span>
                <span className={styles.badgeText}>Years of Clinical Excellence</span>
              </div>
            </div>
          </div>

          {/* Memberships & Fellowships widgets */}
          <div className={styles.sidebarWidget}>
            <h3>Fellowships & Training</h3>
            <ul className={styles.widgetList}>
              {doctorData.fellowships.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
              {doctorData.specialTraining.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarWidget}>
            <h3>Professional Memberships</h3>
            <ul className={styles.widgetList}>
              {doctorData.memberships.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Detailed Biography, Education, Career Timeline */}
        <div className={styles.rightColumn}>
          <div className={styles.bioSection}>
            <span className={styles.sectionHeader}>Biography</span>
            <div className={styles.bioText}>
              {doctorData.bio.split('\n\n').map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          <div className={styles.eduSection}>
            <h3>Academic Background</h3>
            <div className={styles.eduTimeline}>
              {doctorData.education.map((edu, idx) => (
                <div key={idx} className={styles.eduItem}>
                  <div className={styles.eduYear}>
                    {edu.year ? edu.year : "MBBS"}
                  </div>
                  <div className={styles.eduContent}>
                    <h4>{edu.degree}</h4>
                    <p>{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.careerTimelineSection}>
            <h3>Professional Timeline</h3>
            <div className={styles.careerTimeline}>
              {doctorData.careerTimeline.map((item, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelinePeriod}>{item.period}</div>
                  <div className={styles.timelineContent}>
                    <h4>{item.role}</h4>
                    <h5>{item.institution}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data: Physician Schema */}
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
              "Gastroenterology",
              "Hepatology",
              "Endoscopy",
              "GI Motility Studies",
              "Liver Diseases",
              "Therapeutic Endoscopy"
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
