/**
 * Analysis Service - Handles all AI analysis communication
 * Supports real backend and mock mode for testing
 */

import axios, { type AxiosInstance } from 'axios';
import type { ImageValidationResult, AIAnalysisResponse, AnalysisResult } from '../types/analysis';
import { API_CONFIG, LIMITS } from '../constants';
import { mockAIAnalysis } from './mockBackend';

class AnalysisService {
  private apiClient: AxiosInstance;
  private useMockBackend: boolean;

  constructor() {
    this.apiClient = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT_MS,
      headers: {
        'Accept': 'application/json',
        // Note: Don't set Content-Type for FormData - browser will set it
      },
    });

    // Use mock backend if API URL is localhost
    this.useMockBackend = API_CONFIG.BASE_URL.includes('localhost');
  }

  /**
   * Validate image before upload
   */
  validateImage(file: File, previewImage: HTMLImageElement): ImageValidationResult {
    const warnings: string[] = [];

    // Check file size
    if (file.size > LIMITS.MAX_FILE_SIZE_BYTES) {
      return {
        isValid: false,
        error: `File exceeds ${LIMITS.MAX_FILE_SIZE_MB}MB limit`,
        warnings,
      };
    }

    // Check file format
    if (!LIMITS.ACCEPTED_FORMATS.includes(file.type)) {
      return {
        isValid: false,
        error: 'Unsupported file format. Use JPG, PNG, or WebP.',
        warnings,
      };
    }

    // Check image dimensions
    const width = previewImage.naturalWidth;
    const height = previewImage.naturalHeight;

    if (width < LIMITS.MIN_IMAGE_WIDTH || height < LIMITS.MIN_IMAGE_HEIGHT) {
      return {
        isValid: false,
        error: `Image too small. Minimum ${LIMITS.MIN_IMAGE_WIDTH}x${LIMITS.MIN_IMAGE_HEIGHT}px`,
        warnings,
      };
    }

    // Warn if image is very large
    if (width > LIMITS.MAX_IMAGE_WIDTH || height > LIMITS.MAX_IMAGE_HEIGHT) {
      warnings.push('Large image may take longer to process');
    }

    // Warn about low resolution
    if (width < 600 || height < 600) {
      warnings.push('Low resolution may affect accuracy');
    }

    // Lighting and blur checks (client-side)
    const quality = this.analyzeImageQuality(previewImage);
    if (quality.error) {
      return {
        isValid: false,
        error: quality.error,
        warnings: [...warnings, ...quality.warnings],
      };
    }

    warnings.push(...quality.warnings);

    return {
      isValid: true,
      warnings,
    };
  }

  /**
   * Analyze image brightness/blur for basic quality assurance
   */
  private analyzeImageQuality(image: HTMLImageElement): { warnings: string[]; error?: string } {
    const warnings: string[] = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      return { warnings };
    }

    const sampleSize = 200;
    const scale = Math.min(sampleSize / image.naturalWidth, sampleSize / image.naturalHeight, 1);
    canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale));
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let brightnessSum = 0;
    let brightnessSqSum = 0;

    // Compute brightness statistics
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / 3;
      brightnessSum += brightness;
      brightnessSqSum += brightness * brightness;
    }

    const pixelCount = data.length / 4;
    const meanBrightness = brightnessSum / pixelCount;
    const varianceBrightness = brightnessSqSum / pixelCount - meanBrightness * meanBrightness;

    if (meanBrightness < 40) {
      return { warnings, error: 'Image is too dark. Please use brighter lighting.' };
    }
    if (meanBrightness < 70) {
      warnings.push('Lighting appears low. Consider a brighter image for better accuracy.');
    }
    if (meanBrightness > 220) {
      warnings.push('Image looks overexposed. Reduce brightness or avoid direct glare.');
    }
    if (varianceBrightness < 300) {
      warnings.push('Low contrast detected. Improve lighting or reduce glare.');
    }

    // Blur detection via variance of Laplacian
    let laplacianSum = 0;
    let laplacianSqSum = 0;
    const width = canvas.width;
    const height = canvas.height;

    const getGray = (x: number, y: number) => {
      const idx = (y * width + x) * 4;
      return (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
    };

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const center = getGray(x, y);
        const laplacian =
          4 * center - getGray(x - 1, y) - getGray(x + 1, y) - getGray(x, y - 1) - getGray(x, y + 1);
        laplacianSum += laplacian;
        laplacianSqSum += laplacian * laplacian;
      }
    }

    const laplacianCount = (width - 2) * (height - 2);
    const laplacianMean = laplacianSum / laplacianCount;
    const laplacianVariance = laplacianSqSum / laplacianCount - laplacianMean * laplacianMean;

    if (laplacianVariance < 45) {
      return { warnings, error: 'Image appears too blurry. Please use a sharper photo.' };
    }
    if (laplacianVariance < 90) {
      warnings.push('Slight blur detected. Results may be less accurate.');
    }

    return { warnings };
  }

  /**
   * Compress image client-side to improve performance
   */
  async compressImage(
    file: File,
    image: HTMLImageElement
  ): Promise<{ file: File; dataUrl: string; wasCompressed: boolean }> {
    const maxDimension = 1600;
    const scale = Math.min(maxDimension / image.naturalWidth, maxDimension / image.naturalHeight, 1);

    // Only compress if image is large or file is heavy
    if (scale === 1 && file.size < 1.5 * 1024 * 1024) {
      return { file, dataUrl: image.src, wasCompressed: false };
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return { file, dataUrl: image.src, wasCompressed: false };
    }

    canvas.width = Math.floor(image.naturalWidth * scale);
    canvas.height = Math.floor(image.naturalHeight * scale);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const quality = 0.82;
    const dataUrl = canvas.toDataURL('image/jpeg', quality);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', quality)
    );

    if (!blob) {
      return { file, dataUrl: image.src, wasCompressed: false };
    }

    const optimizedFile = new File([blob], `${file.name.replace(/\.[^.]+$/, '')}-optimized.jpg`, {
      type: 'image/jpeg',
    });

    return { file: optimizedFile, dataUrl, wasCompressed: true };
  }

  /**
   * Analyze image using FormData upload
   * Supports both real backend and mock mode
   */
  async analyzeImage(file: File, userConsent: boolean): Promise<AnalysisResult> {
    try {
      // Create FormData instead of Base64
      const formData = new FormData();
      formData.append('image', file);
      formData.append('user_consent', String(userConsent));
      formData.append('timestamp', String(Date.now()));

      let response;

      if (this.useMockBackend) {
        // Use mock backend for development/testing
        console.log('Using mock backend for analysis');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        response = await mockAIAnalysis(file);
      } else {
        // Call real backend
        const axiosResponse = await this.apiClient.post<AIAnalysisResponse>(
          '/analyze',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        response = axiosResponse.data;
      }

      // Transform backend response to frontend format
      return this.transformResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.error || 'Analysis failed. Please try again.';
        throw new Error(message);
      }
      throw error;
    }
  }

  /**
   * Transform backend response to frontend format
   */
  private transformResponse(aiResponse: AIAnalysisResponse): AnalysisResult {
    // Convert URL strings to EducationalResource objects
    const resources = aiResponse.educational_resources.map((url) => ({
      title: this.extractTitleFromUrl(url),
      url: url,
    }));

    return {
      id: aiResponse.id,
      densityScore: aiResponse.hair_density_score,
      densityCategory: this.getDensityCategory(aiResponse.hair_density_score),
      patternType: this.formatPatternType(aiResponse.pattern_type),
      thinningLevel: aiResponse.thinning_level,
      scalpHealthScore: aiResponse.scalp_health_score,
      hairType: aiResponse.hair_type,
      hairLossRisk: aiResponse.hair_loss_risk,
      dandruffRisk: aiResponse.dandruff_risk,
      confidence: aiResponse.confidence,
      insights: aiResponse.insights,
      nextSteps: aiResponse.next_steps,
      resources,
      timestamp: aiResponse.analysis_timestamp,
      processingTime: aiResponse.processing_time_ms,
    };
  }

  /**
   * Extract a readable title from URL
   */
  private extractTitleFromUrl(url: string): string {
    try {
      const pathname = new URL(url).pathname;
      const parts = pathname.split('/').filter((p) => p);
      const lastPart = parts[parts.length - 1] || 'Resource';
      return lastPart
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } catch {
      return 'Educational Resource';
    }
  }

  /**
   * Map density score to category
   */
  private getDensityCategory(score: number): 'Low' | 'Moderate' | 'Good' | 'Healthy' {
    if (score >= 75) return 'Healthy';
    if (score >= 60) return 'Good';
    if (score >= 45) return 'Moderate';
    return 'Low';
  }

  /**
   * Format pattern type for display
   */
  private formatPatternType(pattern: string): string {
    const patterns: Record<string, string> = {
      early_thinning: 'Early Thinning Pattern',
      moderate_thinning: 'Moderate Thinning Pattern',
      advanced_thinning: 'Advanced Thinning Pattern',
      normal_density: 'Normal Density',
      slight_variation: 'Slight Density Variation',
      significant_thinning: 'Significant Thinning Pattern',
    };
    return patterns[pattern] || pattern;
  }

  /**
   * Health check for API connectivity
   */
  async checkHealth(): Promise<boolean> {
    try {
      await this.apiClient.get('/health');
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton
export const analysisService = new AnalysisService();
