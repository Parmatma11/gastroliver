import { NavigationItem } from '../types/content';

export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "About Us",
    children: [
      {
        label: "Doctor Profile",
        path: "/doctor-profile/"
      },
      {
        label: "Hospital Details",
        path: "/hospital/"
      }
    ]
  },
  {
    label: "Diseases We Treat",
    children: [
      {
        label: "Abdominal Pain",
        path: "/abdomen-pain-treatment-in-delhi/"
      },
      {
        label: "Acidity & Reflux",
        path: "/acidity-and-reflux/"
      },
      {
        label: "Diarrhoea & Constipation",
        path: "/diarrhoea-constipation/"
      },
      {
        label: "Intestinal Gas",
        path: "/intestinal-gas-treatment/"
      },
      {
        label: "GI Bleeding",
        path: "/gastrointestinal-bleeding/"
      },
      {
        label: "Liver Diseases",
        path: "/liver-diseases-and-alcoholism/"
      },
      {
        label: "Jaundice",
        path: "/jaundice/"
      },
      {
        label: "Piles / Hemorrhoids",
        path: "/piles-hemorrhoids-bloody-stools/"
      }
    ]
  },
  {
    label: "Procedures & Facilities",
    children: [
      {
        label: "UGI Endoscopy",
        path: "/ugi-endoscopy/"
      },
      {
        label: "Colonoscopy",
        path: "/colonoscopy/"
      },
      {
        label: "ERCP",
        path: "/ercp/"
      },
      {
        label: "Capsule Endoscopy",
        path: "/capsule-endoscopy/"
      },
      {
        label: "Manometry",
        path: "/manometry-and-24-hour-ph-study/"
      },
      {
        label: "Fibroscan",
        path: "/fibroscan/"
      },
      {
        label: "Liver Biopsy",
        path: "/liver-biopsy/"
      },
      {
        label: "POEM",
        path: "/peroral-endoscopic-myotomy-poem/"
      }
    ]
  },
  {
    label: "Gallery",
    path: "/gallery/"
  },
  {
    label: "Blog",
    path: "/blog/"
  },
  {
    label: "Testimonials",
    path: "/patient-testimonials/"
  },
  {
    label: "Contact Us",
    path: "/contact/"
  }
];

export const footerNavigation: NavigationItem[] = [
  {
    label: "Home",
    path: "/"
  },
  {
    label: "Doctor Profile",
    path: "/doctor-profile/"
  },
  {
    label: "Gallery",
    path: "/gallery/"
  },
  {
    label: "Blog",
    path: "/blog/"
  },
  {
    label: "Patient Testimonials",
    path: "/patient-testimonials/"
  },
  {
    label: "Contact Us",
    path: "/contact/"
  },
  {
    label: "Payment",
    path: "/payments/"
  }
];

export const socialLinks = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/gastrohepatologist/",
    icon: "facebook"
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/gastro_liver",
    icon: "twitter"
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/drankitagupta",
    icon: "instagram"
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/channel/UChnglBLYvnNzCQP12S2OMtQ",
    icon: "youtube"
  }
];
