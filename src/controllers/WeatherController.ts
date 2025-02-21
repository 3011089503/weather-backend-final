import { Request, Response } from 'express';
import { Weather } from '../models/Weather';
import { WeatherService } from '../services/WeatherService';

export class WeatherController {
  // get weather data
  static async getAllWeather(req: Request, res: Response) {
    try {
      const data = await Weather.findAll();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // get 7 day average wet
  static async getWeeklyStats(req: Request, res: Response) {
    try {
      const city = req.params.city;
      const result = await WeatherService.getWeeklyAverages(city);
      res.json({
        city,
        averageTemperature: result.avgTemp,
        averageHumidity: result.avgHumidity
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
