import { defineCollection, z } from 'astro:content';

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    slug: z.string(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    publishDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  services,
  blog,
};
