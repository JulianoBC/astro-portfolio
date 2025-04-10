import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.object({
      pt: z.string(),
      en: z.string()
    }),
    description: z.object({
      pt: z.string(),
      en: z.string()
    }),
    pubDate: z.string(),
    heroImage: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string().optional()
  })
});

export const collections = {
  blog: blogCollection
};