/**
 * Terms of Service Page
 * Non-medical, privacy-first platform terms
 */

import React from 'react';
import { SEO } from '../components/SEO';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { DISCLAIMERS, ROUTES } from '../constants';
import { Link } from 'react-router-dom';
import './Terms.css';

export const Terms: React.FC = () => {
  return (
    <div className="terms-page">
      <SEO
        title="Terms of Service"
        description="Read the FollicleAI terms of service, including non-medical usage, privacy, and data handling policies."
        path={ROUTES.TERMS}
      />

      <section className="terms-hero">
        <h1>Terms of Service</h1>
        <p>Effective date: February 1, 2026</p>
        <DisclaimerBadge variant="prominent" text={DISCLAIMERS.NOT_MEDICAL} />
      </section>

      <section className="terms-content">
        <h2>1. Purpose</h2>
        <p>
          FollicleAI provides awareness-based hair and scalp insights. It does not provide medical
          diagnosis, treatment recommendations, or professional medical advice.
        </p>

        <h2>2. Acceptable Use</h2>
        <ul>
          <li>Use the platform for personal awareness and educational purposes only.</li>
          <li>Do not upload illegal, harmful, or non-consensual content.</li>
          <li>Do not attempt to reverse engineer or abuse the service.</li>
        </ul>

        <h2>3. Privacy & Data Handling</h2>
        <p>
          Uploaded images are processed for analysis and are not stored permanently. Images are deleted
          within 24 hours. Anonymized metadata may be retained to improve product quality.
        </p>

        <h2>4. Medical Disclaimer</h2>
        <p>
          This tool is not a substitute for professional medical advice. Always consult qualified
          healthcare professionals for medical concerns.
        </p>

        <h2>5. Service Availability</h2>
        <p>
          We may modify, suspend, or discontinue the service at any time. We are not liable for any
          interruptions or data loss.
        </p>

        <h2>6. Contact</h2>
        <p>
          For questions, contact us via the <Link to={ROUTES.PRIVACY}>Privacy Policy</Link> page.
        </p>
      </section>
    </div>
  );
};
