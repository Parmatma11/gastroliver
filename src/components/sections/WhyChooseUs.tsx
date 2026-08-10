import styles from './WhyChooseUs.module.css';
import ScrollReveal from '../ui/ScrollReveal';

export default function WhyChooseUs() {
  const points = [
    {
      title: "Gold Medalist Credentials",
      desc: "Dr. Ankita Gupta was awarded a Gold Medal during her DM in Gastroenterology at Dayanand Medical College, demonstrating academic and clinical distinction."
    },
    {
      title: "International Motility Training",
      desc: "Comprehensive motility studies completed at the Medical College of Georgia, USA, ensuring advanced diagnostic expertise for chronic functional bowel disorders."
    },
    {
      title: "Advanced Biliary Interventions",
      desc: "Specialized fellowships in Advanced Endoscopy & Luminal Gastroenterology from Sir Ganga Ram Hospital, New Delhi, handling complex ERCP and POEM cases."
    },
    {
      title: "State-of-the-Art Diagnostics",
      desc: "Equipped with high-definition endoscopic platforms, non-invasive liver Fibroscan (CAP), and motility labs to diagnose conditions accurately without delay."
    }
  ];

  return (
    <section className={`section-padding ${styles.sectionWrapper}`}>
      {/* Ambient Spotlights */}
      <div className="glow-spot-cyan" style={{ top: '-10%', left: '-10%' }} />
      <div className="glow-spot-teal" style={{ bottom: '-15%', right: '-10%' }} />
      
      <div className={`container ${styles.containerContent}`}>
        <div className={`section-header ${styles.header}`}>
          <ScrollReveal direction="up" delay={0} duration={800}>
            <h2 className={styles.sectionTitle}>Why Choose Gastroliver Clinic?</h2>
            <p className={styles.sectionSubtitle}>We provide compassionate, evidence-based care backed by advanced clinical credentials and diagnostic technology</p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {points.map((point, index) => (
            <ScrollReveal
              key={index}
              delay={index * 150}
              duration={800}
              direction="up"
              className={styles.pointCard}
            >
              <div className={styles.numberWrapper}>
                <span className={styles.number}>{"//"} 0{index + 1}</span>
              </div>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.desc}>{point.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
