const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getData = () => {
    try {
        const filePath = path.join(__dirname, '../data/movies.json');
        if (!fs.existsSync(filePath)) return [];
        const rawData = fs.readFileSync(filePath);
        return JSON.parse(rawData);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// GET /api/movies
router.get('/', (req, res) => {
    res.json(getData());
});

// GET /api/movies/:id
router.get('/:id', (req, res) => {
    const data = getData();
    const movie = data.find(m => m.id === parseInt(req.params.id));
    if (movie) res.json(movie);
    else res.status(404).json({ error: 'Movie not found' });
});

module.exports = router;
