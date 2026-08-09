import { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '../../components/layout/PageHero';
import { diseasesData } from '../../../data/diseases';
import { proceduresData } from '../../../data/procedures';
import { blogData } from '../../../data/blog';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Sitemap & Page Directory | Gastroliver Clinic Delhi",
  description: "Navigate our complete directory of gastroenterology diseases, hepatology conditions, diagnostic endoscopy procedures, and patient resources.",
  alternates: {
    canonical: "/sitemap/",
  }
};

export default function SitemapPage() {
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Sitemap' }
  ];

  // Static Pages List
  const staticPages = [
    { label: "Home Page", path: "/" },
    { label: "Doctor Profile", path: "/doctor-profile/" },
    { label: "Hospital Affiliations", path: "/hospital/" },
    { label: "Clinic Gallery", path: "/gallery/" },
    { label: "Patient Testimonials", path: "/patient-testimonials/" },
    { label: "Clinical Case Studies", path: "/case-study/" },
    { label: "Contact Us", path: "/contact/" },
    { label: "Online Payments", path: "/payments/" },
    { label: "Medical Blog Index", path: "/blog/" }
  ];

  // Group diseases by category
  const diseaseCategories: Record<string, string> = {
    'esophagus-stomach': 'Esophagus & Stomach',
    'intestines': 'Intestinal Diseases',
    'liver': 'Liver Diseases & Hepatology',
    'pancreas-biliary': 'Pancreas & Biliary'
  };

  const diseasesByCategory = Object.keys(diseaseCategories).reduce((acc, catKey) => {
    acc[catKey] = diseasesData.filter(d => d.category === catKey);
    return acc;
  }, {} as Record<string, typeof diseasesData>);

  // Group procedures by type
  // Note: we can list them all directly or categorize them based on slugs
  const endoscopySlugs = ['ugi-endoscopy', 'colonoscopy', 'ercp', 'capsule-endoscopy', 'peroral-endoscopic-myotomy-poem', 'endoscopic-ultrasonography', 'double-balloon-enteroscopy-capsule-endoscopy'];
  const liverSlugs = ['fibroscan', 'liver-biopsy'];
  
  const endoscopyProcedures = proceduresData.filter(p => endoscopySlugs.includes(p.slug));
  const liverProcedures = proceduresData.filter(p => liverSlugs.includes(p.slug));
  const otherProcedures = proceduresData.filter(p => !endoscopySlugs.includes(p.slug) && !liverSlugs.includes(p.slug));

  return (
    <main className={styles.container}>
      <PageHero
        title="Sitemap Directory"
        subtitle="Complete alphabetical map of medical conditions, treatments, procedures, and blogs"
        breadcrumbs={breadcrumbs}
        bannerImage="/images/clinic/hslider4.jpg"
      />

      <section className={`container ${styles.wrapper}`}>
        {/* Static Pages section */}
        <div className={styles.sectionCard}>
          <h2>Core Clinical Resources</h2>
          <div className={styles.linksGrid}>
            {staticPages.map((page, idx) => (
              <Link key={idx} href={page.path} className={styles.dirLink}>
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Diseases Directory section */}
        <div className={styles.sectionCard}>
          <h2>Diseases & Conditions Treated</h2>
          <div className={styles.subGrid}>
            {Object.entries(diseaseCategories).map(([key, label], idx) => (
              <div key={idx} className={styles.subCol}>
                <h3>{label}</h3>
                <ul className={styles.linksList}>
                  {diseasesByCategory[key]?.map((d, dIdx) => (
                    <li key={dIdx}>
                      <Link href={`/conditions/${d.slug}/`}>{d.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Procedures Directory section */}
        <div className={styles.sectionCard}>
          <h2>Diagnostics & Procedures</h2>
          <div className={styles.subGrid}>
            <div className={styles.subCol}>
              <h3>Endoscopic Procedures</h3>
              <ul className={styles.linksList}>
                {endoscopyProcedures.map((p, idx) => (
                  <li key={idx}>
                    <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.subCol}>
              <h3>Liver Diagnostics</h3>
              <ul className={styles.linksList}>
                {liverProcedures.map((p, idx) => (
                  <li key={idx}>
                    <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.subCol}>
              <h3>Special GI Procedures</h3>
              <ul className={styles.linksList}>
                {otherProcedures.map((p, idx) => (
                  <li key={idx}>
                    <Link href={`/procedures/${p.slug}/`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Blogs section */}
        <div className={styles.sectionCard}>
          <h2>Latest Blog Publications</h2>
          <div className={styles.linksGrid}>
            {blogData.slice(0, 15).map((post, idx) => (
              <Link key={idx} href={`/blog/${post.slug}/`} className={styles.dirLink}>
                {post.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
