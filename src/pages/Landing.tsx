/**
 * Landing Page
 * Engaging hero with clear value proposition and trust messaging
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { SEO } from '../components/SEO';
import { ROUTES, DISCLAIMERS, SITE } from '../constants';
import './Landing.css';

export const Landing: React.FC = () => {
  const faqItems = [
    {
      question: 'Is FollicleAI a medical diagnosis tool?',
      answer:
        'No. FollicleAI provides awareness-based insights only and does not diagnose, treat, or replace medical advice.',
    },
    {
      question: 'Do you store my uploaded images?',
      answer:
        'No. Images are processed for analysis and deleted within 24 hours. Facial recognition is not used.',
    },
    {
      question: 'What can I learn from the analysis?',
      answer:
        'You receive a hair density estimate, thinning level, scalp health score, and hair type classification.',
    },
    {
      question: 'How accurate are the results?',
      answer:
        'Results are awareness-based and depend on image quality, lighting, and angle. Consult a professional for medical concerns.',
    },
  ];

  return (
    <div className="landing">
      <SEO
        title="AI Hair & Scalp Analysis"
        description="AI-powered hair and scalp analysis for awareness. Get hair density, thinning level, scalp health score, and hair type in under a minute."
        path={ROUTES.HOME}
        schemaJson={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: SITE.NAME,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            description: SITE.DESCRIPTION,
            url: SITE.URL,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ]}
      />
      {/* Hero Section */}
      <section className="hero fade-in">
        <div className="hero-content">
          <div className="hero-badge">✨ AI Hair & Scalp Analysis • Privacy First</div>
          <h1 className="hero-title">AI Hair & Scalp Analysis in 60 Seconds</h1>
          <p className="hero-subtitle">
            Get instant, AI-powered awareness insights about your scalp health, hair density, and
            thinning level. No appointments. No guesswork. Just clear, actionable information.
          </p>

          <DisclaimerBadge
            variant="prominent"
            text={DISCLAIMERS.NOT_MEDICAL}
          />

          <div className="hero-cta">
            <Link to={ROUTES.UPLOAD}>
              <Button size="lg" variant="primary">
                🚀 Start Free Analysis
              </Button>
            </Link>
            <Link to={ROUTES.HOW_IT_WORKS}>
              <Button size="lg" variant="outline">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">30s</div>
              <div className="stat-label">Average Analysis Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Privacy Protected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Medical Diagnosis</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-header">
              <span className="visual-icon">📸</span>
              <span>Upload Image</span>
            </div>
            <div className="visual-arrow">↓</div>
            <div className="visual-header ai-processing">
              <span className="visual-icon">🤖</span>
              <span>AI Analysis</span>
            </div>
            <div className="visual-arrow">↓</div>
            <div className="visual-result">
              <div className="result-gauge">
                <div className="gauge-fill" style={{ width: '75%' }}></div>
              </div>
              <div className="result-text">
                <strong>Density Score: 75/100</strong>
                <span>Moderate Hair Density</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Results Examples Section */}
      <section className="real-results-section">
        <div className="section-header">
          <h2>Real Results From Real Users</h2>
          <p>See what FollicleAI reveals about actual hair and scalp conditions</p>
        </div>

        <div className="results-examples-grid">
          {/* Example 1: Healthy Density */}
          <div className="result-example-card">
            <div className="example-image-container">
              <div className="example-placeholder healthy">
                <span className="placeholder-icon">👨</span>
                <span className="placeholder-text">Healthy Density</span>
              </div>
            </div>
            <div className="example-analysis">
              <h3>Healthy Hair Density</h3>
              <div className="analysis-metric">
                <div className="metric-label">Hair Density</div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '82%' }}></div>
                </div>
                <div className="metric-value">82/100</div>
              </div>
              <div className="analysis-metric">
                <div className="metric-label">Scalp Health</div>
                <div className="metric-bar">
                  <div className="metric-fill good" style={{ width: '88%' }}></div>
                </div>
                <div className="metric-value">Excellent</div>
              </div>
              <p className="analysis-summary">Strong hair coverage with minimal thinning patterns detected.</p>
            </div>
          </div>

          {/* Example 2: Moderate Thinning */}
          <div className="result-example-card">
            <div className="example-image-container">
              <div className="example-placeholder moderate">
                <span className="placeholder-icon">👨‍🦱</span>
                <span className="placeholder-text">Moderate Hair Loss</span>
              </div>
            </div>
            <div className="example-analysis">
              <h3>Moderate Hair Thinning</h3>
              <div className="analysis-metric">
                <div className="metric-label">Hair Density</div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '58%' }}></div>
                </div>
                <div className="metric-value">58/100</div>
              </div>
              <div className="analysis-metric">
                <div className="metric-label">Thinning Level</div>
                <div className="metric-bar">
                  <div className="metric-fill warning" style={{ width: '65%' }}></div>
                </div>
                <div className="metric-value">Moderate</div>
              </div>
              <p className="analysis-summary">Visible thinning detected. Consider consulting a professional.</p>
            </div>
          </div>

          {/* Example 3: Advanced Hair Loss */}
          <div className="result-example-card">
            <div className="example-image-container">
              <div className="example-placeholder advanced">
                <span className="placeholder-icon">👴</span>
                <span className="placeholder-text">Advanced Hair Loss</span>
              </div>
            </div>
            <div className="example-analysis">
              <h3>Advanced Hair Loss</h3>
              <div className="analysis-metric">
                <div className="metric-label">Hair Density</div>
                <div className="metric-bar">
                  <div className="metric-fill" style={{ width: '35%' }}></div>
                </div>
                <div className="metric-value">35/100</div>
              </div>
              <div className="analysis-metric">
                <div className="metric-label">Hair Loss Risk</div>
                <div className="metric-bar">
                  <div className="metric-fill critical" style={{ width: '85%' }}></div>
                </div>
                <div className="metric-value">High</div>
              </div>
              <p className="analysis-summary">Significant hair loss pattern detected. Professional consultation recommended.</p>
            </div>
          </div>
        </div>

        <div className="results-cta">
          <p>Get your personalized analysis in under 2 minutes</p>
          <Link to={ROUTES.UPLOAD}>
            <Button variant="primary">Upload & Analyze Now →</Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Hair & Scalp Analysis FAQs</h2>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <div key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-item">
            <span className="trust-icon">🔐</span>
            <h4>End-to-End Encryption</h4>
            <p>Your images are encrypted and deleted within 24 hours</p>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🚫</span>
            <h4>No Facial Recognition</h4>
            <p>We explicitly do not use face detection technology</p>
          </div>
          <div className="trust-item">
            <span className="trust-icon">⚕️</span>
            <h4>Not Medical Advice</h4>
            <p>Awareness-based insights only, never diagnosis</p>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💯</span>
            <h4>Transparent Process</h4>
            <p>See exactly how our AI analyzes your images</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose FollicleAI?</h2>
        <p className="section-subtitle">The smart way to understand your hair health before making decisions</p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your images are processed securely and deleted within 24 hours. No facial recognition.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered</h3>
            <p>Advanced analysis for hair density and pattern awareness in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✓</div>
            <h3>Evidence-Informed</h3>
            <p>Built on clinical research. Not medical diagnosis—awareness and decision-support only.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile-Friendly</h3>
            <p>Analyze anytime, anywhere from your phone or desktop.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get your analysis in under a minute with detailed insights and explanations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor changes over time with our optional subscription service.</p>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="process-preview">
        <h2>Simple 3-Step Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Upload Photo</h3>
              <p>Take a clear photo of your scalp in good lighting</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>AI Analyzes</h3>
              <p>Our model examines density and pattern indicators</p>
            </div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Insights</h3>
              <p>Receive awareness-based results and next steps</p>
            </div>
          </div>
        </div>
        <div className="process-cta">
          <Link to={ROUTES.HOW_IT_WORKS}>
            <Button variant="secondary">Learn More Details</Button>
          </Link>
        </div>
      </section>

      {/* Social Proof / Use Cases */}
      <section className="use-cases">
        <h2>Who Uses FollicleAI?</h2>
        <div className="use-case-grid">
          <div className="use-case-card">
            <span className="use-case-icon">🤔</span>
            <h3>Curious Individuals</h3>
            <p>Want to understand current hair health before consulting a professional</p>
          </div>
          <div className="use-case-card">
            <span className="use-case-icon">📈</span>
            <h3>Progress Trackers</h3>
            <p>Monitor changes over time to see if lifestyle adjustments are working</p>
          </div>
          <div className="use-case-card">
            <span className="use-case-icon">💡</span>
            <h3>Decision Makers</h3>
            <p>Gather information before deciding on treatment consultations</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Understand Your Scalp?</h2>
          <p>Get personalized, AI-powered insights in under 60 seconds. No signup required for basic analysis.</p>
          <Link to={ROUTES.UPLOAD}>
            <Button size="lg" variant="primary">
              Start Free Analysis Now
            </Button>
          </Link>
          <p className="cta-disclaimer">Free analysis • No credit card • Privacy protected</p>
        </div>
      </section>
    </div>
  );
};
