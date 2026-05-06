const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const getBookings = () => {
    try {
        const filePath = path.join(__dirname, '../data/bookings.json');
        if (!fs.existsSync(filePath)) return [];
        return JSON.parse(fs.readFileSync(filePath));
    } catch (err) {
        return [];
    }
};

const saveBookings = (data) => {
    fs.writeFileSync(path.join(__dirname, '../data/bookings.json'), JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    res.json(getBookings());
});

router.post('/', (req, res) => {
    const bookings = getBookings();
    const newBooking = { id: Date.now().toString(), ...req.body, bookedAt: new Date().toISOString() };
    bookings.push(newBooking);
    saveBookings(bookings);
    res.status(201).json(newBooking);
});

module.exports = router;
