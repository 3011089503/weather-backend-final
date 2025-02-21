"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weather = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Weather extends sequelize_1.Model {
}
exports.Weather = Weather;
Weather.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    city: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    temperature: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    humidity: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    weather: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    timestamp: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Weather',
    tableName: 'weather_data',
    timestamps: false
});
