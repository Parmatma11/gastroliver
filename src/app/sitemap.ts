import { MetadataRoute } from 'next';
import { diseasesData } from '../../data/diseases';
import { proceduresData } from '../../data/procedures';
import { blogData } from '../../data/blog';
import { getStaticRoutes } from '../../data/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gastroliver.in';
  const currentDate = new Date();

  // 1. Static Pages sitemap elements
  const staticSitemap = getStaticRoutes().map(route => {
    // Determine priority
    let priority = 0.8;
    if (route === '/') priority = 1.0;
    else if (route === '/contact/') priority = 0.9;
    else if (route === '/doctor-profile/') priority = 0.9;
    
    // Normalize path to make sure it matches trailing slash config
    const normalizedPath = route.endsWith('/') ? route : `${route}/`;

    return {
      url: `${baseUrl}${normalizedPath}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority,
    };
  });

  // 2. Diseases sitemap elements
  const diseasesSitemap = diseasesData.map(d => ({
    url: `${baseUrl}/conditions/${d.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 3. Procedures sitemap elements
  const proceduresSitemap = proceduresData.map(p => ({
    url: `${baseUrl}/procedures/${p.slug}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 4. Blogs sitemap elements
  const blogsSitemap = blogData.map(b => {
    const publishedDate = b.publishedDate 
      ? new Date(b.publishedDate.split('-').reverse().join('-')) // Parses DD-MM-YYYY format safely
      : currentDate;

    return {
      url: `${baseUrl}/blog/${b.slug}/`,
      lastModified: isNaN(publishedDate.getTime()) ? currentDate : publishedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    };
  });

  return [
    ...staticSitemap,
    ...diseasesSitemap,
    ...proceduresSitemap,
    ...blogsSitemap
  ];
}
