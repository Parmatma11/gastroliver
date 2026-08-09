import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { proceduresData } from '../../../../data/procedures';
import { diseasesData } from '../../../../data/diseases';
import { contactData } from '../../../../data/contact';
import { parseMarkdownToHtml } from '../../../lib/markdown';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const procedure = proceduresData.find(p => p.slug === slug);
  if (!procedure) return {};

  return {
    title: procedure.seo.title,
    description: procedure.seo.description,
    alternates: {
      canonical: `/procedures/${slug}/`,
    }
  };
}

// Generate static routes for all procedures
export async function generateStaticParams() {
  return proceduresData.map(p => ({
    slug: p.slug,
  }));
}

export default async function ProcedurePage({ params }: PageProps) {
  const { slug } = await params;
  const procedure = proceduresData.find(p => p.slug === slug);
  if (!procedure) {
    notFound();
  }

  // Load content file
  const filePath = path.join(process.cwd(), 'content', 'procedures', `${slug}.md`);
  let contentHtml = "";
  let rawContent = "";

  if (fs.existsSync(filePath)) {
    rawContent = fs.readFileSync(filePath, 'utf8');
    contentHtml = parseMarkdownToHtml(rawContent);
  } else {
    // Fallback description
    contentHtml = `<p>${procedure.metaDescription}</p><p>(Procedure details are currently being audited and will be updated shortly.)</p>`;
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Procedures', path: '/sitemap/' },
    { label: procedure.title }
  ];

  // Helper: Get related diseases for the sidebar
  // (We show some general gastro diseases related to endoscopy/biliary evaluation)
  const sidebarDiseases = diseasesData.slice(0, 6);

  return (
    <article className={styles.container}>
      <PageHero
        title={procedure.title}
        subtitle={procedure.metaDescription}
        breadcrumbs={breadcrumbs}
        bannerImage={procedure.sideImage}
      />

      <div className={`container ${styles.contentWrapper}`}>
        <div className={styles.mainColumn}>
          {/* Main Content Body */}
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Appointment Callout Box */}
          <div className={styles.contentCTA}>
            <h3>Need to Schedule this Procedure?</h3>
            <p>Dr. Ankita Gupta performs diagnostic and therapeutic endoscopies at advanced tertiary care centers in South Delhi.</p>
            <div className={styles.ctaActions}>
              <Button variant="secondary" href="#appointment-modal">
                Book Procedure Consultation
              </Button>
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className={styles.phoneLink}>
                Call: {contactData.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Conditions Treated widget */}
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Conditions Diagnosed/Treated</h4>
            <ul className={styles.diseasesMenu}>
              {sidebarDiseases.map((dis, idx) => (
                <li key={idx}>
                  <Link href={`/conditions/${dis.slug}/`} className={styles.disLink}>
                    <span>{dis.title}</span>
                    <svg className={styles.disArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Information widget */}
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Clinic Information</h4>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.label}>Emergency Phone</span>
                <span className={styles.value}>
                  <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`}>{contactData.phone}</a>
                </span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.label}>Address</span>
                <address className={styles.addressValue}>{contactData.address}</address>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.label}>Opening Hours</span>
                <div className={styles.hoursList}>
                  {contactData.openingHours.map((h, i) => (
                    <div key={i} className={styles.hoursRow}>
                      <span className={styles.days}>{h.days}:</span>
                      <span className={styles.hours}>{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a
                href={contactData.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapBtn}
              >
                Open Google Maps Location
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Structured Data: Breadcrumb and MedicalProcedure Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://gastroliver.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Procedures",
                "item": "https://gastroliver.in/sitemap/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": procedure.title,
                "item": `https://gastroliver.in/procedures/${procedure.slug}/`
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": procedure.title,
            "description": procedure.metaDescription,
            "procedureType": {
              "@type": "MedicalProcedureType",
              "name": "Diagnostic and Therapeutic Gastroenterology Procedure"
            }
          })
        }}
      />
    </article>
  );
}
