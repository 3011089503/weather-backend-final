import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'mysql',
  logging: console.log,
});


async function connectWithRetry(retries = 5, delay = 5000) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to MySQL successfully!');
      return;
    } catch (error) {
      console.error(`❌ Failed to connect to MySQL (Attempt ${i + 1}/${retries})`);
      if (i < retries - 1) {
        console.log(`⏳ Retrying in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        console.error('❌ Max retries reached. Could not connect to MySQL.');
        process.exit(1);
      }
    }
  }
}


async function initDatabase() {
  await connectWithRetry();
  await sequelize.sync({ alter: true }); 
  console.log('✅ Database & tables synced successfully!');
}

initDatabase().catch(err => {
  console.error('❌ Database initialization failed:', err);
});
