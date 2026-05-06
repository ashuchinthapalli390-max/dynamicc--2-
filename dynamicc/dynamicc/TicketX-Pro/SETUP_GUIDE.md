# 🎟️ TicketX Pro - Complete Setup & Installation Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Features Overview](#features-overview)
6. [API Documentation](#api-documentation)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** v14 or higher (Download: https://nodejs.org/)
- **npm** v6 or higher (comes with Node.js)
- **Git** (optional, for version control)
- **Modern Browser** (Chrome, Firefox, Safari, Edge)

### Verify Installation
```bash
node --version
npm --version
```

---

## Installation

### Step 1: Extract the Project
Navigate to your TicketX-Pro folder and open it in VS Code or Terminal.

### Step 2: Install Dependencies
```bash
# Navigate to project directory
cd TicketX-Pro

# Install all required packages
npm install
```

This will install:
- Express.js (Backend framework)
- SQLite3 (Database)
- jsonwebtoken (Authentication)
- bcryptjs (Password encryption)
- cors (Cross-origin requests)
- dotenv (Environment variables)
- Razorpay (Payment gateway)
- nodemailer (Email service)
- qrcode (QR code generation)
- And more...

### Step 3: Verify Installation
```bash
npm list
```

---

## Configuration

### Step 1: Environment Variables
Edit `.env` file with your credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret (change in production!)
JWT_SECRET=your-secure-key-here

# Razorpay Payment (Get from https://razorpay.com)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxxx

# Email Service (Gmail example)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 2: Razorpay Setup (Optional for Payments)
1. Sign up at https://razorpay.com
2. Get test keys from dashboard
3. Add to .env file
4. Test keys work in test mode

### Step 3: Email Service Setup (Optional for Notifications)
For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in .env file

---

## Running the Application

### Method 1: Development Mode (Recommended)
```bash
# Install nodemon for auto-restart
npm install -g nodemon

# Run with auto-restart on file changes
nodemon server.js
```

### Method 2: Production Mode
```bash
npm start
```

### Expected Output
```
╔════════════════════════════════════════╗
║    🎟️  TicketX Pro Server Running 🎟️    ║
╚════════════════════════════════════════╝
    
    ✓ Server: http://localhost:3000
    ✓ Frontend: http://localhost:3000
    ✓ API: http://localhost:3000/api
    ✓ Database: database.sqlite
    
    Ready to accept connections...
```

### Access the Application
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

---

## Features Overview

### ✅ User Management
- User Registration & Login
- Secure password hashing
- JWT authentication
- Profile management
- User dashboard

### ✅ Booking System
- Multi-category bookings (Movies, Trains, Flights, Buses, Events)
- Seat selection
- Real-time availability
- Booking confirmation
- Booking cancellation

### ✅ Payment Processing
- Razorpay integration
- Order creation & verification
- Secure payment handling
- Payment status tracking
- Invoice generation

### ✅ Promo Codes
- Percentage & fixed discounts
- Code validation
- Usage limits
- Expiry dates
- Active promo listing

### ✅ QR Codes
- Automatic QR generation
- QR code display & download
- QR verification
- Ticket scanning

### ✅ Admin Features
- Dashboard analytics
- Booking management
- User management
- Revenue tracking
- Category statistics

### ✅ Additional Features
- Email notifications
- Cart management
- Search & filters
- Dark theme
- Responsive design
- Error handling

---

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { username, email, password, fullName, phone }
Returns: { userId, token, message }
```

#### Login User
```
POST /api/auth/login
Body: { email, password }
Returns: { userId, username, email, token }
```

#### Get Profile
```
GET /api/auth/profile
Headers: { Authorization: Bearer <token> }
Returns: { id, username, email, phone, fullName, createdAt }
```

#### Update Profile
```
PUT /api/auth/profile
Headers: { Authorization: Bearer <token> }
Body: { fullName, phone }
Returns: { success, message }
```

### Booking Endpoints

#### Create Booking
```
POST /api/bookings/create
Headers: { Authorization: Bearer <token> }
Body: { category, itemId, seats, totalPrice, promoCode }
Returns: { bookingId, finalPrice, qrCode }
```

#### Get My Bookings
```
GET /api/bookings/my-bookings
Headers: { Authorization: Bearer <token> }
Returns: Array of bookings
```

#### Get Booking Details
```
GET /api/bookings/:bookingId
Headers: { Authorization: Bearer <token> }
Returns: Booking object
```

#### Cancel Booking
```
POST /api/bookings/:bookingId/cancel
Headers: { Authorization: Bearer <token> }
Returns: { success, message }
```

### Payment Endpoints

#### Create Payment Order
```
POST /api/payments/create-order
Headers: { Authorization: Bearer <token> }
Body: { bookingId, amount }
Returns: { orderId, key, amount, currency }
```

#### Verify Payment
```
POST /api/payments/verify
Headers: { Authorization: Bearer <token> }
Body: { bookingId, paymentId, orderId, signature }
Returns: { success, message }
```

### Promo Code Endpoints

#### Validate Promo Code
```
POST /api/promo/validate
Body: { code, amount }
Returns: { valid, discount, finalAmount }
```

#### Get Active Promos
```
GET /api/promo/active
Returns: Array of active promo codes
```

### QR Code Endpoints

#### Get QR Code
```
GET /api/qr/:bookingId
Headers: { Authorization: Bearer <token> }
Returns: { qrCode: dataUrl }
```

#### Verify QR Code
```
POST /api/qr/verify
Body: { qrData }
Returns: Booking verification details
```

### Admin Endpoints

#### Get Analytics
```
GET /api/admin/analytics
Headers: { Authorization: Bearer <token> }
Returns: Analytics data
```

#### Get All Bookings
```
GET /api/admin/bookings
Headers: { Authorization: Bearer <token> }
Returns: Array of all bookings
```

---

## Testing

### Test Credentials
Use these for testing:
- **Email**: test@example.com
- **Password**: password123

### Test Promo Codes
- `SAVE20` - 20% discount
- `FLAT500` - ₹500 flat discount
- `WELCOME10` - 10% discount

### Test Payment (Razorpay)
Use Razorpay test cards:
- **Card**: 4111 1111 1111 1111
- **Expiry**: Any future date
- **CVV**: Any 3 digits

---

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Change PORT in .env file
PORT=3001

# Or kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: Database errors
```bash
# Delete old database and recreate
rm database.sqlite
npm start
```

### Issue: Dependencies not installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS errors
- Ensure frontend URL matches FRONTEND_URL in .env
- Check that server is running on correct port
- Add frontend URL to cors configuration

### Issue: Payment not working
- Verify Razorpay keys in .env
- Ensure payment gateway script is loaded
- Check browser console for errors

### Issue: Emails not sending
- Enable "Less secure app access" (Gmail)
- Use app-specific password (Gmail)
- Check EMAIL_USER and EMAIL_PASSWORD in .env

---

## Production Deployment

### Before Going Live:
1. Change JWT_SECRET to a secure random string
2. Set NODE_ENV=production
3. Use real Razorpay keys (not test keys)
4. Configure proper email service
5. Set up database backups
6. Enable HTTPS
7. Configure rate limiting
8. Add input validation
9. Set up monitoring & logging
10. Review security checklist

### Deploy to Heroku:
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=xxxxx
heroku config:set RAZORPAY_KEY_ID=xxxxx

# Deploy
git push heroku main
```

### Deploy to AWS/DigitalOcean:
Follow platform-specific guides for Node.js deployment.

---

## Support & Documentation

- **GitHub**: https://github.com/yourusername/ticketx-pro
- **Documentation**: See README.md files in project
- **Issues**: Report bugs in GitHub Issues
- **Contact**: support@ticketxpro.com

---

## Quick Start Summary

```bash
# 1. Navigate to project
cd TicketX-Pro

# 2. Install dependencies
npm install

# 3. Configure .env file
# Edit .env with your credentials

# 4. Start server
npm start

# 5. Open browser
# Go to http://localhost:3000

# 6. Create account & start booking!
```

---

**Happy Booking! 🎉**

Last Updated: May 2026
Version: 1.0.0
