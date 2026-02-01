/**
 * Disclaimer Badge Component
 * Displays prominent medical disclaimers throughout the app
 */

import React from 'react';
import './DisclaimerBadge.css';

interface DisclaimerBadgeProps {
  variant?: 'prominent' | 'subtle' | 'inline';
  text: string;
}

export const DisclaimerBadge: React.FC<DisclaimerBadgeProps> = ({
  variant = 'subtle',
  text,
}) => {
  return (
    <div className={`disclaimer-badge disclaimer-${variant}`} role="status">
      <span className="disclaimer-icon">⚠</span>
      <p>{text}</p>
    </div>
  );
};
