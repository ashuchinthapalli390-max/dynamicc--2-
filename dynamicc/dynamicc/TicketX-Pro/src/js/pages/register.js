// Register Page Script

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;

    // Clear errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    // Validation
    let isValid = true;

    if (!name || name.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
        isValid = false;
    }

    if (!email || !email.includes('@')) {
        document.getElementById('emailError').textContent = 'Valid email is required';
        isValid = false;
    }

    if (!phone || phone.length < 10) {
        document.getElementById('phoneError').textContent = 'Valid phone number is required';
        isValid = false;
    }

    if (!password || password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (!terms) {
        showNotification('You must accept Terms & Conditions', 'warning', 3000);
        isValid = false;
    }

    if (!isValid) return;

    // Attempt registration
    const result = Auth.register(name, email, password, phone);

    if (result.success) {
        showNotification('✅ Registration successful! Redirecting to login...', 'success', 2000);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } else {
        showNotification('❌ ' + result.message, 'error', 3000);
    }
});
