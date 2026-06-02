import { describe, it, expect } from 'vitest';
import {
  sortPostsByDateDesc,
  getFeaturedPost,
  getEffectiveFeatured,
  countPostsByTag,
} from '../sort';

const makePost = (date: string, featured = false, tags: string[] = []) => ({
  data: { date, featured, tags },
});

describe('sortPostsByDateDesc', () => {
  it('returns an empty array for empty input', () => {
    expect(sortPostsByDateDesc([])).toEqual([]);
  });

  it('returns a single-element array unchanged', () => {
    const posts = [makePost('January 1, 2025')];
    expect(sortPostsByDateDesc(posts)).toEqual(posts);
  });

  it('sorts posts newest-first', () => {
    const older = makePost('January 1, 2024');
    const newer = makePost('June 1, 2025');
    const middle = makePost('March 15, 2024');

    const sorted = sortPostsByDateDesc([older, middle, newer]);
    expect(sorted[0]).toBe(newer);
    expect(sorted[1]).toBe(middle);
    expect(sorted[2]).toBe(older);
  });

  it('does not mutate the original array', () => {
    const older = makePost('January 1, 2024');
    const newer = makePost('June 1, 2025');
    const original = [older, newer];
    const sorted = sortPostsByDateDesc(original);

    expect(original[0]).toBe(older);
    expect(sorted[0]).toBe(newer);
  });

  it('handles posts with the same date without crashing', () => {
    const a = makePost('January 1, 2025');
    const b = makePost('January 1, 2025');
    expect(() => sortPostsByDateDesc([a, b])).not.toThrow();
  });
});

describe('getFeaturedPost', () => {
  it('returns undefined when no post is featured', () => {
    const posts = [makePost('2025-01-01'), makePost('2025-02-01')];
    expect(getFeaturedPost(posts)).toBeUndefined();
  });

  it('returns the featured post', () => {
    const notFeatured = makePost('2025-01-01', false);
    const featured = makePost('2025-02-01', true);
    expect(getFeaturedPost([notFeatured, featured])).toBe(featured);
  });

  it('returns the first featured post when multiple are marked', () => {
    const first = makePost('2025-01-01', true);
    const second = makePost('2025-02-01', true);
    expect(getFeaturedPost([first, second])).toBe(first);
  });

  it('returns undefined for an empty array', () => {
    expect(getFeaturedPost([])).toBeUndefined();
  });
});

describe('getEffectiveFeatured', () => {
  it('returns the featured post when one exists', () => {
    const normal = makePost('2025-01-01', false);
    const featured = makePost('2025-02-01', true);
    expect(getEffectiveFeatured([normal, featured])).toBe(featured);
  });

  it('falls back to the first post when none is featured', () => {
    const first = makePost('2025-01-01');
    const second = makePost('2025-02-01');
    expect(getEffectiveFeatured([first, second])).toBe(first);
  });

  it('returns undefined for an empty array', () => {
    expect(getEffectiveFeatured([])).toBeUndefined();
  });
});

describe('countPostsByTag', () => {
  const posts = [
    makePost('2025-01-01', false, ['AI', 'Tech']),
    makePost('2025-02-01', false, ['AI']),
    makePost('2025-03-01', false, ['Beginner']),
    makePost('2025-04-01', false, ['Data Science', 'AI']),
  ];

  it('counts posts for a given tag', () => {
    expect(countPostsByTag(posts, 'AI')).toBe(3);
    expect(countPostsByTag(posts, 'Tech')).toBe(1);
    expect(countPostsByTag(posts, 'Beginner')).toBe(1);
    expect(countPostsByTag(posts, 'Data Science')).toBe(1);
  });

  it('returns 0 for a tag with no matching posts', () => {
    expect(countPostsByTag(posts, 'NonExistentTag')).toBe(0);
  });

  it('returns 0 for an empty array', () => {
    expect(countPostsByTag([], 'AI')).toBe(0);
  });
});
