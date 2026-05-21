# Gibraltar Allergy App - Backend

Supabase backend with PostgreSQL database and Node.js edge functions for environmental data processing.

## Setup

### Prerequisites
- Node.js 18+
- Supabase CLI
- PostgreSQL (for local development)

### Installation

```bash
# Install dependencies
npm install

# Setup Supabase locally
supabase start

# Run migrations
supabase migration list
```

### Environment Variables

Create `.env.local`:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
OPEN_METEO_API_URL=https://api.open-meteo.com/v1
MAPBOX_API_KEY=your_mapbox_key
```

## Project Structure

```
backend/
├── supabase/
│   ├── migrations/          # Database migrations
│   ├── functions/           # Edge functions
│   └── config.toml
├── src/
│   ├── services/            # Business logic
│   │   ├── weatherService.js
│   │   ├── airQualityService.js
│   │   └── notificationService.js
│   └── utils/
│       └── constants.js
└── package.json
```

## Key Features

**Data Collection**
- Hourly weather data from Open-Meteo
- Air quality metrics (PM2.5, PM10, O3)
- Dust forecast calculations
- Environmental risk scoring

**Data Storage**
- Time-series data in PostgreSQL
- Historical records for trend analysis
- User preferences & settings

**Notifications**
- Firebase Cloud Messaging integration
- Smart alert scheduling
- Alert history tracking

## Database Schema

- `users` - User accounts
- `environmental_data` - Time-series data
- `alerts` - User alerts & notifications
- `diary_entries` - Symptom tracking
- `forecast_data` - 5-day forecasts

## Development

```bash
# Start dev server
npm run dev

# Run migrations
npm run migrate

# Deploy functions
supabase functions deploy
```

## Deployment

Deploy to Supabase:
```bash
supabase deploy
```
