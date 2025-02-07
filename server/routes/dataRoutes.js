const express = require('express');
const router = express.Router();
const { fetchDataController } = require('../controllers/fetchDataController');
const { getDataController } = require('../controllers/getDataController');

router.get('/fetch-data', async (req, res) => {
    try {
        await fetchDataController();
        res.json({ message: 'Data fetched and stored successfully' });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

router.get('/get-stored-data', async (req, res) => {
    try {
        const data = await getDataController();
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching stored data');
    }
});

module.exports = router;
