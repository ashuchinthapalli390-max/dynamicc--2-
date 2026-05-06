# 🎟️ TicketX Pro - Professional Multi-Category Booking Platform

A full-featured, modern web application for booking tickets across multiple categories including **Movies**, **Trains**, **Flights**, **Buses**, **Events**, and **Function Halls**. Built with **HTML5**, **CSS3**, and **Vanilla JavaScript** - no frameworks required!

## 🌟 Features

### ✅ Complete Functionality

- **User Authentication**
  - Sign up & Login (with demo credentials)
  - Session management via localStorage
  - Profile management
  - User dashboard

- **Multi-Category Booking**
  - 🎬 Movies (TMDB API ready)
  - 🚂 Trains (RapidAPI ready)
  - ✈️ Flights (Amadeus API ready)
  - 🚌 Bus Routes (RedBus API ready)
  - 🎤 Events & Concerts
  - 🏛️ Function Halls

- **Search & Filter**
  - Advanced search forms for each category
  - Multiple filter options (price, rating, duration, etc.)
  - Sort functionality

- **Booking Management**
  - Interactive seat selection
  - Real-time availability
  - Checkout with multiple payment methods
  - Promo code support
  - Booking confirmation with QR codes

- **User Dashboard**
  - View all bookings with status
  - Filter bookings by category
  - Download tickets with QR codes
  - Edit profile information
  - Booking analytics

### 🎨 Modern UI/UX

- Fully responsive design (Mobile, Tablet, Desktop)
- Beautiful gradient backgrounds
- Smooth animations & transitions
- Professional color scheme with design tokens
- Intuitive navigation

## 📁 Project Structure

```
TicketX-Pro/
├── index.html                      # Home page
├── pages/
│   ├── login.html                 # Login page
│   ├── register.html              # Registration page
│   ├── movies.html                # Movie booking
│   ├── trains.html                # Train booking
│   ├── flights.html               # Flight booking
│   ├── bus.html                   # Bus booking
│   ├── checkout.html              # Payment & summary
│   ├── confirmation.html          # Booking confirmed
│   └── user/
│       └── dashboard.html         # User dashboard
├── src/
│   ├── css/
│   │   ├── reset.css             # CSS reset
│   │   ├── variables.css         # Design tokens & CSS variables
│   │   ├── global.css            # Global styles
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── cards.css
│   │   ├── search.css
│   │   ├── seat.css
│   │   ├── checkout.css
│   │   ├── dashboard.css
│   │   └── auth.css
│   ├── js/
│   │   ├── core/
│   │   │   ├── storage.js        # LocalStorage manager
│   │   │   ├── auth.js           # Authentication system
│   │   │   └── utils.js          # Utility functions
│   │   ├── api/
│   │   │   ├── movies-api.js     # Movie dummy data
│   │   │   ├── trains-api.js     # Train dummy data
│   │   │   ├── flights-api.js    # Flight dummy data
│   │   │   └── bus-api.js        # Bus dummy data
│   │   └── pages/
│   │       ├── home.js
│   │       ├── movies.js
│   │       ├── trains.js
│   │       ├── flights.js
│   │       ├── bus.js
│   │       ├── login.js
│   │       ├── register.js
│   │       ├── checkout.js
│   │       ├── confirmation.js
│   │       └── dashboard.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- No server or build tools required!
- Works with any modern web browser (Chrome, Firefox, Safari, Edge)
- Local development: VS Code with Live Server extension

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd TicketX-Pro
```

2. **Option A: Open with Live Server** (Recommended for development)
   - Right-click on `index.html` → "Open with Live Server"

3. **Option B: Open directly in browser**
   - Simply double-click `index.html` to open

### Demo Credentials

```
Standard User:
Email: john@example.com
Password: 123456

Admin User:
Email: admin@example.com
Password: admin123
```

## 📊 Included Dummy Data

### 🎬 Movies (6 films)
- Inception, The Dark Knight, Interstellar, Parasite, Oppenheimer, Dune
- Includes: genres, ratings, duration, prices, showtimes

### 🚂 Trains (4 routes)
- Hyderabad ↔ Delhi, Mumbai, Bangalore, Kochi
- Classes: Sleeper, AC 3-Tier, AC 2-Tier, Executive Chair

### ✈️ Flights (5 airlines)
- Multiple airlines with different routes
- Economy & Business class availability
- Realistic pricing and timings

### 🚌 Buses (5 operators)
- Various bus types (AC Sleeper, Semi Sleeper, AC Chair)
- Amenities information (WiFi, Charging, Blanket, etc.)
- Real-time seat availability

## 🔌 API Integration Ready

Currently uses **dummy data**, but structured for easy API integration:

### To Add Real APIs:

**1. Movies - TMDB API**
```javascript
// src/js/api/movies-api.js
const TMDB_KEY = "your_tmdb_api_key_here";
const BASE = "https://api.themoviedb.org/3";

async function getNowPlayingMovies() {
    const res = await fetch(`${BASE}/movie/now_playing?api_key=${TMDB_KEY}&region=IN`);
    return await res.json();
}
```

**2. Trains - RapidAPI**
```javascript
// Use Indian Railway API or RedBus API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'your_rapidapi_key',
        'X-RapidAPI-Host': 'railway-api.com'
    }
};
```

**3. Flights - Amadeus API**
```javascript
const options = {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer YOUR_AMADEUS_TOKEN'
    }
};
```

**4. Bus - RedBus API**
```javascript
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'your_rapidapi_key',
        'X-RapidAPI-Host': 'redbus.p.rapidapi.com'
    }
};
```

## 💾 Data Storage Architecture

All data persisted in **localStorage** (browser storage):

```javascript
DB Structure:
{
  "tx_users": [                    // All registered users
    { id, name, email, password, phone, role, createdAt }
  ],
  "tx_session": {                  // Current logged-in user
    id, name, email, phone, role
  },
  "tx_bookings": [                 // All bookings
    { id, userId, category, itemId, itemName, seats, date, totalPrice, status, bookedAt }
  ],
  "tx_halls": [],                  // Function halls
  "tx_bus": [],                    // Bus data
  "tx_cart": null                  // Shopping cart
}
```

## 🔐 Authentication System

### Login Flow
1. User enters email & password
2. System validates against `tx_users`
3. If valid, stores user in `tx_session`
4. User redirected to dashboard

### Session Management
```javascript
// Check if logged in
Auth.isLoggedIn()  // Returns true/false

// Get current user
Auth.getCurrentUser()  // Returns user object

// Login
Auth.login(email, password)  // Returns { success, message, user }

// Register
Auth.register(name, email, password, phone)  // Returns result object

// Logout
Auth.logout()  // Clears session
```

### Protected Pages
```javascript
// Add to any page that requires login
requireLogin();   // Redirects to login if not authenticated
requireAdmin();   // Redirects to home if not admin
```

## 🎨 Customization Guide

### Change Colors
Edit `src/css/variables.css`:
```css
:root {
    --primary: #6366f1;      /* Main color */
    --secondary: #ec4899;    /* Accent color */
    --success: #10b981;
    --danger: #ef4444;
    /* ... more colors ... */
}
```

### Change Fonts
```css
--font-family: 'Your Font Name', sans-serif;
```

### Add New Category
1. Create `pages/category.html`
2. Create `src/js/api/category-api.js` with CATEGORY_DATA
3. Create `src/js/pages/category.js` for logic
4. Update navbar in HTML files
5. Add to home page featured section

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (two columns)
- **Desktop**: > 1024px (full layout)

## 🧪 Testing Workflow

1. **Register**: Create new account
2. **Login**: Use credentials or demo account
3. **Browse**: Check Movies, Trains, Flights, Buses
4. **Search**: Try different filters
5. **Book**: Complete booking flow
6. **Checkout**: Test promo codes (SAVE10, SAVE20, TICKETX, WELCOME)
7. **Confirm**: View booking confirmation
8. **Dashboard**: Check bookings and profile

## 🚢 Production Deployment

### Before Going Live:

1. **Replace dummy data** with real APIs
2. **Set up backend server**:
   - Node.js/Express or Python/Django
   - PostgreSQL or MongoDB
   - JWT authentication
   - Secure payment gateway

3. **Security measures**:
   - HTTPS encryption
   - Input validation
   - Password hashing (bcrypt)
   - CORS configuration
   - Rate limiting

4. **Database schema**:
   ```sql
   Users (id, email, password_hash, name, phone, role, created_at)
   Bookings (id, user_id, category, item_id, seats, date, total_price, status)
   Transactions (id, booking_id, amount, payment_method, status)
   ```

### Deployment Options:

- **Frontend**: Netlify, Vercel, GitHub Pages, AWS S3
- **Backend**: Heroku, AWS Lambda, Google Cloud, DigitalOcean
- **Database**: MongoDB Atlas, AWS RDS, Heroku Postgres

## 📝 Code Examples

### Accessing API Data
```javascript
// Movies
const movies = MoviesAPI.getAllMovies();
const topRated = MoviesAPI.getTopRated();
const searched = MoviesAPI.searchMovies("query");

// Trains
const trains = TrainsAPI.searchTrains("from", "to");
const trainById = TrainsAPI.getTrainById(id);

// Flights
const flights = FlightsAPI.searchFlights("from", "to", date, passengers);
const sorted = FlightsAPI.sortByPrice(flights);

// Buses
const buses = BusAPI.searchBuses("from", "to");
const filtered = BusAPI.filterByAmenity(buses, "WiFi");
```

### Making a Booking
```javascript
const booking = {
    id: generateID('BK'),
    userId: currentUser.id,
    category: 'movie',
    itemId: movieId,
    itemName: 'Movie Title',
    seats: ['A1', 'A2'],
    date: '2026-05-10',
    totalPrice: 5000,
    status: 'confirmed',
    bookedAt: new Date().toISOString()
};

const bookings = Storage.get(DB.bookings) || [];
bookings.push(booking);
Storage.set(DB.bookings, bookings);
```

## 🛠️ Development Tips

### Add Console Logging
```javascript
// Check localStorage
console.log(Storage.getAll());

// Check current user
console.log(Auth.getCurrentUser());

// Check bookings
console.log(Storage.get(DB.bookings));
```

### Debug Styling
- Use Chrome DevTools (F12) to inspect elements
- Check CSS variables in `:root`
- Test responsive design with device toolbar

### Common Issues & Solutions

**Issue**: Page redirects to login immediately
- **Solution**: Check `requireLogin()` at page top

**Issue**: Data not persisting
- **Solution**: Verify localStorage is enabled in browser

**Issue**: Images not loading
- **Solution**: Check file paths are relative (`../` vs `/`)

## 📞 API Resources

- **TMDB**: https://www.themoviedb.org/settings/api
- **RapidAPI**: https://rapidapi.com/hub
- **Amadeus**: https://developers.amadeus.com
- **Google Maps**: https://developers.google.com/maps

## 🎯 Roadmap

- ✅ Frontend complete
- ⏳ Backend API (Node.js/Express)
- ⏳ Real database integration
- ⏳ Payment gateway (Razorpay/Stripe)
- ⏳ Email & SMS notifications
- ⏳ Admin panel
- ⏳ Mobile app (React Native)
- ⏳ Analytics & reporting

## 📄 File Size & Performance

- **Total HTML**: ~50KB
- **Total CSS**: ~100KB
- **Total JS**: ~150KB
- **No external dependencies** (QRCode library is optional)
- **Instant load** on modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is provided as-is for educational and commercial purposes.

## 👨‍💻 Author

Created with ❤️ for ticket booking excellence!

---

**🚀 Ready to start booking? Open [index.html](index.html) now!**