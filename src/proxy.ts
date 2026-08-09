import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { diseasesData } from '../data/diseases';
import { proceduresData } from '../data/procedures';
import { blogData } from '../data/blog';
import { redirectsMap } from '../data/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check direct hardcoded redirects first
  if (redirectsMap[pathname]) {
    return NextResponse.redirect(new URL(redirectsMap[pathname], request.url), 301);
  }
  
  const pathnameWithTrailingSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  if (redirectsMap[pathnameWithTrailingSlash]) {
    return NextResponse.redirect(new URL(redirectsMap[pathnameWithTrailingSlash], request.url), 301);
  }

  // Normalize slug by removing leading and trailing slashes
  const slug = pathname.replace(/^\/|\/$/g, '');

  if (!slug) {
    return NextResponse.next();
  }

  // Skip static assets and internal Next.js requests
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 2. Skip already-prefixed new pages
  if (
    pathname.startsWith('/conditions/') ||
    pathname.startsWith('/procedures/') ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/doctor-profile/') ||
    pathname.startsWith('/hospital/') ||
    pathname.startsWith('/gallery/') ||
    pathname.startsWith('/contact/') ||
    pathname.startsWith('/payments/') ||
    pathname.startsWith('/patient-testimonials/') ||
    pathname.startsWith('/case-study/') ||
    pathname.startsWith('/sitemap/')
  ) {
    return NextResponse.next();
  }

  // 3. Dynamic redirection for diseases
  const matchedDisease = diseasesData.find(d => d.slug === slug);
  if (matchedDisease) {
    return NextResponse.redirect(
      new URL(`/conditions/${matchedDisease.slug}/`, request.url),
      301
    );
  }

  // 4. Dynamic redirection for procedures
  const matchedProcedure = proceduresData.find(p => p.slug === slug);
  if (matchedProcedure) {
    return NextResponse.redirect(
      new URL(`/procedures/${matchedProcedure.slug}/`, request.url),
      301
    );
  }

  // 5. Dynamic redirection for blog posts
  const matchedBlog = blogData.find(b => b.slug === slug);
  if (matchedBlog) {
    return NextResponse.redirect(
      new URL(`/blog/${matchedBlog.slug}/`, request.url),
      301
    );
  }

  return NextResponse.next();
}

// Limit proxy trigger paths for high performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
