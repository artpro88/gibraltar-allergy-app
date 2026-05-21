# Quick Reference Guide

## Project Overview
**Gibraltar Allergy & Air Quality App** - Mobile app for allergy forecasting and environmental alerts

**Tech Stack:** Flutter | Supabase | PostgreSQL | Node.js | Open-Meteo API

## File Locations & Purposes

### 📱 Mobile App
```
mobile/
├── lib/main.dart           # Flutter entry point
├── pubspec.yaml            # Dependencies
└── README.md               # Mobile setup guide
```

### 🔧 Backend
```
backend/
├── src/index.js            # Express API server
├── src/services/
│   ├── weatherService.js   # Open-Meteo weather API
│   └── airQualityService.js # Air quality & AQI
├── supabase/migrations/    # Database schemas
└── package.json            # Dependencies
```

### 📚 Documentation
```
docs/
├── ARCHITECTURE.md    # System design & data flow
├── API.md             # API endpoints reference
├── DATA_SOURCES.md    # External API documentation
└── DEPLOYMENT.md      # Production deployment guide
```

### 🚀 Getting Started
- **SETUP.md** - Step-by-step setup instructions
- **PROJECT_STATUS.md** - Current progress & roadmap
- **README.md** - Project overview

## Common Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:3000)
npm test            # Run tests
```

### Mobile
```bash
cd mobile
flutter pub get     # Get dependencies
flutter run         # Run app
flutter build apk   # Build Android
flutter build ios   # Build iOS
```

### Supabase (once setup)
```bash
supabase start      # Start local Supabase
supabase db push    # Run migrations
supabase deploy     # Deploy to production
```

## Key APIs

### Weather Data
```
GET /api/weather/current     # Temperature, humidity, wind, UV
GET /api/weather/forecast    # 5-day forecast
```

### Air Quality
```
GET /api/air-quality/current   # PM2.5, PM10, O3
GET /api/air-quality/forecast  # 5-day AQ forecast
```

### Combined Report
```
GET /api/environmental/report  # Weather + AQ + analysis
```

## Environment Variables Needed

**Backend (.env.local):**
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPEN_METEO_API_URL=https://api.open-meteo.com/v1
```

**Mobile (.env):**
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
MAPBOX_ACCESS_TOKEN=
```

## Data Models

### Risk Levels (0-10)
- 0-2: Low
- 3-5: Moderate
- 6-7: High
- 8-10: Very High

### AQI Categories
- 0-50: Good
- 51-100: Moderate
- 101-150: Unhealthy for Sensitive
- 151-200: Unhealthy
- 201-300: Very Unhealthy
- 301+: Hazardous

## Gibraltar Coordinates
```
Latitude:  36.1408°N
Longitude: 5.3536°W (or -5.3536)
Timezone:  Europe/London
```

## Wind Types
- **Levante**: East wind (60-120°) - Saharan dust
- **Poniente**: West wind (240-300°) - Atlantic moisture
- **Variable**: Other directions

## Development Workflow

1. **Setup** → Follow SETUP.md
2. **Understand** → Read ARCHITECTURE.md
3. **Implement** → Follow PROJECT_STATUS.md phases
4. **Test** → Use Flutter/Node testing tools
5. **Deploy** → Follow DEPLOYMENT.md

## Key Features (MVP)

✅ Real-time allergy risk dashboard
✅ Weather metrics & forecast
✅ Air quality data & AQI
✅ Dust forecast (Levante/Poniente)
✅ 5-day environmental forecast
✅ Push notifications & alerts
✅ Symptom tracking diary
✅ Dark mode support

## External Services Status

| Service | Setup | Cost | Notes |
|---------|-------|------|-------|
| Open-Meteo | ✅ None | Free | No auth required |
| Supabase | ⏳ Needed | Free tier | Backend DB |
| Firebase | ⏳ Needed | Free tier | Notifications |
| Mapbox | ⏳ Needed | Free tier | Maps |

## Useful Links

- **Flutter Docs:** https://flutter.dev
- **Supabase:** https://supabase.com
- **Open-Meteo:** https://open-meteo.com
- **Firebase:** https://firebase.google.com
- **Mapbox:** https://mapbox.com

## Files at a Glance

| File | Size | Purpose |
|------|------|---------|
| main.dart | ~1.5KB | Flutter UI starter |
| index.js | ~3.5KB | Backend API server |
| weatherService.js | ~2.5KB | Weather logic |
| airQualityService.js | ~2.5KB | Air quality logic |
| 001_create_tables.sql | ~2.5KB | Database setup |
| pubspec.yaml | ~1.5KB | Flutter deps |
| package.json | ~1KB | Node deps |

## Need Help?

1. **Setup Issues?** → SETUP.md
2. **How does it work?** → ARCHITECTURE.md
3. **API details?** → API.md
4. **Which APIs to use?** → DATA_SOURCES.md
5. **How to deploy?** → DEPLOYMENT.md
6. **What's the plan?** → PROJECT_STATUS.md

---

**Project Ready:** ✅ Fully scaffolded and documented
**Next Step:** Begin Phase 1 implementation (see PROJECT_STATUS.md)
