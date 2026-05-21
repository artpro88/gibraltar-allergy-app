# System Architecture

## Overview

The Gibraltar Allergy & Air Quality App uses a modern, scalable architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    Flutter Mobile App                        │
│          (iOS/Android - Riverpod State Management)           │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────────┐   ┌───▼─────────────┐
    │ Supabase Auth  │   │ REST/GraphQL API│
    │   (Firebase)   │   │                 │
    └────────────────┘   └───┬─────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼──────────┐      ┌────────▼──────────┐
        │  PostgreSQL DB   │      │  Edge Functions   │
        │  Time-Series     │      │  Data Processing  │
        │  Storage         │      │  Notifications    │
        └──────────────────┘      └────────┬──────────┘
                                           │
                        ┌──────────────────┼──────────────────┐
                        │                  │                  │
                   ┌────▼────┐      ┌──────▼──────┐    ┌──────▼──────┐
                   │  Open-  │      │   Firebase  │    │   Mapbox    │
                   │  Meteo  │      │  Messaging  │    │   Maps      │
                   │   API   │      │             │    │             │
                   └─────────┘      └─────────────┘    └─────────────┘
```

## Core Components

### 1. Flutter Frontend
- **State Management**: Riverpod (async providers, notifiers)
- **HTTP Client**: Dio with interceptors
- **Local Storage**: Hive, SharedPreferences
- **UI Framework**: Material Design 3
- **Real-time Updates**: WebSocket via Supabase
- **Maps**: Mapbox Flutter SDK
- **Push Notifications**: Firebase Cloud Messaging

### 2. Supabase Backend
- **Authentication**: Email/password via Supabase Auth
- **Database**: PostgreSQL with RLS (Row-Level Security)
- **Real-time**: Supabase Realtime subscriptions
- **Storage**: File uploads (user photos, data exports)
- **Edge Functions**: Server-side logic (data fetching, processing)

### 3. External APIs
- **Open-Meteo**: Weather & air quality (free, no auth)
- **Firebase Cloud Messaging**: Push notifications
- **Mapbox**: Maps & location services
- **Optional**: Google Pollen API (future)

## Data Flow

### Data Collection Pipeline
```
Open-Meteo API
     ↓
Edge Function (triggered hourly)
     ↓
Data Processing & Calculation
     ↓
PostgreSQL Storage
     ↓
Trigger Alert Notifications (if thresholds exceeded)
```

### User Interaction Flow
```
Mobile App
     ↓
Riverpod Provider (async)
     ↓
Supabase Client (Dart)
     ↓
PostgreSQL Query / API Call
     ↓
Response cached in Hive
     ↓
UI Update via FutureProvider
```

## Database Schema

### Key Tables
- `users` - User profiles & preferences
- `environmental_data` - Hourly readings (time-series)
- `forecast_data` - 5-day predictions
- `alerts` - User alert configurations
- `notifications` - Sent notifications
- `diary_entries` - Symptom logs

### Indexes
- Timestamp-based for time-series queries
- User ID for permission filtering
- Date-based for diary searches

## Security

**Authentication**
- Supabase Auth (JWT tokens)
- Email verification
- Password reset flow

**Authorization**
- PostgreSQL RLS policies
- Users can only see their own data
- Service role for server-side operations

**API Security**
- Environment variables for secrets
- API key rotation
- Rate limiting on edge functions

## Deployment Strategy

**Development**
- Local Supabase (Docker)
- Hot reload for Flutter
- Console logging

**Staging**
- Supabase hosted
- Test data fixtures
- Manual QA

**Production**
- Multi-region if needed
- Automated backups
- Monitoring & alerts
