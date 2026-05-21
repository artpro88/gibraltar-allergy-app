# Quick Setup Guide

## Prerequisites
- Flutter 3.0+
- Dart 3.0+
- Node.js 18+
- Git
- Supabase account (free at supabase.com)

## Step 1: Clone & Setup Project
```bash
cd Gibraltar\ Allergy\ App
```

## Step 2: Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env.local with:
# SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_ROLE_KEY=your_key
# etc.

# Run migrations (requires Supabase CLI)
supabase start
supabase db push
```

## Step 3: Mobile Setup
```bash
cd ../mobile

# Get dependencies
flutter pub get

# Create .env file with API keys
# SUPABASE_URL=...
# SUPABASE_ANON_KEY=...

# Run on emulator/device
flutter run
```

## Step 4: Configure External Services

### Supabase
1. Create project at supabase.com
2. Copy project URL and keys
3. Add to `.env` files

### Firebase (for notifications)
1. Create project at firebase.google.com
2. Download service account key
3. Add to backend: `backend/config/firebase.json`
4. Download `google-services.json` (Android)
5. Download `GoogleService-Info.plist` (iOS)

### Mapbox
1. Sign up at mapbox.com
2. Create access token
3. Add to Flutter: `mobile/android/app/build.gradle`

## Step 5: Run Application

### Development
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Mobile
cd mobile
flutter run
```

### Hot Reload
- Press `r` to hot reload
- Press `R` to full restart
- Press `q` to quit

## Project Structure Quick Reference

```
Gibraltar Allergy App/
├── mobile/              # Flutter app
│   ├── lib/
│   │   ├── main.dart
│   │   ├── models/
│   │   ├── services/
│   │   ├── screens/
│   │   ├── providers/
│   │   └── widgets/
│   └── pubspec.yaml
├── backend/             # Node.js + Supabase
│   ├── src/
│   │   ├── services/
│   │   └── utils/
│   ├── supabase/
│   │   ├── migrations/
│   │   └── functions/
│   └── package.json
└── docs/               # Documentation
```

## Testing

```bash
# Backend tests
cd backend
npm test

# Mobile tests
cd mobile
flutter test
```

## Troubleshooting

### "Cannot find Supabase"
- Ensure SUPABASE_URL is set correctly
- Check network connectivity

### "Flutter not found"
- Run `flutter doctor` to diagnose
- Ensure Flutter is in PATH

### "Dependency conflicts"
- Try `flutter pub get` again
- Clear: `flutter clean`

## Next Steps

1. Read `docs/ARCHITECTURE.md` for system design
2. Check `docs/API.md` for API endpoints
3. Review `docs/DEPLOYMENT.md` before production
4. Start with `mobile/lib/screens/` to understand UI structure

## Support

- Flutter docs: https://flutter.dev
- Supabase docs: https://supabase.com/docs
- Open-Meteo: https://open-meteo.com/en/docs
