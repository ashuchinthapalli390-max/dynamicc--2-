// Confirmation Page Script

function loadConfirmation() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('bookingId');
    
    if (!bookingId) {
        window.location.href = '../index.html';
        return;
    }
    
    const bookings = Storage.get(DB.bookings) || [];
    const booking = bookings.find(b => b.id === bookingId);
    
    if (!booking) {
        showNotification('Booking not found', 'error');
        return;
    }
    
    // Display booking details
    document.getElementById('bookingId').textContent = booking.id;
    document.getElementById('itemName').textContent = booking.itemName;
    document.getElementById('bookingDate').textContent = formatDate(booking.date);
    document.getElementById('amountPaid').textContent = formatPrice(booking.totalPrice);
    
    // Generate QR Code
    generateQRCode(booking.id);
}

function generateQRCode(bookingId) {
    // QR code data - includes booking details
    const qrData = `TicketX-Pro|${bookingId}|${Auth.getCurrentUser().id}|${new Date().getTime()}`;
    
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = ''; // Clear previous content
    
    new QRCode(qrContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', loadConfirmation);
