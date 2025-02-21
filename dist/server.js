"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WeatherRoutes_1 = __importDefault(require("./routes/WeatherRoutes"));
const database_1 = require("./config/database");
// 引入定时任务
require("./jobs/WeatherScheduler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// 测试数据库连接
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected...');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
// 同步数据库(示例, 在生产环境请慎用 force:true)
database_1.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced.');
}).catch((error) => {
    console.error('Sync error:', error);
});
// 绑定路由
app.use('/api', WeatherRoutes_1.default);
// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
