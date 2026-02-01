/**
 * Type definitions for FollicleAI analysis platform
 * Complete typing for all API requests and responses
 */

// ============================================
// IMAGE UPLOAD & VALIDATION
// ============================================

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
  warnings: string[];
}

// ============================================
// AI ANALYSIS PIPELINE
// ============================================

/**
 * AI Analysis Response from Backend
 * Safe, non-medical, awareness-based format
 */
export interface AIAnalysisResponse {
  id: string;
  hair_density_score: number; // 0-100
  pattern_type: string;
  thinning_level: 'Low' | 'Medium' | 'High';
  scalp_health_score: number; // 0-100
  hair_type: 'Oily' | 'Dry' | 'Normal';
  hair_loss_risk: 'Low' | 'Medium' | 'High';
  dandruff_risk: 'Low' | 'Medium' | 'High';
  confidence: number; // 0-100
  insights: string[]; // Educational insights (non-diagnostic)
    next_steps?: string[]; // Recommended actions based on results
  educational_resources: string[]; // Links to trusted sources
  analysis_timestamp: string;
  processing_time_ms: number;
}

/**
 * Frontend-friendly formatting of AI response
 */
export interface AnalysisResult {
  id: string;
  densityScore: number;
  densityCategory: 'Low' | 'Moderate' | 'High' | 'Healthy' | 'Good';
  patternType: string;
  thinningLevel: 'Low' | 'Medium' | 'High';
  scalpHealthScore: number;
  hairType: 'Oily' | 'Dry' | 'Normal';
  hairLossRisk: 'Low' | 'Medium' | 'High';
  dandruffRisk: 'Low' | 'Medium' | 'High';
  confidence: number;
  insights: string[];
    nextSteps?: string[];
  resources: EducationalResource[];
  timestamp: string;
  processingTime: number;
}

/**
 * Educational resource with title and URL
 */
export interface EducationalResource {
  title: string;
  url: string;
}

// ============================================
// COMPONENT STATE
// ============================================

export interface UploadState {
  file: File | null;
  preview: string | null;
  isProcessing: boolean;
  error: string | null;
  uploadProgress: number; // 0-100
}

export interface AnalysisState {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

// ============================================
// API RESPONSES
// ============================================

export interface ApiErrorResponse {
  error: string;
  code: string;
  timestamp: string;
}

export interface AnalyzeEndpointResponse {
  success: boolean;
  data?: AIAnalysisResponse;
  error?: ApiErrorResponse;
}
