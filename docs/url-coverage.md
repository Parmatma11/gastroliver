# URL Coverage Map — gastroliver.in

> Complete mapping of all 135 WordPress URLs to their Next.js routing and preservation plan.

---

## 1. Core Static Pages (13)

| WordPress URL | Next.js Page Route / Component | Migration Status |
|---------------|--------------------------------|------------------|
| `/` | `src/app/page.tsx` | ✅ Mapped |
| `/doctor-profile/` | `src/app/about/doctor-profile/page.tsx` (using `data/doctor.ts`) | ✅ Mapped |
| `/hospital/` | `src/app/about/hospital/page.tsx` | ✅ Mapped |
| `/gallery/` | `src/app/gallery/page.tsx` (using `data/gallery.ts`) | ✅ Mapped |
| `/contact/` | `src/app/contact/page.tsx` (using `data/contact.ts`) | ✅ Mapped |
| `/payments/` | `src/app/payments/page.tsx` | ✅ Mapped |
| `/blog/` | `src/app/blog/page.tsx` (using `data/blog.ts`) | ✅ Mapped |
| `/blogs/` | *301 Redirect to `/blog/`* | 🔀 Redirect |
| `/patient-testimonials/` | `src/app/patient-testimonials/page.tsx` (using `data/testimonials.ts`) | ✅ Mapped |
| `/case-study/` | `src/app/case-study/page.tsx` | ✅ Mapped |
| `/sitemap/` | `src/app/sitemap/page.tsx` (HTML sitemap index) | ✅ Mapped |
| `/weight-loss/` | `src/app/procedures/weight-loss/page.tsx` | ✅ Mapped |
| `/hydrogen-breath-test/` | `src/app/procedures/hydrogen-breath-test/page.tsx` | ✅ Mapped |

---

## 2. Disease / Condition Pages (36)

All disease pages are handled dynamically using dynamic routing: `src/app/conditions/[slug]/page.tsx` mapping data from `data/diseases.ts`.

| WP URL Path | Next.js Path | Status |
|-------------|--------------|--------|
| `/abdomen-pain-treatment-in-delhi/` | `/conditions/abdomen-pain-treatment-in-delhi` | ✅ Dynamic |
| `/acidity-and-reflux/` | `/conditions/acidity-and-reflux` | ✅ Dynamic |
| `/diarrhoea-constipation/` | `/conditions/diarrhoea-constipation` | ✅ Dynamic |
| `/intestinal-gas-treatment/` | `/conditions/intestinal-gas-treatment` | ✅ Dynamic |
| `/gastrointestinal-bleeding/` | `/conditions/gastrointestinal-bleeding` | ✅ Dynamic |
| `/liver-diseases-and-alcoholism/` | `/conditions/liver-diseases-and-alcoholism` | ✅ Dynamic |
| `/jaundice/` | `/conditions/jaundice` | ✅ Dynamic |
| `/piles-hemorrhoids-bloody-stools/` | `/conditions/piles-hemorrhoids-bloody-stools` | ✅ Dynamic |
| `/gastroesophageal-reflux/` | `/conditions/gastroesophageal-reflux` | ✅ Dynamic |
| `/dysphagia/` | `/conditions/dysphagia` | ✅ Dynamic |
| `/irritable-bowel-syndrome/` | `/conditions/irritable-bowel-syndrome` | ✅ Dynamic |
| `/celiac-disease/` | `/conditions/celiac-disease` | ✅ Dynamic |
| `/inflammatory-bowel-disease/` | `/conditions/inflammatory-bowel-disease` | ✅ Dynamic |
| `/peptic-ulcer-disease/` | `/conditions/peptic-ulcer-disease` | ✅ Dynamic |
| `/h-pylori-infection/` | `/conditions/h-pylori-infection` | ✅ Dynamic |
| `/achalasia/` | `/conditions/achalasia` | ✅ Dynamic |
| `/esophageal-stricture-web/` | `/conditions/esophageal-stricture-web` | ✅ Dynamic |
| `/esophageal-cancer/` | `/conditions/esophageal-cancer` | ✅ Dynamic |
| `/gastric-cancer/` | `/conditions/gastric-cancer` | ✅ Dynamic |
| `/gist-and-lymphoma/` | `/conditions/gist-and-lymphoma` | ✅ Dynamic |
| `/colonic-polyps-and-cancer/` | `/conditions/colonic-polyps-and-cancer` | ✅ Dynamic |
| `/cirrhosis/` | `/conditions/cirrhosis` | ✅ Dynamic |
| `/alcoholic-liver-disease/` | `/conditions/alcoholic-liver-disease` | ✅ Dynamic |
| `/non-alcoholic-fatty-liver-disease-nafld/` | `/conditions/non-alcoholic-fatty-liver-disease-nafld` | ✅ Dynamic |
| `/chronic-hepatitis-b/` | `/conditions/chronic-hepatitis-b` | ✅ Dynamic |
| `/chronic-hepatitis-c/` | `/conditions/chronic-hepatitis-c` | ✅ Dynamic |
| `/ascites/` | `/conditions/ascites` | ✅ Dynamic |
| `/liver-tumors/` | `/conditions/liver-tumors` | ✅ Dynamic |
| `/acute-pancreatitis/` | `/conditions/acute-pancreatitis` | ✅ Dynamic |
| `/chronic-pancreatitis/` | `/conditions/chronic-pancreatitis` | ✅ Dynamic |
| `/pancreatic-tumors/` | `/conditions/pancreatic-tumors` | ✅ Dynamic |
| `/pancreatic-pseudocyst/` | `/conditions/pancreatic-pseudocyst` | ✅ Dynamic |
| `/gall-bladder-stone/` | `/conditions/gall-bladder-stone` | ✅ Dynamic |
| `/gall-bladder-cancer/` | `/conditions/gall-bladder-cancer` | ✅ Dynamic |
| `/common-bile-duct-stone/` | `/conditions/common-bile-duct-stone` | ✅ Dynamic |
| `/cholangiocarcinoma/` | `/conditions/cholangiocarcinoma` | ✅ Dynamic |

---

## 3. Procedure / Facility Pages (18)

All procedure pages are handled dynamically using dynamic routing: `src/app/procedures/[slug]/page.tsx` mapping data from `data/procedures.ts`.

| WP URL Path | Next.js Path | Status |
|-------------|--------------|--------|
| `/ugi-endoscopy/` | `/procedures/ugi-endoscopy` | ✅ Dynamic |
| `/colonoscopy/` | `/procedures/colonoscopy` | ✅ Dynamic |
| `/ercp/` | `/procedures/ercp` | ✅ Dynamic |
| `/capsule-endoscopy/` | `/procedures/capsule-endoscopy` | ✅ Dynamic |
| `/manometry-and-24-hour-ph-study/` | `/procedures/manometry-and-24-hour-ph-study` | ✅ Dynamic |
| `/fibroscan/` | `/procedures/fibroscan` | ✅ Dynamic |
| `/liver-biopsy/` | `/procedures/liver-biopsy` | ✅ Dynamic |
| `/peroral-endoscopic-myotomy-poem/` | `/procedures/peroral-endoscopic-myotomy-poem` | ✅ Dynamic |
| `/endoscopic-ultrasonography/` | `/procedures/endoscopic-ultrasonography` | ✅ Dynamic |
| `/double-balloon-enteroscopy-capsule-endoscopy/` | `/procedures/double-balloon-enteroscopy-capsule-endoscopy` | ✅ Dynamic |
| `/variceal-banding/` | `/procedures/variceal-banding` | ✅ Dynamic |
| `/apc-for-gi-bleed/` | `/procedures/apc-for-gi-bleed` | ✅ Dynamic |
| `/peg-tube-insertion/` | `/procedures/peg-tube-insertion` | ✅ Dynamic |
| `/endoscopic-obesity-therapy/` | `/procedures/endoscopic-obesity-therapy` | ✅ Dynamic |
| `/nutrition-clinic/` | `/procedures/nutrition-clinic` | ✅ Dynamic |
| `/painless-therapy-for-piles/` | `/procedures/painless-therapy-for-piles` | ✅ Dynamic |
| `/colonic-tumor-removal/` | `/procedures/colonic-tumor-removal` | ✅ Dynamic |
| `/gastric-tumor-removal/` | `/procedures/gastric-tumor-removal` | ✅ Dynamic |

---

## 4. Blog Posts (48)

All blog posts are handled dynamically using dynamic routing: `src/app/blog/[slug]/page.tsx` mapping data from `data/blog.ts`.

| # | WP URL Path | Next.js Path | Status |
|---|-------------|--------------|--------|
| 1 | `/endoscopy-for-acidity/` | `/blog/endoscopy-for-acidity` | ✅ Dynamic |
| 2 | `/why-does-my-stomach-hurt-after-eating/` | `/blog/why-does-my-stomach-hurt-after-eating` | ✅ Dynamic |
| 3 | `/vitamin-deficiencies-linked-to-digestive-disorders/` | `/blog/vitamin-deficiencies-linked-to-digestive-disorders` | ✅ Dynamic |
| 4 | `/is-fatty-liver-reversible/` | `/blog/is-fatty-liver-reversible` | ✅ Dynamic |
| 5 | `/is-endoscopy-painful-myths-vs-facts/` | `/blog/is-endoscopy-painful-myths-vs-facts` | ✅ Dynamic |
| 6 | `/summer-stomach-ache-hidden-reasons/` | `/blog/summer-stomach-ache-hidden-reasons` | ✅ Dynamic |
| 7 | `/how-menopause-affects-your-digestion/` | `/blog/how-menopause-affects-your-digestion` | ✅ Dynamic |
| 8 | `/uses-of-semaglutide/` | `/blog/uses-of-semaglutide` | ✅ Dynamic |
| 9 | `/semaglutide-in-india/` | `/blog/semaglutide-in-india` | ✅ Dynamic |
| 10 | `/semaglutide-for-weight-loss/` | `/blog/semaglutide-for-weight-loss` | ✅ Dynamic |
| 11 | `/fruits-for-weight-loss/` | `/blog/fruits-for-weight-loss` | ✅ Dynamic |
| 12 | `/indian-diet-plan-for-weight-loss/` | `/blog/indian-diet-plan-for-weight-loss` | ✅ Dynamic |
| 13 | `/best-smoothie-recipes-for-weight-loss/` | `/blog/best-smoothie-recipes-for-weight-loss` | ✅ Dynamic |
| 14 | `/7-day-diet-plan-for-weight-loss/` | `/blog/7-day-diet-plan-for-weight-loss` | ✅ Dynamic |
| 15 | `/weight-loss-drink/` | `/blog/weight-loss-drink` | ✅ Dynamic |
| 16 | `/how-is-a-liver-biopsy-done/` | `/blog/how-is-a-liver-biopsy-done` | ✅ Dynamic |
| 17 | `/liver-biopsy-indications/` | `/blog/liver-biopsy-indications` | ✅ Dynamic |
| 18 | `/liver-biopsy-cost/` | `/blog/liver-biopsy-cost` | ✅ Dynamic |
| 19 | `/liver-biopsy-procedure/` | `/blog/liver-biopsy-procedure` | ✅ Dynamic |
| 20 | `/why-acid-reflux-occurs/` | `/blog/why-acid-reflux-occurs` | ✅ Dynamic |
| 21 | `/what-to-drink-for-acid-reflux/` | `/blog/what-to-drink-for-acid-reflux` | ✅ Dynamic |
| 22 | `/ten-worst-foods-for-acid-reflux/` | `/blog/ten-worst-foods-for-acid-reflux` | ✅ Dynamic |
| 23 | `/is-acid-reflux-dangerous/` | `/blog/is-acid-reflux-dangerous` | ✅ Dynamic |
| 24 | `/why-acid-reflux-happens/` | `/blog/why-acid-reflux-happens` | ✅ Dynamic |
| 25 | `/acid-reflux-symptoms/` | `/blog/acid-reflux-symptoms` | ✅ Dynamic |
| 26 | `/foods-to-cure-fatty-liver/` | `/blog/foods-to-cure-fatty-liver` | ✅ Dynamic |
| 27 | `/best-cure-for-fatty-liver/` | `/blog/best-cure-for-fatty-liver` | ✅ Dynamic |
| 28 | `/does-liv-52-cure-fatty-liver/` | `/blog/does-liv-52-cure-fatty-liver` | ✅ Dynamic |
| 29 | `/how-can-fatty-liver-be-cured/` | `/blog/how-can-fatty-liver-be-cured` | ✅ Dynamic |
| 30 | `/can-fatty-liver-grade-2-be-cured/` | `/blog/can-fatty-liver-grade-2-be-cured` | ✅ Dynamic |
| 31 | `/can-fatty-liver-be-cured/` | `/blog/can-fatty-liver-be-cured` | ✅ Dynamic |
| 32 | `/fatty-liver-treatment-diet/` | `/blog/fatty-liver-treatment-diet` | ✅ Dynamic |
| 33 | `/fatty-liver-symptoms-in-males/` | `/blog/fatty-liver-symptoms-in-males` | ✅ Dynamic |
| 34 | `/fatty-liver-grade-3/` | `/blog/fatty-liver-grade-3` | ✅ Dynamic |
| 35 | `/diet-chart-for-fatty-liver/` | `/blog/diet-chart-for-fatty-liver` | ✅ Dynamic |
| 36 | `/how-to-reduce-fatty-liver-quickly/` | `/blog/how-to-reduce-fatty-liver-quickly` | ✅ Dynamic |
| 37 | `/how-to-cure-fatty-liver/` | `/blog/how-to-cure-fatty-liver` | ✅ Dynamic |
| 38 | `/reasons-for-fatty-liver/` | `/blog/reasons-for-fatty-liver` | ✅ Dynamic |
| 39 | `/foods-to-avoid-with-fatty-liver/` | `/blog/foods-to-avoid-with-fatty-liver` | ✅ Dynamic |
| 40 | `/fatty-liver-diet/` | `/blog/fatty-liver-diet` | ✅ Dynamic |
| 41 | `/how-to-reduce-fatty-liver/` | `/blog/how-to-reduce-fatty-liver` | ✅ Dynamic |
| 42 | `/fatty-liver-symptoms-in-females/` | `/blog/fatty-liver-symptoms-in-females` | ✅ Dynamic |
| 43 | `/fatty-liver-grade-2/` | `/blog/fatty-liver-grade-2` | ✅ Dynamic |
| 44 | `/fatty-liver-causes/` | `/blog/fatty-liver-causes` | ✅ Dynamic |
| 45 | `/grade-1-fatty-liver/` | `/blog/grade-1-fatty-liver` | ✅ Dynamic |
| 46 | `/fatty-liver-symptoms/` | `/blog/fatty-liver-symptoms` | ✅ Dynamic |
| 47 | `/why-your-are-not-losing-weight/` | `/blog/why-your-are-not-losing-weight` | ✅ Dynamic |
| 48 | `/mounjaro-weight-loss-delhi/` | `/blog/mounjaro-weight-loss-delhi` | ✅ Dynamic |
| 49 | `/liver-cancer-causes-symptoms-and-hopeful-horizons/` | `/blog/liver-cancer-causes-symptoms-and-hopeful-horizons` | ✅ Dynamic |
| 50 | `/esophageal-cancer-causes-symptoms-diagnosis-and-treatment/` | `/blog/esophageal-cancer-causes-symptoms-diagnosis-and-treatment` | ✅ Dynamic |
| 51 | `/common-causes-of-acute-liver-failure/` | `/blog/common-causes-of-acute-liver-failure` | ✅ Dynamic |
| 52 | `/what-are-the-causes-of-irritable-bowel-syndrome-and-who-is-at-risk/` | `/blog/what-are-the-causes-of-irritable-bowel-syndrome-and-who-is-at-risk` | ✅ Dynamic |
| 53 | `/what-is-the-difference-between-acid-reflux-and-gerd/` | `/blog/what-is-the-difference-between-acid-reflux-and-gerd` | ✅ Dynamic |
| 54 | `/10-best-foods-that-are-good-for-your-liver-by-best-gastrologist-doctor-in-south-delhi/` | `/blog/10-best-foods-that-are-good-for-your-liver-by-best-gastrologist-doctor-in-south-delhi` | ✅ Dynamic |
| 55 | `/gallbladder-stone-treatment-pros-and-cons/` | `/blog/gallbladder-stone-treatment-pros-and-cons` | ✅ Dynamic |
| 56 | `/barretts-esophagus-symptoms-causes-and-prevention/` | `/blog/barretts-esophagus-symptoms-causes-and-prevention` | ✅ Dynamic |
| 57 | `/how-can-you-detox-your-liver/` | `/blog/how-can-you-detox-your-liver` | ✅ Dynamic |
| 58 | `/alcohol-gastro-liver-disease-early-signs-delhi/` | `/blog/alcohol-gastro-liver-disease-early-signs-delhi` | ✅ Dynamic |
| 59 | `/top-5-things-that-cause-stomach-pain-and-when-to-seek-a-doctor/` | `/blog/top-5-things-that-cause-stomach-pain-and-when-to-seek-a-doctor` | ✅ Dynamic |
| 60 | `/reversing-liver-damage-from-fatty-liver/` | `/blog/reversing-liver-damage-from-fatty-liver` | ✅ Dynamic |
| 61 | `/peptic-ulcers-in-delhi-causes-symptoms-and-treatment/` | `/blog/peptic-ulcers-in-delhi-causes-symptoms-and-treatment` | ✅ Dynamic |
| 62 | `/a-comprehensive-guide-to-colonoscopy-what-you-need-to-know/` | `/blog/a-comprehensive-guide-to-colonoscopy-what-you-need-to-know` | ✅ Dynamic |
| 63 | `/thriving-with-inflammatory-bowel-disease-ibd-in-delhi/` | `/blog/thriving-with-inflammatory-bowel-disease-ibd-in-delhi` | ✅ Dynamic |
| 64 | `/welcome-to-my-first-blog-post/` | `/blog/welcome-to-my-first-blog-post` | ✅ Dynamic |
| 65 | `/consequences-of-alcohol-drinking-on-gi-health-of-women/` | `/blog/consequences-of-alcohol-drinking-on-gi-health-of-women` | ✅ Dynamic |
| 66 | `/get-to-know-about-top-14-low-fodmap-snack-ideas-for-a-healthy-you/` | `/blog/get-to-know-about-top-14-low-fodmap-snack-ideas-for-a-healthy-you` | ✅ Dynamic |
| 67 | `/5-steps-to-lessen-heartburn-and-indigestion/` | `/blog/5-steps-to-lessen-heartburn-and-indigestion` | ✅ Dynamic |
| 68 | `/benefits-of-exercise-on-your-digestion/` | `/blog/benefits-of-exercise-on-your-digestion` | ✅ Dynamic |

---

## 5. Redirect Rules (4)

These routes are mapped in `data/routes.ts` and will be configured in `next.config.js` or Next.js Middleware.

- `/abdomen-pain/` ➔ 301 Redirect ➔ `/conditions/abdomen-pain-treatment-in-delhi/`
- `/intestinal-gas/` ➔ 301 Redirect ➔ `/conditions/intestinal-gas-treatment/`
- `/blogs/` ➔ 301 Redirect ➔ `/blog/`
- Sitemap XML index path ➔ Direct output ➔ `/sitemap_index.xml` (dynamic SEO sitemap generation)

---

## Conclusion
**100% of discovered URLs from Phase 0 are successfully mapped to a Next.js route or redirect rule.**
