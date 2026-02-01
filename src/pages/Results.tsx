/**
 * Results Page
 * Displays analysis results with proper disclaimers and next steps
 * Integrated with new AIAnalysisResponse-based AnalysisResult type
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/monetization/AdPlaceholder';
import { AffiliateProducts } from '../components/monetization/AffiliateProducts';
import { PremiumCTA } from '../components/monetization/PremiumCTA';
import type { AnalysisResult } from '../types/analysis';
import { UI_STRINGS, ROUTES, DISCLAIMERS } from '../constants';
import './Results.css';

interface ResultsProps {
  result: AnalysisResult | null;
}

export const Results: React.FC<ResultsProps> = ({ result }) => {
  const navigate = useNavigate();

  if (!result) {
    return (
      <div className="results-page">
        <div className="results-empty">
          <h2>No analysis results available</h2>
          <p>Please upload an image to start the analysis.</p>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.UPLOAD)}
          >
            Go to Upload
          </Button>
        </div>
      </div>
    );
  }

  /**
   * Get color class based on density category
   */
  const getDensityColor = (category: string): string => {
    switch (category?.toLowerCase()) {
      case 'healthy':
        return 'healthy';
      case 'high':
        return 'high';
      case 'moderate':
        return 'moderate';
      case 'low':
        return 'low';
      default:
        return 'moderate';
    }
  };

  /**
   * Get color class based on confidence score
   */
  const getConfidenceColor = (score: number): string => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  /**
   * Get color class for scalp health score
   */
  const getHealthColor = (score: number): string => {
    if (score >= 80) return 'high';
    if (score >= 60) return 'medium';
    return 'low';
  };

  /**
   * Get percentage for thinning level
   */
  const getThinningPercent = (level: AnalysisResult['thinningLevel']): number => {
    if (level === 'Low') return 25;
    if (level === 'Medium') return 55;
    return 85;
  };

  const getRiskClass = (risk: AnalysisResult['hairLossRisk']): string => {
    if (risk === 'Low') return 'risk-low';
    if (risk === 'Medium') return 'risk-medium';
    return 'risk-high';
  };

  return (
    <div className="results-page">
      <SEO
        title="Hair Analysis Results"
        description="View your hair density, thinning level, scalp health score, and awareness-based recommendations."
        path={ROUTES.RESULTS}
        noIndex
      />
      <div className="results-container">
        {/* Header */}
        <div className="results-header">
          <h1>{UI_STRINGS.PAGES.RESULTS.TITLE}</h1>
          <p>Analysis completed at {new Date(result.timestamp).toLocaleString()}</p>
          <p className="processing-time">Processing time: {result.processingTime}ms</p>

          <DisclaimerBadge variant="prominent" text={DISCLAIMERS.PRIMARY} />
        </div>

        {/* Main Results Grid */}
        <div className="results-grid">
          {/* Hair Density Card */}
          <div className="result-card density-card">
            <div className="card-header">
              <h3>
                Hair Density Assessment
                <span className="info-tooltip" title="Estimate based on visible scalp coverage">ⓘ</span>
              </h3>
              <span className="card-subtitle">Awareness-based evaluation</span>
            </div>

            <div className="density-score-container">
              <div className={`density-gauge density-${getDensityColor(result.densityCategory)}`}>
                <div className="gauge-circle">
                  <span className="gauge-value">{result.densityScore}</span>
                  <span className="gauge-unit">/100</span>
                </div>
              </div>
              <div className="density-info">
                <p className="density-category">
                  <strong>{result.densityCategory}</strong> Hair Density
                </p>
                <p className="density-description">
                  This score represents an awareness-based assessment of visible scalp coverage in your image.
                  It is not medical diagnosis.
                </p>
              </div>
            </div>
          </div>

          {/* Scalp Health Score Card */}
          <div className="result-card scalp-health-card">
            <div className="card-header">
              <h3>
                Scalp Health Score
                <span className="info-tooltip" title="Overall visual condition based on clarity, coverage, and scalp appearance">ⓘ</span>
              </h3>
              <span className="card-subtitle">Non-medical assessment</span>
            </div>

            <div className="health-score">
              <div className={`health-bar health-${getHealthColor(result.scalpHealthScore)}`}>
                <div
                  className="health-fill"
                  style={{ width: `${result.scalpHealthScore}%` }}
                  aria-valuenow={result.scalpHealthScore}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                ></div>
              </div>
              <p className="health-text">{result.scalpHealthScore}/100</p>
              <p className="health-description">
                A visual score reflecting scalp clarity and overall condition. Not a diagnosis.
              </p>
            </div>
          </div>

          {/* Thinning Level Card */}
          <div className="result-card thinning-card">
            <div className="card-header">
              <h3>
                Thinning Level
                <span className="info-tooltip" title="Rule-based assessment of visible thinning">ⓘ</span>
              </h3>
              <span className="card-subtitle">Low • Medium • High</span>
            </div>

            <div className="thinning-content">
              <div className={`thinning-chip thinning-${result.thinningLevel.toLowerCase()}`}>
                {result.thinningLevel}
              </div>
              <div className="thinning-bar">
                <div
                  className="thinning-fill"
                  style={{ width: `${getThinningPercent(result.thinningLevel)}%` }}
                ></div>
              </div>
              <p className="thinning-description">
                Indicates the level of visible thinning based on the image provided.
              </p>
            </div>
          </div>

          {/* Pattern Analysis Card */}
          <div className="result-card pattern-card">
            <div className="card-header">
              <h3>
                Pattern Analysis
                <span className="info-tooltip" title="Reference-based pattern classification for awareness">ⓘ</span>
              </h3>
              <span className="card-subtitle">Reference-based classification</span>
            </div>

            <div className="pattern-content">
              <div className="pattern-type">
                <label>Detected Pattern:</label>
                <p className="pattern-value">{result.patternType}</p>
                <p className="pattern-note">
                  This uses reference classifications (Norwood/Ludwig-inspired) for educational awareness only.
                </p>
              </div>
            </div>
          </div>

          {/* Hair Type Card */}
          <div className="result-card hair-type-card">
            <div className="card-header">
              <h3>
                Hair Type
                <span className="info-tooltip" title="Rule-based estimate of hair/scalp type">ⓘ</span>
              </h3>
              <span className="card-subtitle">Oily • Dry • Normal</span>
            </div>

            <div className="hair-type-content">
              <div className={`hair-type-chip hair-type-${result.hairType.toLowerCase()}`}>
                {result.hairType}
              </div>
              <p className="hair-type-description">
                This classification is based on visual cues and should be treated as educational only.
              </p>
            </div>
          </div>

          {/* Condition Signals Card */}
          <div className="result-card condition-card">
            <div className="card-header">
              <h3>
                Condition Signals
                <span className="info-tooltip" title="Rule-based risk signals for awareness">ⓘ</span>
              </h3>
              <span className="card-subtitle">Hair loss & dandruff signals</span>
            </div>
            <div className="condition-grid">
              <div className="condition-item">
                <span className="condition-label">Hair Loss Risk</span>
                <span className={`condition-chip ${getRiskClass(result.hairLossRisk)}`}>
                  {result.hairLossRisk}
                </span>
              </div>
              <div className="condition-item">
                <span className="condition-label">Dandruff Risk</span>
                <span className={`condition-chip ${getRiskClass(result.dandruffRisk)}`}>
                  {result.dandruffRisk}
                </span>
              </div>
            </div>
            <p className="condition-description">
              These signals are awareness-based and can be influenced by lighting and image quality.
            </p>
          </div>

          {/* Confidence Score Card */}
          <div className="result-card confidence-card">
            <div className="card-header">
              <h3>Analysis Confidence</h3>
              <span className="card-subtitle">Model reliability assessment</span>
            </div>

            <div className="confidence-container">
              <div className={`confidence-bar confidence-${getConfidenceColor(result.confidence)}`}>
                <div
                  className="confidence-fill"
                  style={{ width: `${result.confidence}%` }}
                  aria-valuenow={result.confidence}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                ></div>
              </div>
              <p className="confidence-text">{result.confidence}% confidence</p>
              <p className="confidence-description">
                Higher confidence indicates stronger image quality and clearer analysis. Professional
                consultation recommended regardless.
              </p>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="insights-section">
          <h2>Analysis Insights</h2>
          <div className="insights-list">
            {result.insights && result.insights.length > 0 ? (
              result.insights.map((insight, idx) => (
                <div key={idx} className="insight-item">
                  <span className="insight-icon">💡</span>
                  <p>{insight}</p>
                </div>
              ))
            ) : (
              <p>No specific insights available.</p>
            )}
          </div>
        </div>

        {/* Next Steps Section */}
        {result.nextSteps && result.nextSteps.length > 0 && (
          <div className="next-steps-section">
            <h2>Recommended Next Steps</h2>
            <p className="next-steps-intro">
              Based on your analysis results, here are suggested actions to consider:
            </p>
            <div className="next-steps-list">
              {result.nextSteps.map((step, idx) => (
                <div key={idx} className="next-step-item">
                  <span className="step-number">{idx + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monetization Placeholders */}
        <AdPlaceholder label="Sponsored Content" />
        <AffiliateProducts />
        <PremiumCTA />

        {/* Educational Resources */}
        {result.resources && result.resources.length > 0 && (
          <div className="resources-section">
            <h2>Educational Resources</h2>
            <p className="resources-intro">
              Learn more from trusted sources about scalp health and hair awareness:
            </p>
            <div className="resources-list">
              {result.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  <span className="resource-icon">📚</span>
                  <span className="resource-title">{resource.title}</span>
                  <span className="resource-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* What This Means Section */}
        <div className="interpretation-section">
          <h2>Understanding Your Results</h2>

          <div className="interpretation-grid">
            <div className="interpretation-item">
              <h4>✓ What This Assessment Covers</h4>
              <p>
                Visual analysis of scalp coverage, pattern recognition using reference scales, and image
                quality assessment. These are awareness-based tools for informational purposes.
              </p>
            </div>

            <div className="interpretation-item">
              <h4>✗ What This Isn't</h4>
              <p>
                Medical diagnosis, treatment recommendation, or a substitute for professional medical advice.
                Always consult qualified healthcare professionals for medical concerns.
              </p>
            </div>

            <div className="interpretation-item">
              <h4>⚠ Important Limitations</h4>
              <p>
                Results depend on image quality, lighting, angle, and other factors. Seasonal variations,
                stress, and numerous other factors affect hair appearance and should be considered.
              </p>
            </div>

            <div className="interpretation-item">
              <h4>📋 Next Steps</h4>
              <p>
                If you have scalp or hair health concerns, schedule an appointment with a dermatologist or
                qualified healthcare provider to discuss these results in context.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="results-actions">
          <Button size="lg" variant="primary" onClick={() => navigate(ROUTES.UPLOAD)}>
            Analyze Another Image
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate(ROUTES.HOME)}>
            Back to Home
          </Button>
        </div>

        {/* Privacy Reminder */}
        <div className="privacy-reminder">
          <DisclaimerBadge variant="subtle" text={DISCLAIMERS.PRIVACY} />
          <DisclaimerBadge variant="subtle" text={DISCLAIMERS.DATA_RETENTION} />
        </div>
      </div>
    </div>
  );
};
