import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import WeatherService from './services/weatherService.js';
import AirQualityService from './services/airQualityService.js';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN || [
    'http://localhost:3000',
    'http://localhost:8080',
    'http://localhost:19006',
    'http://localhost:19000',
    'https://messaging-system-frontend.fly.dev',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const log = `[${timestamp}] ${req.method} ${req.path}`;
  if (NODE_ENV === 'development') console.log(log);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Weather endpoints
app.get('/api/weather/current', async (req, res) => {
  try {
    const data = await WeatherService.getCurrentWeather();
    res.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/weather/forecast', async (req, res) => {
  try {
    const data = await WeatherService.getForecast();
    res.json(data);
  } catch (error) {
    console.error('Forecast API error:', error);
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

// Air quality endpoints
app.get('/api/air-quality/current', async (req, res) => {
  try {
    const data = await AirQualityService.getCurrentAirQuality();
    res.json(data);
  } catch (error) {
    console.error('Air quality API error:', error);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

app.get('/api/air-quality/forecast', async (req, res) => {
  try {
    const data = await AirQualityService.getAirQualityForecast();
    res.json(data);
  } catch (error) {
    console.error('Air quality forecast error:', error);
    res.status(500).json({ error: 'Failed to fetch air quality forecast' });
  }
});

// Combined environmental report
app.get('/api/environmental/report', async (req, res) => {
  try {
    const weather = await WeatherService.getCurrentWeather();
    const airQuality = await AirQualityService.getCurrentAirQuality();
    
    if (weather.success && airQuality.success) {
      const aqi = AirQualityService.calculateAQI(
        airQuality.data.pm25,
        airQuality.data.pm10,
        airQuality.data.ozone
      );
      
      res.json({
        success: true,
        data: {
          timestamp: weather.data.timestamp,
          weather: weather.data,
          airQuality: airQuality.data,
          analysis: {
            aqi,
            aqiCategory: AirQualityService.getAQICategory(aqi),
            allergenRisk: WeatherService.calculateAllergenRisk(weather.data),
            dustRisk: AirQualityService.assessDustRisk(airQuality.data.pm10),
            windType: WeatherService.getWindType(weather.data.windDirection),
          },
        },
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch environmental data',
      });
    }
  } catch (error) {
    console.error('Environmental report error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Scheduled job: Fetch and store data
async function fetchAndStoreData() {
  console.log('Running scheduled data fetch...');
  try {
    const weather = await WeatherService.getCurrentWeather();
    const airQuality = await AirQualityService.getCurrentAirQuality();
    
    console.log('Data fetched successfully');
    console.log('Weather:', weather.data);
    console.log('Air Quality:', airQuality.data);
    
    // TODO: Store in Supabase database
  } catch (error) {
    console.error('Data fetch error:', error);
  }
}

// Run scheduled job on startup and then every hour
fetchAndStoreData();
setInterval(fetchAndStoreData, 60 * 60 * 1000);

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Gibraltar Allergy App Backend`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  console.log(`📊 APIs Ready:`);
  console.log(`   ✅ Weather (Open-Meteo)`);
  console.log(`   ✅ Air Quality (Open-Meteo)`);
  console.log(`   ✅ Environmental Report`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default app;
