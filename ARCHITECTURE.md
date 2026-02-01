# FollicleAI - Architecture & Implementation Guide

## Executive Summary

This document provides a comprehensive technical overview of the FollicleAI frontend application, designed for engineering team onboarding and investor technical diligence.

---

## 1. System Architecture

### 1.1 High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     User Browser                           │
├────────────────────────────────────────────────────────────┤
│  React SPA (Single Page Application)                       │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Presentation Layer                                   │ │
│  │  - Pages (Landing, Upload, Results, etc.)            │ │
│  │  - Common Components (Navbar, Footer, Button)        │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Business Logic Layer                                 │ │
│  │  - analysisService (API integration)                 │ │
│  │  - Client-side validation                            │ │
│  │  - State management                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Data Layer                                          │ │
│  │  - TypeScript interfaces                             │ │
│  │  - Constants & configuration                         │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────┬───────────────────────────────────────┘
                     │ HTTPS (Base64 image + metadata)
                     ▼
┌────────────────────────────────────────────────────────────┐
│              Backend API (TO BE IMPLEMENTED)               │
│  - Image processing & AI model                            │
│  - Analysis result generation                             │
│  - 24-hour image deletion                                 │
└────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Decisions

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **UI Framework** | React 18 | Industry standard, large ecosystem, component reusability |
| **Language** | TypeScript | Type safety, compile-time error detection, better tooling |
| **Build Tool** | Vite | Fast HMR, modern, better DX than CRA |
| **Routing** | React Router v6 | De facto standard for React SPAs |
| **HTTP Client** | Axios | Better error handling, interceptors, request cancellation |
| **Styling** | Custom CSS3 | Full design control, no framework bloat, premium aesthetic |

---

## 2. Project Structure

### 2.1 Directory Organization

```
src/
├── components/
│   └── common/
│       ├── Navbar.tsx          # Global navigation
│       ├── Navbar.css
│       ├── Footer.tsx          # Global footer with disclaimers
│       ├── Footer.css
│       ├── Button.tsx          # Reusable button (4 variants)
│       ├── Button.css
│       ├── DisclaimerBadge.tsx # Disclaimer display component
│       └── DisclaimerBadge.css
├── pages/
│   ├── Landing.tsx             # Home page with hero section
│   ├── Landing.css
│   ├── HowItWorks.tsx          # 3-step process explanation
│   ├── HowItWorks.css
│   ├── Upload.tsx              # Image upload with validation
│   ├── Upload.css
│   ├── Results.tsx             # Analysis results display
│   ├── Results.css
│   ├── Privacy.tsx             # Comprehensive privacy policy
│   ├── Disclaimer.tsx          # Medical & legal disclaimers
│   └── Privacy.css             # Shared styles for legal pages
├── services/
│   └── analysisService.ts      # API integration & validation logic
├── types/
│   └── analysis.ts             # TypeScript interfaces
├── constants/
│   └── index.ts                # App constants, disclaimers, strings
├── styles/
│   └── globals.css             # CSS variables, global styles
├── hooks/                      # Custom React hooks (future)
├── App.tsx                     # Main app component with routing
├── App.css                     # App-level styles
├── main.tsx                    # Entry point
└── index.css                   # Root styles
```

### 2.2 Key Files Explained

#### `constants/index.ts`
- **Disclaimers**: All legal/medical disclaimer text
- **Limits**: Image size, format, dimension constraints
- **API Config**: Backend URL from environment variables
- **UI Strings**: Centralized copy for easy updates
- **Routes**: Path constants for type-safe routing

#### `services/analysisService.ts`
- **Image Validation**: Client-side checks (size, format, dimensions)
- **Base64 Conversion**: File to Base64 encoding
- **API Communication**: Axios instance with error handling
- **Health Check**: Backend connectivity test

#### `types/analysis.ts`
- **AnalysisRequest**: Upload payload structure
- **AnalysisResult**: AI analysis response structure
- **ImageValidationResult**: Validation outcome
- **UploadState**: Component state management
- **AnalysisState**: Results page state

---

## 3. Core Workflows

### 3.1 User Journey Flow

```
Landing Page
    │
    ├─→ How It Works (Learn about process)
    │       └─→ Upload Page
    │
    └─→ Upload Page
            ├─→ Select/Drop Image
            ├─→ Client-side Validation
            │   ├─→ Size check (max 10MB)
            │   ├─→ Format check (JPG/PNG/WebP)
            │   └─→ Dimension check (400-4096px)
            ├─→ Preview Image
            ├─→ Accept Consent
            └─→ Analyze Button
                    ├─→ Convert to Base64
                    ├─→ POST to /api/analysis/upload
                    └─→ Results Page
                            ├─→ Hair Density Score
                            ├─→ Pattern Awareness
                            ├─→ Confidence Score
                            └─→ Disclaimers & Next Steps
```

### 3.2 Image Upload Workflow (Technical)

```typescript
1. User selects file
   ↓
2. FileReader API loads file
   ↓
3. Client-side validation
   - Check file size
   - Check MIME type
   - Load image to get natural dimensions
   - Validate dimensions
   ↓
4. Display preview
   ↓
5. User accepts consent checkbox
   ↓
6. Convert image to Base64
   ↓
7. Create AnalysisRequest payload
   {
     imageBase64: string,
     userConsent: boolean,
     timestamp: number
   }
   ↓
8. POST to backend API
   ↓
9. Handle response
   - Success: Navigate to Results with data
   - Error: Display error message
```

---

## 4. Security Architecture

### 4.1 Frontend Security Measures

1. **Input Validation**
   - File type whitelist (JPG, PNG, WebP only)
   - File size limit (10MB)
   - Image dimension validation
   - No executable file uploads

2. **Consent Management**
   - Mandatory checkbox before submission
   - Clear, explicit language
   - UI prevents submission without consent

3. **Data Handling**
   - No client-side storage of images
   - Temporary preview only (in-memory)
   - Base64 transmission (no raw file upload)

4. **Privacy Protection**
   - No face recognition claims or capability
   - Clear disclaimers on every relevant page
   - Privacy policy easily accessible

### 4.2 Backend Security Requirements (TODO)

- [ ] HTTPS/TLS enforcement
- [ ] CORS configuration (whitelist frontend domain)
- [ ] Rate limiting (prevent abuse)
- [ ] Input sanitization
- [ ] Image format verification (server-side)
- [ ] Malware scanning
- [ ] Automatic image deletion (24-hour cron)
- [ ] Logging & monitoring
- [ ] Authentication (if needed)
- [ ] API key management

---

## 5. Compliance & Legal

### 5.1 Regulatory Position

**NOT a Medical Device**
- Not FDA-approved or cleared
- Explicitly disclaims medical diagnosis/treatment
- Awareness and decision-support only
- Clear "consult a healthcare professional" messaging

**Privacy Regulations**
- **GDPR**: Image deletion within 24 hours, user consent, data access rights
- **CCPA**: Privacy policy, opt-out rights
- **HIPAA**: Not applicable (no PHI collected)

### 5.2 Disclaimer Strategy

- **Prominent Placement**: Disclaimers on every key page
- **Explicit Language**: "NOT medical diagnosis"
- **User Consent**: Mandatory checkbox with clear terms
- **Multiple Touchpoints**: Landing, Upload, Results, Footer

### 5.3 Risk Mitigation

- **No Medical Claims**: Terminology is "awareness" not "diagnosis"
- **Pattern Classifications**: "Norwood-inspired" not definitive
- **Confidence Score**: Acknowledges limitations
- **Professional Referral**: Encourages medical consultation

---

## 6. Development Guidelines

### 6.1 Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Functional components with hooks
- **Props**: Always typed with interfaces
- **Comments**: JSDoc for complex functions
- **Naming**: PascalCase for components, camelCase for functions

### 6.2 State Management

**Current**: React `useState` for simplicity

**Future Considerations** (if app grows):
- Context API for global state
- Zustand for lightweight state management
- Redux Toolkit for complex state

### 6.3 Error Handling

- **Client Validation**: Errors displayed inline
- **API Errors**: User-friendly messages (not raw stack traces)
- **Network Errors**: Retry logic or clear messaging
- **Loading States**: Spinners, disabled buttons

### 6.4 Accessibility

- Semantic HTML (`nav`, `main`, `footer`, `section`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Color contrast (WCAG AA)

---

## 7. API Integration

### 7.1 Backend Contract

**Base URL**: Configured via `VITE_API_URL` environment variable

**Endpoints**:

```
GET /api/health
POST /api/analysis/upload
```

**Request Format**:
```json
{
  "imageBase64": "string",
  "userConsent": true,
  "timestamp": 1738464000000
}
```

**Response Format**:
```json
{
  "id": "uuid",
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
  "disclaimer": "This is not medical diagnosis..."
}
```

### 7.2 Error Handling

- **4xx Errors**: User-facing error messages
- **5xx Errors**: Generic "try again" messaging
- **Network Errors**: Connection issue messaging
- **Timeout**: 30-second default

---

## 8. Performance Optimization

### 8.1 Current Optimizations

- Vite code splitting
- Lazy-loaded components (future)
- Minified production build
- CSS scoped to components

### 8.2 Future Optimizations

- [ ] Image compression before upload
- [ ] Lazy loading for routes
- [ ] Service Worker for caching
- [ ] Web Vitals monitoring
- [ ] CDN for static assets

---

## 9. Testing Strategy

### 9.1 Unit Tests (TODO)

- Component rendering
- Service layer functions
- Validation logic
- State management

**Tools**: Jest + React Testing Library

### 9.2 Integration Tests (TODO)

- User workflows (upload → results)
- API integration (mocked)
- Form submissions

### 9.3 E2E Tests (TODO)

- Complete user journeys
- Cross-browser testing
- Mobile responsiveness

**Tools**: Playwright or Cypress

---

## 10. Deployment

### 10.1 Build Process

```bash
npm run build
# Output: dist/ folder with optimized assets
```

### 10.2 Hosting Options

1. **Vercel** (Recommended)
   - Auto-deploys from Git
   - Built-in CDN
   - Easy environment variables
   - Zero-config for Vite

2. **Netlify**
   - Similar to Vercel
   - Great for static sites

3. **AWS S3 + CloudFront**
   - More control
   - Higher complexity

### 10.3 Environment Configuration

**Development**: `.env`
```
VITE_API_URL=http://localhost:3000/api
```

**Production**: Platform environment variables
```
VITE_API_URL=https://api.follicleai.com/v1
```

---

## 11. Maintenance & Scaling

### 11.1 Future Features

- User authentication
- Analysis history
- Progress tracking
- PDF export
- Multi-language
- Dark mode

### 11.2 Technical Debt

- Add comprehensive test suite
- Implement error boundaries
- Add analytics (privacy-compliant)
- Optimize images
- Implement PWA

---

## 12. Team Onboarding

### 12.1 Required Knowledge

- React 18 (hooks, functional components)
- TypeScript (interfaces, type safety)
- Modern CSS (flexbox, grid, CSS variables)
- REST APIs
- Git workflow

### 12.2 Getting Started

1. Clone repo
2. Run `npm install`
3. Copy `.env.example` to `.env`
4. Run `npm run dev`
5. Read this document
6. Review key files: `App.tsx`, `Upload.tsx`, `analysisService.ts`

---

## Appendix A: Glossary

- **Norwood**: Male-pattern hair loss classification scale
- **Ludwig**: Female-pattern hair loss classification scale
- **Base64**: Text encoding for binary data (images)
- **HMR**: Hot Module Replacement (instant dev updates)
- **SPA**: Single Page Application
- **WCAG**: Web Content Accessibility Guidelines

---

**Document Version**: 1.0  
**Last Updated**: February 1, 2026  
**Maintained By**: FollicleAI Engineering Team
