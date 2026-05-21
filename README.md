# Gibraltar Allergy & Air Quality App

A mobile application providing real-time allergy forecasts, air quality metrics, and environmental alerts specifically tailored for Gibraltar.

## Project Structure

```
Gibraltar Allergy App/
├── mobile/                 # Flutter frontend
│   ├── lib/
│   │   ├── main.dart
│   │   ├── models/
│   │   ├── services/
│   │   ├── screens/
│   │   ├── widgets/
│   │   ├── providers/
│   │   └── utils/
│   ├── pubspec.yaml
│   └── README.md
├── backend/               # Supabase + Node.js
│   ├── supabase/
│   ├── functions/
│   ├── migrations/
│   └── README.md
├── docs/                  # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── DATA_SOURCES.md
│   └── DEPLOYMENT.md
└── README.md
```

## Quick Start

### Prerequisites
- Flutter 3.0+
- Node.js 18+
- Supabase account
- Open-Meteo API (free)

### Mobile Setup
```bash
cd mobile
flutter pub get
flutter run
```

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

## Tech Stack

**Frontend:** Flutter, Riverpod, Mapbox
**Backend:** Supabase, PostgreSQL, Node.js
**APIs:** Open-Meteo, Firebase Cloud Messaging

## Features

- ✅ Real-time allergy risk dashboard
- ✅ Air quality metrics (PM2.5, PM10, O3)
- ✅ 5-day environmental forecast
- ✅ Push notifications & alerts
- ✅ Symptom tracking diary
- ✅ Dark mode support
- ✅ Responsive UI design

## Development

See individual README files in `mobile/` and `backend/` directories for detailed setup and development instructions.

## License

MIT
