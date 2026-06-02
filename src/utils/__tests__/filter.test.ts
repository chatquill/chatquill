import { describe, it, expect } from 'vitest';
import {
  cardMatchesCategory,
  parseCategoryFromSearch,
  buildCategoryUrl,
} from '../filter';

describe('cardMatchesCategory', () => {
  it('returns true for "all" regardless of card categories', () => {
    expect(cardMatchesCategory(['AI', 'Tech'], 'all')).toBe(true);
    expect(cardMatchesCategory([], 'all')).toBe(true);
  });

  it('returns true when the card includes the given category', () => {
    expect(cardMatchesCategory(['AI', 'Tech'], 'AI')).toBe(true);
    expect(cardMatchesCategory(['Data Science'], 'Data Science')).toBe(true);
  });

  it('returns false when the card does not include the given category', () => {
    expect(cardMatchesCategory(['Tech'], 'AI')).toBe(false);
    expect(cardMatchesCategory([], 'Beginner')).toBe(false);
  });

  it('is case-sensitive', () => {
    expect(cardMatchesCategory(['ai'], 'AI')).toBe(false);
  });

  it('handles multi-category cards correctly', () => {
    expect(cardMatchesCategory(['AI', 'Beginner'], 'Beginner')).toBe(true);
    expect(cardMatchesCategory(['AI', 'Beginner'], 'Tech')).toBe(false);
  });
});

describe('parseCategoryFromSearch', () => {
  it('returns "all" when no cat param is present', () => {
    expect(parseCategoryFromSearch('')).toBe('all');
    expect(parseCategoryFromSearch('?foo=bar')).toBe('all');
  });

  it('returns the cat param value when present', () => {
    expect(parseCategoryFromSearch('?cat=AI')).toBe('AI');
    expect(parseCategoryFromSearch('?cat=Tech')).toBe('Tech');
    expect(parseCategoryFromSearch('?cat=Data+Science')).toBe('Data Science');
    expect(parseCategoryFromSearch('?cat=Beginner')).toBe('Beginner');
  });

  it('returns "all" when cat param is empty string', () => {
    expect(parseCategoryFromSearch('?cat=')).toBe('all');
  });

  it('ignores other query params', () => {
    expect(parseCategoryFromSearch('?foo=bar&cat=AI&baz=1')).toBe('AI');
  });
});

describe('buildCategoryUrl', () => {
  const base = 'http://localhost:4321/';

  it('removes the cat param when category is "all"', () => {
    const url = buildCategoryUrl(`${base}?cat=AI`, 'all');
    expect(url).not.toContain('cat=');
  });

  it('sets cat param for a specific category', () => {
    const url = buildCategoryUrl(base, 'AI');
    expect(url).toContain('cat=AI');
  });

  it('updates an existing cat param', () => {
    const url = buildCategoryUrl(`${base}?cat=Tech`, 'AI');
    expect(url).toContain('cat=AI');
    expect(url).not.toContain('cat=Tech');
  });

  it('encodes "Data Science" so URLSearchParams decodes it correctly', () => {
    const url = buildCategoryUrl(base, 'Data Science');
    const parsed = new URL(url);
    expect(parsed.searchParams.get('cat')).toBe('Data Science');
  });

  it('preserves other query params when removing cat', () => {
    const url = buildCategoryUrl(`${base}?cat=AI&page=2`, 'all');
    expect(url).toContain('page=2');
    expect(url).not.toContain('cat=');
  });

  it('preserves other query params when setting cat', () => {
    const url = buildCategoryUrl(`${base}?page=2`, 'Tech');
    expect(url).toContain('page=2');
    expect(url).toContain('cat=Tech');
  });
});
