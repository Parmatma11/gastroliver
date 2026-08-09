import { SEOMetadata } from '../types/content';

export const defaultSEO: SEOMetadata = {
  title: "Best Gastroenterologist in Delhi | Dr. Ankita Gupta | GLEC",
  description: "Consult Dr. Ankita Gupta, leading gastroenterologist, hepatologist & endoscopist in South Delhi. Expert treatment for acidity, fatty liver, GERD, and ulcers.",
  ogTitle: "Best Gastroenterologist in Delhi | Dr. Ankita Gupta | GLEC",
  ogDescription: "Consult Dr. Ankita Gupta, leading gastroenterologist, hepatologist & endoscopist in South Delhi. Expert treatment for acidity, fatty liver, GERD, and ulcers.",
  ogImage: "/images/doctor/profile_main.jpg",
  canonical: "https://gastroliver.in/"
};

export const pageSEOMap: Record<string, SEOMetadata> = {
  "/": {
    title: "Best Gastroenterologist in Delhi | Dr. Ankita Gupta | GLEC",
    description: "Consult Dr. Ankita Gupta, one of the best gastroenterologist in Delhi NCR. Expert in liver, pancreas & digestive care at Gastroliver Clinic, South Delhi.",
    ogTitle: "Best Gastroenterologist in Delhi | Dr. Ankita Gupta",
    ogDescription: "Consult Dr. Ankita Gupta, one of the best gastroenterologist in Delhi NCR. Expert in liver, pancreas & digestive care at Gastroliver Clinic, South Delhi."
  },
  "/doctor-profile/": {
    title: "Doctor Profile | Dr. Ankita Gupta - Gold Medalist Gastroenterologist",
    description: "Learn about qualifications, education, fellowships, and experience of Dr. Ankita Gupta, gold-medalist gastroenterologist practicing in Delhi NCR.",
    ogTitle: "Dr. Ankita Gupta - Academic profile & credentials"
  },
  "/hospital/": {
    title: "Associated Hospitals & Clinic Details | GLEC South Delhi",
    description: "Find information about GLEC (Gastro Liver Endoscopy Centre) in South Delhi and hospital affiliations of Dr. Ankita Gupta."
  },
  "/gallery/": {
    title: "Clinic Gallery - Gastro Liver Endoscopy Centre South Delhi",
    description: "Explore our clinic interior, consultation rooms, waiting area, dispensary, and advanced endoscopy suite equipment images."
  },
  "/contact/": {
    title: "Contact Us - Book Appointment with Dr. Ankita Gupta",
    description: "Contact GLEC clinic in Greater Kailash, South Delhi. Find phone numbers, map location, consult hours, and book online appointments."
  },
  "/payments/": {
    title: "Online Payments & UPI QR Code | GLEC Clinic",
    description: "Scan UPI QR code to make safe digital payments for consultations and diagnostic procedures at Gastro Liver Endoscopy Centre."
  },
  "/blog/": {
    title: "Gastroenterology & Hepatology Health Blog | Dr. Ankita Gupta",
    description: "Read patient education articles, diet charts, weight loss tips, and liver health updates by leading specialist Dr. Ankita Gupta."
  },
  "/patient-testimonials/": {
    title: "Patient Reviews & Testimonials | Dr. Ankita Gupta Reviews",
    description: "Read genuine feedback, success stories, and treatment reviews from patients cured of acid reflux, IBS, fatty liver, and colitis."
  },
  "/case-study/": {
    title: "Clinical Case Studies & Treatment Outcomes | GLEC Clinic",
    description: "Review complex clinical cases managed successfully by Dr. Ankita Gupta in luminal gastroenterology, hepatology, and advanced endoscopy."
  },
  "/sitemap/": {
    title: "HTML Sitemap - gastroliver.in Navigation Guide",
    description: "Access a structured list of all disease pages, therapeutic procedures, blog posts, and clinic profile links."
  }
};
