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
      }
    ]
  },
  {
    label: "Diseases We Treat",
    path: "/conditions/"
  },
  {
    label: "Procedures & Facilities",
    path: "/procedures/"
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
