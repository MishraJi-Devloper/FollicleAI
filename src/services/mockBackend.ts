/**
 * Mock AI Backend for Testing & Development
 * Simulates real backend responses without requiring actual API
 * Safe, non-medical, awareness-based responses only
 */

import type { AIAnalysisResponse } from '../types/analysis';

/**
 * Generate a UUID for analysis ID
 */
function generateId(): string {
  // Simple UUID v4 generation without external library
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Create a deterministic but varied hash from file properties
 */
async function hashFile(file: File): Promise<number> {
  // Read first 8KB of file to create unique hash
  const slice = file.slice(0, 8192);
  const buffer = await slice.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  
  let hash = file.size;
  for (let i = 0; i < Math.min(bytes.length, 100); i++) {
    hash = ((hash << 5) - hash) + bytes[i];
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Add filename influence
  for (let i = 0; i < file.name.length; i++) {
    hash = ((hash << 5) - hash) + file.name.charCodeAt(i);
    hash = hash & hash;
  }
  
  return Math.abs(hash);
}

/**
 * Analyze image using mock AI logic
 * Returns truly varied results based on actual image characteristics
 */
export async function mockAIAnalysis(file: File): Promise<AIAnalysisResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1800));

  // Generate deterministic hash from file content
  const hash = await hashFile(file);
  
  // Use hash to generate varied, realistic results
  const densityBase = 35 + (hash % 55); // Range: 35-90
  const confidenceBase = 65 + (hash % 30); // Range: 65-95
  const processingTime = 1100 + (hash % 800); // Range: 1100-1900ms

  // Derived metrics
  const scalpHealthScore = Math.min(
    95,
    Math.max(35, Math.round(densityBase * 0.6 + confidenceBase * 0.4 + (hash % 10) - 5))
  );
  const hairTypeIndex = hash % 3;
  const hairType = hairTypeIndex === 0 ? 'Normal' : hairTypeIndex === 1 ? 'Oily' : 'Dry';
  const thinningLevel = densityBase >= 70 ? 'Low' : densityBase >= 50 ? 'Medium' : 'High';
  const hairLossRisk = densityBase >= 70 ? 'Low' : densityBase >= 55 ? 'Medium' : 'High';
  const dandruffRisk =
    hairType === 'Dry'
      ? (hash % 2 === 0 ? 'High' : 'Medium')
      : hairType === 'Oily'
        ? (hash % 2 === 0 ? 'Medium' : 'Low')
        : 'Low';
  
  // Determine pattern based on density
  let patternType: string;
  let insights: string[];
  let nextSteps: string[];
  
  if (densityBase >= 75) {
    // Excellent/Healthy density
    patternType = 'normal_density';
    insights = [
      'Hair density appears to be in a healthy range based on visual analysis.',
      'Scalp coverage is relatively uniform across the visible area.',
      'No significant pattern changes detected in this assessment.',
      'Current hair characteristics suggest normal follicular activity.',
    ];
    nextSteps = [
      'Maintain current hair care routine and healthy lifestyle habits.',
      'Consider periodic monitoring to track any future changes.',
      'Continue protecting scalp from sun exposure and harsh treatments.',
    ];
  } else if (densityBase >= 60) {
    // Good density with minor variations
    patternType = 'slight_variation';
    insights = [
      'Overall hair density remains in a good range.',
      'Minor variations in density detected across different areas.',
      'Some natural fluctuation is visible, which can be age-related.',
      'Scalp visibility is minimal in most areas.',
    ];
    nextSteps = [
      'Monitor changes over the next 3-6 months for any progression.',
      'Consider consulting a dermatologist for personalized advice.',
      'Evaluate current stress levels and nutritional habits.',
      'Document progress with periodic photos for comparison.',
    ];
  } else if (densityBase >= 45) {
    // Moderate thinning
    patternType = 'moderate_thinning';
    insights = [
      'Noticeable reduction in hair density compared to typical ranges.',
      'Pattern suggests gradual changes in hair characteristics.',
      'Some areas show more scalp visibility than others.',
      'This level of change is commonly associated with various factors.',
    ];
    nextSteps = [
      'Professional consultation recommended for baseline assessment.',
      'Discuss potential contributing factors with a healthcare provider.',
      'Consider blood work to rule out nutritional deficiencies.',
      'Explore evidence-based hair care approaches with a specialist.',
    ];
  } else {
    // Significant thinning
    patternType = 'significant_thinning';
    insights = [
      'Significant reduction in hair density detected across the visible area.',
      'Pattern changes are prominent and likely progressive.',
      'Scalp is highly visible in multiple zones.',
      'Early intervention may help address contributing factors.',
    ];
    nextSteps = [
      'Consult a board-certified dermatologist as soon as possible.',
      'Request comprehensive evaluation including scalp examination.',
      'Discuss medical history and potential underlying causes.',
      'Explore clinically-proven treatment options with your provider.',
      'Consider lifestyle factors: stress, nutrition, and sleep quality.',
    ];
  }
  
  // Add randomized additional insights
  const additionalInsights = [
    'Image quality was sufficient for analysis.',
    'Lighting conditions allowed for clear assessment.',
    'Multiple hair characteristics were evaluated.',
    'Analysis focused on visible density patterns.',
  ];
  
  // Randomly add 0-2 additional insights
  const insightCount = hash % 3;
  for (let i = 0; i < insightCount; i++) {
    const index = (hash + i * 7) % additionalInsights.length;
    insights.push(additionalInsights[index]);
  }

  const response: AIAnalysisResponse = {
    id: generateId(),
    hair_density_score: densityBase,
    pattern_type: patternType,
    thinning_level: thinningLevel,
    scalp_health_score: scalpHealthScore,
    hair_type: hairType,
    hair_loss_risk: hairLossRisk,
    dandruff_risk: dandruffRisk,
    confidence: confidenceBase,
    insights: insights,
    next_steps: nextSteps,
    educational_resources: [
      'https://www.aad.org/public/diseases/hair-loss',
      'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6380979/',
      'https://www.hopkinsmedicine.org/health/conditions-and-diseases/hair-loss',
    ],
    analysis_timestamp: new Date().toISOString(),
    processing_time_ms: processingTime,
  };

  return response;
}
