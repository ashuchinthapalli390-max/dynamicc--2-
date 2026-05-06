// This file handles the logic for displaying events, including fetching data from APIs and rendering event cards.

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

async function loadEvents() {
    try {
        const response = await fetch('../data/mock-events.json');
        const events = await response.json();
        displayEvents(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';

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
        <p>${event.location}</p>
        <button onclick="bookEvent('${event.id}')">Book Now</button>
    `;
    return card;
}

function bookEvent(eventId) {
    // Logic to handle booking the event
    console.log(`Booking event with ID: ${eventId}`);
}