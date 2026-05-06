// ============= COMPLETE USER AUTH SYSTEM =============
// This handles all authentication, user storage, and session management

class UserAuthSystem {
    constructor() {
        this.currentUser = this.loadUserFromStorage();
        this.allUsers = this.loadAllUsers();
        this.initializeSystem();
    }

    // Initialize system
    initializeSystem() {
        if (!this.allUsers || Object.keys(this.allUsers).length === 0) {
            // Pre-load demo users
            this.allUsers = {
                'demo@ticketx.com': {
                    id: 'USR001',
                    email: 'demo@ticketx.com',
                    password: 'Demo123!', // Demo password (for testing only)
                    fullName: 'Demo User',
                    phone: '9876543210',
                    createdAt: new Date().toISOString(),
                    bookings: [],
                    wallet: 5000
                },
                'test@ticketx.com': {
                    id: 'USR002',
                    email: 'test@ticketx.com',
                    password: 'Test123!',
                    fullName: 'Test User',
                    phone: '9123456789',
                    createdAt: new Date().toISOString(),
                    bookings: [],
                    wallet: 10000
                }
            };
            this.saveAllUsers();
        }
        this.updateUI();
    }

    // ===== SIGNUP FUNCTIONALITY =====
    signup(email, password, fullName, phone) {
        try {
            // Validation
            if (!email || !password || !fullName || !phone) {
                return { success: false, error: 'All fields required!' };
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return { success: false, error: 'Invalid email format!' };
            }

            if (password.length < 6) {
                return { success: false, error: 'Password must be 6+ characters!' };
            }

            // Check if user exists
            if (this.allUsers[email]) {
                return { success: false, error: 'User already exists!' };
            }

            // Create new user
            const userId = 'USR' + Date.now();
            const newUser = {
                id: userId,
                email,
                password,
                fullName,
                phone,
                createdAt: new Date().toISOString(),
                bookings: [],
                wallet: 1000 // Initial wallet amount
            };

            this.allUsers[email] = newUser;
            this.currentUser = newUser;
            
            this.saveAllUsers();
            this.saveCurrentUser();
            this.updateUI();

            return {
                success: true,
                message: 'Account created successfully!',
                user: { email, fullName, id: userId }
            };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    // ===== LOGIN FUNCTIONALITY =====
    login(email, password) {
        try {
            if (!email || !password) {
                return { success: false, error: 'Email and password required!' };
            }

            const user = this.allUsers[email];

            if (!user) {
                return { success: false, error: 'User not found!' };
            }

            if (user.password !== password) {
                return { success: false, error: 'Invalid password!' };
            }

            this.currentUser = user;
            this.saveCurrentUser();
            this.updateUI();

            return {
                success: true,
                message: 'Login successful!',
                user: { email, fullName: user.fullName, id: user.id }
            };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    // ===== LOGOUT FUNCTIONALITY =====
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        return { success: true, message: 'Logged out successfully!' };
    }

    // ===== LOCAL STORAGE FUNCTIONS =====
    saveCurrentUser() {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    loadUserFromStorage() {
        const stored = localStorage.getItem('currentUser');
        return stored ? JSON.parse(stored) : null;
    }

    saveAllUsers() {
        localStorage.setItem('allUsers', JSON.stringify(this.allUsers));
    }

    loadAllUsers() {
        const stored = localStorage.getItem('allUsers');
        return stored ? JSON.parse(stored) : {};
    }

    // ===== BOOKING MANAGEMENT =====
    addBooking(bookingData) {
        if (!this.currentUser) {
            return { success: false, error: 'Please login first!' };
        }

        const booking = {
            id: 'BK' + Date.now(),
            ...bookingData,
            createdAt: new Date().toISOString(),
            status: 'confirmed'
        };

        this.currentUser.bookings.push(booking);
        this.allUsers[this.currentUser.email] = this.currentUser;
        
        this.saveAllUsers();
        this.saveCurrentUser();

        return { success: true, booking };
    }

    getBookings() {
        if (!this.currentUser) return [];
        return this.currentUser.bookings || [];
    }

    getBookingById(bookingId) {
        if (!this.currentUser) return null;
        return this.currentUser.bookings.find(b => b.id === bookingId);
    }

    // ===== WALLET FUNCTIONS =====
    getWallet() {
        return this.currentUser?.wallet || 0;
    }

    deductFromWallet(amount) {
        if (!this.currentUser) return false;
        if (this.currentUser.wallet < amount) return false;
        
        this.currentUser.wallet -= amount;
        this.allUsers[this.currentUser.email] = this.currentUser;
        this.saveAllUsers();
        this.saveCurrentUser();
        return true;
    }

    addToWallet(amount) {
        if (!this.currentUser) return false;
        
        this.currentUser.wallet += amount;
        this.allUsers[this.currentUser.email] = this.currentUser;
        this.saveAllUsers();
        this.saveCurrentUser();
        return true;
    }

    // ===== PROFILE FUNCTIONS =====
    getProfile() {
        if (!this.currentUser) return null;
        return {
            id: this.currentUser.id,
            email: this.currentUser.email,
            fullName: this.currentUser.fullName,
            phone: this.currentUser.phone,
            wallet: this.currentUser.wallet,
            totalBookings: this.currentUser.bookings?.length || 0
        };
    }

    updateProfile(fullName, phone) {
        if (!this.currentUser) return { success: false, error: 'Not logged in!' };

        this.currentUser.fullName = fullName;
        this.currentUser.phone = phone;
        this.allUsers[this.currentUser.email] = this.currentUser;
        
        this.saveAllUsers();
        this.saveCurrentUser();

        return { success: true, message: 'Profile updated!' };
    }

    // ===== UI UPDATE FUNCTION =====
    updateUI() {
        const authBtn = document.querySelector('.btn-login');
        const profileDropdown = document.querySelector('.profile-dropdown');
        
        if (this.currentUser) {
            // User is logged in
            if (authBtn) {
                authBtn.textContent = `👤 ${this.currentUser.fullName.split(' ')[0]}`;
                authBtn.onclick = () => this.showProfileMenu();
            }
            
            // Show profile info
            const userNameEl = document.getElementById('userName');
            const userEmailEl = document.getElementById('userEmail');
            const walletEl = document.getElementById('walletBalance');
            
            if (userNameEl) userNameEl.textContent = this.currentUser.fullName;
            if (userEmailEl) userEmailEl.textContent = this.currentUser.email;
            if (walletEl) walletEl.textContent = this.currentUser.wallet;
        } else {
            // User is logged out
            if (authBtn) {
                authBtn.textContent = 'Login/Register';
                authBtn.onclick = () => window.location.href = '/pages/login.html';
            }
        }
    }

    // ===== CHECK LOGIN STATUS =====
    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    // ===== SHOW PROFILE MENU =====
    showProfileMenu() {
        if (!this.currentUser) return;

        const menu = `
            <div class="profile-menu" style="
                position: absolute;
                top: 50px;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
                min-width: 200px;
            ">
                <div style="padding: 12px; border-bottom: 1px solid #eee;">
                    <strong>${this.currentUser.fullName}</strong>
                    <small style="display: block; color: #666;">${this.currentUser.email}</small>
                </div>
                <a href="/pages/user/profile.html" style="display: block; padding: 10px 12px; color: #1e90ff; text-decoration: none;">📋 Profile</a>
                <a href="/pages/user/dashboard.html" style="display: block; padding: 10px 12px; color: #1e90ff; text-decoration: none;">📊 Dashboard</a>
                <div style="padding: 10px 12px; text-align: center;">
                    💰 Wallet: ₹${this.currentUser.wallet}
                </div>
                <button onclick="userAuth.logout(); location.reload();" style="
                    width: calc(100% - 4px);
                    margin: 4px 2px;
                    padding: 8px;
                    border: none;
                    background: #ff4444;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                ">🚪 Logout</button>
            </div>
        `;

        // Remove existing menu
        const existing = document.querySelector('.profile-menu');
        if (existing) existing.remove();

        // Add new menu
        const btn = document.querySelector('.btn-login');
        if (btn) {
            btn.parentElement.innerHTML += menu;
        }
    }
}

// Create global instance
const userAuth = new UserAuthSystem();
