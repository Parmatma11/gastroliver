import { Metadata } from 'next';
import PageHero from '../../components/layout/PageHero';
import TestimonialsPageContent from '../../components/sections/TestimonialsPageContent';
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
        compact
      />

      <TestimonialsPageContent />
    </main>
  );
}
