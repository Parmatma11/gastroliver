import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { proceduresData } from '../../../../data/procedures';
import { diseasesData } from '../../../../data/diseases';
import { contactData } from '../../../../data/contact';
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

import { parseContentToSections, MarkdownSection } from '../../../lib/sectionParser';
import StickyNav from '../../../components/ui/StickyNav';
import ScrollReveal from '../../../components/ui/ScrollReveal';


// Helper: strip table of contents from markdown before rendering
function stripTableOfContents(markdown: string): string {
  if (!markdown) return "";
  
  const lines = markdown.split('\n');
  const resultLines: string[] = [];
  let inToc = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Detect Table of Contents header
    if (trimmed.toLowerCase() === 'table of contents') {
      inToc = true;
      continue;
    }
    
    if (inToc) {
      // Skip empty lines, Toggle button lines, and list items representing links
      if (trimmed === '' || 
          trimmed.includes('[Toggle') || 
          trimmed.includes('](#)') || 
          trimmed.startsWith('- [') || 
          trimmed.startsWith('* [') ||
          (trimmed.startsWith('-') && trimmed.includes('](#'))) {
        continue;
      }
      
      // End of TOC block
      inToc = false;
    }
    
    resultLines.push(line);
  }
  
  return resultLines.join('\n');
}

export default async function ProcedurePage({ params }: PageProps) {
  const { slug } = await params;
  const procedure = proceduresData.find(p => p.slug === slug);
  if (!procedure) {
    notFound();
  }

  // Load content file
  const filePath = path.join(process.cwd(), 'content', 'procedures', `${slug}.md`);
  let rawContent = "";
  let sections: MarkdownSection[] = [];

  if (fs.existsSync(filePath)) {
    rawContent = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = stripTableOfContents(rawContent);
    sections = parseContentToSections(cleanedContent);
  } else {
    // Fallback description
    sections = [{
      title: procedure.title,
      cleanTitle: "Overview",
      id: "overview",
      level: 1,
      contentHtml: `<p>${procedure.metaDescription}</p><p>(Procedure details are currently being audited and will be updated shortly.)</p>`,
      rawMarkdown: ""
    }];
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Procedures', path: '/sitemap/' },
    { label: procedure.title }
  ];

  // Helper: Get related diseases for the sidebar
  const sidebarDiseases = diseasesData.slice(0, 6);

  // Extract sections
  const introSection = sections.find(s => s.level === 1) || sections[0];
  const bodySections = sections.filter(s => s !== introSection);

  // Setup sticky nav sections list
  const navItems = [
    { id: introSection.id, title: 'Overview' },
    ...bodySections.map(sec => ({ id: sec.id, title: sec.cleanTitle }))
  ];

  return (
    <article className={styles.container}>
      <PageHero
        title={procedure.title}
        subtitle={procedure.metaDescription}
        breadcrumbs={breadcrumbs}
        bannerImage={procedure.sideImage}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Left Column: Section Navigation */}
        <aside className={styles.navColumn}>
          <StickyNav sections={navItems} />
        </aside>

        {/* Center Column: Content Body */}
        <div className={styles.mainColumn}>
          {/* Intro Section */}
          <ScrollReveal direction="up" delay={50}>
            <section id={introSection.id} className={styles.contentSection}>
              <div 
                className={styles.sectionBody}
                dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
              />
            </section>
          </ScrollReveal>

          {/* Render remaining body sections dynamically */}
          {bodySections.map((sec, idx) => (
            <ScrollReveal key={idx} direction="up" delay={50}>
              <section id={sec.id} className={styles.contentSection}>
                <h2 className={styles.sectionHeading}>{sec.cleanTitle}</h2>
                <div 
                  className={styles.sectionBody}
                  dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
                />
              </section>
            </ScrollReveal>
          ))}

          {/* Appointment Callout Box */}
          <ScrollReveal direction="up" delay={50}>
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
          </ScrollReveal>
        </div>

        {/* Right Column: Sidebar */}
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
