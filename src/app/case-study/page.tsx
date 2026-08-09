import { Metadata } from 'next';
import PageHero from '../../components/layout/PageHero';
import Button from '../../components/ui/Button';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Clinical Case Studies - Gastroenterology & Hepatology | GLEC Delhi",
  description: "Read clinical case summaries and patient outcomes, including gym supplement-induced liver failure recovery and pediatric lactose intolerance diagnostics.",
  alternates: {
    canonical: "/case-study/",
  }
};

export default function CaseStudyPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Case Studies' }
  ];

  const cases = [
    {
      title: "Gym Supplements: A Blessing or a Boon?",
      patient: "Deven (Adult Male)",
      presentation: "Acute Liver Failure, Acute Hepatitis & Severe Jaundice",
      background: "Patient presented with a history of consuming unsupervised gym supplements and mass gainers. He arrived at our clinic in critical health, experiencing persistent vomiting, fatigue, and advanced jaundice.",
      clinicalCourse: "Dr. Ankita Gupta evaluated the patient and diagnosed supplement-induced liver injury (toxic hepatotoxicity). A targeted medical protocol was initiated to support liver regeneration, eliminate toxins, and closely monitor hepatic function markers. Unsupervised gym products, protein powders, and mass gainers can contain heavy metals, adulterated chemicals, or anabolic steroids that cause severe hepatic damage.",
      outcome: "With timely specialized care at GLEC, the patient's liver enzymes normalized, jaundice cleared, and he achieved complete clinical recovery. He is currently in excellent health and following standard dietary guidelines.",
      recommendation: "Avoid taking unsupervised gym supplements or weight gainers. Always consult a gastroenterologist or clinical dietician before starting high-protein supplements.",
      imageClass: styles.caseGym
    },
    {
      title: "Story of Twins: A Case of Lactose Intolerance",
      patient: "Twin Infant (Pediatric)",
      presentation: "Malnutrition, Low Weight & Chronic Diarrhea",
      background: "Parents presented with twin infants. One twin was normal in growth and weight, while the other was significantly smaller, less nourished, frequently ill, and suffered from persistent abdominal discomfort and diarrhea after consuming milk.",
      clinicalCourse: "Dr. Ankita Gupta conducted a thorough motility and clinical examination, suspecting primary or secondary lactose intolerance. Endoscopic evaluation and mucosal biopsies confirmed that the microvilli in the small intestine lacked sufficient lactase enzyme activity, preventing the absorption of milk sugars.",
      outcome: "A lactose-free formula and dairy elimination plan were instituted. Under Dr. Ankita's supervision, the infant began absorbing nutrients properly, gained weight rapidly, caught up with his twin's developmental milestones, and achieved complete digestive relief.",
      recommendation: "If an infant shows signs of persistent gas, diarrhea, or poor weight gain, evaluate early for food intolerances or malabsorption syndromes.",
      imageClass: styles.caseTwins
    }
  ];

  return (
    <main className={styles.container}>
      <PageHero
        title="Clinical Case Studies"
        subtitle="Factual case summaries and treatment outcomes achieved under Dr. Ankita Gupta"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Intro */}
        <div className={styles.introBlock}>
          <h2>Evidence-Based Medical Outcomes</h2>
          <p>
            Review detailed case summaries highlighting the diagnostic pathways, therapeutic interventions, and patient recovery courses managed at Gastro Liver Endoscopy Centre.
          </p>
        </div>

        {/* Case Cards */}
        <div className={styles.casesList}>
          {cases.map((c, idx) => (
            <article key={idx} className={styles.caseCard}>
              <div className={`${styles.caseBanner} ${c.imageClass}`}>
                <span className={styles.caseBadge}>Case 0{idx + 1}</span>
              </div>
              <div className={styles.caseContent}>
                <span className={styles.patientMeta}>Patient: {c.patient}</span>
                <h2>{c.title}</h2>
                
                <div className={styles.clinicalGrid}>
                  <div className={styles.gridRow}>
                    <span className={styles.label}>Clinical Presentation:</span>
                    <span className={`${styles.value} ${styles.danger}`}>{c.presentation}</span>
                  </div>
                  <div className={styles.gridRow}>
                    <span className={styles.label}>History & Background:</span>
                    <span className={styles.valueText}>{c.background}</span>
                  </div>
                  <div className={styles.gridRow}>
                    <span className={styles.label}>Clinical Management:</span>
                    <span className={styles.valueText}>{c.clinicalCourse}</span>
                  </div>
                  <div className={styles.gridRow}>
                    <span className={styles.label}>Treatment Outcome:</span>
                    <span className={`${styles.value} ${styles.success}`}>{c.outcome}</span>
                  </div>
                </div>

                <div className={styles.recommendationBox}>
                  <strong>Doctor&apos;s Advice:</strong> {c.recommendation}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className={styles.bottomCTA}>
          <h3>Experiencing Persistent Symptoms?</h3>
          <p>Early clinical diagnosis prevents complications and leads to faster recovery. Book a comprehensive screening consultation today.</p>
          <Button variant="secondary" href="#appointment-modal">
            Schedule a Diagnostic Review
          </Button>
        </div>
      </section>
    </main>
  );
}
