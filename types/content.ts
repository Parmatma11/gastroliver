export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

export interface Doctor {
  name: string;
  designation: string;
  qualifications: string[];
  experienceYears: number;
  education: {
    degree: string;
    institution: string;
    year?: number;
  }[];
  fellowships: string[];
  memberships: string[];
  specialTraining: string[];
  bio: string;
  profileImage: string;
  introImages: string[];
  certificates: string[];
  careerTimeline: {
    period: string;
    role: string;
    institution: string;
    image?: string;
  }[];
}

export interface Facility {
  slug: string;
  title: string;
  icon: string;
  description: string;
  link: string;
}

export interface Disease {
  slug: string;
  title: string;
  category: 'esophagus-stomach' | 'intestines' | 'liver' | 'pancreas-biliary';
  metaDescription: string;
  seo: SEOMetadata;
  featuredImage?: string;
  sideImage?: string;
  publishedDate?: string;
  modifiedDate?: string;
  contentMarkdown?: string;
}

export interface Procedure {
  slug: string;
  title: string;
  metaDescription: string;
  seo: SEOMetadata;
  featuredImage?: string;
  sideImage?: string;
  publishedDate?: string;
  modifiedDate?: string;
  contentMarkdown?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  series?: 'fatty-liver' | 'acid-reflux' | 'weight-loss' | 'liver-biopsy' | 'general';
  metaDescription: string;
  seo: SEOMetadata;
  featuredImage: string;
  publishedDate: string;
  modifiedDate: string;
  readTime: string;
  author: string;
  contentMarkdown?: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  images: {
    src: string;
    alt: string;
  }[];
}

export interface NavigationItem {
  label: string;
  path?: string;
  children?: NavigationItem[];
}

export interface ContactInfo {
  phone: string;
  emailPrimary: string;
  emailSecondary?: string;
  address: string;
  clinicName: string;
  mapsLink: string;
  openingHours: {
    days: string;
    hours: string;
  }[];
}
