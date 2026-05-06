// This file manages the booking process, including seat selection and confirmation.

document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const seatSelection = document.getElementById('seat-selection');
    const confirmationMessage = document.getElementById('confirmation-message');

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedSeats = Array.from(seatSelection.querySelectorAll('input[type="checkbox"]:checked'))
            .map(seat => seat.value);

        if (selectedSeats.length > 0) {
            confirmBooking(selectedSeats);
        } else {
            alert('Please select at least one seat.');
        }
    });

    function confirmBooking(seats) {
        // Here you would typically send the booking data to the server
        confirmationMessage.textContent = `Booking confirmed for seats: ${seats.join(', ')}`;
        confirmationMessage.style.display = 'block';
    }
});