# 🎫 TICKETX PRO - QUICK START GUIDE

## ⚡ RUN IN 30 SECONDS

```bash
# Open Command Prompt/PowerShell and run:
cd "c:\Users\Paruchuri.Bhavii\Downloads\dynamicc\dynamicc\TicketX-Pro"
python -m http.server 8080
```

**Then open in browser:** `http://localhost:8080`

---

## 👤 LOGIN WITH DEMO ACCOUNT

```
Email: demo@ticketx.com
Password: Demo123!
```

---

## 🛒 COMPLETE BOOKING FLOW

1. **Home Page** → Login
2. **Browse** → Click Movies/Trains/Flights/Buses/Events
3. **Book** → Click "Book Now" on any item
4. **Add to Cart** → Select quantity
5. **Checkout** → Fill payment details
6. **Pay** → Click "💳 Pay & Complete Booking"
7. **Get QR Code** → Download or save ticket
8. **Dashboard** → View all bookings with QR codes

---

## ✨ KEY FEATURES WORKING

- ✅ Login/Signup (stored in browser localStorage)
- ✅ Browse all categories
- ✅ Add items to cart
- ✅ Dummy payment processing (90% success)
- ✅ QR code generation for each booking
- ✅ Download tickets as HTML
- ✅ User dashboard with all bookings
- ✅ Profile management
- ✅ Wallet system (add/deduct money)
- ✅ Mobile responsive

---

## 📱 MAIN PAGES

| Page | URL |
|------|-----|
| 🏠 Home | http://localhost:8080/index.html |
| 🔐 Login | http://localhost:8080/pages/login.html |
| 🎬 Movies | http://localhost:8080/pages/movies.html |
| 🚂 Trains | http://localhost:8080/pages/trains.html |
| ✈️ Flights | http://localhost:8080/pages/flights.html |
| 🚌 Buses | http://localhost:8080/pages/bus.html |
| 🎪 Events | http://localhost:8080/pages/events.html |
| 🛒 Checkout | http://localhost:8080/pages/checkout.html |
| 📊 Dashboard | http://localhost:8080/pages/user/dashboard.html |

---

## 💡 WHAT'S STORED IN BROWSER

Everything is saved in browser's localStorage:
- User accounts (email, name, phone, wallet)
- Bookings (with QR codes)
- Shopping cart
- Data persists even after closing browser!

---

## 🎯 WHAT WORKS

**✅ ALL BUTTONS FUNCTIONAL:**
- Login/Signup buttons
- Category navigation
- Book Now buttons
- Add to Cart
- Payment processing
- QR code generation
- Download ticket
- Logout
- Profile update
- Wallet management

**✅ COMPLETE FLOW:**
- Login → Browse → Add to Cart → Checkout → Payment → QR Code → Dashboard

**✅ DATA PERSISTENCE:**
- Login saved across sessions
- Bookings saved permanently
- Wallet updates saved
- Cart items saved

---

## 🔍 TESTING CHECKLIST

- [✅] Login with demo account (demo@ticketx.com / Demo123!)
- [✅] Browse movies/trains/flights/buses/events
- [✅] Click "Book Now" and add items to cart
- [✅] Go to checkout page
- [✅] See cart summary with total price
- [✅] Enter payment details (any format, it's dummy)
- [✅] Click Pay button
- [✅] Wait 2 seconds for processing
- [✅] See confirmation with QR code
- [✅] Download ticket (saves as HTML)
- [✅] Go to dashboard
- [✅] View all bookings with QR codes
- [✅] Edit profile
- [✅] Add money to wallet
- [✅] Logout (session cleared)

---

## 🎬 LIVE DEMO WALKTHROUGH

### Step 1: Start Server
```bash
python -m http.server 8080
```

### Step 2: Open Browser
Navigate to: `http://localhost:8080`

### Step 3: Click Login
Username: `demo@ticketx.com`
Password: `Demo123!`

### Step 4: Browse Movies
Click on "🎬 Movies" link

### Step 5: Book a Movie
Click "Book Now" on any movie → Select quantity → "Add to Cart"

### Step 6: Checkout
Click "Proceed to Checkout" → Enter payment details → Pay

### Step 7: Get Ticket
See QR code → Download as ticket → View in PDF/Browser

### Step 8: Dashboard
Click "Go to Dashboard" → See all bookings → View QR codes

---

## 💾 BROWSER DEVELOPER TOOLS

To see stored data, open DevTools (F12):
- **Storage** → **Local Storage** → http://localhost:8080
- See `currentUser`, `allUsers`, `cart` keys
- All data is JSON formatted

---

## 🚀 PERFORMANCE

- ⚡ Instant load time (no backend)
- ⚡ No page reloads for cart operations
- ⚡ Smooth animations and transitions
- ⚡ Works on slow connections
- ⚡ Mobile optimized

---

## 🆘 COMMON ISSUES

**Q: Cannot connect to localhost:8080**
A: Make sure Python server is running and you're in the correct directory

**Q: Login doesn't work**
A: Try clearing browser cache or use incognito window

**Q: QR codes not showing**
A: Check browser console - CDN might be blocked. SVG fallback should work

**Q: Data not saving**
A: Check if localStorage is enabled in browser settings

---

## 📞 SERVER COMMAND

Keep this window open while using the website:

```bash
cd "c:\Users\Paruchuri.Bhavii\Downloads\dynamicc\dynamicc\TicketX-Pro"
python -m http.server 8080
```

To stop: Press `Ctrl + C`

---

**WEBSITE IS FULLY BUILT AND READY TO USE! 🎉**

Just run the server command above and open http://localhost:8080 in your browser!
