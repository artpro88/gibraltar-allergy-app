# API Documentation

## Authentication

All requests require JWT token from Supabase Auth:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Weather Data

#### Get Current Weather
```
GET /api/weather/current
```
Response:
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "temperature": 22.5,
  "humidity": 65,
  "windSpeed": 15,
  "windDirection": 90,
  "windType": "Levante",
  "uvIndex": 6,
  "allergenRisk": 5
}
```

#### Get Weather Forecast
```
GET /api/weather/forecast
```
Response: 5-day daily forecast

### Air Quality

#### Get Current Air Quality
```
GET /api/air-quality/current
```
Response:
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "pm25": 25,
  "pm10": 45,
  "ozone": 35,
  "aqi": 65,
  "category": "Moderate",
  "dustLevel": "Moderate"
}
```

#### Get Air Quality Forecast
```
GET /api/air-quality/forecast
```
Response: Hourly AQ data for 5 days

### Environmental Data

#### Get Combined Environmental Report
```
GET /api/environmental/report
```
Response: Combined weather + air quality + alerts

#### Get Historical Data
```
GET /api/environmental/history?days=30
```
Response: Last N days of readings

### Alerts

#### Create Alert
```
POST /api/alerts
Content-Type: application/json

{
  "alertType": "high_allergy",
  "threshold": 7,
  "isEnabled": true
}
```

#### Get User Alerts
```
GET /api/alerts
```

#### Update Alert
```
PATCH /api/alerts/{id}
```

#### Delete Alert
```
DELETE /api/alerts/{id}
```

### Diary

#### Create Diary Entry
```
POST /api/diary
Content-Type: application/json

{
  "entryDate": "2024-01-15",
  "symptoms": ["sneezing", "itchy_eyes"],
  "severity": 7,
  "notes": "Worst symptoms this week"
}
```

#### Get Diary Entries
```
GET /api/diary?startDate=2024-01-01&endDate=2024-01-31
```

#### Update Diary Entry
```
PATCH /api/diary/{id}
```

### Notifications

#### Get Notifications
```
GET /api/notifications?limit=20
```

#### Mark Notification as Read
```
PATCH /api/notifications/{id}/read
```

#### Delete Notification
```
DELETE /api/notifications/{id}
```

## Error Responses

```json
{
  "error": "Unauthorized",
  "code": "AUTH_ERROR",
  "status": 401
}
```

## Rate Limiting

- 100 requests/minute per user
- 1000 requests/hour per IP

## Data Models

### Allergy Risk Levels
- 0-2: Low
- 3-5: Moderate
- 6-7: High
- 8-10: Very High

### AQI Categories
- 0-50: Good
- 51-100: Moderate
- 101-150: Unhealthy for Sensitive Groups
- 151-200: Unhealthy
- 201-300: Very Unhealthy
- 301+: Hazardous
