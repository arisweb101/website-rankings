const axios = require('axios');
const { API_URL } = require('../config/config');
const Data = require('../models/dataModel');
const sequelize = require('../config/db');

const fetchDataController = async () => {
    await sequelize.sync({ alter: true });
    console.log('✅ Database Synced before fetching data');

    try {
        const response = await axios.get(API_URL);
        const marketIntel = response.data.marketIntel;

        for (const item of marketIntel) {
            const { domain, scores } = item;

            for (const [date, score] of Object.entries(scores)) {
                try {
                    const formattedDate = new Date(date);

                    if (isNaN(formattedDate)) {
                        continue;
                    }

                    const existingData = await Data.findOne({
                        where: {
                            domain: domain,
                            date: formattedDate,
                        },
                    });

                    if (!existingData) {
                        await Data.create({
                            domain,
                            date: formattedDate,
                            score,
                        });
                    }
                } catch (error) {
                    console.log(`Error saving data for ${domain}:`, error);
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = { fetchDataController };
