import styles from './WhyChooseUs.module.css';

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
    <section className="section-padding bg-soft-slab">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Gastroliver Clinic?</h2>
          <p>We provide compassionate, evidence-based care backed by advanced clinical credentials and diagnostic technology</p>
        </div>

        <div className={styles.grid}>
          {points.map((point, index) => (
            <div key={index} className={styles.pointCard}>
              <div className={styles.numberWrapper}>
                <span className={styles.number}>0{index + 1}</span>
              </div>
              <h3 className={styles.title}>{point.title}</h3>
              <p className={styles.desc}>{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
