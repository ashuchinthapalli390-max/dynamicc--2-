// ============ NAVIGATION ROUTER ============
// Handles all navigation between pages with proper path resolution

class Router {
    static isHomePage() {
        return window.location.pathname.endsWith('index.html') || window.location.pathname === '/TicketX-Pro/';
    }
    
    static isSubPage() {
        return window.location.pathname.includes('/pages/');
    }
    
    static getBasePath() {
        if (this.isSubPage()) {
            if (window.location.pathname.includes('/pages/user/') || window.location.pathname.includes('/pages/admin/')) {
                return '../../';
            }
            return '../';
        }
        return './';
    }
    
    static navigateTo(path) {
        const basePath = this.getBasePath();
        
        // Handle special cases
        if (path === 'home') {
            window.location.href = basePath + 'index.html';
        } else if (path === 'login') {
            window.location.href = basePath + 'pages/login.html';
        } else if (path === 'register') {
            window.location.href = basePath + 'pages/register.html';
        } else if (path === 'dashboard') {
            const user = Auth.getCurrentUser();
            if (user && user.role === 'admin') {
                window.location.href = basePath + 'pages/admin/dashboard.html';
            } else {
                window.location.href = basePath + 'pages/user/dashboard.html';
            }
        } else if (path === 'profile') {
            window.location.href = basePath + 'pages/user/profile.html';
        } else if (path === 'admin') {
            window.location.href = basePath + 'pages/admin/dashboard.html';
        } else if (path === 'help') {
            window.location.href = basePath + 'pages/help.html';
        } else if (path.startsWith('pages/')) {
            window.location.href = basePath + path;
        } else {
            window.location.href = basePath + 'pages/' + path + '.html';
        }
    }
}

// ============ GLOBAL NAVIGATION FUNCTIONS ============

function goToHome() {
    Router.navigateTo('home');
}

function goToLogin() {
    Router.navigateTo('login');
}

function goToRegister() {
    Router.navigateTo('register');
}

function goToDashboard() {
    Router.navigateTo('dashboard');
}

function goToProfile() {
    Router.navigateTo('profile');
}

function goToMovies() {
    Router.navigateTo('pages/movies.html');
}

function goToTrains() {
    Router.navigateTo('pages/trains.html');
}

function goToFlights() {
    Router.navigateTo('pages/flights.html');
}

function goToBus() {
    Router.navigateTo('pages/bus.html');
}

function goToSeatSelection() {
    Router.navigateTo('pages/seat-selection.html');
}

function goToCheckout() {
    Router.navigateTo('pages/checkout.html');
}

function goToConfirmation() {
    Router.navigateTo('pages/confirmation.html');
}

function goToHelp() {
    Router.navigateTo('pages/help.html');
}

function goToAdminDashboard() {
    Router.navigateTo('pages/admin/dashboard.html');
}

// ============ USER ACTIONS ============

function handleUserClick() {
    if (Auth.isLoggedIn()) {
        const user = Auth.getCurrentUser();
        if (user.role === 'admin') {
            goToAdminDashboard();
        } else {
            goToDashboard();
        }
    } else {
        goToLogin();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        Auth.logout();
    }
}

function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        Auth.logout();
    }
}

// ============ BOOKING ACTIONS ============

function bookNow(type) {
    if (!Auth.isLoggedIn()) {
        if (confirm('Please login to continue booking')) {
            goToLogin();
        }
        return;
    }
    
    if (type === 'movie') {
        goToMovies();
    } else if (type === 'train') {
        goToTrains();
    } else if (type === 'flight') {
        goToFlights();
    } else if (type === 'bus') {
        goToBus();
    }
}

function selectItem(itemId, type) {
    if (!Auth.isLoggedIn()) {
        if (confirm('Please login to continue')) {
            goToLogin();
        }
        return;
    }
    
    // Store selected item
    const API_MAP = {
        'movie': 'MoviesAPI',
        'train': 'TrainsAPI',
        'flight': 'FlightsAPI',
        'bus': 'BusAPI'
    };
    
    goToSeatSelection();
}

function proceedToCheckout() {
    goToCheckout();
}

function goBack() {
    window.history.back();
}

function completeBooking() {
    // Generate booking confirmation
    const bookingId = 'BK' + Date.now();
    Storage.set('lastBooking', {
        id: bookingId,
        date: new Date().toISOString(),
        amount: Math.random() * 1000 + 200
    });
    
    goToConfirmation();
}

function applyPromo() {
    const promoCode = document.getElementById('promoCode')?.value;
    if (promoCode) {
        alert('Promo code "' + promoCode + '" applied successfully! 10% discount added.');
    } else {
        alert('Please enter a promo code');
    }
}

// ============ TAB SWITCHING ============

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    
    // Remove active class from all links
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected tab
    const tab = document.getElementById(tabName + '-tab');
    if (tab) {
        tab.classList.remove('hidden');
    }
    
    // Add active class to current link
    event.target.classList.add('active');
}

// ============ FORM HANDLERS ============

function submitLoginForm(event) {
    if (event) event.preventDefault();
    
    const email = document.getElementById('email')?.value;
    const password = document.getElementById('password')?.value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    const result = Auth.login(email, password);
    
    if (result.success) {
        alert('Login successful!');
        goToDashboard();
    } else {
        alert('Error: ' + result.message);
    }
}

function submitRegisterForm(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    const result = Auth.register(name, email, password, phone);
    
    if (result.success) {
        alert('Registration successful! Please login.');
        goToLogin();
    } else {
        alert('Error: ' + result.message);
    }
}

// ============ UTILITY FUNCTIONS ============

function formatPrice(price) {
    return '₹' + price.toLocaleString('en-IN');
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN');
}

function getImageUrl(category, id) {
    if (typeof getImage === 'function') {
        return getImage(category, id);
    }
    return getDefaultImage();
}

// Initialize router on page load
document.addEventListener('DOMContentLoaded', function() {
    // Router is now available globally
    console.log('Navigation Router initialized');
});
