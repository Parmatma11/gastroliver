export default {
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Alt Text',
      type: 'string',
      description: 'Used as the alt description for SEO and lightbox labels.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'galleryCategory' }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
};
