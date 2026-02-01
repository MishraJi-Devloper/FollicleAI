/**
 * Blog Post Page
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getPostBySlug } from '../utils/blog';
import type { BlogPost as BlogPostType } from '../utils/blog';
import { ROUTES, SITE } from '../constants';
import './Blog.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (slug) {
        const loadedPost = await getPostBySlug(slug);
        setPost(loadedPost);
      }
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-page">
        <section className="blog-hero">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {post ? (
        <>
          <SEO
            title={post.title}
            description={post.description}
            path={`/blog/${post.slug}`}
            schemaJson={{
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              url: `${SITE.URL}/blog/${post.slug}`,
              author: {
                '@type': 'Organization',
                name: 'FollicleAI',
              },
              publisher: {
                '@type': 'Organization',
                name: 'FollicleAI',
              },
            }}
          />

          <article className="blog-post">
            <header className="blog-post-header">
              <Link to={ROUTES.BLOG} className="blog-back-link">← Back to Blog</Link>
              <h1>{post.title}</h1>
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
            </header>

            <section
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </>
      ) : (
        <section className="blog-hero">
          <h1>Post Not Found</h1>
          <p>Return to the blog to continue reading.</p>
          <Link to={ROUTES.BLOG} className="blog-back-link">Back to Blog</Link>
        </section>
      )}
    </div>
  );
};
