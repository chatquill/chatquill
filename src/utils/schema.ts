import { z } from 'zod';

export const VALID_TAGS = ['AI', 'Tech', 'Data Science', 'Beginner'] as const;

export type TagValue = (typeof VALID_TAGS)[number];

export const blogPostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.enum(VALID_TAGS)).min(1),
  readtime: z.string().min(1),
  featured: z.boolean().optional().default(false),
  coverGradient: z
    .string()
    .optional()
    .default('linear-gradient(135deg, #0d1520, #0d2015)'),
  coverGlow: z.string().optional().default('rgba(0,229,160,0.1)'),
  coverImage: z.string().optional(),
});

export type BlogPostData = z.infer<typeof blogPostSchema>;
