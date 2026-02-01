/**
 * How It Works Page
 * Simple 3-step explanation of the analysis process
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { SEO } from '../components/SEO';
import { UI_STRINGS, ROUTES, DISCLAIMERS } from '../constants';
import './HowItWorks.css';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: UI_STRINGS.PAGES.HOW_IT_WORKS.STEP_1,
      description:
        'Upload a clear, well-lit photo of your scalp. Use good lighting and ensure the scalp is clearly visible. We do not use facial recognition.',
      visual: '📸',
    },
    {
      number: 2,
      title: UI_STRINGS.PAGES.HOW_IT_WORKS.STEP_2,
      description:
        'Our AI model analyzes the image for hair density patterns and provides awareness-based insights. Analysis takes about 30 seconds.',
      visual: '🤖',
    },
    {
      number: 3,
      title: UI_STRINGS.PAGES.HOW_IT_WORKS.STEP_3,
      description:
        'View your personalized insights including hair density score and pattern awareness. All results include important disclaimers.',
      visual: '📊',
    },
  ];

  return (
    <div className="how-it-works">
      <SEO
        title="How Hair & Scalp Analysis Works"
        description="Learn how FollicleAI analyzes scalp images for hair density, thinning level, and scalp health awareness."
        path={ROUTES.HOW_IT_WORKS}
      />
      {/* Header */}
      <section className="section-header fade-in">
        <h1>{UI_STRINGS.PAGES.HOW_IT_WORKS.TITLE}</h1>
        <p>A simple process to get hair and scalp awareness insights</p>

        <DisclaimerBadge variant="subtle" text={DISCLAIMERS.NOT_MEDICAL} />
      </section>

      {/* Steps */}
      <section className="steps-section">
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="step-visual">{step.visual}</div>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Connection lines */}
        <div className="steps-connector-mobile">
          <span className="connector">→</span>
          <span className="connector">→</span>
        </div>
      </section>

      {/* Privacy Emphasis */}
      <section className="privacy-section">
        <h2>Your Privacy is Protected</h2>
        <div className="privacy-grid">
          <div className="privacy-item">
            <span className="privacy-icon">🔐</span>
            <h4>Secure Processing</h4>
            <p>Images are processed on encrypted, secure servers.</p>
          </div>
          <div className="privacy-item">
            <span className="privacy-icon">🗑️</span>
            <h4>Automatic Deletion</h4>
            <p>All images are deleted within 24 hours of analysis.</p>
          </div>
          <div className="privacy-item">
            <span className="privacy-icon">🚫</span>
            <h4>No Face Recognition</h4>
            <p>We explicitly do not use facial recognition technology.</p>
          </div>
          <div className="privacy-item">
            <span className="privacy-icon">📋</span>
            <h4>Transparent Policy</h4>
            <p>Full details available in our privacy policy.</p>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="notes-section">
        <h2>Important to Know</h2>
        <div className="notes-grid">
          <div className="note-card">
            <h4>Not Medical Diagnosis</h4>
            <p>FollicleAI provides awareness and decision-support only. It is NOT a substitute for professional medical evaluation.</p>
          </div>
          <div className="note-card">
            <h4>For Awareness Only</h4>
            <p>Use insights to start informed conversations with healthcare professionals, not as a definitive assessment.</p>
          </div>
          <div className="note-card">
            <h4>Consult Professionals</h4>
            <p>If you have concerns about hair or scalp health, consult a dermatologist or qualified healthcare provider.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-final">
        <h2>Ready to Begin?</h2>
        <Link to={ROUTES.UPLOAD}>
          <Button size="lg" variant="primary">
            Start Your Analysis
          </Button>
        </Link>
      </section>
    </div>
  );
};
