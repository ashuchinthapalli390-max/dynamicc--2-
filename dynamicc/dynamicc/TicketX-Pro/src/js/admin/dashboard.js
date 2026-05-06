// Admin Dashboard Script

// Verify admin access
function checkAdminAccess() {
    const user = Auth.getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Unauthorized access! Admin only.');
        window.location.href = '../../index.html';
    }
}

// Tab switching
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
    
    // Add active class to clicked link
    event.target.classList.add('active');
}

// Load dashboard stats
function loadDashboardStats() {
    // Mock data - in production, fetch from API
    const mockBookings = [
        { id: 'BK001', user: 'Rajesh Kumar', category: 'Movie', amount: 500, status: 'confirmed', date: '2026-05-06' },
        { id: 'BK002', user: 'Priya Singh', category: 'Train', amount: 5000, status: 'completed', date: '2026-05-05' },
        { id: 'BK003', user: 'Amit Patel', category: 'Flight', amount: 12000, status: 'pending', date: '2026-05-04' },
        { id: 'BK004', user: 'Neha Sharma', category: 'Bus', amount: 2500, status: 'confirmed', date: '2026-05-03' },
        { id: 'BK005', user: 'Vikram Singh', category: 'Movie', amount: 450, status: 'completed', date: '2026-05-02' },
    ];

    const mockUsers = [
        { id: 'U001', name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543210', bookings: 5, joined: '2026-03-15', status: 'active' },
        { id: 'U002', name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', bookings: 12, joined: '2026-02-20', status: 'active' },
        { id: 'U003', name: 'Amit Patel', email: 'amit@example.com', phone: '9876543212', bookings: 3, joined: '2026-04-10', status: 'active' },
        { id: 'U004', name: 'Neha Sharma', email: 'neha@example.com', phone: '9876543213', bookings: 8, joined: '2026-01-05', status: 'inactive' },
    ];

    // Calculate stats
    const totalUsers = 4250;
    const totalBookings = 12450;
    const totalRevenue = '₹1,24,50,000';
    const pendingBookings = 245;

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalBookings').textContent = totalBookings;
    document.getElementById('totalRevenue').textContent = totalRevenue;
    document.getElementById('pendingBookings').textContent = pendingBookings;

    // Load recent bookings
    const recentBookingsBody = document.getElementById('recentBookingsBody');
    recentBookingsBody.innerHTML = mockBookings.map(booking => `
        <tr>
            <td><strong>${booking.id}</strong></td>
            <td>${booking.user}</td>
            <td>${booking.category}</td>
            <td>₹${booking.amount}</td>
            <td><span class="badge badge-${getStatusClass(booking.status)}">${booking.status}</span></td>
            <td>${booking.date}</td>
            <td>
                <button class="btn btn-primary" style="padding: 5px 10px; font-size: 12px;" onclick="viewBooking('${booking.id}')">View</button>
            </td>
        </tr>
    `).join('');

    // Load bookings table
    const bookingsTableBody = document.getElementById('bookingsTableBody');
    bookingsTableBody.innerHTML = mockBookings.map(booking => `
        <tr>
            <td><strong>${booking.id}</strong></td>
            <td>${booking.user}</td>
            <td>-</td>
            <td>${booking.category}</td>
            <td>₹${booking.amount}</td>
            <td><span class="badge badge-${getStatusClass(booking.status)}">${booking.status}</span></td>
            <td>${booking.date}</td>
            <td>
                <button class="btn btn-primary" style="padding: 5px 10px; font-size: 12px;" onclick="editBooking('${booking.id}')">Edit</button>
                <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="deleteBooking('${booking.id}')">Delete</button>
            </td>
        </tr>
    `).join('');

    // Load users table
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = mockUsers.map(user => `
        <tr>
            <td><strong>${user.id}</strong></td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.bookings}</td>
            <td>${user.joined}</td>
            <td><span class="badge badge-${user.status === 'active' ? 'success' : 'warning'}">${user.status}</span></td>
            <td>
                <button class="btn btn-primary" style="padding: 5px 10px; font-size: 12px;" onclick="editUser('${user.id}')">Edit</button>
                <button class="btn btn-outline" style="padding: 5px 10px; font-size: 12px;" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function getStatusClass(status) {
    switch(status) {
        case 'confirmed':
        case 'active':
            return 'success';
        case 'pending':
            return 'warning';
        case 'cancelled':
        case 'inactive':
            return 'danger';
        default:
            return 'success';
    }
}

// Booking Actions
function viewBooking(bookingId) {
    alert(`Viewing booking: ${bookingId}`);
    // In production, open a modal or navigate to detail page
}

function editBooking(bookingId) {
    alert(`Editing booking: ${bookingId}`);
}

function deleteBooking(bookingId) {
    if (confirm(`Are you sure you want to delete booking ${bookingId}?`)) {
        alert(`Booking ${bookingId} deleted`);
        loadDashboardStats();
    }
}

// User Actions
function editUser(userId) {
    alert(`Editing user: ${userId}`);
}

function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        alert(`User ${userId} deleted`);
        loadDashboardStats();
    }
}

function addNewUser() {
    alert('Add new user functionality - Opens a form modal');
}

// Event Management
function addNewEvent() {
    alert('Add new event functionality');
}

function manageMovies() {
    window.location.href = 'manage-events.html?category=movies';
}

function manageTrains() {
    window.location.href = 'manage-events.html?category=trains';
}

function manageFlights() {
    window.location.href = 'manage-events.html?category=flights';
}

function manageBus() {
    window.location.href = 'manage-events.html?category=bus';
}

// Reports
function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    alert(`Generating report from ${startDate} to ${endDate}`);
    // In production, fetch report data from API
}

// Admin Logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        Auth.logout();
        window.location.href = '../../index.html';
    }
}

// Go to home
function goToHome() {
    window.location.href = '../../index.html';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    loadDashboardStats();
});
