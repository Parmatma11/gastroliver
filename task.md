# Migration Tasks List

## Phase 3: Homepage Rebuild
- `[x]` Refactor page components for Server/Client boundaries
  - `[x]` Create HeroSlider component (Client)
  - `[x]` Create TreatmentTabs component (Client)
  - `[x]` Create WhyChooseUs credentials list (Server)
  - `[x]` Create GalleryPreview interactive grid (Client)
- `[x]` Rebuild src/app/page.tsx as a Server Component
  - `[x]` Integrate JSON-LD Physician structured schema
  - `[x]` Render modular interactive sections
- `[x]` Verification
  - `[x]` Run npm run lint (0 warnings, 0 errors)
  - `[x]` Run npm run build (Success)

## Phase 4: Complete Content Page Migration
- `[x]` Create Static Page Routes
  - `[x]` Doctor Profile page (/doctor-profile/)
  - `[x]` Hospital Affiliations page (/hospital/)
  - `[x]` Interactive Gallery page (/gallery/ with filters and custom lightbox)
  - `[x]` Contact Us page (/contact/ with map and inquiry form)
  - `[x]` Online Payments page (/payments/ with UPI QR instructions)
  - `[x]` Blog Index page (/blog/ with series filter links)
  - `[x]` Patient Testimonials listing (/patient-testimonials/ with rating stats)
  - `[x]` Clinical Case Studies summaries (/case-study/)
  - `[x]` HTML Sitemap directory (/sitemap/)
- `[x]` Implement Dynamic Route Templates
  - `[x]` Conditions Detail template (/conditions/[slug]/)
  - `[x]` Procedures Detail template (/procedures/[slug]/)
  - `[x]` Blog Post Detail template (/blog/[slug]/)
- `[x]` Programmatic Content Migration
  - `[x]` Create live crawler script (scripts/scrape-live-content.js)
  - `[x]` Scrape and convert all 100+ articles to clean local markdown files
  - `[x]` Verify 100% text integrity (no invented medical claims or details)
- `[x]` Redirection & Route Mapping
  - `[x]` Implement global redirection middleware (src/middleware.ts)
  - `[x]` Handle WP legacy redirects dynamically (0 broken links)
- `[x]` Verification & Quality Control
  - `[x]` Create automated route checker (scripts/check-coverage.js)
  - `[x]` Run coverage check (137/137 pages matching, 0 missing, 0 errors)
  - `[x]` Validate complete build using `npm run lint` and `npm run build` (All 137 routes compiled to fast static HTML)
