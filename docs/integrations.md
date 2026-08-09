# Integrations — gastroliver.in

> All third-party services, plugins, embeds, and external dependencies.

---

## 1. Appointment Booking — KiviHealth

| Item | Detail |
|------|--------|
| Provider | KiviHealth |
| Type | External SaaS (iframe embed) |
| URL | `https://kivihealth.com/bookappointment?d=15301&c=Greater%20Kailash&s=no` |
| Integration | `<iframe>` in footer popup modal |
| Trigger | "Make Appointment" / "Quick Appointment" buttons |
| Doctor ID | 15301 |
| Location | Greater Kailash |
| **Migration Note** | Must preserve iframe embed or replace with direct API integration |

---

## 2. Google Analytics

| Item | Detail |
|------|--------|
| Tracking ID | G-SRS77Q5BYN |
| Method | Google Tag Manager (gtag.js) |
| Script | `https://www.googletagmanager.com/gtag/js?id=G-SRS77Q5BYN` |
| **Migration Note** | Add to Next.js `_app.tsx` or use `@next/third-parties` |

---

## 3. Facebook / Meta Pixel

| Item | Detail |
|------|--------|
| Plugin | Official Facebook Pixel v5.2.2 |
| Script | `/wp-content/plugins/official-facebook-pixel/js/facebook_signal.js` |
| Events | Page views, form submissions (CF7, WPForms, Ninja Forms) |
| **Migration Note** | Extract pixel ID and implement via Next.js Script component |

---

## 4. WhatsApp Chat Widget

| Item | Detail |
|------|--------|
| Plugin | WP WhatsApp Chat v8.5.1 |
| Script | `qlwapp-frontend.js` |
| CSS | `qlwapp-frontend.css` |
| Position | Floating button (bottom-right) |
| **Migration Note** | Replace with custom WhatsApp floating button or react-whatsapp-chat-widget |

---

## 5. Google Maps

| Item | Detail |
|------|--------|
| Usage | Contact page, footer address link |
| Link | `https://g.page/dr--ankita-gupta-gastroenterolog?share` |
| Type | Link (not embedded map on homepage; likely embedded on contact page) |
| **Migration Note** | Use `@react-google-maps/api` or static embed |

---

## 6. Google Fonts

| Font | Usage |
|------|-------|
| Open Sans | Body text, content |
| Rajdhani | Headings, navigation |
| Dancing Script | Hero slider title |
| Public Sans | Body (custom.css override) |
| Roboto / Roboto Slab | Elementor global typography |

**Migration Note**: Use `next/font` for self-hosted optimization.

---

## 7. Contact Form 7

| Item | Detail |
|------|--------|
| Plugin | Contact Form 7 v6.1.6 |
| Pages | `/contact/` |
| Fields | Name, Email, Phone, Message |
| Validation | SWV (Simple Validation) |
| **Migration Note** | Replace with native Next.js form + API route for email |

---

## 8. NextGEN Gallery

| Item | Detail |
|------|--------|
| Plugin | NextGEN Gallery |
| Page | `/gallery/` |
| Galleries | 9 categories (Colonoscopy, Dispensary, Medical Checkup, etc.) |
| Thumbnails | `/wp-content/gallery/{name}/cache/*.JPG` |
| **Migration Note** | Download all gallery images, implement custom gallery component |

---

## 9. Divi Builder

| Item | Detail |
|------|--------|
| Version | 4.27.6 |
| Theme | Homediner (Divi child) |
| Icons | ETmodules font family |
| Slider | Divi Slider module |
| Layout | Template-based (header + footer templates) |
| **Migration Note** | All layout must be rebuilt in React components |

---

## 10. Elementor

| Item | Detail |
|------|--------|
| Version | 4.1.0 |
| Usage | Partial — some heading elements (thsn_heading widget) |
| Kit ID | 5122 |
| **Migration Note** | Minimal usage — extract content only |

---

## 11. Icon Fonts

| Library | CDN |
|---------|-----|
| Line Awesome 1.3.0 | `https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/line-awesome/css/line-awesome.min.css` |
| ETmodules | Bundled with Divi |
| Elementor Icons | Bundled with Elementor |

**Migration Note**: Use `react-icons` (Line Awesome available) or Lucide Icons.

---

## 12. JS Libraries

| Library | Version | Usage |
|---------|---------|-------|
| jQuery | 3.7.1 | Core dependency |
| jQuery Migrate | 3.4.1 | Backward compat |
| Slick Slider | 1.8.1 | Testimonial slider, gallery lightbox |
| Isotope | — | Gallery filtering |
| Magnific Popup | — | Lightbox overlays |

**Migration Note**: Replace with React alternatives (Swiper, react-photoswipe, etc.)

---

## 13. BlogVault Airlift (Performance)

| Feature | Detail |
|---------|--------|
| Image Optimization | Auto WebP conversion |
| Lazy Loading | Custom `bv-lazyload` system |
| Script Deferral | Web Worker-based JS loading |
| CSS Optimization | Critical CSS inlining |

**Migration Note**: Not needed — Next.js Image component + native lazy loading replaces this entirely.

---

## 14. Easy Table of Contents

| Item | Detail |
|------|--------|
| Version | 2.0.83 |
| Usage | Blog posts (auto-generated TOC) |
| **Migration Note** | Implement custom TOC component from heading extraction |

---

## 15. WPCode (Code Snippets)

| Item | Detail |
|------|--------|
| Usage | Custom inline JS snippets |
| **Migration Note** | Review and migrate relevant snippets |

---

## 16. Speculation Rules (Prefetch)

```json
{
  "prefetch": [{
    "source": "document",
    "where": {
      "and": [
        {"href_matches": "/*"},
        {"not": {"href_matches": ["/wp-*.php", "/wp-admin/*", ...]}}
      ]
    },
    "eagerness": "conservative"
  }]
}
```

**Migration Note**: Next.js `<Link>` component handles prefetching natively.

---

## 17. Google Site Verification

| Method | Value |
|--------|-------|
| Meta Tag | `Xg2I7jSBsPjdNdZeEsFAb7HabFMCMJG2C8eaMzMRz2Y` |

**Migration Note**: Preserve in Next.js `<Head>` or via Search Console DNS verification.

---

## Proposed Next.js Route Structure

```
/                                    → Homepage
/about/
  /doctor-profile/                   → Doctor Profile
  /hospital/                         → Hospital Info
/conditions/
  /abdomen-pain/                     → Redirect from old slug
  /abdomen-pain-treatment-in-delhi/  → Abdomen Pain
  /acidity-and-reflux/               → Acidity
  /diarrhoea-constipation/           → Diarrhea & Constipation
  /intestinal-gas/                   → Redirect
  /intestinal-gas-treatment/         → Gas Treatment
  /gastrointestinal-bleeding/        → GI Bleeding
  /liver-diseases-and-alcoholism/    → Liver Diseases
  /jaundice/                         → Jaundice
  /piles-hemorrhoids-bloody-stools/  → Piles
  /gastroesophageal-reflux/          → GERD
  /dysphagia/                        → Dysphagia
  /irritable-bowel-syndrome/         → IBS
  /celiac-disease/                   → Celiac
  /inflammatory-bowel-disease/       → IBD
  /peptic-ulcer-disease/             → Peptic Ulcer
  /h-pylori-infection/               → H. Pylori
  /achalasia/                        → Achalasia
  /esophageal-stricture-web/         → Stricture
  /esophageal-cancer/                → Esophageal Cancer
  /gastric-cancer/                   → Gastric Cancer
  /gist-and-lymphoma/                → GIST
  /colonic-polyps-and-cancer/        → Colonic Cancer
  /cirrhosis/                        → Cirrhosis
  /alcoholic-liver-disease/          → ALD
  /non-alcoholic-fatty-liver-disease-nafld/ → NAFLD
  /chronic-hepatitis-b/              → Hep B
  /chronic-hepatitis-c/              → Hep C
  /ascites/                          → Ascites
  /liver-tumors/                     → Liver Tumors
  /acute-pancreatitis/               → Acute Pancreatitis
  /chronic-pancreatitis/             → Chronic Pancreatitis
  /pancreatic-tumors/                → Pancreatic Tumors
  /pancreatic-pseudocyst/            → Pseudocyst
  /gall-bladder-stone/               → Gallstone
  /gall-bladder-cancer/              → Gallbladder Cancer
  /common-bile-duct-stone/           → CBD Stone
  /cholangiocarcinoma/               → Cholangiocarcinoma
/procedures/
  /ugi-endoscopy/                    → UGI Endoscopy
  /colonoscopy/                      → Colonoscopy
  /ercp/                             → ERCP
  /capsule-endoscopy/                → Capsule Endoscopy
  /manometry-and-24-hour-ph-study/   → Manometry
  /fibroscan/                        → Fibroscan
  /liver-biopsy/                     → Liver Biopsy
  /peroral-endoscopic-myotomy-poem/  → POEM
  /endoscopic-ultrasonography/       → EUS
  /double-balloon-enteroscopy.../    → DBE
  /variceal-banding/                 → Banding
  /apc-for-gi-bleed/                 → APC
  /peg-tube-insertion/               → PEG
  /endoscopic-obesity-therapy/       → Obesity
  /nutrition-clinic/                 → Nutrition
  /painless-therapy-for-piles/       → Painless Piles
  /colonic-tumor-removal/            → Colonic Tumor
  /gastric-tumor-removal/            → Gastric Tumor
  /hydrogen-breath-test/             → Breath Test
  /weight-loss/                      → Weight Loss
/blog/                               → Blog Index
  /[slug]/                           → Individual blog posts (48)
/gallery/                            → Gallery
/patient-testimonials/               → Testimonials
/case-study/                         → Case Studies
/contact/                            → Contact
/payments/                           → Payments
/sitemap/                            → HTML Sitemap
```

> **IMPORTANT**: All existing URLs MUST be preserved via Next.js rewrites/redirects to maintain SEO. If route restructuring changes any URL path, a 301 redirect must map old → new.
