# FollicleAI - Hair & Scalp Analysis Platform

**Privacy-first, AI-powered hair and scalp awareness tool**

> **IMPORTANT**: This is NOT a medical diagnostic tool. FollicleAI provides awareness and decision-support only.

---

## 📋 Overview

FollicleAI is a production-grade startup platform that provides AI-powered hair and scalp analysis for awareness purposes. Users upload scalp images and receive:

- **Hair Density Score** (0-100%)
- **Pattern Awareness** (Norwood/Ludwig-inspired classifications)
- **Confidence Score** for analysis reliability
- **Clear disclaimers** emphasizing non-medical nature

### Core Principles

1. **Non-Medical**: Explicitly NOT for diagnosis or treatment
2. **Privacy-First**: Images deleted within 24 hours
3. **Consent-Driven**: Mandatory user consent before analysis
4. **Transparent**: Clear disclaimers on every page
5. **Secure**: Client-side validation, encrypted transmission
6. **Accessible**: WCAG-compliant UI with keyboard navigation

---

## 🛠 Tech Stack

- **React 18** + **TypeScript** - UI with type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Custom premium styling

---

## 📁 Project Structure

```
src/
├── components/common/    # Reusable UI (Navbar, Footer, Button, etc.)
├── pages/                # Routed pages (Landing, Upload, Results, etc.)
├── services/             # API integration (analysisService.ts)
├── types/                # TypeScript interfaces
├── constants/            # Disclaimers, limits, strings
├── styles/               # Global CSS
└── App.tsx              # Main app with routing
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env and add your backend API URL

# 3. Start development server
npm run dev

# 4. Open browser at http://localhost:5173
```

---

## ⚙️ Environment Variables

Create `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🔒 Security & Privacy

### Client-Side Validation
- File size: Max 10MB
- Formats: JPG, PNG, WebP
- Dimensions: 400x400px to 4096x4096px
- Mandatory consent checkbox

### Privacy Principles
- Images deleted within 24 hours
- No facial recognition
- No third-party data sharing
- GDPR/CCPA compliant

---

## 🔌 Backend Integration

### Required API Endpoints

**1. Health Check**
```
GET /api/health
```

**2. Image Analysis**
```
POST /api/analysis/upload
Content-Type: application/json

Request:
{
  "imageBase64": "string",
  "userConsent": true,
  "timestamp": 1738464000000
}

Response (200 OK):
{
  "id": "string",
  "hairDensity": {
    "score": 75,
    "category": "Moderate"
  },
  "patternAwareness": {
    "norwoodInspired": "NW II",
    "ludwigInspired": "Ludwig I",
    "category": "Pattern Visible"
  },
  "confidenceScore": 85,
  "analysisTimestamp": "2026-02-01T12:00:00Z",
  "disclaimer": "..."
}
```

### Backend TODO
- [ ] Implement analysis endpoints
- [ ] Integrate AI model for hair density
- [ ] Add Norwood/Ludwig classification
- [ ] Set up 24-hour image deletion cron
- [ ] Add rate limiting
- [ ] Configure HTTPS/TLS
- [ ] Set up CORS

---

## 📝 Development Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## ⚠️ Medical Disclaimer

**FollicleAI is NOT:**
- A medical device
- A diagnostic tool
- A treatment recommendation system

**FollicleAI IS:**
- An awareness and decision-support tool
- For educational purposes only
- A conversation starter with healthcare professionals

See [Disclaimer Page](src/pages/Disclaimer.tsx) for complete legal disclaimers.

---

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

Set production environment:
```
VITE_API_URL=https://api.follicleai.com/v1
```

---

## 📈 Future Enhancements

- [ ] User authentication & analysis history
- [ ] Progress tracking over time
- [ ] PDF export of results
- [ ] Multi-language support
- [ ] Unit & E2E tests
- [ ] PWA support

---

## 📧 Support

- **Development**: Dev Team
- **Legal**: legal@follicleai.com
- **Privacy**: privacy@follicleai.com
- **Support**: support@follicleai.com

---

## 📄 License

Proprietary - FollicleAI Startup Project  
© 2026 All Rights Reserved

---

**Built with ❤️ by the FollicleAI Engineering Team**
