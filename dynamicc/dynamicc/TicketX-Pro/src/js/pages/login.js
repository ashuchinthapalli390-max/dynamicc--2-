// Login Page Script

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // Clear errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Validation
    if (!email) {
        document.getElementById('emailError').textContent = 'Email is required';
        return;
    }

    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required';
        return;
    }

    // Attempt login
    const result = Auth.login(email, password);

    if (result.success) {
        showNotification('✅ Login successful! Redirecting...', 'success', 2000);
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1000);
    } else {
        showNotification('❌ ' + result.message, 'error', 3000);
    }
});

// Pre-fill demo credentials on load
window.addEventListener('load', function() {
    // Uncomment to auto-fill demo credentials for testing
    // document.getElementById('email').value = 'john@example.com';
    // document.getElementById('password').value = '123456';
});
