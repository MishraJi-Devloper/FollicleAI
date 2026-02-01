/**
 * SEO component for SPA (Vite + React Router)
 * Updates document title, meta tags, canonical link, and structured data.
 */

import { useEffect } from 'react';
import { SITE } from '../constants';

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const setMeta = (name: string, content: string) => {
  if (!content) return;
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('name', name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setProperty = (property: string, content: string) => {
  if (!content) return;
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setCanonical = (url: string) => {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
};

const setStructuredData = (schemaJson?: SEOProps['schemaJson']) => {
  const existing = document.getElementById('structured-data');
  if (existing) existing.remove();

  if (!schemaJson) return;

  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaJson);
  document.head.appendChild(script);
};

export const SEO = ({ title, description, path, ogImage, noIndex, schemaJson }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE.NAME}`;
    const metaDescription = description || SITE.DESCRIPTION;
    const baseUrl = SITE.URL.replace(/\/$/, '');
    const canonical = path ? `${baseUrl}${path}` : baseUrl;
    const image = ogImage || SITE.OG_IMAGE;

    document.title = fullTitle;

    setMeta('description', metaDescription);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    setProperty('og:title', fullTitle);
    setProperty('og:description', metaDescription);
    setProperty('og:type', 'website');
    setProperty('og:url', canonical);
    setProperty('og:image', image.startsWith('http') ? image : `${baseUrl}${image}`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', metaDescription);
    setMeta('twitter:image', image.startsWith('http') ? image : `${baseUrl}${image}`);

    setCanonical(canonical);
    setStructuredData(schemaJson);
  }, [title, description, path, ogImage, noIndex, schemaJson]);

  return null;
};
