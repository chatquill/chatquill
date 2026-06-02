import { describe, it, expect } from 'vitest';
import { blogPostSchema, VALID_TAGS } from '../schema';

const validPost = {
  title: 'Hello World',
  description: 'A test post',
  date: 'January 1, 2025',
  tags: ['AI'] as const,
  readtime: '5 min read',
};

describe('blogPostSchema', () => {
  describe('required fields', () => {
    it('accepts a valid post with all required fields', () => {
      const result = blogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
    });

    it('rejects a post missing title', () => {
      const { title: _, ...rest } = validPost;
      const result = blogPostSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects a post missing description', () => {
      const { description: _, ...rest } = validPost;
      const result = blogPostSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects a post missing date', () => {
      const { date: _, ...rest } = validPost;
      const result = blogPostSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects a post missing tags', () => {
      const { tags: _, ...rest } = validPost;
      const result = blogPostSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects a post missing readtime', () => {
      const { readtime: _, ...rest } = validPost;
      const result = blogPostSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    it('rejects an empty title', () => {
      const result = blogPostSchema.safeParse({ ...validPost, title: '' });
      expect(result.success).toBe(false);
    });

    it('rejects an empty tags array', () => {
      const result = blogPostSchema.safeParse({ ...validPost, tags: [] });
      expect(result.success).toBe(false);
    });
  });

  describe('tags enum', () => {
    it.each(VALID_TAGS)('accepts "%s" as a valid tag', (tag) => {
      const result = blogPostSchema.safeParse({ ...validPost, tags: [tag] });
      expect(result.success).toBe(true);
    });

    it('accepts multiple valid tags', () => {
      const result = blogPostSchema.safeParse({
        ...validPost,
        tags: ['AI', 'Tech'],
      });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid tag value', () => {
      const result = blogPostSchema.safeParse({
        ...validPost,
        tags: ['InvalidCategory'],
      });
      expect(result.success).toBe(false);
    });

    it('rejects a mixed valid/invalid tag array', () => {
      const result = blogPostSchema.safeParse({
        ...validPost,
        tags: ['AI', 'NotATag'],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('optional fields and defaults', () => {
    it('defaults featured to false when omitted', () => {
      const result = blogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.featured).toBe(false);
    });

    it('accepts featured: true', () => {
      const result = blogPostSchema.safeParse({ ...validPost, featured: true });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.featured).toBe(true);
    });

    it('applies default coverGradient when omitted', () => {
      const result = blogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success)
        expect(result.data.coverGradient).toBe(
          'linear-gradient(135deg, #0d1520, #0d2015)'
        );
    });

    it('applies default coverGlow when omitted', () => {
      const result = blogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success)
        expect(result.data.coverGlow).toBe('rgba(0,229,160,0.1)');
    });

    it('accepts a custom coverGradient', () => {
      const gradient = 'linear-gradient(90deg, red, blue)';
      const result = blogPostSchema.safeParse({
        ...validPost,
        coverGradient: gradient,
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.coverGradient).toBe(gradient);
    });

    it('accepts an optional coverImage', () => {
      const result = blogPostSchema.safeParse({
        ...validPost,
        coverImage: '/images/cover.png',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.coverImage).toBe('/images/cover.png');
    });

    it('coverImage is undefined when omitted', () => {
      const result = blogPostSchema.safeParse(validPost);
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.coverImage).toBeUndefined();
    });
  });
});
