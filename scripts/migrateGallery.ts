import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || projectId === 'placeholder') {
  console.error('Error: Please configure NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
  process.exit(1);
}

if (!token) {
  console.error('Error: Please configure SANITY_WRITE_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2026-08-12',
});

// Import local data
import { galleryData } from '../data/gallery';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Upload a local image asset from public folder to Sanity
async function uploadImageAsset(localPath: string) {
  if (!localPath) return null;
  const cleanPath = localPath.replace(/^\//, ''); // strip leading slash
  const fullPath = path.resolve(process.cwd(), 'public', cleanPath);

  if (fs.existsSync(fullPath)) {
    try {
      console.log(`- Uploading image asset: ${localPath}`);
      const asset = await client.assets.upload('image', fs.createReadStream(fullPath), {
        filename: path.basename(fullPath),
      });
      return asset._id;
    } catch (err) {
      console.error(`- Failed to upload image asset ${localPath}:`, err);
    }
  } else {
    console.log(`- Image asset file not found on disk at: ${fullPath}`);
  }
  return null;
}

async function runMigration() {
  console.log('Starting Sanity CMS Gallery Migration...\n');

  for (const cat of galleryData) {
    console.log(`--- Processing Category: "${cat.name}" ---`);
    
    // 1. Create Gallery Category Document
    const categoryDoc = {
      _type: 'galleryCategory',
      _id: `galleryCategory-${cat.id}`,
      title: cat.name,
      slug: { _type: 'slug', current: cat.slug || cat.id },
      description: `Gallery images for ${cat.name}`,
    };
    await client.createOrReplace(categoryDoc);
    console.log(`- Created Category Document: "${cat.name}"`);

    // 2. Upload Images and Link to Category
    for (let i = 0; i < cat.images.length; i++) {
      const img = cat.images[i];
      const cleanTitle = img.alt || `Gallery Image ${i + 1}`;
      console.log(`Processing Image: "${cleanTitle}"`);
      
      const imageAssetId = await uploadImageAsset(img.src);
      if (!imageAssetId) {
        console.log(`- Skipping "${cleanTitle}" due to missing asset file.`);
        continue;
      }

      // Generate a unique ID based on Category and Image Slug
      const imageDocId = `galleryItem-${cat.id}-${slugify(cleanTitle)}`;
      
      const galleryItemDoc: any = {
        _type: 'galleryItem',
        _id: imageDocId,
        title: cleanTitle,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        },
        category: {
          _type: 'reference',
          _ref: `galleryCategory-${cat.id}`,
        },
      };

      await client.createOrReplace(galleryItemDoc);
      console.log(`- Successfully uploaded image document: "${cleanTitle}"\n`);
    }
  }

  console.log('\nGallery migration completed successfully!');
}

runMigration().catch((err) => {
  console.error('Gallery migration failed:', err);
});
