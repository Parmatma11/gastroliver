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
  console.error('Error: Please configure SANITY_WRITE_TOKEN in .env.local (created via sanity.io/manage)');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2026-08-12',
});

// Load local blog metadata
import { blogData } from '../data/blog';

// Predefined categories mapping to create dynamic category references
const categoriesMap: Record<string, { title: string; id: string }> = {
  'general': { title: 'General GI Health', id: 'category-general' },
  'fatty-liver': { title: 'Fatty Liver Series', id: 'category-fatty-liver' },
  'acid-reflux': { title: 'Acid Reflux Series', id: 'category-acid-reflux' },
  'weight-loss': { title: 'Weight Loss Program', id: 'category-weight-loss' },
};

function generateKey(prefix = 'k') {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
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
  console.log('Starting Sanity CMS Migration...\n');

  // 1. Create categories first
  console.log('Checking and creating Categories...');
  for (const [key, value] of Object.entries(categoriesMap)) {
    const categoryDoc = {
      _type: 'category',
      _id: value.id,
      title: value.title,
      slug: { _type: 'slug', current: key },
      description: `Blogs belonging to ${value.title}`,
    };
    await client.createOrReplace(categoryDoc);
    console.log(`- Created Category: ${value.title}`);
  }
  console.log('Categories set up successfully!\n');

  // 2. Read and parse markdown files
  const blogDir = path.resolve(process.cwd(), 'content/blog');
  const files = fs.readdirSync(blogDir);
  let uploadCount = 0;

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(blogDir, file);
    const stats = fs.statSync(filePath);

    // Skip empty draft files (under 1000 bytes)
    if (stats.size < 1000) {
      console.log(`Skipping placeholder stub: ${file} (${stats.size} bytes)`);
      continue;
    }

    const slug = file.replace('.md', '');
    const markdownContent = fs.readFileSync(filePath, 'utf8');

    // Find local metadata match
    const metadata = blogData.find((b: any) => b.slug === slug);
    if (!metadata) {
      console.log(`Warning: No metadata matches found in data/blog.ts for slug "${slug}". Skipping...`);
      continue;
    }

    console.log(`Processing: "${metadata.title}" (${file})`);

    // Parse portable text blocks
    const contentBlocks = markdownToPortableText(markdownContent);

    // Link category reference
    const categoryKey = metadata.series || 'general';
    const categoryRefId = categoriesMap[categoryKey]?.id || categoriesMap['general'].id;

    const blogPostDoc = {
      _type: 'blogPost',
      _id: `blog-post-${slug}`,
      title: metadata.title,
      slug: { _type: 'slug', current: slug },
      series: {
        _type: 'reference',
        _ref: categoryRefId,
      },
      metaDescription: metadata.metaDescription || '',
      publishedDate: metadata.publishedDate || new Date().toISOString().split('T')[0],
      readTime: metadata.readTime || '5 mins',
      author: metadata.author || 'Dr. Ankita Gupta',
      content: contentBlocks,
      seo: {
        title: metadata.title,
        description: metadata.metaDescription || '',
      },
    };

    // Upload to Sanity
    await client.createOrReplace(blogPostDoc);
    console.log(`- Successfully uploaded & published: "${metadata.title}"`);
    uploadCount++;
  }

  console.log(`\nMigration completed successfully! Uploaded ${uploadCount} articles to Sanity.`);
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
});
