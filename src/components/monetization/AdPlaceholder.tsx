/**
 * AdSense Placeholder
 * Reserved space for future ad integration (not active).
 */

import React from 'react';
import './Monetization.css';

interface AdPlaceholderProps {
  label?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ label = 'Ad Placeholder' }) => {
  return (
    <div className="ad-placeholder" role="complementary" aria-label={label}>
      <span>{label}</span>
      <small>Google AdSense slot (future)</small>
    </div>
  );
};
