import axios from 'axios';

/**
 * WeatherService - Handles weather data from Open-Meteo API
 * Gibraltar coordinates: 36.1408° N, 5.3536° W
 */

const GIBRALTAR_LAT = 36.1408;
const GIBRALTAR_LON = -5.3536;
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1';

export class WeatherService {
  /**
   * Get current weather for Gibraltar
   */
  static async getCurrentWeather() {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/forecast`, {
        params: {
          latitude: GIBRALTAR_LAT,
          longitude: GIBRALTAR_LON,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index',
          timezone: 'Europe/London',
        },
      });

      return {
        success: true,
        data: {
          timestamp: response.data.current.time,
          temperature: response.data.current.temperature_2m,
          humidity: response.data.current.relative_humidity_2m,
          apparentTemp: response.data.current.apparent_temperature,
          windSpeed: response.data.current.wind_speed_10m,
          windDirection: response.data.current.wind_direction_10m,
          uvIndex: response.data.current.uv_index,
          precipitation: response.data.current.precipitation,
          weatherCode: response.data.current.weather_code,
        },
      };
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get 5-day weather forecast
   */
  static async getForecast() {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/forecast`, {
        params: {
          latitude: GIBRALTAR_LAT,
          longitude: GIBRALTAR_LON,
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max',
          timezone: 'Europe/London',
          forecast_days: 5,
        },
      });

      return {
        success: true,
        data: response.data.daily,
      };
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Determine wind type (Levante/Poniente) based on wind direction
   * Levante (East): 60-120°
   * Poniente (West): 240-300°
   */
  static getWindType(windDirection) {
    if (windDirection >= 60 && windDirection <= 120) {
      return 'Levante';
    } else if (windDirection >= 240 && windDirection <= 300) {
      return 'Poniente';
    }
    return 'Variable';
  }

  /**
   * Calculate allergen risk based on weather conditions
   */
  static calculateAllergenRisk(weather) {
    let riskScore = 0;

    // Temperature: Higher temps increase allergen release
    if (weather.temperature > 20) riskScore += 2;
    if (weather.temperature > 25) riskScore += 1;

    // Wind speed: Higher winds increase allergen dispersal
    if (weather.windSpeed > 15) riskScore += 2;
    if (weather.windSpeed > 20) riskScore += 1;

    // Humidity: Low humidity increases allergen dispersal
    if (weather.humidity < 50) riskScore += 2;
    if (weather.humidity < 40) riskScore += 1;

    // UV Index: Higher UV increases allergen potency
    if (weather.uvIndex > 6) riskScore += 1;

    return Math.min(riskScore, 10);
  }
}

export default WeatherService;
