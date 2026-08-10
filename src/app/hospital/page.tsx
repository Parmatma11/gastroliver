import { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import ScrollReveal from '../../components/ui/ScrollReveal';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Hospital Affiliations - Sir Ganga Ram & Primus Hospital | Dr. Ankita Gupta",
  description: "Dr. Ankita Gupta is affiliated with leading tertiary care hospitals in Delhi, including Sir Ganga Ram Hospital and Primus Super Speciality Hospital.",
  alternates: {
    canonical: "/hospital/",
  }
};

export default function HospitalPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Hospital Affiliations' }
  ];

  const affiliations = [
    {
      name: "Sir Ganga Ram Hospital",
      location: "Rajinder Nagar, New Delhi, Delhi 110060",
      description: "Sir Ganga Ram Hospital is a premier multi-speciality tertiary care hospital. Dr. Ankita Gupta completed her advanced clinical fellowship here and continues to coordinate major therapeutic interventions at this facility.",
      services: [
        "Therapeutic ERCP (Bile Duct Stone Removal & Stenting)",
        "Advanced Luminal Endoscopy (EMR, ESD, POEM)",
        "Double Balloon Enteroscopy",
        "Liver Transplant Evaluation & Care"
      ],
      image: "/images/clinic/hslider5.jpg"
    },
    {
      name: "Primus Super Speciality Hospital",
      location: "Chanakyapuri, New Delhi, Delhi 110021",
      description: "Located in the heart of New Delhi's diplomatic enclave, Primus Hospital is a state-of-the-art facility equipped with the latest medical technologies. Dr. Ankita Gupta is associated as a Consultant Gastroenterologist here.",
      services: [
        "Diagnostic & Screening Colonoscopy",
        "Esophageal Variceal Banding (EVL)",
        "Gastric & Colonic Polypectomy",
        "Acute Pancreatitis Intensive Management"
      ],
      image: "/images/clinic/hslider6.jpg"
    }
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Hospital Affiliations"
        subtitle="Affiliated Tertiary Care Center Services & Major Interventions"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Intro Disclaimer */}
        <ScrollReveal direction="up" delay={50}>
          <div className={styles.introCallout}>
            <h3>Clinic vs. Hospital Services</h3>
            <p>
              For patient safety and optimal care, procedures are allocated between our outpatient clinic and affiliated hospitals based on clinical complexity:
            </p>
            <div className={styles.allocationGrid}>
              <div className={styles.allocCard}>
                <h4>At GLEC Clinic (GK-1)</h4>
                <ul>
                  <li>
                    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Consultation & Diet Planning</span>
                  </li>
                  <li>
                    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Non-invasive Fibroscan test</span>
                  </li>
                  <li>
                    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Esophageal Motility Studies (Manometry)</span>
                  </li>
                  <li>
                    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Hydrogen Breath Testing (SIBO/Lactose)</span>
                  </li>
                </ul>
              </div>
              <div className={styles.allocCard}>
                <h4>At Affiliated Hospitals</h4>
                <ul>
                  <li>
                    <svg className={styles.hospIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Procedures requiring general anesthesia</span>
                  </li>
                  <li>
                    <svg className={styles.hospIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Advanced surgeries & ERCP stenting</span>
                  </li>
                  <li>
                    <svg className={styles.hospIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Endoscopic obesity therapy (Gastric Balloon)</span>
                  </li>
                  <li>
                    <svg className={styles.hospIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Inpatient ICU care for severe digestive diseases</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Affiliation Cards */}
        <div className={styles.hospitalsGrid}>
          {affiliations.map((hosp, idx) => (
            <ScrollReveal key={idx} direction={idx % 2 === 0 ? 'left' : 'right'} delay={100}>
              <div className={`${styles.hospitalCard} ${idx % 2 === 1 ? styles.reverseCard : ''}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={hosp.image}
                    alt={hosp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className={styles.hospImg}
                  />
                </div>
                <div className={styles.hospContent}>
                  <h2>{hosp.name}</h2>
                  <span className={styles.location}>{hosp.location}</span>
                  <p className={styles.description}>{hosp.description}</p>
                  
                  <div className={styles.servicesBlock}>
                    <h4>Specialized Services Performed:</h4>
                    <ul>
                      {hosp.services.map((srv, sIdx) => (
                        <li key={sIdx}>
                          <svg className={styles.checkBullet} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal direction="up" delay={150}>
          <div className={styles.bottomCTA}>
            <h3>Need to Schedule a Major Intervention?</h3>
            <p>Contact our reception desk directly to coordinate admissions, procedure schedules, or hospital referrals under Dr. Ankita Gupta.</p>
            <Button variant="primary" href="/contact/">
              Contact Admission Desk
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

