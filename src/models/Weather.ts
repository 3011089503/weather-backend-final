import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Weather extends Model {
  // define attribute here
  public id!: number;
  public city!: string;
  public temperature!: number;
  public humidity!: number;
  public weather!: string;
  public timestamp!: Date;
}

Weather.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    city: { type: DataTypes.STRING, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    humidity: { type: DataTypes.INTEGER, allowNull: false },
    weather: { type: DataTypes.STRING, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'Weather',
    tableName: 'weather_data',
    timestamps: false
  }
);

export { Weather };