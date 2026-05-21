import axios from 'axios';

/**
 * AirQualityService - Handles air quality data from Open-Meteo
 */

const GIBRALTAR_LAT = 36.1408;
const GIBRALTAR_LON = -5.3536;
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1';

export class AirQualityService {
  /**
   * Get current air quality data
   */
  static async getCurrentAirQuality() {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/air-quality`, {
        params: {
          latitude: GIBRALTAR_LAT,
          longitude: GIBRALTAR_LON,
          current: 'pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide',
          timezone: 'Europe/London',
        },
      });

      return {
        success: true,
        data: {
          timestamp: response.data.current.time,
          pm25: response.data.current.pm2_5,
          pm10: response.data.current.pm10,
          ozone: response.data.current.ozone,
          nitrogenDioxide: response.data.current.nitrogen_dioxide,
          sulphurDioxide: response.data.current.sulphur_dioxide,
        },
      };
    } catch (error) {
      console.error('Error fetching air quality:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Get air quality forecast (hourly)
   */
  static async getAirQualityForecast() {
    try {
      const response = await axios.get(`${OPEN_METEO_URL}/air-quality`, {
        params: {
          latitude: GIBRALTAR_LAT,
          longitude: GIBRALTAR_LON,
          hourly: 'pm2_5,pm10,ozone',
          forecast_hours: 120,
          timezone: 'Europe/London',
        },
      });

      return {
        success: true,
        data: response.data.hourly,
      };
    } catch (error) {
      console.error('Error fetching air quality forecast:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Calculate AQI (Air Quality Index) based on pollutant levels
   * Using EPA AQI scale
   */
  static calculateAQI(pm25, pm10, ozone) {
    // PM2.5 AQI (0-50: Good, 51-100: Moderate, etc.)
    let pm25AQI = 0;
    if (pm25 <= 12) pm25AQI = (pm25 / 12) * 50;
    else if (pm25 <= 35.4) pm25AQI = 50 + ((pm25 - 12) / 23.4) * 50;
    else if (pm25 <= 55.4) pm25AQI = 100 + ((pm25 - 35.4) / 20) * 50;
    else pm25AQI = 150 + ((pm25 - 55.4) / 150.4) * 50;

    // PM10 AQI
    let pm10AQI = 0;
    if (pm10 <= 54) pm10AQI = (pm10 / 54) * 50;
    else if (pm10 <= 154) pm10AQI = 50 + ((pm10 - 54) / 100) * 50;
    else pm10AQI = 100 + ((pm10 - 154) / 200) * 50;

    // Return highest AQI
    return Math.max(pm25AQI, pm10AQI);
  }

  /**
   * Get AQI category
   */
  static getAQICategory(aqi) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }

  /**
   * Assess dust risk (higher PM10 = higher dust)
   */
  static assessDustRisk(pm10) {
    if (pm10 < 25) return { level: 'Low', score: 1 };
    if (pm10 < 50) return { level: 'Moderate', score: 5 };
    if (pm10 < 75) return { level: 'High', score: 7 };
    return { level: 'Very High', score: 9 };
  }
}

export default AirQualityService;
