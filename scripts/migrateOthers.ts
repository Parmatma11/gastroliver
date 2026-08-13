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

// Load local metadata
import { diseasesData } from '../data/diseases';
import { proceduresData } from '../data/procedures';
import { facilitiesData } from '../data/facilities';

function generateKey(prefix = 'k') {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

// Map slug to category key for procedures
function getProcedureCategory(slug: string): string {
  const endoscopySlugs = [
    'ugi-endoscopy', 'colonoscopy', 'ercp', 'capsule-endoscopy', 
    'peroral-endoscopic-myotomy-poem', 'endoscopic-ultrasonography', 
    'double-balloon-enteroscopy-capsule-endoscopy'
  ];
  const liverSlugs = ['fibroscan', 'liver-biopsy'];

  if (endoscopySlugs.includes(slug)) return 'endoscopy';
  if (liverSlugs.includes(slug)) return 'liver';
  return 'special';
}

// Upload a local image asset from public folder to Sanity
async function uploadImageAsset(localPath: string) {
  if (!localPath) return null;
  const cleanPath = localPath.replace(/^\//, ''); // strip leading slash
  const fullPath = path.resolve(process.cwd(), 'public', cleanPath);

  if (fs.existsSync(fullPath)) {
    try {
      console.log(`- Uploading image asset to Sanity: ${localPath}`);
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

function markdownToPortableText(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const blocks: any[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const blockKey = generateKey('block');
    const spanKey = generateKey('span');

    // Check for H1, H2, H3
    if (line.startsWith('# ')) {
      blocks.push({
        _key: blockKey,
        _type: 'block',
        style: 'h1',
        children: [{ _key: spanKey, _type: 'span', text: line.replace('# ', '') }],
      });
      continue;
    }
    if (line.startsWith('## ')) {
      blocks.push({
        _key: blockKey,
        _type: 'block',
        style: 'h2',
        children: [{ _key: spanKey, _type: 'span', text: line.replace('## ', '') }],
      });
      continue;
    }
    if (line.startsWith('### ')) {
      blocks.push({
        _key: blockKey,
        _type: 'block',
        style: 'h3',
        children: [{ _key: spanKey, _type: 'span', text: line.replace('### ', '') }],
      });
      continue;
    }

    // Check for list items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _key: blockKey,
        _type: 'block',
        style: 'normal',
        listItem: 'bullet',
        children: [{ _key: spanKey, _type: 'span', text: line.substring(2) }],
      });
      continue;
    }

    // Check for numbered list items
    const numMatch = line.match(/^(\d+)\.\s(.*)/);
    if (numMatch) {
      blocks.push({
        _key: blockKey,
        _type: 'block',
        style: 'normal',
        listItem: 'number',
        children: [{ _key: spanKey, _type: 'span', text: numMatch[2] }],
      });
      continue;
    }

    // Default to paragraph
    blocks.push({
      _key: blockKey,
      _type: 'block',
      style: 'normal',
      children: [{ _key: spanKey, _type: 'span', text: line }],
    });
  }

  return blocks;
}

async function runMigration() {
  console.log('Starting Sanity CMS Diseases, Procedures & Facilities Migration...\n');

  // ==========================================
  // 0. Create Disease Categories (Dynamic References)
  // ==========================================
  console.log('--- CREATING CLINICAL CATEGORIES ---');
  const clinicalCategories = [
    { slug: 'esophagus-stomach', title: 'Esophagus & Stomach', desc: 'Conditions relating to the esophagus and stomach.' },
    { slug: 'intestines', title: 'Intestinal Diseases', desc: 'Conditions affecting the small and large intestines.' },
    { slug: 'liver', title: 'Liver & Hepatology', desc: 'Hepatology disorders, liver infections, cirrhosis and fatty liver.' },
    { slug: 'pancreas-biliary', title: 'Pancreas & Biliary', desc: 'Disorders affecting the pancreas, gall bladder and bile ducts.' }
  ];

  for (const cat of clinicalCategories) {
    const catDoc = {
      _type: 'diseaseCategory',
      _id: `diseaseCategory-${cat.slug}`,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.desc
    };
    await client.createOrReplace(catDoc);
    console.log(`- Created disease category: "${cat.title}"`);
  }
  console.log('\n');

  // ==========================================
  // 0b. Create Procedure Categories (Dynamic References)
  // ==========================================
  console.log('--- CREATING PROCEDURE CATEGORIES ---');
  const clinicalProcedureCategories = [
    { slug: 'endoscopy', title: 'Endoscopy & EUS', desc: 'Endoscopic evaluation and treatments.' },
    { slug: 'liver', title: 'Liver Diagnostics', desc: 'Diagnostics relating to hepatology, Fibroscan, and biopsies.' },
    { slug: 'special', title: 'Special GI Procedures', desc: 'Specialized clinical tests and treatments.' }
  ];

  for (const cat of clinicalProcedureCategories) {
    const catDoc = {
      _type: 'procedureCategory',
      _id: `procedureCategory-${cat.slug}`,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      description: cat.desc
    };
    await client.createOrReplace(catDoc);
    console.log(`- Created procedure category: "${cat.title}"`);
  }
  console.log('\n');

  // ==========================================
  // 1. Migrate Facilities
  // ==========================================
  console.log('--- MIGRATING CLINIC FACILITIES ---');
  for (const fac of facilitiesData) {
    console.log(`Processing Facility: "${fac.title}"`);
    let imageAssetId = null;
    if (fac.icon) {
      imageAssetId = await uploadImageAsset(fac.icon);
    }

    const facilityDoc: any = {
      _type: 'facility',
      _id: `facility-${fac.slug}`,
      title: fac.title,
      slug: { _type: 'slug', current: fac.slug },
      description: fac.description,
      link: fac.link || '',
    };

    if (imageAssetId) {
      facilityDoc.icon = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      };
    }

    await client.createOrReplace(facilityDoc);
    console.log(`- Successfully uploaded facility: "${fac.title}"\n`);
  }

  // ==========================================
  // 2. Migrate Procedures
  // ==========================================
  console.log('--- MIGRATING MEDICAL PROCEDURES ---');
  const procedureDir = path.resolve(process.cwd(), 'content/procedures');
  const procFiles = fs.readdirSync(procedureDir);

  for (const file of procFiles) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(procedureDir, file);
    const stats = fs.statSync(filePath);

    // Skip empty stubs
    if (stats.size < 1000) {
      console.log(`Skipping procedure placeholder stub: ${file} (${stats.size} bytes)`);
      continue;
    }

    const slug = file.replace('.md', '');
    const markdownContent = fs.readFileSync(filePath, 'utf8');

    // Find local metadata
    const metadata = proceduresData.find((p: any) => p.slug === slug);
    if (!metadata) {
      console.log(`Warning: No metadata found in data/procedures.ts for "${slug}". Skipping...`);
      continue;
    }

    console.log(`Processing Procedure: "${metadata.title}"`);
    let imageAssetId = null;
    if (metadata.sideImage) {
      imageAssetId = await uploadImageAsset(metadata.sideImage);
    }

    const contentBlocks = markdownToPortableText(markdownContent);

    const procedureDoc: any = {
      _type: 'procedure',
      _id: `procedure-${slug}`,
      title: metadata.title,
      slug: { _type: 'slug', current: slug },
      category: {
        _type: 'reference',
        _ref: `procedureCategory-${getProcedureCategory(slug)}`
      },
      metaDescription: metadata.metaDescription || '',
      content: contentBlocks,
      seo: {
        title: metadata.seo?.title || metadata.title,
        description: metadata.seo?.description || metadata.metaDescription || '',
      },
    };

    if (imageAssetId) {
      procedureDoc.sideImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      };
    }

    await client.createOrReplace(procedureDoc);
    console.log(`- Successfully uploaded procedure: "${metadata.title}"\n`);
  }

  // ==========================================
  // 3. Migrate Diseases We Treat
  // ==========================================
  console.log('--- MIGRATING DISEASES WE TREAT ---');
  const diseaseDir = path.resolve(process.cwd(), 'content/diseases');
  const diseaseFiles = fs.readdirSync(diseaseDir);

  for (const file of diseaseFiles) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(diseaseDir, file);
    const stats = fs.statSync(filePath);

    // Skip empty stubs
    if (stats.size < 1000) {
      console.log(`Skipping disease placeholder stub: ${file} (${stats.size} bytes)`);
      continue;
    }

    const slug = file.replace('.md', '');
    const markdownContent = fs.readFileSync(filePath, 'utf8');

    // Find local metadata
    const metadata = diseasesData.find((d: any) => d.slug === slug);
    if (!metadata) {
      console.log(`Warning: No metadata found in data/diseases.ts for "${slug}". Skipping...`);
      continue;
    }

    console.log(`Processing Disease: "${metadata.title}"`);
    let imageAssetId = null;
    if (metadata.sideImage) {
      imageAssetId = await uploadImageAsset(metadata.sideImage);
    }

    const contentBlocks = markdownToPortableText(markdownContent);

    const diseaseDoc: any = {
      _type: 'disease',
      _id: `disease-${slug}`,
      title: metadata.title,
      slug: { _type: 'slug', current: slug },
      category: {
        _type: 'reference',
        _ref: `diseaseCategory-${metadata.category || 'general'}`
      },
      metaDescription: metadata.metaDescription || '',
      content: contentBlocks,
      seo: {
        title: metadata.seo?.title || metadata.title,
        description: metadata.seo?.description || metadata.metaDescription || '',
      },
    };

    if (imageAssetId) {
      diseaseDoc.sideImage = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAssetId,
        },
      };
    }

    await client.createOrReplace(diseaseDoc);
    console.log(`- Successfully uploaded disease: "${metadata.title}"\n`);
  }

  console.log('\nMigration completed successfully for all sections!');
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
});
