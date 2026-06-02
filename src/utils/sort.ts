export interface MinimalPost {
  data: { date: string; featured?: boolean };
}

export function sortPostsByDateDesc<T extends MinimalPost>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

export function getFeaturedPost<T extends MinimalPost>(posts: T[]): T | undefined {
  return posts.find((p) => p.data.featured);
}

export function getEffectiveFeatured<T extends MinimalPost>(posts: T[]): T | undefined {
  return getFeaturedPost(posts) ?? posts[0];
}

export function countPostsByTag(posts: MinimalPost[], tag: string): number {
  return posts.filter((p) =>
    (p.data as { tags?: string[] }).tags?.includes(tag)
  ).length;
}
