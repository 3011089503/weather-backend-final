"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const Weather_1 = require("../models/Weather");
const WeatherService_1 = require("../services/WeatherService");
class WeatherController {
    // get weather data
    static getAllWeather(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Weather_1.Weather.findAll();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    // get 7 day average wet
    static getWeeklyStats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const city = req.params.city;
                const result = yield WeatherService_1.WeatherService.getWeeklyAverages(city);
                res.json({
                    city,
                    averageTemperature: result.avgTemp,
                    averageHumidity: result.avgHumidity
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.WeatherController = WeatherController;
