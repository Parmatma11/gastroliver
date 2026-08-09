# Page Template Map — gastroliver.in

This document maps all 135 WordPress URLs to their respective Next.js templates, content sources, and dynamic routes.

---

## 1. Core Pages Template Map

| Original WP URL | Page Type | Next.js Page Template | Content Source File | New Next.js Route | Status |
|-----------------|-----------|-----------------------|---------------------|-------------------|--------|
| `/` | Homepage | Static Home Shell | `data/homepage.ts` | `/` | Migrated |
| `/doctor-profile/` | Doctor Profile | Static Page Template | `data/doctor.ts` | `/doctor-profile/` | Pending |
| `/hospital/` | Hospital Info | Static Page Template | `data/contact.ts` | `/hospital/` | Pending |
| `/gallery/` | Clinic Gallery | Gallery Template | `data/gallery.ts` | `/gallery/` | Pending |
| `/contact/` | Contact Us | Contact Page Template | `data/contact.ts` | `/contact/` | Pending |
| `/payments/` | Online Payments | Payment Template | None (static form) | `/payments/` | Pending |
| `/blog/` | Blog Index | Grid Index Template | `data/blog.ts` | `/blog/` | Pending |
| `/blogs/` | Alternate Blog | Redirect Template | None (301 redirect) | `/blog/` (Redirect) | Pending |
| `/patient-testimonials/` | Testimonials | Review List Template | `data/testimonials.ts` | `/patient-testimonials/` | Pending |
| `/case-study/` | Case Studies | Static Info Template | None (static content) | `/case-study/` | Pending |
| `/sitemap/` | HTML Sitemap | Link Directory List | `data/routes.ts` | `/sitemap/` | Pending |
| `/weight-loss/` | Special Service | Custom Landing Template| `data/procedures.ts` | `/procedures/weight-loss/` | Pending |
| `/hydrogen-breath-test/` | Diagnostic Page| Service Template | `data/procedures.ts` | `/procedures/hydrogen-breath-test/` | Pending |

---

## 2. Disease / Condition Pages (36 total)
- **Page Type**: Disease / Symptom
- **Dynamic Route**: `src/app/conditions/[slug]/page.tsx`
- **Content Source**: `data/diseases.ts` (Dynamic list mapping `Disease` interface)
- **Status**: Dynamic Template Pending

### Mapped Path Examples:
| Original WP URL | New Next.js Route | Template | Status |
|-----------------|-------------------|----------|--------|
| `/acidity-and-reflux/` | `/conditions/acidity-and-reflux/` | Disease Detail | Pending |
| `/jaundice/` | `/conditions/jaundice/` | Disease Detail | Pending |
| `/piles-hemorrhoids-bloody-stools/` | `/conditions/piles-hemorrhoids-bloody-stools/` | Disease Detail | Pending |
| `/liver-diseases-and-alcoholism/` | `/conditions/liver-diseases-and-alcoholism/` | Disease Detail | Pending |
| `/peptic-ulcer-disease/` | `/conditions/peptic-ulcer-disease/` | Disease Detail | Pending |
| `/cirrhosis/` | `/conditions/cirrhosis/` | Disease Detail | Pending |

---

## 3. Procedure / Facility Pages (18 total)
- **Page Type**: Procedure / Diagnostic Facility
- **Dynamic Route**: `src/app/procedures/[slug]/page.tsx`
- **Content Source**: `data/procedures.ts` & `data/facilities.ts`
- **Status**: Dynamic Template Pending

### Mapped Path Examples:
| Original WP URL | New Next.js Route | Template | Status |
|-----------------|-------------------|----------|--------|
| `/ugi-endoscopy/` | `/procedures/ugi-endoscopy/` | Procedure Detail | Pending |
| `/colonoscopy/` | `/procedures/colonoscopy/` | Procedure Detail | Pending |
| `/ercp/` | `/procedures/ercp/` | Procedure Detail | Pending |
| `/fibroscan/` | `/procedures/fibroscan/` | Procedure Detail | Pending |
| `/peroral-endoscopic-myotomy-poem/` | `/procedures/peroral-endoscopic-myotomy-poem/` | Procedure Detail | Pending |
| `/manometry-and-24-hour-ph-study/` | `/procedures/manometry-and-24-hour-ph-study/` | Procedure Detail | Pending |

---

## 4. Blog Posts (48 total)
- **Page Type**: Editorial Article
- **Dynamic Route**: `src/app/blog/[slug]/page.tsx`
- **Content Source**: `data/blog.ts`
- **Status**: Dynamic Template Pending

### Mapped Path Examples:
| Original WP URL | New Next.js Route | Template | Status |
|-----------------|-------------------|----------|--------|
| `/endoscopy-for-acidity/` | `/blog/endoscopy-for-acidity/` | Blog Post Template | Pending |
| `/is-fatty-liver-reversible/` | `/blog/is-fatty-liver-reversible/` | Blog Post Template | Pending |
| `/ten-worst-foods-for-acid-reflux/` | `/blog/ten-worst-foods-for-acid-reflux/` | Blog Post Template | Pending |
| `/fruit-for-weight-loss/` | `/blog/fruits-for-weight-loss/` | Blog Post Template | Pending |
| `/diet-chart-for-fatty-liver/` | `/blog/diet-chart-for-fatty-liver/` | Blog Post Template | Pending |

---

## 5. Redirect Rules Mapping
All legacy paths that bypass standard slug patterns or need direct 301 updates:
- `/abdomen-pain/` ➔ 301 Redirect ➔ `/conditions/abdomen-pain-treatment-in-delhi/`
- `/intestinal-gas/` ➔ 301 Redirect ➔ `/conditions/intestinal-gas-treatment/`
- `/blogs/` ➔ 301 Redirect ➔ `/blog/`
- `/[slug]/` ➔ 301 Redirect ➔ `/conditions/[slug]/` (for disease page matching)
- `/[slug]/` ➔ 301 Redirect ➔ `/procedures/[slug]/` (for procedure page matching)
- `/[slug]/` ➔ 301 Redirect ➔ `/blog/[slug]/` (for blog article matching)
