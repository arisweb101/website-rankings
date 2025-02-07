const axios = require('axios');
const { API_URL } = require('../config/config');
const Data = require('../models/dataModel');
const sequelize = require('../config/db');

const getDataController = async () => {
    try {
        const data = await Data.findAll();
        console.error('data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching stored data:', error);
        throw new Error('Error fetching stored data');
    }
};

module.exports = { getDataController };
