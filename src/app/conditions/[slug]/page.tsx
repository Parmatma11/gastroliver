import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '../../../lib/sanity';
import { PortableText } from '@portabletext/react';
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

interface PortableTextSection {
  id: string;
  title: string;
  cleanTitle: string;
  level: number;
  blocks: any[];
}

// Generate metadata for each condition dynamically
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let disease: any = null;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      disease = await client.fetch(`*[_type == "disease" && slug.current == $slug][0] { seo, title, metaDescription }`, { slug });
    } catch (err) {
      console.error('Error generating dynamic SEO metadata from Sanity:', err);
    }
  }

  if (!disease) {
    disease = diseasesData.find(d => d.slug === slug);
  }

  if (!disease) return {};

  return {
    title: disease.seo?.title || disease.title,
    description: disease.seo?.description || disease.metaDescription,
    alternates: {
      canonical: `/conditions/${slug}/`,
    }
  };
}

// Statically generate params for all known disease pages
export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const diseases = await client.fetch(`*[_type == "disease"] { "slug": slug.current }`);
      if (diseases && diseases.length > 0) {
        return diseases.map((d: any) => ({ slug: d.slug }));
      }
    } catch (err) {
      console.error('Error generating static parameters from Sanity:', err);
    }
  }

  return diseasesData.map(d => ({
    slug: d.slug,
  }));
}

function stripTableOfContents(markdown: string): string {
  if (!markdown) return "";
  const h1Index = markdown.indexOf('# ');
  if (h1Index !== -1) {
    return markdown.slice(h1Index);
  }
  return markdown;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function groupPortableTextIntoSections(blocks: any[]): PortableTextSection[] {
  if (!blocks || !Array.isArray(blocks)) return [];

  const sections: PortableTextSection[] = [];
  
  let currentSection: PortableTextSection = {
    id: 'overview',
    title: 'Overview',
    cleanTitle: 'Overview',
    level: 1,
    blocks: []
  };

  for (const block of blocks) {
    if (block._type === 'block' && block.style === 'h2') {
      sections.push(currentSection);

      const headingText = block.children?.map((c: any) => c.text).join('') || '';
      const sectionId = slugify(headingText) || `section-${sections.length}`;
      
      currentSection = {
        id: sectionId,
        title: headingText,
        cleanTitle: headingText,
        level: 2,
        blocks: []
      };
      continue;
    }

    currentSection.blocks.push(block);
  }
  
  sections.push(currentSection);
  return sections;
}

export default async function DiseasePage({ params }: PageProps) {
  const { slug } = await params;
  let disease: any = null;
  let isSanity = false;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const query = `*[_type == "disease" && slug.current == $slug][0] {
        "slug": slug.current,
        title,
        category,
        metaDescription,
        "sideImage": sideImage.asset->url,
        content,
        seo
      }`;
      disease = await client.fetch(query, { slug });
      if (disease) {
        isSanity = true;
      }
    } catch (err) {
      console.error('Failed to fetch disease from Sanity, falling back to local files:', err);
    }
  }

  if (!disease) {
    disease = diseasesData.find(d => d.slug === slug);
  }

  if (!disease) {
    notFound();
  }

  // Load content file or Sanity blocks
  let sections: any[] = [];

  if (isSanity && disease.content) {
    sections = groupPortableTextIntoSections(disease.content);
  } else {
    const filePath = path.join(process.cwd(), 'content', 'diseases', `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const cleanedContent = stripTableOfContents(rawContent);
      sections = parseContentToSections(cleanedContent);
    } else {
      sections = [{
        title: disease.title,
        cleanTitle: "Overview",
        id: "overview",
        level: 1,
        contentHtml: `<p>${disease.metaDescription}</p><p>(Medical details for this condition are currently being audited and will be updated shortly.)</p>`,
        rawMarkdown: ""
      }];
    }
  }

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Conditions', path: '/conditions/' },
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
              {introSection.contentHtml ? (
                <div 
                  className={styles.sectionBody}
                  dangerouslySetInnerHTML={{ __html: introSection.contentHtml }}
                />
              ) : (
                <div className={styles.sectionBody}>
                  <PortableText value={introSection.blocks} />
                </div>
              )}
            </section>
          </ScrollReveal>

          {/* Render remaining body sections dynamically */}
          {bodySections.map((sec, idx) => (
            <ScrollReveal key={idx} direction="up" delay={50}>
              <section id={sec.id} className={styles.contentSection}>
                <h2 className={styles.sectionHeading}>{sec.cleanTitle}</h2>
                {sec.contentHtml ? (
                  <div 
                    className={styles.sectionBody}
                    dangerouslySetInnerHTML={{ __html: sec.contentHtml }}
                  />
                ) : (
                  <div className={styles.sectionBody}>
                    <PortableText value={sec.blocks} />
                  </div>
                )}
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
                "item": "https://gastroliver.in"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Conditions",
                "item": "https://gastroliver.in/conditions/"
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
    </article>
  );
}
