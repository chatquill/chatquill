import type { TagValue } from './schema';

export type CategoryKey = 'all' | TagValue;

export function cardMatchesCategory(
  cardCategories: string[],
  category: CategoryKey
): boolean {
  if (category === 'all') return true;
  return cardCategories.includes(category);
}

export function parseCategoryFromSearch(search: string): CategoryKey {
  const params = new URLSearchParams(search);
  const cat = params.get('cat');
  if (!cat) return 'all';
  return cat as CategoryKey;
}

export function buildCategoryUrl(baseUrl: string, category: CategoryKey): string {
  const url = new URL(baseUrl);
  if (category === 'all') {
    url.searchParams.delete('cat');
  } else {
    url.searchParams.set('cat', category);
  }
  return url.toString();
}
