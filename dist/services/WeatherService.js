"use strict";
// This file provides a static WeatherService class.
// Make sure the method is declared as "static" so that we can call it directly via "WeatherService.fetchWeather".
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = __importDefault(require("axios"));
const sequelize_1 = require("sequelize"); // ✅ 直接从 sequelize 导入 QueryTypes
const Weather_1 = require("../models/Weather");
const database_1 = require("../config/database");
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.API_KEY;
class WeatherService {
    /**
     * Fetch weather data for a given city.
     * This method is static, so we can call it using WeatherService.fetchWeather(city).
     */
    static fetchWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(API_URL, {
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
            }
            catch (error) {
                console.error('Error fetching weather:', error.message);
                throw error;
            }
        });
    }
    /**
     * Save fetched weather data into the database.
     * Calls fetchWeather internally.
     */
    static saveWeatherData(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Because fetchWeather is static, we call it using the class name directly
                const weatherData = yield WeatherService.fetchWeather(city);
                yield Weather_1.Weather.create(weatherData);
                console.log(`Weather data for ${city} saved.`);
            }
            catch (error) {
                console.error(`Failed to save weather data for ${city}:`, error.message);
            }
        });
    }
    /**
     * Get the average temperature and humidity for a given city over the past 7 days.
     */
    static getWeeklyAverages(city) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get date 7 days ago
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                // ✅ 使用 QueryTypes 进行原生 SQL 查询
                const [results] = yield database_1.sequelize.query(`
        SELECT 
          AVG(temperature) as avgTemp, 
          AVG(humidity) as avgHumidity 
        FROM weather_data
        WHERE city = :city
        AND timestamp >= :startDate
        `, {
                    replacements: { city, startDate: sevenDaysAgo },
                    type: sequelize_1.QueryTypes.SELECT,
                });
                // 如果数据库没有数据，确保返回默认值
                return results || { avgTemp: null, avgHumidity: null };
            }
            catch (error) {
                console.error(`Error retrieving weekly averages for ${city}:`, error.message);
                throw error;
            }
        });
    }
}
exports.WeatherService = WeatherService;
