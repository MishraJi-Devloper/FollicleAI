/**
 * Privacy Policy Page
 * Comprehensive privacy and data usage information
 */

import React from 'react';
import { SEO } from '../components/SEO';
import { ROUTES } from '../constants';
import './Privacy.css';

export const Privacy: React.FC = () => {
  return (
    <div className="privacy-page">
      <SEO
        title="Privacy Policy"
        description="Read how FollicleAI protects your data, processes images securely, and deletes uploads after analysis."
        path={ROUTES.PRIVACY}
      />
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: February 1, 2026</p>

        <section className="privacy-section">
          <h2>Our Commitment to Privacy</h2>
          <p>
            FollicleAI is built with privacy as a core principle. We are committed to protecting your
            personal information and being transparent about how we collect, use, and safeguard your data.
          </p>
        </section>

        <section className="privacy-section">
          <h2>What Information We Collect</h2>
          <h3>Images You Upload</h3>
          <p>
            When you upload a scalp image for analysis, we temporarily process it on our secure servers.
            We <strong>do not use facial recognition</strong> technology. Images are analyzed for hair
            and scalp characteristics only.
          </p>

          <h3>Analysis Results</h3>
          <p>
            We generate hair density scores, pattern awareness classifications, and confidence metrics
            based on your uploaded image.
          </p>

          <h3>Technical Data</h3>
          <p>
            We may collect standard technical information such as device type, browser type, IP address,
            and interaction patterns to improve service quality.
          </p>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To process and analyze the uploaded scalp image</li>
            <li>To provide personalized analysis results</li>
            <li>To improve our AI models and algorithms (using anonymized data)</li>
            <li>To ensure system security and prevent misuse</li>
            <li>To comply with legal obligations if required</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Image Retention and Deletion</h2>
          <div className="highlight-box">
            <strong>Automatic Deletion:</strong> All uploaded images are <strong>automatically deleted
            within 24 hours</strong> of analysis completion.
          </div>
          <p>
            We may retain anonymized analysis metadata (e.g., density scores, pattern classifications)
            for product improvement, but this data cannot be linked back to you or your original image.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul>
            <li>Encrypted data transmission (HTTPS/TLS)</li>
            <li>Secure server infrastructure with access controls</li>
            <li>Regular security audits and updates</li>
            <li>Automated deletion procedures</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Third-Party Sharing</h2>
          <p>
            <strong>We do NOT sell, rent, or share your personal data with third parties</strong> for
            marketing purposes. Limited sharing may occur only in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Trusted vendors who help us operate our platform (e.g., cloud hosting)
              under strict confidentiality agreements
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to protect rights and safety
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Request access to your data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for data processing</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
          <p>
            To exercise these rights, contact us at{' '}
            <a href="mailto:privacy@follicleai.com">privacy@follicleai.com</a>.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Cookies and Tracking</h2>
          <p>
            We use minimal cookies for essential functionality (e.g., session management). We do NOT
            use third-party tracking or advertising cookies.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Children's Privacy</h2>
          <p>
            FollicleAI is not intended for individuals under the age of 18. We do not knowingly collect
            information from children.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page
            with an updated "Last Updated" date.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions or concerns about this privacy policy, please contact us:
          </p>
          <p>
            Email: <a href="mailto:privacy@follicleai.com">privacy@follicleai.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};
