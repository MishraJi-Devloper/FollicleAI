/**
 * Footer Component
 * Standard footer with legal links and disclaimers
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, DISCLAIMERS } from '../../constants';
import './Footer.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About FollicleAI</h3>
          <p>
            A privacy-first, AI-powered platform for hair and scalp awareness. We provide insights
            for decision-support only—not medical diagnosis.
          </p>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul className="footer-links">
            <li>
              <Link to={ROUTES.PRICING}>Pricing</Link>
            </li>
            <li>
              <Link to={ROUTES.BLOG}>Blog</Link>
            </li>
            <li>
              <Link to={ROUTES.DISCLAIMER}>Medical Disclaimer</Link>
            </li>
            <li>
              <Link to={ROUTES.PRIVACY}>Privacy Policy</Link>
            </li>
            <li>
              <Link to={ROUTES.TERMS}>Terms</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <p className="footer-contact">
            <a href="mailto:support@follicleai.com">support@follicleai.com</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {currentYear} FollicleAI. All rights reserved.
        </p>
        <div className="footer-disclaimer">
          <strong>Medical Disclaimer:</strong> {DISCLAIMERS.NOT_MEDICAL}
        </div>
      </div>
    </footer>
  );
};
