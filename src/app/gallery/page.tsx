import { Metadata } from 'next';
import GalleryPageContent from '../../components/sections/GalleryPageContent';
import { client } from '../../lib/sanity';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Clinic Gallery - Gastro Liver Endoscopy Centre South Delhi",
  description: "Explore our clinic interior, consultation rooms, waiting area, dispensary, and advanced endoscopy suite equipment images.",
  alternates: {
    canonical: "/gallery/",
  }
};

export default async function GalleryPage() {
  let images = [];

  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'your_project_id_here' && process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const query = `*[_type == "galleryItem"] {
        title,
        "src": image.asset->url,
        "categoryId": category->slug.current,
        "categoryName": category->title
      }`;
      const data = await client.fetch(query);
      if (data && data.length > 0) {
        images = data;
      }
    } catch (err) {
      console.error('Failed to fetch gallery items from Sanity:', err);
    }
  }

  return (
    <main className={styles.container}>
      <GalleryPageContent initialImages={images} />
    </main>
  );
}
