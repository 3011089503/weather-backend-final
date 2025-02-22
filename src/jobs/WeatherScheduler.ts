import cron from 'node-cron';
import { WeatherService } from '../services/WeatherService';

// Cities to track
const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'];

// get weather data at 30min
cron.schedule('*/30 * * * *', async () => {
  console.log('Fetching weather data...');
  for (const city of cities) {
    await WeatherService.saveWeatherData(city);
  }
});
