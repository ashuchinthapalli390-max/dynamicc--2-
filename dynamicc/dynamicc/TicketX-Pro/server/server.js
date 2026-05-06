const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const moviesRoute = require('./routes/movies');
const hotelsRoute = require('./routes/hotels');
const trainsRoute = require('./routes/trains');
const busesRoute = require('./routes/buses');
const flightsRoute = require('./routes/flights');
const bookingsRoute = require('./routes/bookings');
const authRoute = require('./routes/auth');

// Mount Routes
app.use('/api/movies', moviesRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/trains', trainsRoute);
app.use('/api/buses', busesRoute);
app.use('/api/flights', flightsRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/auth', authRoute);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'TicketX Pro Backend is running', type: 'Node.js Express' });
});

app.listen(PORT, () => {
    console.log(`TicketX Pro Backend listening on http://localhost:${PORT}`);
});
