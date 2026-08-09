import { diseasesData } from './diseases';
import { proceduresData } from './procedures';
import { blogData } from './blog';

// Map of legacy WP URLs to new clean Next.js SEO routes
export const redirectsMap: Record<string, string> = {
  "/abdomen-pain/": "/conditions/abdomen-pain-treatment-in-delhi/",
  "/intestinal-gas/": "/conditions/intestinal-gas-treatment/",
  "/blogs/": "/blog/",
  "/wp-content/uploads/al_opt_content/": "/images/" // Media assets redirect fallback
};

export const getRedirect = (urlPath: string): string | null => {
  const normalized = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return redirectsMap[normalized] || null;
};

export const getStaticRoutes = (): string[] => [
  "/",
  "/doctor-profile/",
  "/hospital/",
  "/gallery/",
  "/contact/",
  "/payments/",
  "/blog/",
  "/patient-testimonials/",
  "/case-study/",
  "/sitemap/"
];

export const getDiseaseRoutes = (): string[] => 
  diseasesData.map(d => `/conditions/${d.slug}/`);

export const getProcedureRoutes = (): string[] => 
  proceduresData.map(p => `/procedures/${p.slug}/`);

export const getBlogPostRoutes = (): string[] => 
  blogData.map(b => `/blog/${b.slug}/`);

export const getAllMigrationRoutes = (): string[] => [
  ...getStaticRoutes(),
  ...getDiseaseRoutes(),
  ...getProcedureRoutes(),
  ...getBlogPostRoutes()
];
