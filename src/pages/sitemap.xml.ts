import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET({ site }: APIContext) {
  const posts = await getCollection('blog');
  const paths = ['/', '/skills', '/contact', ...posts.map((p) => `/blog/${p.slug}`)];
  const urls = paths.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
}
