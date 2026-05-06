// Flights Page Script

requireLogin();

function loadFlights(flights = null) {
    const from = document.getElementById('fromCity').value;
    const to = document.getElementById('toCity').value;
    const passengers = parseInt(document.getElementById('passengers').value);
    const cabinClass = document.getElementById('cabinClass').value;
    
    flights = flights || FlightsAPI.searchFlights(from, to, null, passengers, cabinClass);
    
    const grid = document.getElementById('flightsGrid');
    
    if (flights.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No flights found. Try different dates or cities!</p></div>';
        return;
    }
    
    grid.innerHTML = flights.map(flight => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${flight.airline} - ${flight.flightNumber}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${flight.departure} → ${flight.arrival}</div>
                    <div class="result-card__detail-item">⏱️ ${flight.duration}</div>
                    <div class="result-card__detail-item">🛫 ${flight.aircraft}</div>
                    <div class="result-card__detail-item">⭐ ${flight.rating}</div>
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    <strong>Availability (${cabinClass}):</strong> ${flight.available[cabinClass]} seats
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(flight.price * parseInt(document.getElementById('passengers').value))}</div>
                <button class="btn btn-primary btn-sm" onclick="bookFlight('${flight.id}')">Book Now</button>
            </div>
        </div>
    `).join('');
}

function bookFlight(flightId) {
    const flight = FlightsAPI.getFlightById(flightId);
    if (!flight) return;
    
    const passengers = parseInt(document.getElementById('passengers').value);
    const totalPrice = flight.price * passengers;
    
    UniversalBookingHandler.showBookingForm({
        name: `${flight.airline} - ${flight.flightNumber}`,
        price: totalPrice,
        category: 'Flights',
        description: `${flight.departure} to ${flight.arrival} • ${flight.duration} • ${passengers} passenger(s)`,
        rating: flight.rating
    });
}

// Search functionality
document.getElementById('flightSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loadFlights();
});

// Sort functionality
document.getElementById('sortByFlight').addEventListener('change', function(e) {
    const sortBy = e.target.value;
    const from = document.getElementById('fromCity').value;
    const to = document.getElementById('toCity').value;
    const passengers = parseInt(document.getElementById('passengers').value);
    const cabinClass = document.getElementById('cabinClass').value;
    
    let flights = FlightsAPI.searchFlights(from, to, null, passengers, cabinClass);
    
    switch(sortBy) {
        case 'price':
            flights = FlightsAPI.sortByPrice(flights);
            break;
        case 'duration':
            flights = FlightsAPI.sortByDuration(flights);
            break;
        case 'rating':
            flights = FlightsAPI.sortByRating(flights);
            break;
        default:
            break;
    }
    
    loadFlights(flights);
});

function handleUserClick() {
    const user = Auth.getCurrentUser();
    const action = confirm(`${user.name}\n\nGo to Dashboard (OK) or Logout (Cancel)?`);
    if (action) {
        window.location.href = 'user/dashboard.html';
    } else {
        Auth.logout();
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Set default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('flightDate').valueAsDate = tomorrow;
});
