# 🎟️ TicketX Pro - QR Code & Booking Features Deep Dive

**Focus**: QR Code generation, Booking flow, API integration roadmap

---

## 🔲 QR CODE IMPLEMENTATION (COMPLETE)

### Current Implementation

**Location**: `pages/confirmation.html` & `src/js/pages/confirmation.js`

**QR Code Library**: QRCode.js v1.0.0
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
```

### QR Code Generation Flow

```javascript
// In confirmation.js
function generateQRCode(bookingId) {
    // QR data includes: Platform|BookingID|UserID|Timestamp
    const qrData = `TicketX-Pro|${bookingId}|${Auth.getCurrentUser().id}|${new Date().getTime()}`;
    
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = ''; // Clear previous
    
    new QRCode(qrContainer, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H    // High error correction
    });
}
```

### QR Code Data Structure

| Component | Format | Example |
|-----------|--------|---------|
| Platform | String | `TicketX-Pro` |
| Booking ID | String | `BK_1234567890_abc123` |
| User ID | String | `USER_001` |
| Timestamp | Number | `1714992600000` |

**Full QR String**: `TicketX-Pro|BK_1234567890_abc123|USER_001|1714992600000`

### QR Code Customization Options

```javascript
new QRCode(container, {
    text: qrData,              // Data to encode
    width: 200,                // Pixel width
    height: 200,               // Pixel height
    colorDark: "#000000",      // Dark color (black)
    colorLight: "#ffffff",     // Light color (white)
    correctLevel: QRCode.CorrectLevel.H  // Error correction level
        // L = ~7% error correction
        // M = ~15% error correction
        // Q = ~25% error correction
        // H = ~30% error correction (current)
});
```

### QR Code Scanning & Verification

**Currently**: QR is displayed on confirmation page  
**For Production**: Need backend verification system

```javascript
// Backend verification pseudocode needed:
POST /api/verify-qr
{
    qrData: "TicketX-Pro|BK_123|USER_001|1714992600000"
}

Response:
{
    valid: true,
    booking: { /* booking details */ },
    attendanceMarked: true,
    timestamp: "2026-05-06T10:30:00Z"
}
```

### Enhancement Opportunities

1. **Dynamic QR Codes**
   - Update QR on each scan
   - One-time QR codes
   - Time-limited validity

2. **Enhanced Data**
   - Event/Movie name
   - Seat numbers
   - Validity date/time
   - Venue coordinates (GPS)

3. **Printing & Download**
   - Generate PDF with QR
   - Email QR code
   - Mobile wallet integration (Apple/Google Pay)

---

## 📋 BOOKING SYSTEM ARCHITECTURE

### Complete Booking Data Model

```javascript
// Full booking object structure
{
    // Identification
    id: "BK_1234567890_abc123",        // Unique booking ID
    userId: "USER_001",                 // Linked user ID
    
    // Item Information
    category: "movie" | "train" | "flight" | "bus" | "event",
    itemId: "1",                        // Movie/Train/Flight/Bus/Event ID
    itemName: "Inception",              // Display name
    
    // Passenger Details
    passengerName: "John Doe",
    passengerEmail: "john@example.com",
    passengerPhone: "9876543210",
    
    // Booking Items
    seats: ["A1", "A2", "B3"],          // For movies/trains/buses
    travelClass: "AC 2-Tier",           // For trains (if applicable)
    cabinClass: "economy",              // For flights (if applicable)
    passengers: 2,                      // For flights (if applicable)
    
    // Pricing
    subtotal: 2400,                     // Before GST/discount
    discount: 0,                        // Promo code discount
    gst: 120,                           // 5% GST
    totalPrice: 2520,                   // Final amount
    promoCode: "SAVE10",                // Applied promo (optional)
    
    // Status & Dates
    status: "confirmed" | "cancelled" | "pending",
    date: "2026-05-06",                 // Booking date
    travelDate: "2026-05-10",           // Travel/Event date
    bookedAt: "2026-05-06T10:30:00Z",  // Exact booking time
    
    // Payment
    paymentMethod: "credit" | "upi" | "netbanking" | "wallet",
    paymentStatus: "completed" | "pending" | "failed",
    transactionId: "TXN_12345",         // Payment reference
    
    // Additional
    notes: "",                          // User notes
    confirmationSent: false,            // Email sent status
    attendanceMarked: false             // For events/shows
}
```

### Booking Status Flow

```
User searches & selects item
    ↓
SEAT SELECTION (if applicable)
    ↓
    Stores selected seats in Storage
    ↓
CHECKOUT
    ↓
    User enters passenger details
    ↓
    Selects payment method
    ↓
    Applies promo code (optional)
    ↓
    Validates GST (5%)
    ↓
    Generates booking object
    ↓
CONFIRMATION
    ↓
    Booking saved to Storage
    ↓
    Status: "confirmed"
    ↓
    QR code generated & displayed
    ↓
    User can view in Dashboard
    ↓
CANCELLATION (Future)
    ↓
    Status: "cancelled"
    ↓
    Refund initiated (if applicable)
```

### Booking Creation (Current Flow)

**Location**: `src/js/pages/checkout.js` - `completeBooking()` function

```javascript
function completeBooking() {
    // 1. Validate passenger details
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
    
    // 2. Create booking object
    const booking = {
        id: generateID('BK'),                              // BK_123456789_abc
        userId: Auth.getCurrentUser().id,                 // From session
        category: bookingData.type,                        // movie/train/flight/bus/event
        itemId: bookingData.item.id,                       // Item identifier
        itemName: bookingData.item.title || bookingData.item.name || bookingData.item.operator,
        passengerName: name,
        passengerEmail: email,
        passengerPhone: phone,
        seats: bookingData.seats || [],
        date: new Date().toISOString().split('T')[0],     // Today's date
        totalPrice: bookingData.totalWithGst,              // With GST
        status: 'confirmed',
        bookedAt: new Date().toISOString()
    };
    
    // 3. Save to localStorage
    const bookings = Storage.get(DB.bookings) || [];
    bookings.push(booking);
    Storage.set(DB.bookings, bookings);
    
    // 4. Clear temporary storage
    Storage.remove('selectedMovie');
    Storage.remove('selectedTrain');
    Storage.remove('selectedBus');
    Storage.remove('selectedFlight');
    
    // 5. Redirect to confirmation
    window.location.href = `confirmation.html?bookingId=${booking.id}`;
}
```

### Booking Retrieval (Dashboard)

**Location**: `src/js/pages/dashboard.js`

```javascript
function getUserBookings() {
    const bookings = Storage.get(DB.bookings) || [];
    return bookings.filter(b => b.userId === currentUser.id);
}

// Display in dashboard
function renderBookings(rows) {
    const allBookingsBody = document.getElementById('allBookingsBody');
    if (!allBookingsBody) return;

    if (rows.length === 0) {
        allBookingsBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No bookings found</td></tr>';
        return;
    }

    allBookingsBody.innerHTML = rows.map(b => `
        <tr>
            <td>${b.id}</td>
            <td><strong>${(b.category || 'N/A').toUpperCase()}</strong></td>
            <td>${b.itemName || 'N/A'}</td>
            <td>${formatDate(b.date)}</td>
            <td>${formatPrice(b.totalPrice || 0)}</td>
            <td><span class="status-badge ${b.status || 'confirmed'}">${capitalizeFirst(b.status || 'confirmed')}</span></td>
            <td>
                <button class="booking-actions btn-view" onclick="viewBooking('${b.id}')">View</button>
                ${(b.status || 'confirmed') === 'confirmed' ? `<button class="booking-actions btn-cancel" onclick="cancelBooking('${b.id}')">Cancel</button>` : ''}
            </td>
        </tr>
    `).join('');
}
```

---

## 🔌 API INTEGRATION ROADMAP

### Phase 1: Current State (Dummy Data)

**All APIs use static DUMMY data:**

```javascript
// movies-api.js
const DUMMY_MOVIES = [ /* 50+ items */ ];

class MoviesAPI {
    static getAllMovies() {
        return DUMMY_MOVIES;
    }
    
    static getMovieById(id) {
        return DUMMY_MOVIES.find(m => m.id == id);
    }
}
```

### Phase 2: Real API Integration

#### Option A: Backend REST API

```javascript
// Refactored movies-api.js
class MoviesAPI {
    static async getAllMovies() {
        const response = await fetch('/api/movies');
        return await response.json();
    }
    
    static async searchMovies(query, filters) {
        const response = await fetch(`/api/movies/search?q=${query}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filters)
        });
        return await response.json();
    }
}
```

#### Option B: Third-party APIs (with Backend Proxy)

```javascript
// With backend proxy for security
class MoviesAPI {
    static async fetchFromTMDB(query) {
        // Backend handles API key security
        const response = await fetch('/api/tmdb/search', {
            method: 'POST',
            body: JSON.stringify({ query })
        });
        return await response.json();
    }
}
```

### API Endpoints Needed (Backend)

**Authentication**:
```
POST   /api/auth/register      { email, password, name, phone }
POST   /api/auth/login         { email, password }
POST   /api/auth/logout        {}
GET    /api/auth/verify        - Check if user valid
```

**Movies**:
```
GET    /api/movies             - All movies
GET    /api/movies/:id         - Single movie
GET    /api/movies/search      - Search/filter
POST   /api/movies/ratings     - Get movie ratings (from feedback-api)
```

**Trains**:
```
GET    /api/trains             - All trains
POST   /api/trains/search      { from, to, date, class }
GET    /api/trains/:id         - Single train
GET    /api/trains/:id/availability - Seat availability
```

**Flights**:
```
POST   /api/flights/search     { from, to, date, passengers, class }
GET    /api/flights/:id        - Flight details
GET    /api/flights/:id/prices - Pricing for different dates
```

**Buses**:
```
POST   /api/buses/search       { from, to, date }
GET    /api/buses/:id          - Bus details
GET    /api/buses/operators    - Available operators
```

**Events**:
```
GET    /api/events             - All events
GET    /api/events/:id         - Event details
POST   /api/events/search      { category, location, date, priceRange }
```

**Bookings**:
```
POST   /api/bookings           { booking object } - Create booking
GET    /api/bookings           - User's bookings
GET    /api/bookings/:id       - Booking details
PUT    /api/bookings/:id       - Update booking
DELETE /api/bookings/:id       - Cancel booking
POST   /api/bookings/:id/verify-qr - Verify QR code
```

**Payments**:
```
POST   /api/payments/process   { bookingId, amount, method }
POST   /api/payments/verify    { transactionId }
POST   /api/payments/refund    { bookingId }
```

---

## 💳 PAYMENT SYSTEM INTEGRATION

### Current State

**Location**: `pages/checkout.html` (Payment methods UI)

**Payment Methods Available**:
1. Credit/Debit Card
2. UPI
3. Net Banking
4. Digital Wallet (Apple Pay, Google Pay, etc.)

### Payment Method Selection (HTML)

```html
<div class="payment-methods">
    <label class="payment-option selected">
        <input type="radio" name="paymentMethod" value="credit" checked>
        <span>💳 Credit/Debit Card</span>
    </label>
    <label class="payment-option">
        <input type="radio" name="paymentMethod" value="upi">
        <span>📱 UPI</span>
    </label>
    <label class="payment-option">
        <input type="radio" name="paymentMethod" value="netbanking">
        <span>🏦 Net Banking</span>
    </label>
    <label class="payment-option">
        <input type="radio" name="paymentMethod" value="wallet">
        <span>💰 Digital Wallet</span>
    </label>
</div>
```

### Razorpay Integration (Recommended)

**Setup Required**:
```javascript
// Step 1: Include Razorpay SDK
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

// Step 2: Create order on backend
POST /api/payments/create-order
{
    amount: 2620,        // In paise
    currency: "INR",
    bookingId: "BK_123"
}

Response:
{
    orderId: "order_ABC123",
    amount: 2620,
    currency: "INR"
}

// Step 3: Open Razorpay checkout
function initiatePayment() {
    const options = {
        key: "YOUR_RAZORPAY_KEY",
        amount: bookingData.totalWithGst * 100,  // Convert to paise
        currency: "INR",
        order_id: order.orderId,
        handler: function(response) {
            // Verify payment on backend
            verifyPayment(response.razorpay_payment_id);
        },
        prefill: {
            name: document.getElementById('passengerName').value,
            email: document.getElementById('passengerEmail').value,
            contact: document.getElementById('passengerPhone').value
        },
        theme: {
            color: "#6366f1"  // Primary color
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}

// Step 4: Verify payment
POST /api/payments/verify
{
    paymentId: "pay_ABC123",
    orderId: "order_ABC123",
    signature: "signature_hash"
}
```

### Payment Flow Diagram

```
Checkout Page
    ↓
Select Payment Method
    ↓
User fills passenger details
    ↓
Apply promo code (optional)
    ↓
Click "Pay Now"
    ↓
Create Order (Backend)
    ↓
Open Razorpay Checkout
    ↓
User completes payment
    ↓
Payment Verification (Backend)
    ↓
Mark payment as successful
    ↓
Create booking
    ↓
Redirect to Confirmation
    ↓
Generate QR code
    ↓
Send confirmation email
```

---

## 📧 EMAIL NOTIFICATION SYSTEM

### Required Integrations

**Email Service Options**:
1. **SendGrid** (Recommended)
2. **Mailgun**
3. **AWS SES**
4. **Custom SMTP**

### Email Templates Needed

**1. Booking Confirmation**
```
Subject: Your Booking Confirmed! - Booking ID: {bookingId}

Dear {passengerName},

Your booking has been successfully confirmed!

Booking Details:
- Booking ID: {bookingId}
- Item: {itemName}
- Category: {category}
- Total Amount: {totalPrice}
- Booking Date: {bookingDate}

Your QR Code:
[QR_CODE_IMAGE]

Please save this email and present the QR code at the venue.

Thank you for booking with TicketX Pro!
```

**2. Booking Reminder** (1 day before)
```
Subject: Reminder: Your {itemName} booking is tomorrow!

Your booking reminder for tomorrow.
Please arrive 15-30 minutes early.
```

**3. Cancellation Confirmation**
```
Subject: Your Booking Has Been Cancelled

Booking ID {bookingId} has been cancelled.
Refund of {refundAmount} will be processed within 3-5 business days.
```

### Backend Email Implementation (Node.js + SendGrid)

```javascript
// Example backend code
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendBookingConfirmation(booking, qrCode) {
    const msg = {
        to: booking.passengerEmail,
        from: 'noreply@ticketxpro.com',
        subject: `Booking Confirmed! ID: ${booking.id}`,
        html: `
            <h2>Booking Confirmed!</h2>
            <p>Booking ID: ${booking.id}</p>
            <p>Item: ${booking.itemName}</p>
            <p>Total: ₹${booking.totalPrice}</p>
            <img src="${qrCode}" alt="QR Code" />
        `,
        attachments: [
            {
                filename: `ticket_${booking.id}.pdf`,
                content: generatePDF(booking)
            }
        ]
    };
    
    await sgMail.send(msg);
}
```

---

## 🗄️ DATABASE SCHEMA (For Backend)

### User Table
```sql
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    category ENUM('movie', 'train', 'flight', 'bus', 'event') NOT NULL,
    item_id VARCHAR(50) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    passenger_name VARCHAR(255) NOT NULL,
    passenger_email VARCHAR(255) NOT NULL,
    passenger_phone VARCHAR(20) NOT NULL,
    seats JSON,
    subtotal DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    gst DECIMAL(10, 2),
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'used') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    travel_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Payments Table
```sql
CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    booking_id VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    method ENUM('credit', 'debit', 'upi', 'wallet', 'netbanking'),
    status ENUM('initiated', 'success', 'failed', 'refunded'),
    transaction_id VARCHAR(100),
    gateway_response JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);
```

---

## 🔄 MIGRATION STRATEGY

### Step 1: Parallel Development (Week 1-2)
- Keep dummy data functional
- Develop backend APIs in parallel
- Don't break existing UI

### Step 2: Backend Ready (Week 2-3)
- Deploy backend APIs
- Start switching API calls
- Keep fallback to dummy data

### Step 3: Gradual Migration (Week 3-4)
- Migrate one API at a time (start with movies)
- Test thoroughly
- Switch others

### Step 4: Payment Integration (Week 4-5)
- Add Razorpay
- Test all payment flows
- Setup refund system

### Step 5: Email Notifications (Week 5-6)
- Email service integration
- Send confirmations
- Setup automated reminders

---

## 🎯 TESTING CHECKLIST

### Booking Flow Testing
- [ ] Search works for all categories
- [ ] Filters work correctly
- [ ] Seat selection shows occupied seats
- [ ] Seat selection updates price
- [ ] Promo codes apply correctly
- [ ] GST calculated properly
- [ ] Booking saved to localStorage
- [ ] QR code generates
- [ ] Booking appears in dashboard
- [ ] Can view booking details

### Payment Testing
- [ ] All payment methods display
- [ ] Payment UI appears
- [ ] Test with dummy data first
- [ ] Razorpay integration works
- [ ] Payment verification successful
- [ ] Transaction ID stored
- [ ] Booking marked as paid

### Email Testing
- [ ] Confirmation email sent
- [ ] QR code included
- [ ] Reminder emails trigger
- [ ] Cancellation emails work
- [ ] Email template displays correctly

### Security Testing
- [ ] User can't access others' bookings
- [ ] Login required for bookings
- [ ] Session expires appropriately
- [ ] Passwords not exposed in console
- [ ] API calls authenticated

---

## 📚 Quick Integration Guide

### For Frontend Developer

1. **Keep Page Structure**: Don't change HTML structure
2. **Keep Function Names**: API classes names must stay same
3. **Add Error Handling**:
   ```javascript
   try {
       const movies = await MoviesAPI.getAllMovies();
   } catch (error) {
       console.error('API Error:', error);
       showNotification('Failed to load movies', 'error');
   }
   ```
4. **Add Loading State**: Show spinner while fetching
5. **Cache Results**: Store in Storage for offline

### For Backend Developer

1. **Start with Movie API**: Simplest endpoint
2. **Use this data structure**:
   ```javascript
   {
       success: true,
       data: [ /* items */ ],
       message: "",
       timestamp: ""
   }
   ```
3. **Add CORS Headers**: Allow requests from frontend
4. **Test with Postman**: Before frontend integration
5. **Document endpoints**: Use Swagger/OpenAPI

---

## ✅ COMPLETION CHECKLIST

### QR Code Features
- ✅ Generation working
- ✅ 200x200 pixel size
- ✅ High error correction
- ✅ Data encoding complete
- ⚠️ Verification backend needed
- ⚠️ PDF download needed
- ⚠️ Email delivery needed

### Booking Features
- ✅ Seat selection
- ✅ Checkout
- ✅ Confirmation display
- ✅ Storage/retrieval
- ✅ Dashboard display
- ⚠️ Modification needed
- ⚠️ Cancellation with refund
- ⚠️ Payment processing

### API Integration
- ⚠️ Backend endpoints
- ⚠️ Real data connection
- ⚠️ Error handling
- ⚠️ Authentication
- ⚠️ Rate limiting
- ⚠️ Caching strategy

### Production Ready
- ⚠️ Security audit
- ⚠️ Performance testing
- ⚠️ Load testing
- ⚠️ User acceptance testing
- ⚠️ Documentation
- ⚠️ Deployment guide

---

*This guide provides the technical foundation for completing TicketX Pro from frontend to full production deployment.*
