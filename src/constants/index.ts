/**
 * Core disclaimers, constants, and static copy
 * CRITICAL: All medical-related language is carefully worded as "awareness" or "decision-support"
 */

export const DISCLAIMERS = {
  PRIMARY: `FollicleAI is NOT a medical diagnostic tool. This analysis is for awareness and decision-support only. 
  It does not provide medical diagnosis, treatment recommendations, or professional medical advice. 
  Please consult a healthcare professional for any scalp or hair concerns.`,

  PRIVACY: `Your uploaded images are processed on our secure servers and are NOT stored or shared with third parties 
  unless explicitly authorized. We do not use facial recognition. Your privacy is our priority.`,

  NOT_MEDICAL: `This tool provides pattern awareness and density analysis. It is NOT a substitute for professional medical consultation.`,

  DATA_RETENTION: `Images are deleted within 24 hours of analysis completion. Anonymized analysis metadata may be retained for product improvement.`,
};

export const LIMITS = {
  MAX_FILE_SIZE_MB: 10,
  MAX_FILE_SIZE_BYTES: 10 * 1024 * 1024,
  ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
  MIN_IMAGE_WIDTH: 400,
  MIN_IMAGE_HEIGHT: 400,
  MAX_IMAGE_WIDTH: 4096,
  MAX_IMAGE_HEIGHT: 4096,
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT_MS: 30000,
  ENDPOINTS: {
    ANALYZE: '/analysis/upload',
    HEALTH: '/health',
  },
};

export const SITE = {
  NAME: 'FollicleAI',
  DESCRIPTION: 'AI-powered hair and scalp analysis for awareness, not diagnosis. Upload a scalp photo to get density, thinning level, and scalp health insights.',
  URL: import.meta.env.VITE_SITE_URL || 'https://follicleai.com',
  OG_IMAGE: '/logo.svg',
};

export const UI_STRINGS = {
  PAGES: {
    HOME: {
      HERO_TITLE: 'Scalp & Hair Analysis Powered by AI',
      HERO_SUBTITLE: 'Get awareness-based insights about your hair and scalp health',
      CTA_PRIMARY: 'Start Analysis',
      TRUST_BADGE: 'Privacy-first • Non-medical • Evidence-informed',
    },
    HOW_IT_WORKS: {
      TITLE: 'How It Works',
      STEP_1: 'Upload a clear photo of your scalp',
      STEP_2: 'Our AI analyzes pattern and density',
      STEP_3: 'Review awareness-based insights',
    },
    UPLOAD: {
      TITLE: 'Upload Scalp Image',
      INSTRUCTIONS: 'Upload a clear, well-lit photo of your scalp. Face recognition is not used.',
      CONSENT_LABEL: 'I understand this is NOT medical diagnosis and agree to the privacy policy',
      ANALYZE_BUTTON: 'Analyze',
    },
    RESULTS: {
      TITLE: 'Analysis Results',
      NEXT_STEPS: 'Consider consulting a healthcare professional for personalized advice.',
      NEW_ANALYSIS: 'Start New Analysis',
    },
  },
  ERRORS: {
    UPLOAD_FAILED: 'Upload failed. Please try again.',
    INVALID_IMAGE: 'Invalid image. Please ensure it meets quality requirements.',
    FILE_TOO_LARGE: 'File size exceeds 10MB limit.',
    UNSUPPORTED_FORMAT: 'Unsupported file format. Use JPG, PNG, or WebP.',
    ANALYSIS_ERROR: 'Analysis failed. Please try again.',
    CONSENT_REQUIRED: 'Please accept the terms to continue.',
  },
};

export const ROUTES = {
  HOME: '/',
  HOW_IT_WORKS: '/how-it-works',
  UPLOAD: '/hair-analysis',
  SCALP_CHECKER: '/scalp-health-checker',
  RESULTS: '/analysis-results',
  PRICING: '/pricing',
  PRIVACY: '/privacy',
  DISCLAIMER: '/disclaimer',
  TERMS: '/terms',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
};
