// Dashboard Page Script
requireLogin();

const currentUser = Auth.getCurrentUser();

function initializeDashboard() {
    if (!currentUser) return;

    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = currentUser.name || 'User';

    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profilePhone = document.getElementById('profilePhone');
    const profileJoined = document.getElementById('profileJoined');

    if (profileName) profileName.value = currentUser.name || '';
    if (profileEmail) profileEmail.value = currentUser.email || '';
    if (profilePhone) profilePhone.value = currentUser.phone || '';
    if (profileJoined) profileJoined.value = currentUser.createdAt ? formatDate(currentUser.createdAt) : 'N/A';

    loadDashboardStats();
    loadBookings();
    loadTickets();
    loadLocations();
}

function getUserBookings() {
    const bookings = Storage.get(DB.bookings) || [];
    return bookings.filter(b => b.userId === currentUser.id);
}

function loadDashboardStats() {
    const userBookings = getUserBookings();

    const totalBookingsEl = document.getElementById('totalBookings');
    const upcomingBookingsEl = document.getElementById('upcomingBookings');
    const totalSpentEl = document.getElementById('totalSpent');

    if (totalBookingsEl) totalBookingsEl.textContent = userBookings.length;

    const upcoming = userBookings.filter(b => b.status === 'confirmed').length;
    if (upcomingBookingsEl) upcomingBookingsEl.textContent = upcoming;

    const totalSpent = userBookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
    if (totalSpentEl) totalSpentEl.textContent = formatPrice(totalSpent);

    const availableMoviesEl = document.getElementById('availableMovies');
    if (availableMoviesEl) {
        availableMoviesEl.textContent = typeof MoviesAPI !== 'undefined' ? MoviesAPI.getAllMovies().length : 0;
    }

    const locations = Storage.get(DB.userLocations) || [];
    const savedLocationsCountEl = document.getElementById('savedLocationsCount');
    if (savedLocationsCountEl) savedLocationsCountEl.textContent = locations.length;

    const upcomingBookingsBody = document.getElementById('upcomingBookingsBody');
    if (!upcomingBookingsBody) return;

    const upcomingList = userBookings.filter(b => b.status === 'confirmed').slice(0, 5);
    if (upcomingList.length === 0) {
        upcomingBookingsBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No upcoming bookings</td></tr>';
        return;
    }

    upcomingBookingsBody.innerHTML = upcomingList.map(b => `
        <tr>
            <td>${b.id}</td>
            <td>${b.itemName}</td>
            <td>${formatDate(b.date)}</td>
            <td><span class="status-badge confirmed">Confirmed</span></td>
            <td>${formatPrice(b.totalPrice || 0)}</td>
        </tr>
    `).join('');
}

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

function loadBookings() {
    renderBookings(getUserBookings());
}

function loadTickets() {
    const ticketsGrid = document.getElementById('ticketsGrid');
    if (!ticketsGrid) return;

    const confirmedBookings = getUserBookings().filter(b => b.status === 'confirmed');
    if (confirmedBookings.length === 0) {
        ticketsGrid.innerHTML = '<p>No active tickets</p>';
        return;
    }

    ticketsGrid.innerHTML = confirmedBookings.map(b => `
        <div class="card">
            <div class="card-header">
                <h4>${b.itemName}</h4>
                <p style="font-size: 12px; color: var(--light-dark);">${b.id}</p>
            </div>
            <div class="card-body">
                <p><strong>Date:</strong> ${formatDate(b.date)}</p>
                <p><strong>Amount:</strong> ${formatPrice(b.totalPrice || 0)}</p>
                <p><strong>Status:</strong> <span style="color: var(--success);">Confirmed</span></p>
            </div>
        </div>
    `).join('');
}

function filterBookings() {
    const category = document.getElementById('categoryFilter')?.value || '';
    let rows = getUserBookings();
    if (category) rows = rows.filter(b => b.category === category);
    renderBookings(rows);
}

function switchTab(tabName, clickedEl) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.sidebar-menu a').forEach(link => link.classList.remove('active'));

    const tabElement = document.getElementById(`${tabName}-tab`);
    if (tabElement) tabElement.classList.remove('hidden');

    if (clickedEl) clickedEl.classList.add('active');
}

function viewBooking(bookingId) {
    alert(`Booking Details: ${bookingId}`);
}

function cancelBooking(bookingId) {
    const ok = confirm('Are you sure you want to cancel this booking?');
    if (!ok) return;

    const bookings = Storage.get(DB.bookings) || [];
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
        bookings[idx].status = 'cancelled';
        Storage.set(DB.bookings, bookings);
        showNotification('Booking cancelled successfully', 'success');
        loadDashboardStats();
        loadBookings();
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) Auth.logout();
}

function handleLogout() {
    if (confirm('You will be logged out. Continue?')) Auth.logout();
}

function handleLogoutAllDevices() {
    if (confirm('Logout from all devices?')) {
        Auth.logout();
        setTimeout(() => goToHome(), 600);
    }
}

function loadLocations() {
    const locations = Storage.get(DB.userLocations) || [{ city: 'Hyderabad', notes: 'Primary Location' }];

    const savedLocationsDiv = document.getElementById('savedLocations');
    if (savedLocationsDiv) {
        savedLocationsDiv.innerHTML = locations.map(loc => `
            <div style="background: var(--bg-tertiary); padding: 15px; border-radius: 5px; border-left: 4px solid var(--primary); display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${loc.city}</strong>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 5px 0;">${loc.notes || 'Saved location'}</p>
                </div>
                <button onclick="removeLocation('${loc.city}')" class="btn btn-danger btn-sm">Remove</button>
            </div>
        `).join('');
    }

    const locationCountEl = document.getElementById('savedLocationsCount');
    if (locationCountEl) locationCountEl.textContent = locations.length;
}

function removeLocation(city) {
    if (!confirm(`Remove "${city}" from your locations?`)) return;
    let locations = Storage.get(DB.userLocations) || [];
    locations = locations.filter(l => l.city !== city);
    Storage.set(DB.userLocations, locations);
    showNotification(`Location "${city}" removed`, 'success');
    loadLocations();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('profileName').value;
            const phone = document.getElementById('profilePhone').value;
            const result = Auth.updateProfile(name, phone);
            if (result.success) showNotification('Profile updated successfully', 'success');
            else showNotification(result.message, 'error');
        });
    }

    const locationForm = document.getElementById('locationForm');
    if (locationForm) {
        locationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const city = document.getElementById('newCity').value;
            const notes = document.getElementById('locationNotes').value;
            const locations = Storage.get(DB.userLocations) || [];
            if (!locations.find(l => l.city === city)) {
                locations.push({ city, notes, added: new Date().toISOString() });
                Storage.set(DB.userLocations, locations);
                showNotification(`Location "${city}" added successfully`, 'success');
                locationForm.reset();
                loadDashboardStats();
                loadLocations();
            } else {
                showNotification(`Location "${city}" already exists`, 'warning');
            }
        });
    }

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }
            if (newPassword.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }

            const users = Storage.get(DB.users) || [];
            const userIdx = users.findIndex(u => u.id === currentUser.id);
            if (userIdx === -1 || users[userIdx].password !== currentPassword) {
                showNotification('Current password is incorrect', 'error');
                return;
            }

            users[userIdx].password = newPassword;
            Storage.set(DB.users, users);
            showNotification('Password changed successfully', 'success');
            changePasswordForm.reset();
        });
    }
});
