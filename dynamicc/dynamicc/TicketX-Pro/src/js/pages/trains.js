// Trains Page Script

requireLogin();

function loadTrains(trains = null) {
    trains = trains || TrainsAPI.searchTrains(
        document.getElementById('fromStation').value,
        document.getElementById('toStation').value
    );
    
    const grid = document.getElementById('trainsGrid');
    
    if (trains.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No trains found. Try different stations!</p></div>';
        return;
    }
    
    grid.innerHTML = trains.map(train => `
        <div class="result-card">
            <div class="result-card__info">
                <h3 class="result-card__title">${train.name} (${train.number})</h3>
                <div class="result-card__details">
                    <div class="result-card__detail-item">⏰ ${train.departure} → ${train.arrival}</div>
                    <div class="result-card__detail-item">⏱️ ${train.duration}</div>
                    <div class="result-card__detail-item">📍 ${train.distance}km</div>
                    <div class="result-card__detail-item">⭐ ${train.rating}</div>
                    <div class="result-card__detail-item">🛑 ${train.stops} stops</div>
                </div>
                <div style="margin-top: 10px; font-size: 12px;">
                    <strong>Available Classes:</strong><br>
                    ${Object.entries(train.classes).map(([cls, data]) => 
                        `${cls}: ${data.available} seats @ ${formatPrice(data.price)}`
                    ).join(' | ')}
                </div>
            </div>
            <div class="result-card__actions">
                <div class="result-card__price">${formatPrice(Math.min(...Object.values(train.classes).map(c => c.price)))}</div>
                <button class="btn btn-primary btn-sm" onclick="bookTrain('${train.id}')">Book Now</button>
            </div>
        </div>
    `).join('');
}

function bookTrain(trainId) {
    const train = TrainsAPI.getTrainById(trainId);
    if (!train) return;
    
    // Get minimum price from available classes
    const minPrice = Math.min(...Object.values(train.classes).map(c => c.price));
    
    UniversalBookingHandler.showBookingForm({
        name: `${train.name} (${train.number})`,
        price: minPrice,
        category: 'Trains',
        description: `${train.departure} to ${train.arrival} • ${train.duration}`,
        rating: train.rating
    });
}
}

function applyFilters() {
    const from = document.getElementById('fromStation').value;
    const to = document.getElementById('toStation').value;
    
    if (!from || !to) {
        showNotification('Please select both stations', 'warning');
        return;
    }
    
    let trains = TrainsAPI.searchTrains(from, to);
    
    const filterDeparts = document.getElementById('filterDeparts').checked;
    const filterArrives = document.getElementById('filterArrives').checked;
    
    if (filterDeparts) {
        trains = trains.filter(t => {
            const depHour = parseInt(t.departure.split(':')[0]);
            return depHour < 10;
        });
    }
    
    if (filterArrives) {
        trains = trains.filter(t => {
            const arrHour = parseInt(t.arrival.split(':')[0]);
            return arrHour < 22;
        });
    }
    
    loadTrains(trains);
}

// Search functionality
document.getElementById('trainSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    loadTrains();
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
    document.getElementById('travelDate').valueAsDate = tomorrow;
    
    // Load initial results if stations are selected
    const fromStation = document.getElementById('fromStation').value;
    if (fromStation) {
        loadTrains();
    }
});
