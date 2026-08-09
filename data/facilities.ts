import { Facility } from '../types/content';

export const facilitiesData: Facility[] = [
  {
    slug: "cholangioscopy",
    title: "Cholangioscopy",
    icon: "/images/icons/cholangioscopy.png",
    description: "Visual inspection of the bile ducts using a specialized thin endoscope to diagnose stones, strictures, or tumors.",
    link: "/ercp/" // No dedicated page, falls under ERCP/biliary
  },
  {
    slug: "ercp",
    title: "ERCP",
    icon: "/images/icons/ercp.png",
    description: "Endoscopic Retrograde Cholangiopancreatography combines endoscopy and X-rays to diagnose and treat bile and pancreatic duct conditions.",
    link: "/procedures/ercp/"
  },
  {
    slug: "capsule-endoscopy",
    title: "Capsule Endoscopy",
    icon: "/images/icons/capsule_endoscopy.png",
    description: "A non-invasive procedure utilizing a tiny wireless camera inside a swallowable capsule to capture images of the small intestine.",
    link: "/procedures/capsule-endoscopy/"
  },
  {
    slug: "poem",
    title: "POEM",
    icon: "/images/icons/poem.png",
    description: "Peroral Endoscopic Myotomy is a minimally invasive endoscopic procedure used to treat swallowing disorders like Achalasia Cardia.",
    link: "/procedures/peroral-endoscopic-myotomy-poem/"
  },
  {
    slug: "ugi-endoscopy",
    title: "UGI Endoscopy",
    icon: "/images/icons/ugi_endoscopy.png",
    description: "Upper Gastrointestinal Endoscopy allows direct visual examination of the esophagus, stomach, and duodenum.",
    link: "/procedures/ugi-endoscopy/"
  },
  {
    slug: "manometry",
    title: "Manometry",
    icon: "/images/icons/manometry.png",
    description: "Esophageal Manometry measures the strength and coordination of muscle contractions in the esophagus during swallowing.",
    link: "/procedures/manometry-and-24-hour-ph-study/"
  },
  {
    slug: "colonoscopy",
    title: "Colonoscopy",
    icon: "/images/icons/colonoscopy.png",
    description: "An endoscopic examination of the entire large intestine and distal part of the small bowel to detect polyps, inflammation, or tumors.",
    link: "/procedures/colonoscopy/"
  },
  {
    slug: "fibroscan",
    title: "Fibroscan",
    icon: "/images/icons/fibroscan.png",
    description: "A quick, painless, non-invasive ultrasound-based test used to measure liver stiffness and assess liver scarring (fibrosis) and fatty change.",
    link: "/procedures/fibroscan/"
  },
  {
    slug: "dietician",
    title: "Dietician",
    icon: "/images/icons/dietician.png",
    description: "Personalized nutritional counseling and diet planning to support digestion, liver recovery, and weight management.",
    link: "/procedures/nutrition-clinic/"
  }
];
