// ============= COMPLETE PAYMENT & BOOKING SYSTEM =============

class BookingAndPaymentSystem {
    constructor() {
        this.currentCart = [];
        this.paymentInProgress = false;
        this.loadCart();
    }

    // ===== CART MANAGEMENT =====
    addToCart(item) {
        this.currentCart.push({
            ...item,
            id: 'ITEM' + Date.now(),
            addedAt: new Date().toISOString()
        });
        this.saveCart();
        this.showNotification(`✅ ${item.name} added to cart!`, 'success');
        return true;
    }

    removeFromCart(itemId) {
        this.currentCart = this.currentCart.filter(i => i.id !== itemId);
        this.saveCart();
        return true;
    }

    getCart() {
        return this.currentCart;
    }

    getCartTotal() {
        return this.currentCart.reduce((sum, item) => sum + (item.price * item.quantity || item.price), 0);
    }

    clearCart() {
        this.currentCart = [];
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.currentCart));
    }

    loadCart() {
        const stored = localStorage.getItem('cart');
        this.currentCart = stored ? JSON.parse(stored) : [];
    }

    // ===== COMPLETE BOOKING PROCESS =====
    async processBooking(bookingDetails) {
        try {
            if (!userAuth.isLoggedIn()) {
                this.showNotification('❌ Please login first!', 'error');
                window.location.href = '/pages/login.html';
                return { success: false };
            }

            const totalPrice = this.getCartTotal();

            // Check wallet
            const wallet = userAuth.getWallet();
            if (wallet < totalPrice) {
                this.showNotification(`❌ Insufficient wallet! Need ₹${totalPrice - wallet} more`, 'error');
                return { success: false };
            }

            // Process payment
            const paymentResult = await this.processPayment(totalPrice);
            if (!paymentResult.success) {
                return paymentResult;
            }

            // Deduct from wallet
            userAuth.deductFromWallet(totalPrice);

            // Create booking
            const bookingId = 'BK' + Date.now();
            const booking = {
                bookingId,
                type: bookingDetails.type,
                items: this.currentCart,
                totalPrice,
                paymentId: paymentResult.paymentId,
                status: 'confirmed',
                qrCode: await this.generateQRCode(bookingId),
                bookedAt: new Date().toISOString()
            };

            // Save booking to user
            const result = userAuth.addBooking(booking);

            if (result.success) {
                this.clearCart();
                this.showNotification('✅ Booking confirmed! Check your dashboard for tickets.', 'success');
                return {
                    success: true,
                    booking: result.booking,
                    qrCode: booking.qrCode
                };
            }

            return { success: false, error: 'Booking failed' };
        } catch (err) {
            this.showNotification(`❌ Error: ${err.message}`, 'error');
            return { success: false, error: err.message };
        }
    }

    // ===== DUMMY PAYMENT PROCESSING =====
    async processPayment(amount) {
        return new Promise((resolve) => {
            this.paymentInProgress = true;
            this.showNotification('💳 Processing payment...', 'info');

            // Simulate payment processing (2 seconds)
            setTimeout(() => {
                // Dummy payment success (90% success rate for demo)
                const success = Math.random() > 0.1;

                if (success) {
                    const paymentId = 'PAY' + Date.now();
                    this.paymentInProgress = false;
                    this.showNotification(`✅ Payment successful! ID: ${paymentId}`, 'success');
                    resolve({
                        success: true,
                        paymentId,
                        amount,
                        timestamp: new Date().toISOString()
                    });
                } else {
                    this.paymentInProgress = false;
                    this.showNotification('❌ Payment failed! Try again.', 'error');
                    resolve({ success: false, error: 'Payment processing failed' });
                }
            }, 2000);
        });
    }

    // ===== QR CODE GENERATION =====
    async generateQRCode(bookingId) {
        try {
            // Create QR data
            const qrData = `TicketX-Pro|${bookingId}|${userAuth.getCurrentUser().id}|${Date.now()}`;

            // Use QRCode.js if available
            if (typeof QRCode !== 'undefined') {
                return new Promise((resolve) => {
                    const canvas = document.createElement('canvas');
                    QRCode.toCanvas(canvas, qrData, {
                        errorCorrectionLevel: 'H',
                        type: 'image/png',
                        width: 300,
                        margin: 2,
                        color: { dark: '#000000', light: '#ffffff' }
                    }, (err) => {
                        if (err) {
                            resolve(this.generateFallbackQR(bookingId));
                        } else {
                            resolve(canvas.toDataURL());
                        }
                    });
                });
            } else {
                // Fallback QR generation
                return this.generateFallbackQR(bookingId);
            }
        } catch (err) {
            return this.generateFallbackQR(bookingId);
        }
    }

    generateFallbackQR(bookingId) {
        // Generate SVG QR-like code (fallback)
        const svg = `
            <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="300" fill="white"/>
                <text x="50" y="100" font-size="24" font-weight="bold">TicketX Pro</text>
                <text x="30" y="150" font-size="14">Booking ID</text>
                <text x="30" y="170" font-size="18" font-weight="bold">${bookingId}</text>
                <text x="30" y="220" font-size="12">Valid: ${new Date().toLocaleDateString()}</text>
                <rect x="10" y="250" width="280" height="40" fill="#1e90ff" rx="5"/>
                <text x="50" y="280" font-size="14" fill="white" font-weight="bold">✓ Verified</text>
            </svg>
        `;
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }

    // ===== NOTIFICATION SYSTEM =====
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ===== GET BOOKINGS =====
    getMyBookings() {
        return userAuth.getBookings();
    }

    // ===== DOWNLOAD TICKET =====
    downloadTicket(bookingId) {
        const booking = userAuth.getBookingById(bookingId);
        if (!booking) {
            this.showNotification('❌ Booking not found!', 'error');
            return;
        }

        // Create ticket HTML
        const ticketHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>TicketX Pro - Ticket ${bookingId}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .ticket { border: 2px solid #1e90ff; border-radius: 10px; padding: 20px; max-width: 400px; }
                    .header { background: #1e90ff; color: white; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
                    .detail { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
                    .qr { text-align: center; margin: 20px 0; }
                    .qr img { max-width: 200px; }
                </style>
            </head>
            <body>
                <div class="ticket">
                    <div class="header">
                        <h1>🎟️ TicketX Pro</h1>
                        <p>Your Booking Ticket</p>
                    </div>
                    <div class="detail">
                        <strong>Booking ID:</strong> ${bookingId}
                    </div>
                    <div class="detail">
                        <strong>Category:</strong> ${booking.type}
                    </div>
                    <div class="detail">
                        <strong>Total Price:</strong> ₹${booking.totalPrice}
                    </div>
                    <div class="detail">
                        <strong>Status:</strong> ${booking.status}
                    </div>
                    <div class="detail">
                        <strong>Booked At:</strong> ${new Date(booking.bookedAt).toLocaleString()}
                    </div>
                    <div class="qr">
                        <img src="${booking.qrCode}" alt="QR Code">
                    </div>
                </div>
            </body>
            </html>
        `;

        // Download
        const blob = new Blob([ticketHTML], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Ticket-${bookingId}.html`;
        a.click();

        this.showNotification('✅ Ticket downloaded!', 'success');
    }
}

// Create global instance
const bookingSystem = new BookingAndPaymentSystem();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
