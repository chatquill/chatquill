import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.enum(['AI', 'Tech', 'Data Science', 'Beginner'])),
    readtime: z.string(),
    featured: z.boolean().optional().default(false),
    coverGradient: z.string().optional().default('linear-gradient(135deg, #0d1520, #0d2015)'),
    coverGlow: z.string().optional().default('rgba(0,229,160,0.1)'),
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
