# Search Engine Migration Checklist

This checklist tracks the implementation status of all SEO components required for the Next.js migration of `gastroliver.in`.

---

- `[x]` **All Old URLs Mapped**: All 137 legacy paths from `url-map.md` are mapped in our redirects configuration.
- `[x]` **Redirects Implemented**: Implemented dynamic 301 redirects for legacy URLs in `src/proxy.ts`.
- `[x]` **No Redirect Loops**: Verified that redirect targets are resolved immediately and do not loop.
- `[x]` **No Redirect Chains**: Matched legacy paths directly to their final destinations.
- `[x]` **Canonicals Implemented**: Injected self-referencing canonical URL alternates into all page layouts.
- `[x]` **Sitemap Implemented**: Created a dynamic Next.js sitemap generator at `src/app/sitemap.ts` listing all 137 paths.
- `[x]` **Robots Implemented**: Created `src/app/robots.ts` defining crawl parameters and sitemap location.
- `[x]` **Metadata Migrated**: Added page-specific title, description, and keyword metadata to all page routes.
- `[x]` **Open Graph Implemented**: Added Open Graph metadata properties to all static and dynamic pages.
- `[x]` **Structured Data Implemented**: Injected dynamic JSON-LD structured blocks for Physician, MedicalCondition, MedicalProcedure, BlogPosting, and BreadcrumbList.
- `[x]` **Internal Links Updated**: All core header/footer and page links are mapped directly to final routes.
- `[x]` **Broken Links Fixed**: Audited page links (see `docs/internal-link-audit.md`).
- `[x]` **Image Alt Text Audited**: Audited image elements to ensure descriptive alt attributes exist.
- `[x]` **Indexability Audited**: Mapped indexing rules (public pages indexed, query parameters/APIs disallowed).
- `[x]` **Heading Structure Audited**: Confirmed exactly one logical `H1` tag per page, followed by sequential `H2` and `H3` headers.
- `[x]` **HTTPS Canonicalization Verified**: Configured absolute canonical URLs using `https://` schema.
- `[x]` **www/non-www Canonicalization Verified**: Normalized all URLs to non-www domains.
- `[x]` **Trailing Slash Consistency Verified**: Configured `trailingSlash: true` in `next.config.ts` and set trailing slashes on all canonical and redirect targets.
- `[x]` **Query Parameter Handling Verified**: Blocked crawling of query parameter paths inside `robots.ts`.
- `[x]` **Blog Metadata Verified**: Statically compiled blog post dates and authors.
- `[x]` **Doctor Schema Verified**: Injected physician structured data using verified doctor qualifications.
- `[x]` **Breadcrumb Schema Verified**: Structured breadcrumb paths match the visible layout breadcrumbs.
