"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WeatherController_1 = require("../controllers/WeatherController");
const router = (0, express_1.Router)();
// 获取所有已记录天气数据
router.get('/weather', WeatherController_1.WeatherController.getAllWeather);
// 获取指定城市过去 7 天平均温度和湿度
router.get('/weather/weekly/:city', WeatherController_1.WeatherController.getWeeklyStats);
exports.default = router;
