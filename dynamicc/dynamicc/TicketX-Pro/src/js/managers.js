// ============= Advanced Booking Manager =============

class BookingManager {
    constructor() {
        this.currentBooking = null;
        this.bookings = [];
        this.loadBookings();
    }

    // Create new booking
    async createBooking(category, itemId, seats, totalPrice, promoCode = null) {
        try {
            const booking = await ticketAPI.createBooking(
                category,
                itemId,
                seats,
                totalPrice,
                promoCode
            );

            this.currentBooking = booking;
            this.bookings.push(booking);
            this.saveBookings();

            return {
                success: true,
                booking,
                message: 'Booking created successfully'
            };
        } catch (err) {
            throw new Error(err.message || 'Booking creation failed');
        }
    }

    // Load all bookings for user
    async loadBookings() {
        try {
            this.bookings = await ticketAPI.getMyBookings();
            return this.bookings;
        } catch (err) {
            console.error('Load bookings error:', err);
            return [];
        }
    }

    // Get booking by ID
    async getBooking(bookingId) {
        try {
            return await ticketAPI.getBookingDetails(bookingId);
        } catch (err) {
            throw new Error('Unable to retrieve booking');
        }
    }

    // Cancel booking
    async cancelBooking(bookingId) {
        try {
            const result = await ticketAPI.cancelBooking(bookingId);
            this.bookings = this.bookings.filter(b => b.id !== bookingId);
            this.saveBookings();
            return result;
        } catch (err) {
            throw new Error(err.message || 'Cancellation failed');
        }
    }

    // Get booking by status
    getBookingsByStatus(status) {
        return this.bookings.filter(b => b.status === status);
    }

    // Get all confirmed bookings
    getConfirmedBookings() {
        return this.getBookingsByStatus('confirmed');
    }

    // Get all pending bookings
    getPendingBookings() {
        return this.getBookingsByStatus('pending');
    }

    // Get bookings by category
    getBookingsByCategory(category) {
        return this.bookings.filter(b => b.category === category);
    }

    // Calculate total spent
    getTotalSpent() {
        return this.bookings
            .filter(b => b.status === 'confirmed')
            .reduce((sum, b) => sum + b.totalPrice, 0);
    }

    // Get booking statistics
    getStatistics() {
        return {
            total: this.bookings.length,
            confirmed: this.getConfirmedBookings().length,
            pending: this.getPendingBookings().length,
            cancelled: this.bookings.filter(b => b.status === 'cancelled').length,
            totalSpent: this.getTotalSpent(),
            averageSpent: this.bookings.length > 0 
                ? this.getTotalSpent() / this.getConfirmedBookings().length 
                : 0
        };
    }

    // Save bookings to localStorage
    saveBookings() {
        localStorage.setItem('userBookings', JSON.stringify(this.bookings));
    }

    // Export booking details
    exportBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (!booking) throw new Error('Booking not found');
        return JSON.stringify(booking, null, 2);
    }

    // Get current booking
    getCurrentBooking() {
        return this.currentBooking;
    }
}

// ============= User Authentication Manager =============

class AuthManager {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.loadUser();
    }

    // Register user
    async register(username, email, password, fullName = '', phone = '') {
        try {
            const result = await ticketAPI.register(username, email, password, fullName, phone);
            this.user = {
                id: result.userId,
                username,
                email,
                fullName,
                phone
            };
            this.isAuthenticated = true;
            this.saveUser();
            return result;
        } catch (err) {
            throw new Error(err.message || 'Registration failed');
        }
    }

    // Login user
    async login(email, password) {
        try {
            const result = await ticketAPI.login(email, password);
            this.user = {
                id: result.userId,
                username: result.username,
                email: result.email
            };
            this.isAuthenticated = true;
            this.saveUser();
            return result;
        } catch (err) {
            throw new Error(err.message || 'Login failed');
        }
    }

    // Load user profile
    async loadProfile() {
        try {
            const profile = await ticketAPI.getProfile();
            this.user = profile;
            this.isAuthenticated = true;
            this.saveUser();
            return profile;
        } catch (err) {
            console.error('Load profile error:', err);
            this.isAuthenticated = false;
        }
    }

    // Update profile
    async updateProfile(fullName, phone) {
        try {
            const result = await ticketAPI.updateProfile(fullName, phone);
            this.user.fullName = fullName;
            this.user.phone = phone;
            this.saveUser();
            return result;
        } catch (err) {
            throw new Error(err.message || 'Profile update failed');
        }
    }

    // Logout
    logout() {
        ticketAPI.logout();
        this.user = null;
        this.isAuthenticated = false;
        localStorage.removeItem('user');
    }

    // Save user to localStorage
    saveUser() {
        localStorage.setItem('user', JSON.stringify(this.user));
    }

    // Load user from localStorage
    loadUser() {
        const user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
            this.isAuthenticated = true;
        }
    }

    // Get current user
    getUser() {
        return this.user;
    }

    // Check if authenticated
    checkAuthentication() {
        return this.isAuthenticated;
    }

    // Get user email
    getUserEmail() {
        return this.user?.email || null;
    }

    // Get username
    getUsername() {
        return this.user?.username || null;
    }
}

// ============= Notification Manager =============

class NotificationManager {
    static show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__icon">${this.getIcon(type)}</span>
                <span class="notification__message">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('notification--fade');
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    static success(message, duration = 3000) {
        this.show(message, 'success', duration);
    }

    static error(message, duration = 5000) {
        this.show(message, 'error', duration);
    }

    static warning(message, duration = 4000) {
        this.show(message, 'warning', duration);
    }

    static info(message, duration = 3000) {
        this.show(message, 'info', duration);
    }

    static getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || 'ℹ';
    }
}

// ============= Loading Manager =============

class LoadingManager {
    static show(message = 'Loading...') {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.id = 'global-loader';
        loader.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
    }

    static hide() {
        const loader = document.getElementById('global-loader');
        if (loader) loader.remove();
    }
}

// Create global instances
const bookingManager = new BookingManager();
const authManager = new AuthManager();
const notifications = NotificationManager;
const loading = LoadingManager;
