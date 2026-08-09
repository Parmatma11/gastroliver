import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/images/',
        '/conditions/',
        '/procedures/',
        '/blog/',
        '/doctor-profile/',
        '/hospital/',
        '/gallery/',
        '/contact/',
        '/payments/',
        '/patient-testimonials/',
        '/case-study/',
        '/sitemap/'
      ],
      disallow: [
        '/_next/',
        '/api/',
        '/admin/',
        '/*?*', // Disallow crawling query parameter URLs to prevent duplicate indexing
      ],
    },
    sitemap: 'https://gastroliver.in/sitemap.xml',
  };
}
