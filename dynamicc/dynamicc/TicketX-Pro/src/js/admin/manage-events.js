// Manage Events Script

let currentCategory = 'movies';
let events = [];

// Check admin access
function checkAdminAccess() {
    const user = Auth.getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Unauthorized access! Admin only.');
        window.location.href = '../../index.html';
    }
}

// Get category from URL
function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    currentCategory = params.get('category') || 'movies';
}

// Set page title based on category
function setPageTitle() {
    const categoryMap = {
        'movies': '🎬 Manage Movies',
        'trains': '🚂 Manage Trains',
        'flights': '✈️ Manage Flights',
        'bus': '🚌 Manage Bus Routes'
    };
    
    const title = categoryMap[currentCategory] || 'Manage Events';
    document.getElementById('pageTitle').textContent = title;
    document.getElementById('listTitle').textContent = title + ' - All Events';
    document.getElementById('eventCategory').value = currentCategory;
}

// Load mock events
function loadEvents() {
    events = [
        {
            id: 1,
            name: 'Pushpa 2: The Rule',
            category: 'movies',
            date: '2026-05-10',
            time: '18:00',
            price: 500,
            seats: 300,
            location: 'PVR Cinemas, Hyderabad',
            rating: 4.8,
            description: 'Action-packed thriller'
        },
        {
            id: 2,
            name: 'Salaar 2',
            category: 'movies',
            date: '2026-05-12',
            time: '19:00',
            price: 550,
            seats: 350,
            location: 'IMAX Theater, Bangalore',
            rating: 4.7,
            description: 'Highly anticipated sequel'
        },
        {
            id: 3,
            name: 'Hyderabad - Chennai Express',
            category: 'trains',
            date: '2026-05-15',
            time: '08:00',
            price: 5000,
            seats: 500,
            location: 'Hyderabad Junction',
            rating: 4.5,
            description: 'Comfort AC 2-Tier'
        },
        {
            id: 4,
            name: 'Mumbai - Delhi Flight AI101',
            category: 'flights',
            date: '2026-05-20',
            time: '06:00',
            price: 12000,
            seats: 180,
            location: 'Mumbai - Delhi',
            rating: 4.6,
            description: 'Air India Flight'
        },
        {
            id: 5,
            name: 'Hyderabad - Bangalore Bus',
            category: 'bus',
            date: '2026-05-18',
            time: '10:00',
            price: 2500,
            seats: 45,
            location: 'Hyderabad - Bangalore',
            rating: 4.4,
            description: 'Luxury AC Coach'
        }
    ];
    
    displayEvents();
}

// Display events
function displayEvents() {
    const filtered = events.filter(e => e.category === currentCategory);
    const grid = document.getElementById('eventsGrid');
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; grid-column: 1/-1;">No events found. Add a new one!</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(event => `
        <div class="event-card">
            <div class="event-card__image">
                ${getCategoryEmoji(event.category)}
            </div>
            <div class="event-card__content">
                <div class="event-card__title">${event.name}</div>
                <div class="event-card__meta">
                    📅 ${event.date} | 💰 ₹${event.price} | 👥 ${event.seats} seats
                </div>
                <div class="event-card__meta">
                    📍 ${event.location}<br>
                    ⭐ ${event.rating}
                </div>
                <div class="event-card__actions">
                    <button class="btn btn-primary" onclick="editEvent(${event.id})">Edit</button>
                    <button class="btn btn-outline" onclick="deleteEvent(${event.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Get category emoji
function getCategoryEmoji(category) {
    const emojiMap = {
        'movies': '🎬',
        'trains': '🚂',
        'flights': '✈️',
        'bus': '🚌'
    };
    return emojiMap[category] || '📽️';
}

// Form handling
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventPrice = document.getElementById('eventPrice').value;
    const eventSeats = document.getElementById('eventSeats').value;
    
    if (!eventName || !eventDate || !eventPrice || !eventSeats) {
        alert('Please fill in all required fields');
        return;
    }
    
    alert(`Event "${eventName}" has been saved successfully!`);
    resetForm();
    loadEvents();
});

// Edit event
function editEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    document.getElementById('formTitle').textContent = 'Edit Event';
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventPrice').value = event.price;
    document.getElementById('eventSeats').value = event.seats;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventRating').value = event.rating;
    document.getElementById('eventDescription').value = event.description;
    
    // Scroll to form
    document.getElementById('eventFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Delete event
function deleteEvent(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    if (confirm(`Are you sure you want to delete "${event.name}"?`)) {
        events = events.filter(e => e.id !== eventId);
        alert('Event deleted successfully!');
        displayEvents();
    }
}

// Reset form
function resetForm() {
    document.getElementById('eventForm').reset();
    document.getElementById('formTitle').textContent = 'Add New Event';
    document.getElementById('eventCategory').value = currentCategory;
}

// Cancel form
function cancelForm() {
    resetForm();
    document.getElementById('eventFormContainer').scrollIntoView({ behavior: 'smooth' });
}

// Search events
document.getElementById('searchEvents').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const grid = document.getElementById('eventsGrid');
    const filtered = events.filter(event => 
        event.category === currentCategory && 
        event.name.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: 40px; grid-column: 1/-1;">No events found</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(event => `
        <div class="event-card">
            <div class="event-card__image">
                ${getCategoryEmoji(event.category)}
            </div>
            <div class="event-card__content">
                <div class="event-card__title">${event.name}</div>
                <div class="event-card__meta">
                    📅 ${event.date} | 💰 ₹${event.price} | 👥 ${event.seats} seats
                </div>
                <div class="event-card__meta">
                    📍 ${event.location}<br>
                    ⭐ ${event.rating}
                </div>
                <div class="event-card__actions">
                    <button class="btn btn-primary" onclick="editEvent(${event.id})">Edit</button>
                    <button class="btn btn-outline" onclick="deleteEvent(${event.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
});

// Navigation
function goToHome() {
    window.location.href = '../../index.html';
}

function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        Auth.logout();
        window.location.href = '../../index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    getCategoryFromURL();
    setPageTitle();
    loadEvents();
});
