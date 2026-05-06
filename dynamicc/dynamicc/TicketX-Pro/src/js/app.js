// app.js

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadEvents();
}

function setupEventListeners() {
    const bookButtons = document.querySelectorAll('.book-button');
    bookButtons.forEach(button => {
        button.addEventListener('click', handleBooking);
    });
}

function loadEvents() {
    // Fetch events from the API or mock data
    fetchEvents().then(events => {
        renderEvents(events);
    });
}

function handleBooking(event) {
    const eventId = event.target.dataset.eventId;
    // Logic to handle booking
    openBookingModal(eventId);
}

function openBookingModal(eventId) {
    // Logic to open the booking modal
    console.log(`Opening booking modal for event ID: ${eventId}`);
}

function renderEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <button class="book-button" data-event-id="${event.id}">Book Now</button>
    `;
    return card;
}

// Placeholder for fetchEvents function
function fetchEvents() {
    return new Promise((resolve) => {
        // Simulate fetching data
        const mockEvents = [
            { id: 1, title: 'Concert', date: '2023-10-01' },
            { id: 2, title: 'Theater', date: '2023-10-05' },
            { id: 3, title: 'Movie', date: '2023-10-10' }
        ];
        resolve(mockEvents);
    });
}