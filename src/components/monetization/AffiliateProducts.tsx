/**
 * Affiliate product recommendation component (placeholder)
 * No affiliate links activated yet.
 */

import React from 'react';
import './Monetization.css';

const PRODUCTS = [
  {
    title: 'Gentle Scalp Cleanser',
    description: 'Sulfate-free cleanser designed for sensitive scalps.',
    note: 'Affiliate link placeholder',
  },
  {
    title: 'Nourishing Hair Serum',
    description: 'Lightweight serum for hydration and shine.',
    note: 'Affiliate link placeholder',
  },
  {
    title: 'Scalp Massager Tool',
    description: 'Manual tool to improve scalp circulation awareness.',
    note: 'Affiliate link placeholder',
  },
];

export const AffiliateProducts: React.FC = () => {
  return (
    <section className="affiliate-section">
      <h2>Recommended Products</h2>
      <p className="affiliate-subtitle">
        Curated, non-medical recommendations. Links are placeholders for future affiliate integration.
      </p>
      <div className="affiliate-grid">
        {PRODUCTS.map((product) => (
          <div key={product.title} className="affiliate-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span className="affiliate-note">{product.note}</span>
            <button className="affiliate-cta" disabled>
              View Product (Coming Soon)
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
