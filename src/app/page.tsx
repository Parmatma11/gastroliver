import Image from 'next/image';
import Link from 'next/link';
import { quickActionCards, processSteps, statCounters } from '../../data/homepage';
import { facilitiesData } from '../../data/facilities';
import { latestBlogPosts } from '../../data/blog';
import { contactData } from '../../data/contact';
import Button from '../components/ui/Button';
import ProcedureCard from '../components/ui/ProcedureCard';
import BlogCard from '../components/ui/BlogCard';
import DoctorProfileSnippet from '../components/ui/DoctorProfileSnippet';
import HeroSlider from '../components/sections/HeroSlider';
import TreatmentTabs from '../components/sections/TreatmentTabs';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import { Metadata } from 'next';
import GalleryPreview from '../components/sections/GalleryPreview';
import styles from './page.module.css';
import ScrollReveal from '../components/ui/ScrollReveal';
import { client } from '../lib/sanity';

export const metadata: Metadata = {
  title: "Best Gastroenterologist in Delhi | Dr. Ankita Gupta | GLEC",
  description: "Consult Dr. Ankita Gupta, one of the best gastroenterologist in Delhi NCR. Expert in liver, pancreas & digestive care at Gastroliver Clinic, South Delhi.",
  alternates: {
    canonical: "/",
  }
};

export default async function Home() {
  // Fetch facilities dynamically from Sanity if configured
  let facilities = facilitiesData;
  let latestBlogs = latestBlogPosts;

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const sanityFacilities = await client.fetch(`*[_type == "facility"] | order(title asc)[0...6] {
        "slug": slug.current,
        title,
        "icon": icon.asset->url,
        description,
        link
      }`);
      if (sanityFacilities && sanityFacilities.length > 0) {
        facilities = sanityFacilities;
      }
    } catch (err) {
      console.error('Failed to fetch homepage facilities from Sanity:', err);
    }

    try {
      const sanityBlogs = await client.fetch(`*[_type == "blogPost"] | order(publishedDate desc)[0...3] {
        "slug": slug.current,
        title,
        "series": coalesce(series->slug.current, series),
        "seriesTitle": coalesce(series->title, series),
        metaDescription,
        "featuredImage": featuredImage.asset->url,
        publishedDate,
        readTime,
        author
      }`);
      if (sanityBlogs && sanityBlogs.length > 0) {
        latestBlogs = sanityBlogs;
      }
    } catch (err) {
      console.error('Failed to fetch homepage blogs from Sanity:', err);
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": "Dr. Ankita Gupta",
    "image": "https://gastroliver.in/images/doctor/profile_main.jpg",
    "medicalSpecialty": "Gastroenterology",
    "telephone": contactData.phone,
    "email": contactData.emailPrimary,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Part1, E-20, Greater Kailash",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110048",
      "addressCountry": "IN"
    },
    "location": {
      "@type": "Place",
      "name": contactData.clinicName,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5482,
        "longitude": 77.2346
      }
    },
    "memberOf": [
      {
        "@type": "MedicalOrganization",
        "name": "Sir Ganga Ram Hospital, New Delhi"
      },
      {
        "@type": "MedicalOrganization",
        "name": "Primus Super Speciality Hospital, New Delhi"
      }
    ],
    "award": [
      "DM Gastroenterology Gold Medalist"
    ]
  };

  return (
    <div className={styles.homepage}>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SLIDER */}
      <HeroSlider />

      {/* 2. QUICK ACTION CARDS */}
      <section className={styles.actionsSection} aria-label="Quick Actions">
        <div className="container">
          <div className={styles.actionsGrid}>
            {quickActionCards.map((card, i) => (
              <ScrollReveal
                key={i}
                delay={i * 100}
                duration={800}
                direction="up"
                className={`${styles.actionCard} ${styles[`card-${card.variant}`]}`}
              >
                <div className={styles.cardBgWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.cardBg}
                  />
                  <div className={styles.cardOverlay}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                  {card.variant === 'appointment' ? (
                    <Link href="#appointment-modal" className={styles.ctaCardLink}>
                      Book Online Now
                    </Link>
                  ) : (
                    <Link href={card.ctaLink} className={styles.cardLink}>
                      {card.ctaText} &rarr;
                    </Link>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DOCTOR PROFILE SNIPPET */}
      <section id="doctor" className="section-padding">
        <div className="container">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className="section-header">
              <h2>Our Chief Consultant</h2>
              <p>Dr. Ankita Gupta brings academic distinction and global motility training to South Delhi patients</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150} duration={800}>
            <DoctorProfileSnippet />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 5. INTERACTIVE TREATMENT TABS */}
      <section id="treatments" className="section-padding">
        <div className="container">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className="section-header">
              <h2>Conditions We Treat</h2>
              <p>Expert diagnostic validation and treatment guidelines for common gastrointestinal disorders</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={150} duration={800}>
            <TreatmentTabs />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. PROCESS STEPS */}
      <section className="section-padding bg-soft-slab">
        <div className="container">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className="section-header">
              <h2>Your Journey to Health</h2>
              <p>A streamlined, medical approach to diagnosis, consulting, and care</p>
            </div>
          </ScrollReveal>

          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <ScrollReveal
                key={i}
                delay={i * 150}
                duration={800}
                direction="up"
                className={styles.processCard}
              >
                <div className={styles.processImageWrapper}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="120px"
                    className={styles.processImage}
                  />
                  <span className={styles.stepBadge}>{step.stepNumber}</span>
                </div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS COUNTERS */}
      <section className={styles.statsSection}>
        <ScrollReveal direction="up" delay={0} duration={800} className={`container ${styles.statsGrid}`}>
          {statCounters.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statValue}>
                {stat.value.toLocaleString()}
                {stat.label.includes('%') ? '%' : '+'}
              </span>
              <span className={styles.statLabel}>
                {stat.label.replace('%', '')}
              </span>
            </div>
          ))}
        </ScrollReveal>
      </section>

      {/* 8. FACILITIES / PROCEDURES GRID */}
      <section id="facilities" className="section-padding bg-soft-slab">
        <div className="container">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className="section-header">
              <h2>Advanced Diagnostic Facilities</h2>
              <p>Equipped with high-definition endoscopic platforms, ultrasound-based Fibroscan, and motility labs</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-3">
            {facilities.map((fac, i) => (
              <ScrollReveal
                key={i}
                delay={(i % 3) * 100}
                duration={800}
                direction="up"
              >
                <ProcedureCard
                  slug={fac.slug}
                  title={fac.title}
                  seo={{ title: fac.title, description: fac.description }}
                  metaDescription={fac.description}
                  descriptionSnippet={fac.description}
                  icon={fac.icon}
                />
              </ScrollReveal>
            ))}
          </div>
          
          <ScrollReveal direction="up" delay={100} duration={800} className={styles.viewMoreRow}>
            <Button variant="outline" size="lg" href="/sitemap/">
              View All Diagnostic Procedures
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. GALLERY PREVIEW */}
      <GalleryPreview />

      {/* 10. LATEST BLOG POSTS */}
      <section id="blog" className="section-padding bg-soft-slab">
        <div className="container">
          <ScrollReveal direction="up" delay={0} duration={800}>
            <div className="section-header">
              <h2>From the Health Blog</h2>
              <p>Clinical dietary charts and liver health education written directly by Dr. Ankita Gupta</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-3">
            {latestBlogs.map((post, i) => (
              <ScrollReveal
                key={i}
                delay={i * 150}
                duration={800}
                direction="up"
              >
                <BlogCard {...post} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={100} duration={800} className={styles.viewMoreRow}>
            <Button variant="primary" size="lg" href="/blog/">
              Visit Medical Blog
            </Button>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
