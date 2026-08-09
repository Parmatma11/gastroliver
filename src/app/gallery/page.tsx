import { Metadata } from 'next';
import GalleryPageContent from '../../components/sections/GalleryPageContent';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Clinic Gallery - Gastro Liver Endoscopy Centre South Delhi",
  description: "Explore our clinic interior, consultation rooms, waiting area, dispensary, and advanced endoscopy suite equipment images.",
  alternates: {
    canonical: "/gallery/",
  }
};

export default function GalleryPage() {
  return (
    <main className={styles.container}>
      <GalleryPageContent />
    </main>
  );
}
