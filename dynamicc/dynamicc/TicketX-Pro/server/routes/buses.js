const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getData = () => {
    try {
        const filePath = path.join(__dirname, '../data/buses.json');
        if (!fs.existsSync(filePath)) return [];
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// GET /api/buses
router.get('/', (req, res) => {
    res.json(getData());
});

// GET /api/buses/:id
router.get('/:id', (req, res) => {
    const data = getData();
    const item = data.find(m => m.id === parseInt(req.params.id) || m.id === req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ error: 'Item not found' });
});

module.exports = router;
