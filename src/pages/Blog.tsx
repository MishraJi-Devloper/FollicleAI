/**
 * Blog Index Page
 * SEO-friendly listing of markdown posts
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getAllPosts } from '../utils/blog';
import { ROUTES, SITE } from '../constants';
import './Blog.css';

export const Blog: React.FC = () => {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <SEO
        title="Hair & Scalp Education Blog"
        description="Read FollicleAI’s educational articles about hair density, scalp health, and thinning awareness."
        path={ROUTES.BLOG}
        schemaJson={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'FollicleAI Blog',
          description: 'Educational articles about hair and scalp awareness.',
          url: `${SITE.URL}${ROUTES.BLOG}`,
        }}
      />

      <section className="blog-hero">
        <h1>Hair & Scalp Education</h1>
        <p>Evidence-informed, non-medical guidance to help you understand your hair and scalp.</p>
      </section>

      <section className="blog-list">
        {posts.map((post) => (
          <article key={post.slug} className="blog-card">
            <div className="blog-card-content">
              <h2>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-card-description">{post.description}</p>
              <div className="blog-meta">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
