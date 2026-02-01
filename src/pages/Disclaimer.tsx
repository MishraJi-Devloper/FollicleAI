/**
 * Disclaimer Page
 * Comprehensive medical and legal disclaimers
 */

import React from 'react';
import { SEO } from '../components/SEO';
import { ROUTES } from '../constants';
import './Privacy.css'; // Reusing the same styles

export const Disclaimer: React.FC = () => {
  return (
    <div className="privacy-page">
      <SEO
        title="Medical Disclaimer"
        description="FollicleAI is not a medical device and does not provide diagnosis or treatment. Read the full disclaimer."
        path={ROUTES.DISCLAIMER}
      />
      <div className="privacy-container">
        <h1>Medical Disclaimer</h1>
        <p className="last-updated">Last Updated: February 1, 2026</p>

        <div className="disclaimer-warning">
          <h2>⚠ IMPORTANT: READ CAREFULLY</h2>
          <p>
            FollicleAI is <strong>NOT A MEDICAL DEVICE</strong> and does <strong>NOT PROVIDE MEDICAL
            DIAGNOSIS OR TREATMENT</strong>.
          </p>
        </div>

        <section className="privacy-section">
          <h2>Purpose of FollicleAI</h2>
          <p>
            FollicleAI is an awareness and decision-support tool designed to provide users with
            educational insights about hair and scalp characteristics. It is intended for informational
            purposes only.
          </p>
          <p>The platform:</p>
          <ul>
            <li>Analyzes images using AI to estimate hair density patterns</li>
            <li>Provides reference-based pattern classifications inspired by clinical scales</li>
            <li>Offers awareness-level insights for educational purposes</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>What FollicleAI Is NOT</h2>
          <div className="highlight-box danger">
            <strong>FollicleAI does NOT:</strong>
            <ul>
              <li>Diagnose medical conditions such as alopecia, dermatitis, or other scalp disorders</li>
              <li>Recommend medical treatments, medications, or therapeutic interventions</li>
              <li>Replace professional medical examination or advice</li>
              <li>Provide definitive clinical assessments</li>
              <li>Constitute a doctor-patient relationship</li>
              <li>Guarantee accuracy of results or outcomes</li>
            </ul>
          </div>
        </section>

        <section className="privacy-section">
          <h2>Limitations of AI Analysis</h2>
          <p>
            Our AI model is trained on image data and provides pattern recognition insights. However:
          </p>
          <ul>
            <li>AI is not infallible and may produce inaccurate or incomplete results</li>
            <li>Image quality, lighting, and angles significantly affect accuracy</li>
            <li>Individual variability means results may not reflect your actual condition</li>
            <li>The system cannot detect underlying medical causes or contraindications</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Professional Medical Advice Required</h2>
          <div className="highlight-box">
            <strong>You MUST consult a qualified healthcare professional if you:</strong>
            <ul>
              <li>Have concerns about hair loss or scalp health</li>
              <li>Are experiencing rapid or sudden hair changes</li>
              <li>Notice scalp pain, itching, redness, or other symptoms</li>
              <li>Are considering any medical treatments or interventions</li>
              <li>Have pre-existing medical conditions</li>
            </ul>
          </div>
          <p>
            Only a licensed dermatologist or qualified healthcare provider can diagnose conditions
            and recommend appropriate treatments.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Pattern Classifications Explained</h2>
          <p>
            References to "Norwood" and "Ludwig" classifications are educational references to
            established clinical scales used in dermatology for pattern awareness. Our use of these
            terms is for informational purposes only and does not constitute medical diagnosis.
          </p>
          <p>
            These classifications were developed for clinical use by trained professionals and
            should be interpreted by qualified healthcare providers.
          </p>
        </section>

        <section className="privacy-section">
          <h2>No Guarantees or Warranties</h2>
          <p>
            FollicleAI provides results "as is" without warranties of any kind, express or implied.
            We do not guarantee:
          </p>
          <ul>
            <li>Accuracy, reliability, or completeness of analysis results</li>
            <li>Fitness for any particular purpose</li>
            <li>That the service will be error-free or uninterrupted</li>
            <li>Any specific outcomes or improvements</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, FollicleAI and its operators shall not be liable
            for any damages arising from:
          </p>
          <ul>
            <li>Use or reliance on analysis results</li>
            <li>Decisions made based on the information provided</li>
            <li>Delays or failures in diagnosis or treatment due to reliance on our platform</li>
            <li>Any direct, indirect, incidental, or consequential damages</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>User Responsibility</h2>
          <p>By using FollicleAI, you acknowledge and agree that:</p>
          <ul>
            <li>You are using the platform at your own risk</li>
            <li>You will not rely solely on our results for medical decisions</li>
            <li>You will seek professional medical advice for any health concerns</li>
            <li>You understand the limitations of AI-based analysis</li>
            <li>You have read and understood this disclaimer</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Emergency Medical Situations</h2>
          <div className="highlight-box danger">
            <strong>IN CASE OF MEDICAL EMERGENCY:</strong>
            <p>
              Do NOT rely on FollicleAI. Call emergency services (911 in the U.S.) or go to the
              nearest emergency room immediately.
            </p>
          </div>
        </section>

        <section className="privacy-section">
          <h2>Regulatory Status</h2>
          <p>
            FollicleAI is not approved or cleared by the U.S. Food and Drug Administration (FDA) or
            any other regulatory body as a medical device. It is a consumer awareness tool only.
          </p>
        </section>

        <section className="privacy-section">
          <h2>International Users</h2>
          <p>
            If you are located outside the United States, please consult local regulations regarding
            health information services and seek medical advice from providers licensed in your
            jurisdiction.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By using FollicleAI, you acknowledge that you have read, understood, and agreed to this
            medical disclaimer. If you do not agree, please do not use the platform.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Information</h2>
          <p>
            For questions about this disclaimer, contact:
          </p>
          <p>
            Email: <a href="mailto:legal@follicleai.com">legal@follicleai.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};
