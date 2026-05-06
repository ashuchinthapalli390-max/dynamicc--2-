// Profile/Settings Page Script

requireLogin();

let originalData = {};

function loadProfile() {
    const user = Auth.getCurrentUser();
    if (!user) {
        window.location.href = '../../pages/login.html';
        return;
    }

    document.getElementById('fullName').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('bio').value = user.bio || '';

    // Save original data for reset
    originalData = {
        name: user.name,
        phone: user.phone,
        bio: user.bio || ''
    };

    // Update avatar
    updateAvatar(user.name);
}

function updateAvatar(name) {
    const initial = name ? name.charAt(0).toUpperCase() : '👤';
    const avatar = document.getElementById('profileAvatar');
    avatar.textContent = initial;
}

// Profile Form Submission
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;

    if (!fullName) {
        alert('Full name is required');
        return;
    }

    const result = Auth.updateProfile(fullName, phone);
    
    if (result.success) {
        alert('Profile updated successfully!');
        updateAvatar(fullName);
        originalData.name = fullName;
        originalData.phone = phone;
    } else {
        alert('Error: ' + result.message);
    }
});

// Password Form Submission
document.getElementById('passwordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('All password fields are required');
        return;
    }

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        return;
    }

    if (newPassword.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    const user = Auth.getCurrentUser();
    const users = Storage.get('tx_users') || [];
    const fullUser = users.find(u => u.id === user.id);

    if (!fullUser || fullUser.password !== currentPassword) {
        alert('Current password is incorrect');
        return;
    }

    // Update password
    fullUser.password = newPassword;
    Storage.set('tx_users', users);

    alert('Password updated successfully!');
    document.getElementById('passwordForm').reset();
});

// Save Preferences
function savePreferences() {
    const preferences = {
        emailNotifications: document.getElementById('emailNotifications').checked,
        smsNotifications: document.getElementById('smsNotifications').checked,
        newsletter: document.getElementById('newsletter').checked,
        deals: document.getElementById('deals').checked
    };

    Storage.set('user_preferences', preferences);
    alert('Preferences saved successfully!');
}

// Load Preferences
function loadPreferences() {
    const preferences = Storage.get('user_preferences') || {};
    
    if (preferences.emailNotifications !== undefined) {
        document.getElementById('emailNotifications').checked = preferences.emailNotifications;
    }
    if (preferences.smsNotifications !== undefined) {
        document.getElementById('smsNotifications').checked = preferences.smsNotifications;
    }
    if (preferences.newsletter !== undefined) {
        document.getElementById('newsletter').checked = preferences.newsletter;
    }
    if (preferences.deals !== undefined) {
        document.getElementById('deals').checked = preferences.deals;
    }
}

// Reset Form
function resetForm() {
    const user = Auth.getCurrentUser();
    document.getElementById('fullName').value = user.name || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('bio').value = user.bio || '';
}

// Delete Account
function deleteAccount() {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        return;
    }

    if (!confirm('Please confirm you want to permanently delete your account and all associated data.')) {
        return;
    }

    const user = Auth.getCurrentUser();
    const users = Storage.get('tx_users') || [];
    const filteredUsers = users.filter(u => u.id !== user.id);
    
    Storage.set('tx_users', filteredUsers);
    Auth.logout();
}

// Navigation
function goToHome() {
    window.location.href = '../../index.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        Auth.logout();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
    loadPreferences();
});
