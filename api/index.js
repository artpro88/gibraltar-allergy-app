// Vercel serverless handler
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: 'production',
  });
});

// Weather endpoints
app.get('/api/weather/current', async (req, res) => {
  try {
    const { default: WeatherService } = await import('../backend/src/services/weatherService.js');
    const data = await WeatherService.getCurrentWeather();
    res.json(data);
  } catch (error) {
    console.error('Weather error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/weather/forecast', async (req, res) => {
  try {
    const { default: WeatherService } = await import('../backend/src/services/weatherService.js');
    const data = await WeatherService.getForecast();
    res.json(data);
  } catch (error) {
    console.error('Forecast error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Air Quality endpoints
app.get('/api/air-quality/current', async (req, res) => {
  try {
    const { default: AirQualityService } = await import('../backend/src/services/airQualityService.js');
    const data = await AirQualityService.getCurrentAirQuality();
    res.json(data);
  } catch (error) {
    console.error('Air quality error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/air-quality/forecast', async (req, res) => {
  try {
    const { default: AirQualityService } = await import('../backend/src/services/airQualityService.js');
    const data = await AirQualityService.getAirQualityForecast();
    res.json(data);
  } catch (error) {
    console.error('AQ Forecast error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Combined environmental report
app.get('/api/environmental/report', async (req, res) => {
  try {
    const { default: WeatherService } = await import('../backend/src/services/weatherService.js');
    const { default: AirQualityService } = await import('../backend/src/services/airQualityService.js');

    const [weather, airQuality] = await Promise.all([
      WeatherService.getCurrentWeather(),
      AirQualityService.getCurrentAirQuality(),
    ]);

    const allergenRisk = WeatherService.calculateAllergenRisk({
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      uvIndex: weather.uvIndex,
    });

    const dustRisk = AirQualityService.assessDustRisk(airQuality.pm10);

    res.json({
      location: weather.location,
      timestamp: new Date().toISOString(),
      weather: {
        temperature: weather.temperature,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        windType: weather.windType,
        uvIndex: weather.uvIndex,
        conditions: weather.conditions,
      },
      airQuality: {
        aqi: airQuality.aqi,
        aqiLevel: airQuality.aqiLevel,
        pm25: airQuality.pm25,
        pm10: airQuality.pm10,
        o3: airQuality.o3,
      },
      allergenRisk,
      dustRisk,
    });
  } catch (error) {
    console.error('Report error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export for Vercel
export default app;
