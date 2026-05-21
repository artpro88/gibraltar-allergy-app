# Data Sources Documentation

## Primary APIs

### Open-Meteo Weather API
**URL:** https://api.open-meteo.com/v1

**Features:**
- Free, no authentication required
- Weather forecasting
- Air quality data
- Historical weather

**Endpoints Used:**
- `/forecast` - Current weather & 5-day forecast
- `/air-quality` - PM2.5, PM10, ozone, NO2, SO2

**Gibraltar Coordinates:**
- Latitude: 36.1408°N
- Longitude: 5.3536°W

**Update Frequency:** Hourly

**Rate Limits:** 10,000 calls/day (free tier)

```bash
# Example: Current weather
curl "https://api.open-meteo.com/v1/forecast?latitude=36.1408&longitude=-5.3536&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
```

### Firebase Cloud Messaging
**Purpose:** Push notifications

**Setup:**
- Create Firebase project
- Enable Cloud Messaging
- Get server key for backend

**Message Format:**
```json
{
  "notification": {
    "title": "High Allergy Alert",
    "body": "Allergy risk is now HIGH"
  },
  "data": {
    "riskLevel": "7",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Mapbox
**Purpose:** Maps and location visualization

**Features:**
- Interactive maps
- Satellite imagery
- Location search
- Geocoding

**Setup:**
- Create account at mapbox.com
- Generate access token
- Add to mobile app

## Future Data Sources

### Google Pollen API (Coming)
- More accurate pollen forecasts
- Specific allergen types
- Seasonal predictions
- **Cost:** Paid tier

### Weather Underground
- Additional weather stations
- Hyperlocal data
- **Cost:** Paid tier

### Air Quality APIs
- IQAir
- Breezometer
- **Cost:** Paid tier

## Data Processing

### Environmental Risk Scoring

```
Risk Score = (Weather Factor + AQ Factor) / 2

Weather Factor =
  - Temperature (higher = more pollen release)
  - Wind speed (higher = more dispersal)
  - Humidity (lower = more dispersal)
  - UV index (higher = more potent)

AQ Factor =
  - PM2.5 (particulate matter)
  - PM10 (coarse particles)
  - Ozone (oxidative stress)
```

### Wind Type Classification
- **Levante**: East wind (60-120°) - brings Saharan dust
- **Poniente**: West wind (240-300°) - brings Atlantic moisture
- **Variable**: Other directions

Levante winds significantly increase dust and allergen levels.

## Caching Strategy

| Data Type | Cache Duration | Refresh |
|-----------|---|---|
| Current Weather | 30 min | Hourly |
| Current AQ | 30 min | Hourly |
| Forecast | 4 hours | Daily |
| Historical | Permanent | - |
| User Data | 1 hour | On demand |

## Privacy

- Open-Meteo: No personal data required
- Mapbox: Location data encrypted
- Firebase: Follows Google privacy policy
- User data: Encrypted in Supabase

## Costs (MVP Phase)

| Service | Cost | Notes |
|---------|------|-------|
| Open-Meteo | Free | Unlimited with 10k/day soft limit |
| Supabase | Free tier | 1GB DB, 2GB storage |
| Firebase | Free tier | 100 msgs/day free |
| Mapbox | Free tier | 25k map loads/month free |
| **Total** | ~$0 | All free tier initially |

## Future Cost Estimate

At 100k monthly active users:
- Supabase: ~$50-100/month (pro plan)
- Firebase: ~$100-200/month
- Open-Meteo: Free
- Mapbox: ~$200-500/month (as usage increases)
- **Total:** ~$400-800/month
