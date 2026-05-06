// Home Page Script

function handleUserClick() {
    if (Auth.isLoggedIn()) {
        const user = Auth.getCurrentUser();
        const action = confirm(`Welcome ${user.name}!\n\nGo to Dashboard (OK) or Logout (Cancel)?`);
        if (action) {
            window.location.href = 'pages/user/dashboard.html';
        } else {
            Auth.logout();
        }
    } else {
        goToLogin();
    }
}

// Load featured movies
function loadFeaturedMovies() {
    const movies = MoviesAPI.getTopRated();
    const grid = document.getElementById('moviesGrid');
    
    grid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-card__poster">${movie.poster}</div>
            <div class="movie-card__content">
                <h3 class="movie-card__title">${movie.title}</h3>
                <p class="movie-card__genre">${movie.genre}</p>
                <p class="movie-card__rating">⭐ ${movie.rating}/10</p>
                <p class="movie-card__price">${formatPrice(movie.price)}</p>
                <button class="btn btn-primary" onclick="goToMovies()">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Load sample trains
function loadSampleTrains() {
    const trains = TrainsAPI.getPopularRoutes().map((route, i) => {
        const trainData = DUMMY_TRAINS[i] || DUMMY_TRAINS[0];
        return trainData;
    });
    
    const grid = document.getElementById('trainsGrid');
    
    grid.innerHTML = trains.map(train => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${train.name}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${train.departure} - ${train.arrival}</div>
                    <div class="result-card__detail-item">📍 ${train.from} → ${train.to}</div>
                    <div class="result-card__detail-item">⭐ ${train.rating}</div>
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(Math.min(...Object.values(train.classes).map(c => c.price)))}</div>
                <button class="btn btn-primary btn-sm" onclick="goToTrains()">Book</button>
            </div>
        </div>
    `).join('');
}

// Load sample flights
function loadSampleFlights() {
    const flights = FlightsAPI.getPopularRoutes().map((route, i) => {
        return DUMMY_FLIGHTS[i] || DUMMY_FLIGHTS[0];
    });
    
    const grid = document.getElementById('flightsGrid');
    
    grid.innerHTML = flights.map(flight => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${flight.airline} ${flight.flightNumber}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${flight.departure} - ${flight.arrival}</div>
                    <div class="result-card__detail-item">📍 ${flight.from} → ${flight.to}</div>
                    <div class="result-card__detail-item">⭐ ${flight.rating}</div>
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(flight.price)}</div>
                <button class="btn btn-primary btn-sm" onclick="goToFlights()">Book</button>
            </div>
        </div>
    `).join('');
}

// Load sample buses
function loadSampleBuses() {
    const buses = BusAPI.getPopularRoutes().map((route, i) => {
        return DUMMY_BUSES[i] || DUMMY_BUSES[0];
    });
    
    const grid = document.getElementById('busGrid');
    
    grid.innerHTML = buses.map(bus => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${bus.operator} - ${bus.busType}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${bus.departure} - ${bus.arrival}</div>
                    <div class="result-card__detail-item">📍 ${bus.from} → ${bus.to}</div>
                    <div class="result-card__detail-item">⭐ ${bus.rating}</div>
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(bus.price)}</div>
                <button class="btn btn-primary btn-sm" onclick="goToBus()">Book</button>
            </div>
        </div>
    `).join('');
}

// Load featured events
function loadFeaturedEvents() {
    const events = DUMMY_EVENTS.slice(0, 6); // Show first 6 events
    const grid = document.getElementById('eventsGrid');
    
    grid.innerHTML = events.map(event => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${event.name}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">🎭 ${event.category}</div>
                    <div class="result-card__detail-item">📍 ${event.location}</div>
                    <div class="result-card__detail-item">📅 ${event.date}</div>
                    <div class="result-card__detail-item">⭐ ${event.rating}/5</div>
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(event.price)}</div>
                <button class="btn btn-primary btn-sm" onclick="goToEvents()">Book</button>
            </div>
        </div>
    `).join('');
}

// Navigation helpers
function goToMovies() {
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/movies.html';
    }
}

function goToTrains() {
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/trains.html';
    }
}

function goToFlights() {
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/flights.html';
    }
}

function goToBus() {
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/bus.html';
    }
}

function goToEvents() {
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/events.html';
    }
}

// Movie search form
document.getElementById('movieSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!Auth.isLoggedIn()) {
        goToLogin();
    } else {
        window.location.href = 'pages/movies.html';
    }
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Set default date
document.getElementById('movieDate').valueAsDate = new Date();

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedMovies();
    loadSampleTrains();
    loadSampleFlights();
    loadSampleBuses();
    loadFeaturedEvents();
});
