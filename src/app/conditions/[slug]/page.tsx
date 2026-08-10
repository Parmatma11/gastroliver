import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { diseasesData } from '../../../../data/diseases';
import { proceduresData } from '../../../../data/procedures';
import { contactData } from '../../../../data/contact';
import PageHero from '../../../components/layout/PageHero';
import Button from '../../../components/ui/Button';
import StickyNav from '../../../components/ui/StickyNav';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import { parseContentToSections, MarkdownSection } from '../../../lib/sectionParser';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for each condition dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const disease = diseasesData.find(d => d.slug === slug);
  if (!disease) return {};

  return {
    title: disease.seo.title,
    description: disease.seo.description,
    alternates: {
      canonical: `/conditions/${slug}/`,
    }
  };
}

// Statically generate params for all known disease pages
export async function generateStaticParams() {
  return diseasesData.map(d => ({
    slug: d.slug,
  }));
}

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

export default async function DiseasePage({ params }: PageProps) {
  const { slug } = await params;
  const disease = diseasesData.find(d => d.slug === slug);
  if (!disease) {
    notFound();
  }

  // Load content file
  const filePath = path.join(process.cwd(), 'content', 'diseases', `${slug}.md`);
  let rawContent = "";
  let sections: MarkdownSection[] = [];

  if (fs.existsSync(filePath)) {
    rawContent = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = stripTableOfContents(rawContent);
    sections = parseContentToSections(cleanedContent);
  } else {
    // Fallback if content file hasn't been written
    sections = [{
      title: disease.title,
      cleanTitle: "Overview",
      id: "overview",
      level: 1,
      contentHtml: `<p>${disease.metaDescription}</p><p>(Medical details for this condition are currently being audited and will be updated shortly.)</p>`,
      rawMarkdown: ""
    }];
  }


  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Conditions', path: '/sitemap/' },
    { label: disease.title }
  ];

  // Quick list of 5 procedures for sidebar
  const sidebarProcedures = proceduresData.slice(0, 5);

  // Extract sections
  const introSection = sections.find(s => s.level === 1) || sections[0];
  const bodySections = sections.filter(s => s !== introSection);

  // Setup vertical sticky nav sections list
  const navItems = [
    { id: introSection.id, title: 'Overview' },
    ...bodySections.map(sec => ({ id: sec.id, title: sec.cleanTitle }))
  ];

  return (
    <article className={styles.container}>
      <PageHero
        title={disease.title}
        subtitle={disease.metaDescription}
        breadcrumbs={breadcrumbs}
        bannerImage={disease.sideImage}
      />

      <div className={`container ${styles.contentWrapper}`}>
        {/* Left Column: Section Navigation */}
        <aside className={styles.navColumn}>
          <StickyNav sections={navItems} />
        </aside>

        {/* Center Column: Sections Content */}
        <div className={styles.mainColumn}>
          {/* Main article intro content */}
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

          {/* Quick Consultation CTA Block */}
          <ScrollReveal direction="up" delay={50}>
            <div className={styles.contentCTA}>
              <h3>Need Clinical Advice?</h3>
              <p>Schedule a clinic visit with Dr. Ankita Gupta at Gastro Liver Endoscopy Centre in Greater Kailash, South Delhi.</p>
              <div className={styles.ctaActions}>
                <Button variant="secondary" size="md" href="#appointment-modal">
                  Book Clinic Appointment
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
          {/* Procedures Menu widget */}
          <div className={styles.widget}>
            <h4 className={styles.widgetTitle}>Diagnostic Procedures</h4>
            <ul className={styles.proceduresMenu}>
              {sidebarProcedures.map((proc, idx) => (
                <li key={idx}>
                  <Link href={`/procedures/${proc.slug}/`} className={styles.procLink}>
                    <span>{proc.title}</span>
                    <svg className={styles.procArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details widget */}
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


      {/* Structured Data: Breadcrumb and MedicalCondition Schema */}
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
                "name": "Conditions",
                "item": "https://gastroliver.in/sitemap/"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": disease.title,
                "item": `https://gastroliver.in/conditions/${disease.slug}/`
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
            "@type": "MedicalCondition",
            "name": disease.title,
            "description": disease.metaDescription,
            "possibleTreatment": [
              {
                "@type": "MedicalTherapy",
                "name": "Gastroenterology Consultation & Therapeutic Endoscopy"
              }
            ]
          })
        }}
      />
    </article>
  );
}
