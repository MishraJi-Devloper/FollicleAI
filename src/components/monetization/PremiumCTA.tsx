/**
 * Premium feature placeholder
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './Monetization.css';

export const PremiumCTA: React.FC = () => {
  return (
    <section className="premium-cta">
      <div className="premium-content">
        <h2>Premium Report (Coming Soon)</h2>
        <p>
          Unlock zone-by-zone density analysis, progress tracking, and personalized insights. Join the
          waitlist to get early access.
        </p>
        <Link to={ROUTES.PRICING} className="premium-link">
          View Pricing (Coming Soon)
        </Link>
      </div>
    </section>
  );
};
