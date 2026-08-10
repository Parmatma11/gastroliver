import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Digestive & Hepatology Care Blog | Gastroliver Clinic Delhi",
  description: "Keep up-to-date with medical guidelines on fatty liver, acidity, acid reflux, weight loss diets, and gastrointestinal diagnostics by Dr. Ankita Gupta.",
  alternates: {
    canonical: "/blog/",
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
