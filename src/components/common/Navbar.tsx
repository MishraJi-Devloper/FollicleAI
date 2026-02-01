/**
 * Navbar Component
 * Modern glassmorphic navigation header with responsive mobile menu
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import { ROUTES } from '../../constants';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string): boolean => {
    if (path === ROUTES.BLOG) {
      return location.pathname.startsWith(ROUTES.BLOG);
    }
    return location.pathname === path;
  };

  // Close menu when link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar glass" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo / Brand */}
        <Link to={ROUTES.HOME} className="navbar-brand" onClick={handleLinkClick}>
          <img
            src="/logo.svg"
            alt="FollicleAI Logo"
            className="navbar-logo"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <ul
          className={`navbar-links ${isMenuOpen ? 'open' : ''}`}
          id="navbar-menu"
        >
          <li>
            <Link
              to={ROUTES.HOME}
              className={`nav-link ${isActive(ROUTES.HOME) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.HOW_IT_WORKS}
              className={`nav-link ${isActive(ROUTES.HOW_IT_WORKS) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              How It Works
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.PRICING}
              className={`nav-link ${isActive(ROUTES.PRICING) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Pricing <span className="coming-soon-badge">Soon</span>
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.BLOG}
              className={`nav-link ${isActive(ROUTES.BLOG) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.UPLOAD}
              className={`nav-link nav-link-primary ${isActive(ROUTES.UPLOAD) ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              🚀 Analyze
            </Link>
          </li>
        </ul>

        {/* Right side actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* Links */}
          <ul className="navbar-links-secondary">
            <li>
              <Link
                to={ROUTES.DISCLAIMER}
                className={`nav-link-small ${isActive(ROUTES.DISCLAIMER) ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.PRIVACY}
                className={`nav-link-small ${isActive(ROUTES.PRIVACY) ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.TERMS}
                className={`nav-link-small ${isActive(ROUTES.TERMS) ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
