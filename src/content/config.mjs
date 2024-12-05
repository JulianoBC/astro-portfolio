import { z, defineCollection } from 'astro:content';

export const collections = {
  blog: defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.string().transform((str) => new Date(str)),
      tags: z.array(z.string()).default([]),
    })
  })
}; 