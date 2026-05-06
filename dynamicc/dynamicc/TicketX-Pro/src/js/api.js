// This file contains functions to interact with external APIs, such as fetching movie and event data.

const API_BASE_URL = 'https://api.ticketxpro.com'; // Replace with actual API base URL

async function fetchEvents() {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const eventDetails = await response.json();
        return eventDetails;
    } catch (error) {
        console.error('Error fetching event details:', error);
        return null;
    }
}

async function bookTicket(eventId, ticketData) {
    try {
        const response = await fetch(`${API_BASE_URL}/events/${eventId}/book`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const bookingConfirmation = await response.json();
        return bookingConfirmation;
    } catch (error) {
        console.error('Error booking ticket:', error);
        return null;
    }
}