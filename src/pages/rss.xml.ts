import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { sortPostsByDateDesc } from '../utils/sort';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function GET({ site }: APIContext) {
  const posts = sortPostsByDateDesc(await getCollection('blog'));
  const items = posts
    .map((p) => {
      const url = new URL(`/blog/${p.slug}`, site).href;
      return `<item><title>${esc(p.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(p.data.description)}</description><pubDate>${new Date(`${p.data.date} UTC`).toUTCString()}</pubDate></item>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>ChatQuill</title><link>${site}</link><description>Software engineering, data science and AI, by Mohun Shakeel Ahmad.</description>${items}</channel></rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
