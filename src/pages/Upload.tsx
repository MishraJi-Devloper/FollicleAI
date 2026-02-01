/**
 * Upload Component
 * Image upload with client-side validation and consent flow
 * Integrates FormData-based image submission with mock/real AI backend
 */

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { DisclaimerBadge } from '../components/common/DisclaimerBadge';
import { SkeletonCard } from '../components/SkeletonLoader';
import { SEO } from '../components/SEO';
import { analysisService } from '../services/analysisService';
import type { UploadState, AnalysisResult } from '../types/analysis';
import { UI_STRINGS, LIMITS, DISCLAIMERS, ROUTES } from '../constants';
import './Upload.css';

interface UploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

export const Upload: React.FC<UploadProps> = ({ onAnalysisComplete }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    preview: null,
    isProcessing: false,
    error: null,
    uploadProgress: 0,
  });

  const [userConsent, setUserConsent] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  /**
   * Handle file selection
   */
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadState((prev) => ({ ...prev, error: null }));
    setValidationWarnings([]);

    // Check file size immediately
    if (file.size > LIMITS.MAX_FILE_SIZE_BYTES) {
      setUploadState((prev) => ({
        ...prev,
        error: UI_STRINGS.ERRORS.FILE_TOO_LARGE,
      }));
      return;
    }

    // Check file format
    if (!LIMITS.ACCEPTED_FORMATS.includes(file.type)) {
      setUploadState((prev) => ({
        ...prev,
        error: UI_STRINGS.ERRORS.UNSUPPORTED_FORMAT,
      }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setUploadState((prev) => ({
        ...prev,
        file,
        preview,
      }));

      // Validate image dimensions after preview loads
      if (imageRef.current) {
        imageRef.current.onload = async () => {
          const validation = analysisService.validateImage(file, imageRef.current!);
          if (!validation.isValid) {
            setUploadState((prev) => ({
              ...prev,
              error: validation.error || UI_STRINGS.ERRORS.INVALID_IMAGE,
            }));
            return;
          }

          // Compress image for faster analysis
          const compression = await analysisService.compressImage(file, imageRef.current!);

          setUploadState((prev) => ({
            ...prev,
            file: compression.file,
            preview: compression.dataUrl,
          }));

          const compressionNote = compression.wasCompressed
            ? ['Image optimized for faster analysis.']
            : [];

          setValidationWarnings([...validation.warnings, ...compressionNote]);
        };
      }
    };

    reader.onerror = () => {
      setUploadState((prev) => ({
        ...prev,
        error: 'Failed to read file',
      }));
    };

    reader.readAsDataURL(file);
  };

  /**
   * Handle drag and drop
   */
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;

        const changeEvent = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(changeEvent);
      }
    }
  };

  /**
   * Handle analysis submission
   * Uses FormData for proper multipart/form-data upload
   */
  const handleAnalyze = async () => {
    if (!uploadState.file) {
      setUploadState((prev) => ({
        ...prev,
        error: 'Please select an image',
      }));
      return;
    }

    if (!userConsent) {
      setUploadState((prev) => ({
        ...prev,
        error: UI_STRINGS.ERRORS.CONSENT_REQUIRED,
      }));
      return;
    }

    setUploadState((prev) => ({
      ...prev,
      isProcessing: true,
      error: null,
    }));

    try {
      console.log('Starting analysis with file:', uploadState.file.name, uploadState.file.size);
      
      // analyzeImage handles FormData upload internally
      // If localhost: uses mock backend with 1.5s simulated delay
      // If production: sends to real /analyze endpoint
      const result = await analysisService.analyzeImage(uploadState.file, userConsent);
      
      console.log('Analysis complete, navigating to results', result);
      
      // Pass result to parent and navigate to results page
      onAnalysisComplete(result);
      navigate(ROUTES.RESULTS);
    } catch (error) {
      console.error('Analysis error:', error);
      const errorMessage =
        error instanceof Error ? error.message : UI_STRINGS.ERRORS.ANALYSIS_ERROR;
      setUploadState((prev) => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
      }));
    }
  };

  /**
   * Handle clear/reset
   */
  const handleClear = () => {
    setUploadState({
      file: null,
      preview: null,
      isProcessing: false,
      error: null,
      uploadProgress: 0,
    });
    setUserConsent(false);
    setValidationWarnings([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="upload-page">
      <SEO
        title="Hair Analysis Upload"
        description="Upload a scalp image for AI-powered hair density, thinning level, and scalp health awareness results."
        path={ROUTES.UPLOAD}
      />
      <div className="upload-container">
        {/* Header */}
        <div className="upload-header">
          <h1>{UI_STRINGS.PAGES.UPLOAD.TITLE}</h1>
          <p>{UI_STRINGS.PAGES.UPLOAD.INSTRUCTIONS}</p>

          <DisclaimerBadge variant="prominent" text={DISCLAIMERS.PRIMARY} />
        </div>

        {/* Upload Area */}
        <div className="upload-content">
          {!uploadState.preview ? (
            // Upload drop zone
            <div
              className="upload-dropzone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => {
                console.log('Dropzone clicked, triggering file input');
                fileInputRef.current?.click();
              }}
              onTouchEnd={() => {
                console.log('Dropzone touched, triggering file input');
                fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload image"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  fileInputRef.current?.click();
                }
              }}
            >
              <div className="dropzone-content">
                <span className="dropzone-icon">📸</span>
                <h3>Upload Scalp Image</h3>
                <p>Tap or click to select</p>
                <p className="dropzone-hint">JPG, PNG, WebP up to 10MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept={LIMITS.ACCEPTED_EXTENSIONS.join(',')}
                capture="environment"
                onChange={(e) => {
                  console.log('File input changed:', e.target.files?.length, 'files selected');
                  handleFileSelect(e);
                }}
                aria-label="Select image file"
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            // Preview
            <div className="upload-preview">
              <div className="preview-image-wrapper">
                <img
                  ref={imageRef}
                  src={uploadState.preview}
                  alt="Scalp preview"
                  className="preview-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="preview-info">
                <h3>Preview</h3>
                <p className="file-name">{uploadState.file?.name}</p>
                <p className="file-size">
                  Size: {(uploadState.file!.size / 1024).toFixed(2)} KB
                </p>

                {validationWarnings.length > 0 && (
                  <div className="warnings">
                    <h4>⚠ Warnings:</h4>
                    <ul>
                      {validationWarnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="preview-actions">
                  <Button variant="secondary" onClick={handleClear} disabled={uploadState.isProcessing}>
                    Choose Different Image
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {uploadState.error && (
            <div className="error-message" role="alert">
              <span>❌</span>
              <span>{uploadState.error}</span>
            </div>
          )}

          {/* Processing/Loading State */}
          {uploadState.isProcessing && (
            <div className="processing-state">
              <SkeletonCard />
              <p className="processing-message">
                ⏳ Analyzing your image... This may take a few moments.
              </p>
            </div>
          )}

          {/* Consent Checkbox */}
          <div className="consent-section">
            <label className="consent-label">
              <input
                type="checkbox"
                checked={userConsent}
                onChange={(e) => setUserConsent(e.target.checked)}
                disabled={!uploadState.preview || uploadState.isProcessing}
                aria-label="Accept terms and privacy policy"
              />
              <span className="consent-text">{UI_STRINGS.PAGES.UPLOAD.CONSENT_LABEL}</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="upload-actions">
            {uploadState.preview && (
              <Button
                size="lg"
                variant="primary"
                onClick={handleAnalyze}
                disabled={!userConsent || uploadState.isProcessing}
                isLoading={uploadState.isProcessing}
              >
                {UI_STRINGS.PAGES.UPLOAD.ANALYZE_BUTTON}
              </Button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="upload-footer">
          <DisclaimerBadge variant="subtle" text={DISCLAIMERS.PRIVACY} />
          <DisclaimerBadge variant="subtle" text={DISCLAIMERS.DATA_RETENTION} />
        </div>
      </div>
    </div>
  );
};
