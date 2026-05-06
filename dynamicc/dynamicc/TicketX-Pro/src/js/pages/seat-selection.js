// Seat Selection Page Script

requireLogin();

let selectedSeats = [];
let pricePerSeat = 250;
let bookingType = '';
let bookingId = '';

function generateSeats() {
    const urlParams = new URLSearchParams(window.location.search);
    bookingType = urlParams.get('type');
    bookingId = urlParams.get('id');
    
    let rows = 8;
    let cols = 10;
    let occupiedSeats = [
        'A2', 'A5', 'B1', 'B3', 'B4', 'B8', 'C1', 'C5', 'C7',
        'D2', 'D6', 'D9', 'E3', 'E8', 'F1', 'F4', 'F7', 'F9',
        'G2', 'G5', 'G8', 'H1', 'H3', 'H6', 'H9'
    ];
    
    // Get pricing based on type
    if (bookingType === 'movie') {
        const movie = Storage.get('selectedMovie');
        if (movie) pricePerSeat = movie.price;
    } else if (bookingType === 'bus') {
        const bus = Storage.get('selectedBus');
        if (bus) pricePerSeat = bus.price;
    } else if (bookingType === 'train') {
        // For trains, price varies by class - use average
        pricePerSeat = 1000;
    }
    
    const container = document.getElementById('seatsContainer');
    container.innerHTML = '';
    
    const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seats-row';
        
        for (let c = 1; c <= cols; c++) {
            const seatId = rowLabels[r] + c;
            const seat = document.createElement('button');
            seat.className = 'seat';
            seat.textContent = c;
            seat.onclick = () => toggleSeat(seatId, seat);
            
            if (occupiedSeats.includes(seatId)) {
                seat.classList.add('occupied');
                seat.disabled = true;
            }
            
            rowDiv.appendChild(seat);
        }
        
        container.appendChild(rowDiv);
    }
}

function toggleSeat(seatId, element) {
    if (element.classList.contains('occupied')) return;
    
    const index = selectedSeats.indexOf(seatId);
    
    if (index > -1) {
        selectedSeats.splice(index, 1);
        element.classList.remove('selected');
    } else {
        selectedSeats.push(seatId);
        element.classList.add('selected');
    }
    
    updateSeatSummary();
}

function updateSeatSummary() {
    const display = document.getElementById('selectedSeatsDisplay');
    
    if (selectedSeats.length === 0) {
        display.innerHTML = '<span style="color: var(--light-dark);">No seats selected</span>';
    } else {
        display.innerHTML = selectedSeats.map(seat => 
            `<span class="selected-seat-tag">${seat}</span>`
        ).join('');
    }
    
    const totalPrice = selectedSeats.length * pricePerSeat;
    document.getElementById('totalPrice').textContent = formatPrice(totalPrice);
}

function proceedToCheckout() {
    if (selectedSeats.length === 0) {
        showNotification('Please select at least one seat', 'warning');
        return;
    }
    
    // Store seats and proceed to checkout
    let item = null;
    
    if (bookingType === 'movie') {
        item = Storage.get('selectedMovie');
    } else if (bookingType === 'bus') {
        item = Storage.get('selectedBus');
    } else if (bookingType === 'train') {
        item = Storage.get('selectedTrain');
    }
    
    if (item) {
        item.seats = selectedSeats;
        item.totalPrice = selectedSeats.length * pricePerSeat;
        
        if (bookingType === 'movie') {
            Storage.set('selectedMovie', item);
        } else if (bookingType === 'bus') {
            Storage.set('selectedBus', item);
        } else if (bookingType === 'train') {
            Storage.set('selectedTrain', item);
        }
    }
    
    window.location.href = `checkout.html?type=${bookingType}&id=${bookingId}`;
}

function goBack() {
    window.history.back();
}

// Initialize
document.addEventListener('DOMContentLoaded', generateSeats);
