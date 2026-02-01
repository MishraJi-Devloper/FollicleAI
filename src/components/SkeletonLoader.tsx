/**
 * Skeleton Loader Component
 * Professional loading state indicator
 */

import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'card' | 'circle';
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = '1rem',
  variant = 'text',
  className = '',
}) => {
  return (
    <div
      className={`skeleton-loader skeleton-${variant} ${className}`}
      style={{
        width,
        height,
      }}
      aria-busy="true"
      aria-label="Loading..."
    />
  );
};

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 3 }) => {
  return (
    <div className="skeleton-card">
      <SkeletonLoader variant="circle" width="60px" height="60px" />
      <div className="skeleton-card-content">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonLoader key={i} width={`${100 - i * 20}%`} height="1rem" className="mb-2" />
        ))}
      </div>
    </div>
  );
};
