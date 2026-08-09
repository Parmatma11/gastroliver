import { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
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
        <div className={styles.introCallout}>
          <h3>Clinic vs. Hospital Services</h3>
          <p>
            For patient safety and optimal care, procedures are allocated between our outpatient clinic and affiliated hospitals based on clinical complexity:
          </p>
          <div className={styles.allocationGrid}>
            <div className={styles.allocCard}>
              <h4>At GLEC Clinic (GK-1)</h4>
              <ul>
                <li>Consultation & Diet Planning</li>
                <li>Non-invasive Fibroscan test</li>
                <li>Esophageal Motility Studies (Manometry)</li>
                <li>Hydrogen Breath Testing (SIBO/Lactose)</li>
              </ul>
            </div>
            <div className={styles.allocCard}>
              <h4>At Affiliated Hospitals</h4>
              <ul>
                <li>Procedures requiring general anesthesia</li>
                <li>Advanced surgeries & ERCP stenting</li>
                <li>Endoscopic obesity therapy (Gastric Balloon)</li>
                <li>Inpatient ICU care for severe digestive diseases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Affiliation Cards */}
        <div className={styles.hospitalsGrid}>
          {affiliations.map((hosp, idx) => (
            <div key={idx} className={styles.hospitalCard}>
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
                      <li key={sIdx}>{srv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCTA}>
          <h3>Need to Schedule a Major Intervention?</h3>
          <p>Contact our reception desk directly to coordinate admissions, procedure schedules, or hospital referrals under Dr. Ankita Gupta.</p>
          <Button variant="primary" href="/contact/">
            Contact Admission Desk
          </Button>
        </div>
      </section>
    </main>
  );
}
