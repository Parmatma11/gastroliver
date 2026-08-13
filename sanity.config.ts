import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import blogPost from './src/sanity/schemas/blogPost';
import category from './src/sanity/schemas/category';
import disease from './src/sanity/schemas/disease';
import diseaseCategory from './src/sanity/schemas/diseaseCategory';
import procedure from './src/sanity/schemas/procedure';
import procedureCategory from './src/sanity/schemas/procedureCategory';
import facility from './src/sanity/schemas/facility';
import galleryCategory from './src/sanity/schemas/galleryCategory';
import galleryItem from './src/sanity/schemas/galleryItem';

export default defineConfig({
  name: 'default',
  title: 'GastroLiver Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [
      blogPost,
      category,
      disease,
      diseaseCategory,
      procedure,
      procedureCategory,
      facility,
      galleryCategory,
      galleryItem,
    ],
  },
});
