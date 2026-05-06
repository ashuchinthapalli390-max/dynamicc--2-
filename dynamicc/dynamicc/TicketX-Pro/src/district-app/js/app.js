// Utility functions to manage LocalStorage
const State = {
    getMovies: () => JSON.parse(localStorage.getItem('movies')) || [],
    getTheatres: () => JSON.parse(localStorage.getItem('theatres')) || [],
    getSelectedMovie: () => JSON.parse(localStorage.getItem('selectedMovie')),
    setSelectedMovie: (movie) => localStorage.setItem('selectedMovie', JSON.stringify(movie)),
    getSelectedTheatre: () => JSON.parse(localStorage.getItem('selectedTheatre')),
    setSelectedTheatre: (theatre) => localStorage.setItem('selectedTheatre', JSON.stringify(theatre)),
    getSelectedTime: () => localStorage.getItem('selectedTime'),
    setSelectedTime: (time) => localStorage.setItem('selectedTime', time),
    getSelectedSeats: () => JSON.parse(localStorage.getItem('selectedSeats')) || [],
    setSelectedSeats: (seats) => localStorage.setItem('selectedSeats', JSON.stringify(seats)),
    saveBooking: (booking) => {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
    },
    clearSelection: () => {
        localStorage.removeItem('selectedSeats');
    }
};

// Formatting utilities
const formatCurrency = (amount) => `₹${amount}`;

// Page Renderers
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('movies.html') || path.endsWith('/pages/')) {
        renderMovies();
    } else if (path.includes('movie-details.html')) {
        renderMovieDetails();
    } else if (path.includes('theatres.html')) {
        renderTheatres();
    } else if (path.includes('seat-selection.html')) {
        renderSeatSelection();
    } else if (path.includes('checkout.html')) {
        renderCheckout();
    } else if (path.includes('confirmation.html')) {
        renderConfirmation();
    }
});

function renderMovies() {
    const grid = document.getElementById('movies-grid');
    if (!grid) return;

    const movies = State.getMovies();
    grid.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="selectMovie(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <div class="movie-title" title="${movie.title}">${movie.title}</div>
                <div class="movie-meta">
                    <span>${movie.language}</span>
                    <span>⭐ ${movie.rating}</span>
                </div>
                <button class="btn btn-full">Book Now</button>
            </div>
        </div>
    `).join('');
}

function selectMovie(id) {
    const movie = State.getMovies().find(m => m.id === id);
    if (movie) {
        State.setSelectedMovie(movie);
        window.location.href = 'movie-details.html';
    }
}

function renderMovieDetails() {
    const movie = State.getSelectedMovie();
    if (!movie) {
        window.location.href = 'movies.html';
        return;
    }

    document.getElementById('movie-banner').src = movie.banner || movie.poster;
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-rating').textContent = `⭐ ${movie.rating} (${movie.votes} votes)`;
    document.getElementById('movie-duration').textContent = `${movie.duration} • ${movie.language}`;
    document.getElementById('movie-desc').textContent = movie.description;
    
    const genreContainer = document.getElementById('movie-genres');
    genreContainer.innerHTML = movie.genre.split(', ').map(g => `<span class="tag">${g}</span>`).join('');
}

function proceedToTheatres() {
    window.location.href = 'theatres.html';
}

function renderTheatres() {
    const movie = State.getSelectedMovie();
    if (!movie) {
        window.location.href = 'movies.html';
        return;
    }

    document.getElementById('selected-movie-title').textContent = movie.title;

    const container = document.getElementById('theatres-list');
    const theatres = State.getTheatres();

    container.innerHTML = theatres.map(theatre => `
        <div class="theatre-card">
            <div class="flex-between align-center">
                <div>
                    <h3>${theatre.name}</h3>
                    <div class="text-muted" style="font-size: 14px;">${theatre.location}</div>
                </div>
                <div class="text-muted" style="font-size: 14px;">
                    ${theatre.formats.join(', ')}
                </div>
            </div>
            <div class="show-timings">
                ${theatre.timings.map(time => `
                    <button class="time-btn" onclick="selectShowtime(${theatre.id}, '${time}')">${time}</button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function selectShowtime(theatreId, time) {
    const theatre = State.getTheatres().find(t => t.id === theatreId);
    State.setSelectedTheatre(theatre);
    State.setSelectedTime(time);
    State.clearSelection(); // clear previous seats
    window.location.href = 'seat-selection.html';
}

function renderSeatSelection() {
    const movie = State.getSelectedMovie();
    const theatre = State.getSelectedTheatre();
    const time = State.getSelectedTime();

    if (!movie || !theatre || !time) {
        window.location.href = 'movies.html';
        return;
    }

    document.getElementById('booking-info').textContent = `${movie.title} • ${theatre.name} | ${time}`;
    
    const grid = document.getElementById('seat-grid');
    let seatsHTML = '';
    
    // Generate 8 rows x 10 cols
    const rows = ['A','B','C','D','E','F','G','H'];
    rows.forEach(row => {
        for(let i=1; i<=10; i++) {
            const seatId = `${row}${i}`;
            // Randomly mark some seats as booked for demo
            // seeded by combining strings to keep it consistent-ish but we'll just use random for now
            // Better yet, just hardcode a few blocked seats or use simple math
            const isBooked = (row === 'D' && i > 3 && i < 7) || (row === 'G' && i === 5);
            const statusClass = isBooked ? 'booked' : '';
            
            seatsHTML += `<div class="seat ${statusClass}" data-seat="${seatId}" onclick="toggleSeat('${seatId}', this)">${seatId}</div>`;
        }
    });
    
    grid.innerHTML = seatsHTML;
    updateSeatSummary();
}

function toggleSeat(seatId, el) {
    if (el.classList.contains('booked')) return;
    
    el.classList.toggle('selected');
    
    let selectedSeats = State.getSelectedSeats();
    if (el.classList.contains('selected')) {
        selectedSeats.push(seatId);
    } else {
        selectedSeats = selectedSeats.filter(s => s !== seatId);
    }
    
    State.setSelectedSeats(selectedSeats);
    updateSeatSummary();
}

function updateSeatSummary() {
    const selectedSeats = State.getSelectedSeats();
    const theatre = State.getSelectedTheatre();
    
    const countEl = document.getElementById('seat-count');
    const totalEl = document.getElementById('total-price');
    const btn = document.getElementById('btn-checkout');
    
    if (selectedSeats.length > 0) {
        countEl.textContent = `${selectedSeats.join(', ')} (${selectedSeats.length} Tickets)`;
        totalEl.textContent = formatCurrency(selectedSeats.length * theatre.price);
        btn.style.display = 'block';
    } else {
        countEl.textContent = 'No seats selected';
        totalEl.textContent = '₹0';
        btn.style.display = 'none';
    }
}

function proceedToCheckout() {
    const seats = State.getSelectedSeats();
    if (seats.length === 0) {
        alert("Please select at least one seat.");
        return;
    }
    window.location.href = 'checkout.html';
}

function renderCheckout() {
    const movie = State.getSelectedMovie();
    const theatre = State.getSelectedTheatre();
    const time = State.getSelectedTime();
    const seats = State.getSelectedSeats();

    if (!movie || !theatre || !time || seats.length === 0) {
        window.location.href = 'movies.html';
        return;
    }

    document.getElementById('chk-movie').textContent = movie.title;
    document.getElementById('chk-theatre').textContent = theatre.name;
    document.getElementById('chk-time').textContent = time;
    document.getElementById('chk-seats').textContent = seats.join(', ');
    
    const total = seats.length * theatre.price;
    const fee = 30 * seats.length; // Convenience fee per ticket
    const grandTotal = total + fee;

    document.getElementById('chk-tickets-price').textContent = formatCurrency(total);
    document.getElementById('chk-fee').textContent = formatCurrency(fee);
    document.getElementById('chk-total').textContent = formatCurrency(grandTotal);
}

function confirmBooking() {
    const movie = State.getSelectedMovie();
    const theatre = State.getSelectedTheatre();
    const time = State.getSelectedTime();
    const seats = State.getSelectedSeats();
    
    const bookingId = 'BKG' + Math.floor(Math.random() * 1000000);
    const total = (seats.length * theatre.price) + (30 * seats.length);

    const booking = {
        id: bookingId,
        movie: movie.title,
        theatre: theatre.name,
        time: time,
        seats: seats,
        total: total,
        date: new Date().toISOString()
    };

    State.saveBooking(booking);
    
    // Clear current selection
    localStorage.removeItem('selectedSeats');
    
    // Store latest booking ID for confirmation page
    localStorage.setItem('lastBookingId', bookingId);
    
    window.location.href = 'confirmation.html';
}

function renderConfirmation() {
    const bookingId = localStorage.getItem('lastBookingId');
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
        window.location.href = 'movies.html';
        return;
    }

    document.getElementById('conf-id').textContent = booking.id;
    document.getElementById('conf-movie').textContent = booking.movie;
    document.getElementById('conf-theatre').textContent = booking.theatre;
    document.getElementById('conf-time').textContent = booking.time;
    document.getElementById('conf-seats').textContent = booking.seats.join(', ');
    document.getElementById('conf-total').textContent = formatCurrency(booking.total);
}

function goToDashboard() {
    window.location.href = 'movies.html';
}
