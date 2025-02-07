require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const dataRoutes = require('./routes/dataRoutes');
const { fetchDataController } = require('./controllers/fetchDataController');
const sequelize = require('./config/db');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const startServer = async () => {
    await sequelize.sync({ alter: true });
    try {
        const port = process.env.PORT || 3002;
        app.listen(port, () => {
            console.log(`🚀 Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('❌ Failed to sync database:', error);
        process.exit(1);
    }
};

startServer();
fetchDataController();

cron.schedule('0 * * * *', fetchDataController);

app.use('/api', dataRoutes);
