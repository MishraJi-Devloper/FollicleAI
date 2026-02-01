/**
 * Pricing Page - Coming Soon
 * Ethical, transparent pricing preview with waitlist
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { SEO } from '../components/SEO';
import { ROUTES, DISCLAIMERS } from '../constants';
import './Pricing.css';

export const Pricing: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Here you would send to your backend/newsletter service
      console.log('Subscribed:', email);
    }
  };

  return (
    <div className="pricing-page">
      <SEO
        title="Pricing (Coming Soon)"
        description="FollicleAI pricing plans are coming soon. Join the waitlist for early access and discounts."
        path={ROUTES.PRICING}
      />
      <section className="pricing-hero fade-in">
        <div className="pricing-hero-content">
          <div className="coming-soon-banner">
            <span className="coming-soon-icon">🚀</span>
            <h1>Pricing Plans Coming Soon</h1>
          </div>
          <p className="coming-soon-subtitle">
            We're finalizing our pricing structure to ensure it's fair, transparent, and provides
            exceptional value. Be the first to know when we launch!
          </p>
          <DisclaimerBadge variant="prominent" text={DISCLAIMERS.NOT_MEDICAL} />
        </div>
      </section>

      {/* Preview Section */}
      <section className="pricing-preview">
        <h2>What to Expect</h2>
        <p className="preview-subtitle">Our commitment to ethical, transparent pricing</p>
        
        <div className="preview-grid">
          <div className="preview-card">
            <span className="preview-icon">🎁</span>
            <h3>Free Tier</h3>
            <p>Basic analysis will always be free. Get density score, pattern awareness, and confidence metrics at no cost.</p>
          </div>
          <div className="preview-card">
            <span className="preview-icon">📊</span>
            <h3>Detailed Reports</h3>
            <p>One-time purchase for in-depth zone-by-zone analysis with actionable insights and educational resources.</p>
          </div>
          <div className="preview-card">
            <span className="preview-icon">📈</span>
            <h3>Progress Tracking</h3>
            <p>Optional subscription for monitoring changes over time with monthly reports and trend analysis.</p>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="waitlist-section">
        <div className="waitlist-container">
          <h2>Join the Waitlist</h2>
          <p>Get notified when pricing launches and receive an exclusive early-bird discount</p>
          
          {!subscribed ? (
            <form className="waitlist-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="waitlist-input"
              />
              <Button type="submit" size="lg" variant="primary">
                Notify Me
              </Button>
            </form>
          ) : (
            <div className="waitlist-success">
              <span className="success-icon">✅</span>
              <p>Thanks! We'll notify you when pricing is available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Principles Section */}
      <section className="pricing-principles">
        <h2>Our Pricing Principles</h2>
        <div className="principles-grid">
          <div className="principle-item">
            <h4>💯 Transparent</h4>
            <p>No hidden fees or surprise charges. What you see is what you pay.</p>
          </div>
          <div className="principle-item">
            <h4>🤝 Fair Value</h4>
            <p>Pricing reflects the actual value and cost of providing the service.</p>
          </div>
          <div className="principle-item">
            <h4>🚫 No Dark Patterns</h4>
            <p>Cancel anytime, no tricks. We respect your autonomy.</p>
          </div>
          <div className="principle-item">
            <h4>🔐 Privacy First</h4>
            <p>Your data privacy is never compromised, regardless of tier.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pricing-cta">
        <h2>Try It Free Right Now</h2>
        <p>Don't wait for pricing—start with a free analysis today</p>
        <Link to={ROUTES.UPLOAD}>
          <Button size="lg" variant="primary">Start Free Analysis</Button>
        </Link>
      </section>
    </div>
  );
};
