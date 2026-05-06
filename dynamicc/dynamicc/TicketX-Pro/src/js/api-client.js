// ============= TicketX Pro API Client =============
// This file provides all API endpoints for frontend integration

class TicketXAPI {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.token = localStorage.getItem('authToken');
    }

    // ===== Helper Methods =====
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` })
        };
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);
    }

    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API Error');
        }
        return response.json();
    }

    // ===== Authentication APIs =====
    
    async register(username, email, password, fullName = '', phone = '') {
        try {
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ username, email, password, fullName, phone })
            });
            const data = await this.handleResponse(response);
            this.setToken(data.token);
            return data;
        } catch (err) {
            console.error('Register error:', err);
            throw err;
        }
    }

    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ email, password })
            });
            const data = await this.handleResponse(response);
            this.setToken(data.token);
            return data;
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    }

    async getProfile() {
        try {
            const response = await fetch(`${this.baseURL}/auth/profile`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get profile error:', err);
            throw err;
        }
    }

    async updateProfile(fullName, phone) {
        try {
            const response = await fetch(`${this.baseURL}/auth/profile`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify({ fullName, phone })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Update profile error:', err);
            throw err;
        }
    }

    logout() {
        this.token = null;
        localStorage.removeItem('authToken');
    }

    // ===== Booking APIs =====

    async createBooking(category, itemId, seats, totalPrice, promoCode = null) {
        try {
            const response = await fetch(`${this.baseURL}/bookings/create`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ category, itemId, seats, totalPrice, promoCode })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Create booking error:', err);
            throw err;
        }
    }

    async getMyBookings() {
        try {
            const response = await fetch(`${this.baseURL}/bookings/my-bookings`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get bookings error:', err);
            return [];
        }
    }

    async getBookingDetails(bookingId) {
        try {
            const response = await fetch(`${this.baseURL}/bookings/${bookingId}`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get booking details error:', err);
            throw err;
        }
    }

    async cancelBooking(bookingId) {
        try {
            const response = await fetch(`${this.baseURL}/bookings/${bookingId}/cancel`, {
                method: 'POST',
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Cancel booking error:', err);
            throw err;
        }
    }

    // ===== Payment APIs =====

    async createPaymentOrder(bookingId, amount) {
        try {
            const response = await fetch(`${this.baseURL}/payments/create-order`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ bookingId, amount })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Create order error:', err);
            throw err;
        }
    }

    async verifyPayment(bookingId, paymentId, orderId, signature) {
        try {
            const response = await fetch(`${this.baseURL}/payments/verify`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ bookingId, paymentId, orderId, signature })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Verify payment error:', err);
            throw err;
        }
    }

    async getPaymentDetails(bookingId) {
        try {
            const response = await fetch(`${this.baseURL}/payments/${bookingId}`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get payment details error:', err);
            throw err;
        }
    }

    // ===== Promo Code APIs =====

    async validatePromoCode(code, amount) {
        try {
            const response = await fetch(`${this.baseURL}/promo/validate`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ code, amount })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Validate promo error:', err);
            throw err;
        }
    }

    async getActivePromoCodes() {
        try {
            const response = await fetch(`${this.baseURL}/promo/active`);
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get promos error:', err);
            return [];
        }
    }

    // ===== QR Code APIs =====

    async getQRCode(bookingId) {
        try {
            const response = await fetch(`${this.baseURL}/qr/${bookingId}`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get QR code error:', err);
            throw err;
        }
    }

    async verifyQRCode(qrData) {
        try {
            const response = await fetch(`${this.baseURL}/qr/verify`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({ qrData })
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Verify QR error:', err);
            throw err;
        }
    }

    // ===== Admin APIs =====

    async getAnalytics() {
        try {
            const response = await fetch(`${this.baseURL}/admin/analytics`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get analytics error:', err);
            throw err;
        }
    }

    async getAllBookings() {
        try {
            const response = await fetch(`${this.baseURL}/admin/bookings`, {
                headers: this.getHeaders()
            });
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Get all bookings error:', err);
            return [];
        }
    }

    // ===== Health Check =====

    async healthCheck() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            return await this.handleResponse(response);
        } catch (err) {
            console.error('Health check error:', err);
            return { status: 'ERROR' };
        }
    }
}

// Create global API instance
const ticketAPI = new TicketXAPI();
