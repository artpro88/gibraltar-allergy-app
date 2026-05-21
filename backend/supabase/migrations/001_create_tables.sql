-- Enable PostGIS for location-based queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  preferences JSONB DEFAULT '{}'::jsonb
);

-- Environmental data (time-series)
CREATE TABLE IF NOT EXISTS environmental_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  temperature DECIMAL,
  humidity DECIMAL,
  wind_speed DECIMAL,
  wind_direction DECIMAL,
  uv_index DECIMAL,
  pm2_5 DECIMAL,
  pm10 DECIMAL,
  ozone DECIMAL,
  aqi DECIMAL,
  allergy_risk_score DECIMAL,
  dust_level TEXT,
  wind_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(timestamp)
);

-- Forecasts (5-day predictions)
CREATE TABLE IF NOT EXISTS forecast_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  forecast_date DATE NOT NULL,
  temp_max DECIMAL,
  temp_min DECIMAL,
  wind_speed_max DECIMAL,
  uv_index_max DECIMAL,
  allergy_risk_forecast DECIMAL,
  dust_forecast TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(forecast_date)
);

-- Alerts configuration
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL, -- 'high_allergy', 'poor_air_quality', 'dust_storm'
  threshold DECIMAL,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Notification history
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alert_id UUID REFERENCES alerts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP WITH TIME ZONE
);

-- Symptom diary entries
CREATE TABLE IF NOT EXISTS diary_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entry_date DATE NOT NULL,
  symptoms TEXT[],
  severity INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, entry_date)
);

-- Create indexes for performance
CREATE INDEX idx_environmental_data_timestamp ON environmental_data(timestamp DESC);
CREATE INDEX idx_forecast_data_date ON forecast_data(forecast_date DESC);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_diary_entries_user_id ON diary_entries(user_id);
CREATE INDEX idx_diary_entries_date ON diary_entries(entry_date DESC);
