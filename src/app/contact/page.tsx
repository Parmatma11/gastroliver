import { Metadata } from 'next';
import ContactPageContent from '../../components/sections/ContactPageContent';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Contact Us - Book Appointment with Dr. Ankita Gupta",
  description: "Contact GLEC clinic in Greater Kailash, South Delhi. Find phone numbers, map location, consult hours, and book online appointments.",
  alternates: {
    canonical: "/contact/",
  }
};

export default function ContactPage() {
  return (
    <main className={styles.container}>
      <ContactPageContent />
    </main>
  );
}
