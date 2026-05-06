// ============= COMPLETE NAVBAR HANDLER =============

function initializeNavbar() {
    const navbarMenu = document.querySelector('.navbar__menu');
    
    if (navbarMenu) {
        navbarMenu.innerHTML = `
            <li><a href="/" class="nav-link">Home</a></li>
            <li><a href="/pages/movies.html" class="nav-link">Movies</a></li>
            <li><a href="/pages/trains.html" class="nav-link">Trains</a></li>
            <li><a href="/pages/flights.html" class="nav-link">Flights</a></li>
            <li><a href="/pages/bus.html" class="nav-link">Buses</a></li>
            <li><a href="/pages/events.html" class="nav-link">Events</a></li>
            <li><button class="btn-login" onclick="handleLoginClick()">Login/Register</button></li>
        `;

        // Update UI after creating navbar
        if (typeof userAuth !== 'undefined') {
            userAuth.updateUI();
        }
    }
}

function handleLoginClick() {
    if (typeof userAuth !== 'undefined' && userAuth.isLoggedIn()) {
        // Show profile menu
        const user = userAuth.getCurrentUser();
        const menu = `
            <div style="
                position: fixed;
                top: 60px;
                right: 20px;
                background: white;
                border: 2px solid var(--primary);
                border-radius: 8px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                min-width: 250px;
                overflow: hidden;
            " id="profileMenu">
                <div style="background: var(--primary); color: white; padding: 15px;">
                    <h3 style="margin: 0;">👤 ${user.fullName}</h3>
                    <small style="opacity: 0.9;">${user.email}</small>
                </div>
                <div style="padding: 10px;">
                    <div style="padding: 10px 15px; border-bottom: 1px solid #eee;">
                        💰 Wallet: ₹${user.wallet}
                    </div>
                    <a href="/pages/user/dashboard.html" style="display: block; padding: 10px 15px; color: var(--primary); text-decoration: none; border-bottom: 1px solid #eee;">📊 Dashboard</a>
                    <a href="/pages/user/profile.html" style="display: block; padding: 10px 15px; color: var(--primary); text-decoration: none; border-bottom: 1px solid #eee;">⚙️ Profile</a>
                    <button onclick="logoutUser()" style="width: calc(100% - 30px); margin: 10px 15px; padding: 10px; background: #ff4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">🚪 Logout</button>
                </div>
            </div>
        `;

        // Remove existing menu
        const existing = document.getElementById('profileMenu');
        if (existing) existing.remove();

        // Add new menu
        document.body.insertAdjacentHTML('beforeend', menu);

        // Close menu when clicking outside
        document.addEventListener('click', function closeMenu(e) {
            const menu = document.getElementById('profileMenu');
            if (menu && !menu.contains(e.target) && e.target.className !== 'btn-login') {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    } else {
        // Redirect to login
        window.location.href = '/pages/login.html';
    }
}

function handleUserClick() {
    handleLoginClick();
}

function logoutUser() {
    if (typeof userAuth !== 'undefined') {
        userAuth.logout();
        location.reload();
    }
}

function goToHome() {
    window.location.href = '/index.html';
}

// Initialize navbar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavbar);
} else {
    initializeNavbar();
}

// Also initialize if user-auth loads later
if (typeof userAuth !== 'undefined') {
    userAuth.updateUI();
}
