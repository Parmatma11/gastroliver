import { Metadata } from 'next';
import { testimonialsData } from '../../../data/testimonials';
import PageHero from '../../components/layout/PageHero';
import TestimonialCard from '../../components/ui/TestimonialCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Patient Testimonials & Reviews | Gastroliver Clinic Delhi",
  description: "Read reviews and success stories from patients treated for ulcerative colitis, fatty liver, acidity, and IBS under gastro specialist Dr. Ankita Gupta.",
  alternates: {
    canonical: "/patient-testimonials/",
  }
};

export default function TestimonialsPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Patient Testimonials' }
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Patient Testimonials"
        subtitle="What our patients say about their clinical care and recovery experience at GLEC"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Rating Overview widget */}
        <div className={styles.statsCard}>
          <div className={styles.statItem}>
            <span className={styles.number}>4.9</span>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles.label}>Google Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.number}>9,980+</span>
            <div className={styles.stars}>Happy Patients</div>
            <span className={styles.label}>Treated Successfully</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.number}>15+</span>
            <div className={styles.stars}>Years Experience</div>
            <span className={styles.label}>Of Clinical Practice</span>
          </div>
        </div>

        {/* Testimonials grid */}
        <div className={styles.grid}>
          {testimonialsData.map((test, idx) => (
            <TestimonialCard
              key={idx}
              name={test.name}
              text={test.text}
              rating={test.rating}
              avatar={test.avatar}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
