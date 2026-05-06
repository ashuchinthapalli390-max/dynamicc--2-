# 🔧 Technical Implementation Guide - Dark Theme

## 📋 CHANGES MADE

### 1. CSS VARIABLES SYSTEM

**File**: `src/css/variables.css`

**Dark Theme Color Palette**:
```css
:root {
    /* Dark Theme Colors */
    --primary: #6366f1;              /* Indigo */
    --primary-dark: #4f46e5;
    --primary-light: #818cf8;
    
    --secondary: #ec4899;            /* Pink */
    --secondary-dark: #be185d;
    --secondary-light: #f472b6;
    
    --success: #10b981;              /* Green */
    --danger: #ef4444;               /* Red */
    --warning: #f59e0b;              /* Amber */
    --info: #3b82f6;                 /* Blue */
    
    /* DARK BACKGROUNDS */
    --bg-primary: #0f172a;           /* Deep Navy */
    --bg-secondary: #1e293b;         /* Slate */
    --bg-tertiary: #334155;          /* Stone */
    --bg-hover: #475569;             /* Hover state */
    
    /* TEXT COLORS */
    --text-primary: #f1f5f9;         /* Main text */
    --text-secondary: #cbd5e1;       /* Secondary text */
    --text-tertiary: #94a3b8;        /* Tertiary text */
    
    /* BORDERS */
    --border-color: #475569;
    --border-light: #334155;
    
    /* SPACING */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    --spacing-2xl: 4rem;
    
    /* TYPOGRAPHY */
    --font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    /* SHADOWS */
    --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    
    /* TRANSITIONS */
    --transition-base: 300ms ease-in-out;
}
```

---

### 2. GLOBAL STYLING

**File**: `src/css/global.css`

**Key Changes**:

```css
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
}

/* Forms */
input, textarea, select {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

input::placeholder, textarea::placeholder {
    color: var(--text-tertiary);
}

label {
    color: var(--text-primary);
}

/* Footer */
.footer {
    background-color: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    color: var(--text-primary);
}
```

---

### 3. NAVBAR STYLING

**File**: `src/css/navbar.css`

```css
.navbar {
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
}

.navbar__menu a {
    color: var(--text-primary);
}

.navbar__menu a:hover {
    color: var(--primary);
}
```

---

### 4. CARD STYLING

**File**: `src/css/cards.css`

**Movie Card with New Features**:
```css
.movie-card {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-base);
}

/* Language Badge - NEW */
.movie-card__language-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--text-primary);
    padding: 4px 12px;
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
    backdrop-filter: blur(4px);
}

.movie-card__title {
    color: var(--text-primary);
}

.movie-card__rating {
    color: var(--warning);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
}

/* Review Count - NEW */
.movie-card__review-count {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-left: var(--spacing-xs);
}

.movie-card__price {
    color: var(--primary-light);
}
```

---

### 5. SEARCH STYLING

**File**: `src/css/search.css`

```css
.search-container {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.search-form label {
    color: var(--text-primary);
}

.search-form input,
.search-form select {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.sort-options {
    color: var(--text-primary);
}

.no-results {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
}
```

---

### 6. CHECKOUT STYLING

**File**: `src/css/checkout.css`

```css
.checkout-form {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.checkout-summary {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.summary-item {
    color: var(--text-primary);
    border-bottom: 1px solid var(--border-color);
}

.payment-option {
    background-color: var(--bg-tertiary);
    border: 2px solid var(--border-color);
}

.payment-option.selected {
    border-color: var(--primary);
    background-color: rgba(99, 102, 241, 0.2);
}
```

---

### 7. AUTHENTICATION STYLING

**File**: `src/css/auth.css`

```css
.auth-form {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.auth-form h2 {
    color: var(--text-primary);
}

.auth-form input {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}
```

---

### 8. DASHBOARD STYLING

**File**: `src/css/dashboard.css`

```css
.dashboard-sidebar {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.dashboard-content {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
}

.stat-card {
    background-color: var(--bg-tertiary);
    border: 1px solid var(--border-color);
}

.bookings-table {
    color: var(--text-primary);
}

.bookings-table th {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
}
```

---

### 9. SEAT SELECTION STYLING

**File**: `src/css/seat.css`

```css
.seat-selection {
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
}

.seat {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
}

.seat.selected {
    background-color: var(--primary);
    color: var(--white);
}
```

---

## 🎬 JAVASCRIPT ENHANCEMENTS

### 1. Movie Page Updates

**File**: `src/js/pages/movies.js`

**New Features**:

```javascript
// Language Flag Map
const LANGUAGE_FLAGS = {
    'Telugu': '🇹🇪',
    'English': '🇬🇧',
    'Hindi': '🇮🇳',
    'Tamil': '🇹🇲',
    'Kannada': '🇰🇦',
    'Korean': '🇰🇷'
};

// Get Language Badge
function getLanguageBadge(language) {
    return LANGUAGE_FLAGS[language] || '🌐';
}

// Get Movie Review Count
function getMovieReviewCount(movieId) {
    const reviews = FeedbackAPI.getMovieRatings(movieId);
    return reviews.length;
}

// Enhanced Movie Card HTML
grid.innerHTML = movies.map(movie => {
    const reviewCount = getMovieReviewCount(movie.id);
    const languageBadge = getLanguageBadge(movie.language);
    
    return `
    <div class="movie-card">
        <div class="movie-card__poster">
            ${movie.poster}
            <div class="movie-card__language-badge">
                ${languageBadge} ${movie.language}
            </div>
        </div>
        <div class="movie-card__content">
            <h3 class="movie-card__title">${movie.title}</h3>
            <p class="movie-card__genre">${movie.genre}</p>
            <div class="movie-card__rating">
                <span>⭐ ${movie.rating}/10</span>
                <span class="movie-card__review-count">
                    (${reviewCount} reviews)
                </span>
            </div>
            <p class="movie-card__rating">
                ${movie.duration}m | By ${movie.director}
            </p>
            <p class="movie-card__price">${formatPrice(movie.price)}</p>
            <button class="btn btn-primary" 
                    onclick="bookMovie(${movie.id})">
                Book Seats
            </button>
        </div>
    </div>
    `
}).join('');
```

**Language Filter Enhancement**:

```javascript
// Search with Language Filter
document.getElementById('movieSearchForm')
    .addEventListener('submit', function(e) {
    e.preventDefault();
    
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
```

---

### 2. Feedback API

**File**: `src/js/api/feedback-api.js`

**Structure**:

```javascript
class FeedbackAPI {
    // Get ratings for a specific movie
    static getMovieRatings(movieId) {
        return DUMMY_FEEDBACKS.movies.filter(f => f.movieId == movieId);
    }

    // Get average rating
    static getAverageMovieRating(movieId) {
        const ratings = this.getMovieRatings(movieId);
        if (ratings.length === 0) return 0;
        const avg = ratings.reduce((sum, f) => sum + f.rating, 0) 
                    / ratings.length;
        return avg.toFixed(1);
    }

    // Submit new feedback
    static submitFeedback(type, itemId, userId, rating, title, comment) {
        const feedback = {
            id: "FB" + Math.random().toString().slice(2, 6),
            [type + 'Id']: itemId,
            userId: userId,
            rating: rating,
            title: title,
            comment: comment,
            date: new Date().toISOString().split('T')[0],
            helpful: 0
        };
        
        if (type === 'movie') {
            DUMMY_FEEDBACKS.movies.push(feedback);
        } else {
            DUMMY_FEEDBACKS.events.push(feedback);
        }
        
        return feedback;
    }
}
```

**Sample Feedback Data**:

```javascript
DUMMY_FEEDBACKS.movies = [
    {
        id: "FB001",
        movieId: 7,              // Arjun Reddy
        userId: "user3",
        rating: 5,
        title: "Best Telugu film",
        comment: "Arjun Reddy is absolutely brilliant. Vijay Deverakonda's performance is outstanding!",
        date: "2026-05-03",
        helpful: 389
    },
    {
        id: "FB004",
        movieId: 8,              // Eega
        userId: "user4",
        rating: 5,
        title: "Eega - Masterpiece!",
        comment: "One of the most creative revenge stories. S.S. Rajamouli's direction is exceptional.",
        date: "2026-05-04",
        helpful: 420
    }
    // ... more reviews
]
```

---

## 🎬 MOVIES API ENHANCEMENT

**File**: `src/js/api/movies-api.js`

**Telugu Movies Added**:

```javascript
{
    id: 7,
    title: "Arjun Reddy",
    genre: "Drama/Romance",
    rating: 8.9,
    price: 220,
    duration: 143,
    language: "Telugu",
    poster: "🎬",
    description: "A passionate love story of a young surgeon who spirals into self-destruction after his love rejects him.",
    releaseDate: "2017-06-22",
    director: "Sandeep Vanga"
},
{
    id: 13,
    title: "RRR",
    genre: "Action/Thriller",
    rating: 8.8,
    price: 280,
    duration: 187,
    language: "Telugu",
    poster: "🎬",
    description: "Two revolutionaries' fight against British imperialism in 1920s India with mind-blowing action.",
    releaseDate: "2022-03-25",
    director: "S.S. Rajamouli"
}
// ... 8 more Telugu movies
```

---

## 🌐 HTML ENHANCEMENTS

### 1. Movies Page

**File**: `pages/movies.html`

**Language Filter Added**:

```html
<div class="form-group">
    <label for="searchLanguage">Language</label>
    <select id="searchLanguage">
        <option value="">All Languages</option>
        <option value="English">English</option>
        <option value="Telugu">Telugu</option>
        <option value="Hindi">Hindi</option>
        <option value="Tamil">Tamil</option>
        <option value="Kannada">Kannada</option>
    </select>
</div>
```

---

### 2. Help Page

**File**: `pages/help.html`

**Complete Redesign with Dark Theme**:

```html
<!-- Quick Support Links -->
<div class="quick-links">
    <div class="quick-link" onclick="scrollToSection('booking')">
        <div class="quick-link-icon">🎫</div>
        <div class="quick-link-title">Booking Help</div>
    </div>
    <!-- ... more quick links -->
</div>

<!-- FAQ Sections -->
<div class="help-section" id="booking">
    <h2>🎫 Booking & Tickets</h2>
    <div class="faq-item">
        <div class="faq-question" onclick="toggleFAQ(this)">
            <span>How do I book a ticket?</span>
            <span>▼</span>
        </div>
        <div class="faq-answer">
            <!-- Answer content -->
        </div>
    </div>
</div>

<!-- Support Form -->
<div class="contact-form">
    <form id="contactForm">
        <div class="form-group">
            <label for="contactName">Your Name *</label>
            <input type="text" id="contactName" required>
        </div>
        <!-- More form fields -->
    </form>
</div>
```

---

## 📊 STYLING HIERARCHY

```
Variables (variables.css)
    ↓
Global Styles (global.css)
    ↓
Component Styles
├── navbar.css
├── cards.css
├── search.css
├── checkout.css
├── auth.css
├── dashboard.css
├── seat.css
└── hero.css
```

---

## 🔄 COLOR APPLICATION FLOW

```
CSS Variable Definition (variables.css)
    ↓
Variable Usage in Components
    ↓
Dark Theme Applied
    ↓
Consistent Appearance
```

---

## ⚙️ KEY IMPLEMENTATION PATTERNS

### 1. CSS Variable Usage
```css
/* Define */
--primary: #6366f1;

/* Use */
color: var(--primary);
background-color: var(--bg-secondary);
```

### 2. Responsive Design
```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

### 3. Component Styling
```css
.component {
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.component:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary);
}
```

---

## 🚀 PERFORMANCE CONSIDERATIONS

- **No Additional Requests**: All styling is CSS
- **Variable System**: Easy theme switching
- **Optimized Selectors**: Efficient CSS
- **Maintained Responsiveness**: Mobile-first approach
- **Smooth Animations**: Using CSS transitions

---

## 📈 SCALABILITY

### To Add More Telugu Movies:
```javascript
// Edit src/js/api/movies-api.js
DUMMY_MOVIES.push({
    id: 17,
    title: "Movie Title",
    language: "Telugu",
    // ... other properties
});
```

### To Modify Colors:
```css
/* Edit src/css/variables.css */
--primary: #new-color;
--bg-secondary: #new-color;
```

### To Change Text:
```html
<!-- Edit HTML files -->
<h2>Your new heading</h2>
```

---

## ✅ TESTING CHECKLIST

- ✅ All pages load with dark theme
- ✅ Language filter works
- ✅ Ratings display correctly
- ✅ Telugu badge shows
- ✅ Forms are styled properly
- ✅ Contrast is WCAG compliant
- ✅ Mobile responsive
- ✅ All links work
- ✅ Buttons clickable
- ✅ No console errors

---

## 📝 DOCUMENTATION

All changes documented with:
- Comments in CSS files
- Clear variable names
- Semantic HTML structure
- Readable JavaScript

---

**Last Updated**: May 6, 2026
**Version**: 2.2
**Status**: Complete & Tested ✅
