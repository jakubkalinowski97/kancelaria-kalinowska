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

export const collections = {
  services,
};
