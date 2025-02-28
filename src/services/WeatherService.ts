
import axios from 'axios';
import { QueryTypes } from 'sequelize'; //  sequelize 
import { Weather } from '../models/Weather';
import { sequelize } from '../config/database';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.API_KEY;

interface WeeklyStats {
  avgTemp: number | null;
  avgHumidity: number | null;
}

export class WeatherService {
  
    //Fetch weather data for a given city.
   
  static async fetchWeather(city: string) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      const { main, weather } = response.data;

      // Return a simplified object
      return {
        city,
        temperature: main.temp,
        humidity: main.humidity,
        weather: weather[0].description,
      };
    } catch (error: any) {
      console.error('Error fetching weather:', error.message);
      throw error;
    }
  }

  /**
   * Save fetched weather data into the database.
   * Calls fetchWeather internally.
   */
  static async saveWeatherData(city: string) {
    try {
      // Because fetchWeather is static, we call it using the class name directly
      const weatherData = await WeatherService.fetchWeather(city);
      await Weather.create(weatherData);
      console.log(`Weather data for ${city} saved.`);
    } catch (error: any) {
      console.error(`Failed to save weather data for ${city}:`, error.message);
    }
  }

  /**
   * Get the average temperature and humidity for a given city over the past 7 days.
   */
  static async getWeeklyAverages(city: string): Promise<WeeklyStats> {
    try {
      // Get date 7 days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      
      const [results] = await sequelize.query<WeeklyStats>(
        `
        SELECT 
          AVG(temperature) as avgTemp, 
          AVG(humidity) as avgHumidity 
        FROM weather_data
        WHERE city = :city
        AND timestamp >= :startDate
        `,
        {
          replacements: { city, startDate: sevenDaysAgo },
          type: QueryTypes.SELECT,
        }
      );

      // return default if database do not have data
      return results || { avgTemp: null, avgHumidity: null };
    } catch (error: any) {
      console.error(`Error retrieving weekly averages for ${city}:`, error.message);
      throw error;
    }
  }
}
