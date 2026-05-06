// Bus Page Script

requireLogin();

function loadBuses(buses = null) {
    buses = buses || BusAPI.searchBuses(
        document.getElementById('busFrom').value,
        document.getElementById('busTo').value
    );
    
    const grid = document.getElementById('busesGrid');
    
    if (buses.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No buses found. Try different cities!</p></div>';
        return;
    }
    
    grid.innerHTML = buses.map(bus => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${bus.operator} - ${bus.busType}</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${bus.departure} → ${bus.arrival}</div>
                    <div class="result-card__detail-item">⏱️ ${bus.duration}</div>
                    <div class="result-card__detail-item">📍 ${bus.distance}km</div>
                    <div class="result-card__detail-item">⭐ ${bus.rating}</div>
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    <strong>Amenities:</strong> ${bus.amenities.join(', ')}<br>
                    <strong>Available Seats:</strong> ${bus.available}/${bus.seats}
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(bus.price)}</div>
                <button class="btn btn-primary btn-sm" onclick="bookBus('${bus.id}')">Book Now</button>
            </div>
        </div>
    `).join('');
}

function bookBus(busId) {
    const bus = BusAPI.getBusById(busId);
    if (!bus) return;
    
    UniversalBookingHandler.showBookingForm({
        name: `${bus.operator} - ${bus.busType}`,
        price: bus.price,
        category: 'Buses',
        description: `${bus.departure} to ${bus.arrival} • ${bus.duration} • ${bus.amenities.join(', ')}`,
        rating: bus.rating
    });
}

function applyBusFilters() {
    const from = document.getElementById('busFrom').value;
    const to = document.getElementById('busTo').value;
    
    if (!from || !to) {
        showNotification('Please select both cities', 'warning');
        return;
    }
    
    let buses = BusAPI.searchBuses(from, to);
    
    const busType = document.getElementById('busTypeFilter').value;
    const amenity = document.getElementById('amenityFilter').value;
    
    if (busType) {
        buses = BusAPI.filterByBusType(buses, busType);
    }
    
    if (amenity) {
        buses = BusAPI.filterByAmenity(buses, amenity);
    }
    
    loadBuses(buses);
}

// Search functionality
document.getElementById('busSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loadBuses();
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
    document.getElementById('busDate').valueAsDate = tomorrow;
});
