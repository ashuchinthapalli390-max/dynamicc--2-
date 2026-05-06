// Movies Page Script

requireLogin();

// Language flag map
const LANGUAGE_FLAGS = {
    'Telugu': '🇹🇪',
    'English': '🇬🇧',
    'Hindi': '🇮🇳',
    'Tamil': '🇹🇲',
    'Kannada': '🇰🇦',
    'Korean': '🇰🇷'
};

function getLanguageBadge(language) {
    return LANGUAGE_FLAGS[language] || '🌐';
}

function getMovieReviewCount(movieId) {
    const reviews = FeedbackAPI.getMovieRatings(movieId);
    return reviews.length;
}

function loadMovies(movies = null) {
    movies = movies || MoviesAPI.getAllMovies();
    const grid = document.getElementById('moviesGrid');
    
    if (movies.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No movies found. Try another search!</p></div>';
        return;
    }
    
    grid.innerHTML = movies.map(movie => {
        const reviewCount = getMovieReviewCount(movie.id);
        const languageBadge = getLanguageBadge(movie.language);
        
        return `
        <div class="movie-card">
            <div class="movie-card__poster">
                ${movie.poster}
                <div class="movie-card__language-badge">${languageBadge} ${movie.language}</div>
            </div>
            <div class="movie-card__content">
                <h3 class="movie-card__title">${movie.title}</h3>
                <p class="movie-card__genre">${movie.genre}</p>
                <div class="movie-card__rating">
                    <span>⭐ ${movie.rating}/10</span>
                    <span class="movie-card__review-count">(${reviewCount} reviews)</span>
                </div>
                <p class="movie-card__rating">${movie.duration}m | By ${movie.director}</p>
                <p class="movie-card__price">${formatPrice(movie.price)}</p>
                <button class="btn btn-primary" onclick="bookMovie(${movie.id})">Book Seats</button>
            </div>
        </div>
    `}).join('');
}

function bookMovie(movieId) {
    const movie = MoviesAPI.getMovieById(movieId);
    if (!movie) return;
    
    // Use new universal booking system
    UniversalBookingHandler.showBookingForm({
        name: movie.title,
        price: movie.price,
        category: 'Movies',
        description: `${movie.genre} • ${movie.duration}m • Directed by ${movie.director}`,
        rating: movie.rating,
        image: movie.poster
    });
}

// Load movie dropdown options
function loadMovieOptions() {
    const movies = MoviesAPI.getAllMovies();
    const select = document.getElementById('searchMovie');
    
    const options = movies.map(m => 
        `<option value="${m.id}">${m.title}</option>`
    ).join('');
    
    select.innerHTML = '<option value="">All Movies</option>' + options;
}

// Search functionality
document.getElementById('movieSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const city = document.getElementById('searchCity').value;
    const date = document.getElementById('searchDate').value;
    const language = document.getElementById('searchLanguage').value;
    const movieId = document.getElementById('searchMovie').value;
    
    let results = MoviesAPI.getAllMovies();
    
    if (language) {
        results = results.filter(m => m.language === language);
    }
    
    if (movieId) {
        results = results.filter(m => m.id == movieId);
    }
    
    loadMovies(results);
});

// Sort functionality
document.getElementById('sortBy').addEventListener('change', function(e) {
    const sortBy = e.target.value;
    let movies = MoviesAPI.getAllMovies();
    
    switch(sortBy) {
        case 'rating':
            movies.sort((a, b) => b.rating - a.rating);
            break;
        case 'price-low':
            movies.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            movies.sort((a, b) => b.price - a.price);
            break;
        case 'featured':
        default:
            // Keep original order
            break;
    }
    
    loadMovies(movies);
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
    loadMovieOptions();
    loadMovies();
    
    // Set default date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('searchDate').valueAsDate = tomorrow;
});
