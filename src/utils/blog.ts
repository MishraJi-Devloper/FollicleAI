/**
 * Blog utilities using markdown files and frontmatter.
 * Uses Vite import.meta.glob to load static content at build time.
 */

import { marked } from 'marked';
import DOMPurify from 'dompurify';

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  html: string;
}

interface RawPost {
  raw: string;
  slug: string;
}

const posts = Object.entries(
  import.meta.glob('../content/blog/*.md', { as: 'raw', eager: true })
).map(([path, raw]) => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  return { raw: raw as string, slug } as RawPost;
});

const parseFrontmatter = (raw: string): { meta: Partial<BlogPostMeta>; body: string } => {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const metaLines = match[1].split('\n');
  const meta: Partial<BlogPostMeta> = {};

  metaLines.forEach((line) => {
    const [key, ...rest] = line.split(':');
    if (!key) return;
    const value = rest.join(':').trim();
    if (key === 'tags') {
      meta.tags = value
        .replace('[', '')
        .replace(']', '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    } else {
      (meta as Record<string, string>)[key.trim()] = value;
    }
  });

  return { meta, body: match[2] };
};

const estimateReadingTime = (text: string): string => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

export const getAllPosts = (): BlogPostMeta[] => {
  return posts
    .map((post) => {
      const { meta, body } = parseFrontmatter(post.raw);
      const title = meta.title || 'Untitled';
      const description = meta.description || 'FollicleAI insights and education.';
      const date = meta.date || '2026-02-01';
      const tags = meta.tags || [];
      const readingTime = estimateReadingTime(body);

      return {
        title,
        description,
        date,
        slug: post.slug,
        tags,
        readingTime,
      } as BlogPostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  const { meta, body } = parseFrontmatter(post.raw);
  const parsedHtml = await marked.parse(body);
  const html = DOMPurify.sanitize(parsedHtml);

  return {
    title: meta.title || 'Untitled',
    description: meta.description || 'FollicleAI insights and education.',
    date: meta.date || '2026-02-01',
    tags: meta.tags || [],
    slug,
    readingTime: estimateReadingTime(body),
    html,
  };
};
