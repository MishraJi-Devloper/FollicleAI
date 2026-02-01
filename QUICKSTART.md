# FollicleAI - Quick Start Guide

## 🚀 Start Development in 3 Steps

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app with routing |
| `src/pages/Upload.tsx` | Upload & analysis flow |
| `src/pages/Results.tsx` | Results display |
| `src/services/analysisService.ts` | API integration |
| `src/types/analysis.ts` | TypeScript interfaces |
| `src/constants/index.ts` | All disclaimers & constants |
| `.env` | Environment variables |

---

## 🔧 Common Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🌐 Routes

- `/` - Landing page
- `/how-it-works` - Process explanation
- `/upload` - Image upload & analysis
- `/results` - Analysis results
- `/privacy` - Privacy policy
- `/disclaimer` - Medical disclaimer

---

## ⚙️ Environment Variables

Edit `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

**Production**: Set `VITE_API_URL` to your deployed backend URL.

---

## 🔌 Backend Integration

Frontend expects these endpoints:

1. **GET /api/health** - Health check
2. **POST /api/analysis/upload** - Image analysis

See [ARCHITECTURE.md](ARCHITECTURE.md) Section 7 for API contract details.

---

## 🎨 Design System

### Colors
- Primary: `#1e3a5f` (deep slate blue)
- Accent: `#3b82f6` (bright blue)
- Success: `#10b981` (emerald)
- Warning: `#f59e0b` (amber)
- Error: `#ef4444` (red)

### Components
- `Button`: 4 variants, 3 sizes
- `DisclaimerBadge`: 3 variants
- `Navbar`: Sticky header
- `Footer`: Links & disclaimers

All styles use CSS variables in [globals.css](src/styles/globals.css).

---

## 🧪 Testing Checklist

- [ ] All routes load
- [ ] Upload validation works (size, format, dimensions)
- [ ] Consent checkbox required
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Keyboard navigation
- [ ] Backend integration (once API is ready)

---

## 📦 Project Structure (Simplified)

```
src/
├── components/common/  # Reusable UI
├── pages/             # Route pages
├── services/          # API layer
├── types/             # TypeScript
├── constants/         # Config
└── styles/            # Global CSS
```

---

## ⚠️ Important Notes

1. **NOT MEDICAL**: This is an awareness tool, not medical diagnosis
2. **Disclaimers**: Present on every page
3. **Privacy**: 24-hour image deletion (backend responsibility)
4. **Consent**: Mandatory before upload
5. **Validation**: Client-side checks before API call

---

## 🐛 Troubleshooting

### Build Errors
```bash
npm run build
# Check TypeScript errors
```

### Port Already in Use
```bash
# Vite will auto-detect and use different port
# Or kill process on port 5173
```

### API Not Connecting
- Check `.env` has correct `VITE_API_URL`
- Restart dev server after `.env` changes
- Verify backend is running

---

## 📚 Documentation

- [README.md](README.md) - Full overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical deep dive
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Status & deliverables

---

## 📧 Questions?

- **Dev Team**: Internal Slack
- **Legal**: legal@follicleai.com
- **Privacy**: privacy@follicleai.com

---

**Status**: ✅ Production-ready (frontend)  
**Last Updated**: Feb 1, 2026
