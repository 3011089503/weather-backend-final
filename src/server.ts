import express from 'express';
import weatherRoutes from './routes/WeatherRoutes';
import { sequelize } from './config/database';
// 引入定时任务
import './jobs/WeatherScheduler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// 测试数据库连接
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// 同步数据库(示例, 在生产环境请慎用 force:true)
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced.');
}).catch((error) => {
  console.error('Sync error:', error);
});

// 绑定路由
app.use('/api', weatherRoutes);

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
