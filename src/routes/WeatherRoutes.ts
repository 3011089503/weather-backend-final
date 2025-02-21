import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

const router = Router();

// 获取所有已记录天气数据
router.get('/weather', WeatherController.getAllWeather);

// 获取指定城市过去 7 天平均温度和湿度
router.get('/weather/weekly/:city', WeatherController.getWeeklyStats);

export default router;
