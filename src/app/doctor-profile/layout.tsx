import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dr. Ankita Gupta - Gastroenterologist, Hepatologist, Endoscopist in Delhi",
  description: "Learn more about Dr. Ankita Gupta, Gold Medalist (DM Gastroenterology), trained in Motility studies (USA), fellow at Sir Ganga Ram Hospital, Delhi.",
  alternates: {
    canonical: "/doctor-profile/",
  }
};

export default function DoctorProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
