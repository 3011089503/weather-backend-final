import { Router } from 'express';
import { WeatherController } from '../controllers/WeatherController';

const router = Router();

//get weather data
router.get('/weather', WeatherController.getAllWeather);


// get all stats
router.get('/weather/weekly/:city', WeatherController.getWeeklyStats);


export default router;
