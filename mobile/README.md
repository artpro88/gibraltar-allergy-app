# Gibraltar Allergy App - Flutter Frontend

Mobile application for allergy and air quality forecasting.

## Setup

### Prerequisites
- Flutter 3.0 or higher
- Dart 3.0 or higher
- iOS: Xcode 14+
- Android: Android Studio with SDK 21+

### Installation

```bash
# Install dependencies
flutter pub get

# Run on device/emulator
flutter run

# Build for production
flutter build apk      # Android
flutter build ios      # iOS
```

## Project Structure

```
lib/
├── main.dart                    # App entry point
├── models/                      # Data models
│   ├── allergy_risk.dart
│   ├── air_quality.dart
│   ├── weather.dart
│   └── forecast.dart
├── services/                    # API & backend services
│   ├── api_service.dart
│   ├── open_meteo_service.dart
│   ├── supabase_service.dart
│   └── notification_service.dart
├── screens/                     # App screens
│   ├── home_screen.dart
│   ├── forecast_screen.dart
│   ├── diary_screen.dart
│   └── settings_screen.dart
├── widgets/                     # Reusable UI components
│   ├── risk_card.dart
│   ├── forecast_timeline.dart
│   └── air_quality_gauge.dart
├── providers/                   # Riverpod state management
│   ├── allergy_provider.dart
│   ├── weather_provider.dart
│   └── settings_provider.dart
└── utils/                       # Utilities
    ├── colors.dart
    ├── constants.dart
    └── extensions.dart
```

## Dependencies

Key packages:
- `riverpod` - State management
- `dio` - HTTP client
- `supabase_flutter` - Backend integration
- `mapbox_flutter` - Maps
- `firebase_messaging` - Push notifications
- `flutter_local_notifications` - Local alerts

## Environment Variables

Create `.env` file:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
MAPBOX_ACCESS_TOKEN=your_mapbox_token
OPEN_METEO_API_URL=https://api.open-meteo.com/v1
```

## Development

- Hot reload: `r`
- Full restart: `R`
- Quit: `q`

See `pubspec.yaml` for complete dependency list.
