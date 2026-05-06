// Checkout Page Script

requireLogin();

let bookingData = {};
let discountAmount = 0;

function loadBookingSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    
    let item = null;
    let summary = '';
    
    if (type === 'movie') {
        item = Storage.get('selectedMovie');
        summary = `
            <div class="summary-item">
                <label>Movie</label>
                <span>${item.title}</span>
            </div>
            <div class="summary-item">
                <label>Seats</label>
                <span id="selectedSeats">-</span>
            </div>
            <div class="summary-item summary-subtotal">
                <label>Subtotal</label>
                <span id="subtotal">₹0</span>
            </div>
        `;
    } else if (type === 'train') {
        item = Storage.get('selectedTrain');
        summary = `
            <div class="summary-item">
                <label>Train</label>
                <span>${item.name}</span>
            </div>
            <div class="summary-item">
                <label>Class</label>
                <span id="trainClass">-</span>
            </div>
            <div class="summary-item">
                <label>Seats</label>
                <span id="selectedSeats">-</span>
            </div>
            <div class="summary-item summary-subtotal">
                <label>Subtotal</label>
                <span id="subtotal">₹0</span>
            </div>
        `;
    } else if (type === 'flight') {
        item = Storage.get('selectedFlight');
        const passengers = item.passengers || 1;
        summary = `
            <div class="summary-item">
                <label>Flight</label>
                <span>${item.airline} ${item.flightNumber}</span>
            </div>
            <div class="summary-item">
                <label>Route</label>
                <span>${item.from} → ${item.to}</span>
            </div>
            <div class="summary-item">
                <label>Passengers</label>
                <span>${passengers}</span>
            </div>
            <div class="summary-item">
                <label>Base Price</label>
                <span>${formatPrice(item.price)} x ${passengers}</span>
            </div>
            <div class="summary-item summary-subtotal">
                <label>Subtotal</label>
                <span id="subtotal">${formatPrice(item.price * passengers)}</span>
            </div>
        `;
        bookingData.totalPrice = item.price * passengers;
    } else if (type === 'bus') {
        item = Storage.get('selectedBus');
        summary = `
            <div class="summary-item">
                <label>Bus Operator</label>
                <span>${item.operator}</span>
            </div>
            <div class="summary-item">
                <label>Route</label>
                <span>${item.from} → ${item.to}</span>
            </div>
            <div class="summary-item">
                <label>Departure</label>
                <span>${item.departure}</span>
            </div>
            <div class="summary-item">
                <label>Seats</label>
                <span id="selectedSeats">-</span>
            </div>
            <div class="summary-item summary-subtotal">
                <label>Subtotal</label>
                <span id="subtotal">₹0</span>
            </div>
        `;
    }
    
    // Add GST
    summary += `
        <div class="summary-item summary-tax">
            <label>GST (5%)</label>
            <span id="gstAmount">₹0</span>
        </div>
    `;
    
    document.getElementById('bookingSummary').innerHTML = summary;
    bookingData.type = type;
    bookingData.item = item;
    
    updateTotalAmount();
}

function updateTotalAmount() {
    let subtotal = bookingData.totalPrice || 500; // Default amount for demo
    const gst = Math.round(subtotal * 0.05);
    const total = subtotal + gst - discountAmount;
    
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = formatPrice(subtotal);
    }
    if (document.getElementById('gstAmount')) {
        document.getElementById('gstAmount').textContent = formatPrice(gst);
    }
    document.getElementById('totalAmount').textContent = formatPrice(total);
    bookingData.gst = gst;
    bookingData.totalWithGst = total;
}

function applyPromo() {
    const promoCode = document.getElementById('promoCode').value.toUpperCase();
    
    if (!promoCode) {
        showNotification('Please enter a promo code', 'warning');
        return;
    }
    
    // Simple promo codes for demo
    const promoCodes = {
        'SAVE10': 0.10,
        'SAVE20': 0.20,
        'TICKETX': 0.15,
        'WELCOME': 0.05
    };
    
    if (promoCodes[promoCode]) {
        const subtotal = bookingData.totalPrice || 500;
        discountAmount = Math.round(subtotal * promoCodes[promoCode]);
        updateTotalAmount();
        showNotification(`✅ Promo code applied! You saved ${formatPrice(discountAmount)}`, 'success');
    } else {
        showNotification('❌ Invalid promo code', 'error');
    }
}

function completeBooking() {
    const name = document.getElementById('passengerName').value.trim();
    const email = document.getElementById('passengerEmail').value.trim();
    const phone = document.getElementById('passengerPhone').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!name || !email || !phone) {
        showNotification('Please fill all passenger details', 'warning');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to Terms & Conditions', 'warning');
        return;
    }
    
    // Create booking
    const booking = {
        id: generateID('BK'),
        userId: Auth.getCurrentUser().id,
        category: bookingData.type,
        itemId: bookingData.item.id,
        itemName: bookingData.item.title || bookingData.item.name || bookingData.item.operator,
        passengerName: name,
        passengerEmail: email,
        passengerPhone: phone,
        seats: bookingData.seats || [],
        date: new Date().toISOString().split('T')[0],
        totalPrice: bookingData.totalWithGst,
        status: 'confirmed',
        bookedAt: new Date().toISOString()
    };
    
    // Save booking
    const bookings = Storage.get(DB.bookings) || [];
    bookings.push(booking);
    Storage.set(DB.bookings, bookings);
    
    // Clear cart and redirect
    Storage.remove('selectedMovie');
    Storage.remove('selectedTrain');
    Storage.remove('selectedFlight');
    Storage.remove('selectedBus');
    
    showNotification('✅ Booking confirmed!', 'success', 2000);
    setTimeout(() => {
        window.location.href = `confirmation.html?bookingId=${booking.id}`;
    }, 1500);
}

// Initialize
document.addEventListener('DOMContentLoaded', loadBookingSummary);
