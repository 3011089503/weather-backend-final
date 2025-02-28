import express from 'express';
import weatherRoutes from './routes/WeatherRoutes';
import { sequelize } from './config/database';
import './jobs/WeatherScheduler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// test link
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

//Synchronize database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced.');
}).catch((error) => {
  console.error('Sync error:', error);
});


// connect apt
app.use('/api', weatherRoutes);

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
