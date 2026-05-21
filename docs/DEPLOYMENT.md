# Deployment Guide

## Prerequisites

- Supabase project (create at supabase.com)
- Firebase project (for Cloud Messaging)
- Mapbox account
- Apple Developer account (iOS)
- Google Play Developer account (Android)

## Backend Deployment

### 1. Setup Supabase Project
```bash
# Create new project at supabase.com
# Get your project URL and API keys

# Initialize local Supabase
supabase init
```

### 2. Configure Environment
Create `.env.local`:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
OPEN_METEO_API_URL=https://api.open-meteo.com/v1
```

### 3. Run Migrations
```bash
supabase db push
```

### 4. Deploy Edge Functions
```bash
supabase functions deploy fetch-weather-data
supabase functions deploy calculate-forecasts
supabase functions deploy send-alerts
```

### 5. Setup Scheduled Jobs
Configure in Supabase dashboard:
- Weather data fetch: Every hour at :00
- Forecast calculation: Daily at 06:00 UTC
- Alert check: Every 30 minutes

## Mobile Deployment

### iOS

1. **Configure Signing**
   - Add Apple Developer Team ID
   - Generate certificates in Xcode

2. **Build**
   ```bash
   flutter build ios --release
   ```

3. **Archive & Upload**
   - Use Xcode or fastlane
   - Submit to App Store

### Android

1. **Generate Keystore**
   ```bash
   keytool -genkey -v -keystore release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias release
   ```

2. **Configure Signing**
   - Add keystore path to `android/app/build.gradle`

3. **Build APK/AAB**
   ```bash
   flutter build appbundle --release
   ```

4. **Upload**
   - Use Google Play Console

## Configuration

### Firebase Cloud Messaging
1. Create Firebase project
2. Download `google-services.json` (Android)
3. Download `GoogleService-Info.plist` (iOS)
4. Add to respective platforms

### Mapbox
1. Generate access token
2. Add to Flutter app:
   ```dart
   Mapbox.setAccessToken('YOUR_ACCESS_TOKEN');
   ```

## Monitoring

### Logs
- Check Supabase dashboard
- Firebase Crashlytics for app crashes
- Error tracking in edge functions

### Analytics
- Track key metrics in Supabase
- Monitor API response times
- Alert on failures

### Backup
- Supabase auto-backups (daily)
- Manual backup before major updates

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy backend
        run: supabase functions deploy
      - name: Build & deploy mobile
        run: flutter build appbundle
```

## Rollback

### Backend
```bash
supabase db reset
# Or restore from backup
```

### Mobile
- Use Play Store/App Store version rollback
- Or redeploy previous build
