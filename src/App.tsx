/**
 * Main Application Component
 * Sets up routing and global layout for FollicleAI
 */

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeContext';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Landing } from './pages/Landing';
import { HowItWorks } from './pages/HowItWorks';
import { Upload } from './pages/Upload';
import { Results } from './pages/Results';
import { Pricing } from './pages/Pricing';
import { Privacy } from './pages/Privacy';
import { Disclaimer } from './pages/Disclaimer';
import { Terms } from './pages/Terms';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import type { AnalysisResult } from './types/analysis';
import { ROUTES } from './constants';
import './styles/globals.css';
import './App.css';

function AppContent() {
  // Global state for analysis result
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
  };

  return (
    <Router>
      <div className="app-container">
        <ParticleBackground />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path={ROUTES.HOME} element={<Landing />} />
            <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
            <Route
              path={ROUTES.UPLOAD}
              element={<Upload onAnalysisComplete={handleAnalysisComplete} />}
            />
            <Route
              path={ROUTES.SCALP_CHECKER}
              element={<Upload onAnalysisComplete={handleAnalysisComplete} />}
            />
            <Route path={ROUTES.RESULTS} element={<Results result={analysisResult} />} />
            <Route path={ROUTES.PRICING} element={<Pricing />} />
            <Route path={ROUTES.PRIVACY} element={<Privacy />} />
            <Route path={ROUTES.DISCLAIMER} element={<Disclaimer />} />
            <Route path={ROUTES.TERMS} element={<Terms />} />
            <Route path={ROUTES.BLOG} element={<Blog />} />
            <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />

            {/* Legacy routes for backward compatibility */}
            <Route path="/upload" element={<Navigate to={ROUTES.UPLOAD} replace />} />
            <Route path="/results" element={<Navigate to={ROUTES.RESULTS} replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
