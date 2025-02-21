import cron from 'node-cron';
import { WeatherService } from '../services/WeatherService';

// Cities to track
const cities = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'];

// 每 30 分钟拉取一次天气数据并存储
cron.schedule('*/30 * * * *', async () => {
  console.log('Fetching weather data...');
  for (const city of cities) {
    await WeatherService.saveWeatherData(city);
  }
});
