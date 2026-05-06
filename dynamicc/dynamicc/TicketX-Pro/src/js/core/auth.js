// ============ AUTHENTICATION MANAGER ============

// Initialize default users (admin and demo)
function initializeDefaultUsers() {
    const users = Storage.get(DB.users) || [];
    
    // Check if default users already exist
    const hasAdmin = users.some(u => u.email === 'admin@ticketx.com');
    const hasDemo = users.some(u => u.email === 'demo@test.com');
    
    if (!hasAdmin) {
        users.push({
            id: 'ADMIN_001',
            name: 'Admin User',
            email: 'admin@ticketx.com',
            password: 'admin@123', // In production, hash this!
            phone: '9876543200',
            role: 'admin',
            createdAt: new Date().toISOString()
        });
    }
    
    if (!hasDemo) {
        users.push({
            id: 'USER_001',
            name: 'Demo User',
            email: 'demo@test.com',
            password: '123456', // In production, hash this!
            phone: '9876543210',
            role: 'user',
            createdAt: new Date().toISOString()
        });
    }
    
    if (!hasAdmin || !hasDemo) {
        Storage.set(DB.users, users);
    }
}

class Auth {
    static register(name, email, password, phone) {
        const users = Storage.get(DB.users) || [];
        
        // Check if email already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: "Email already registered" };
        }

        const newUser = {
            id: `USER_${Date.now()}`,
            name,
            email,
            password, // In production, hash this!
            phone,
            role: "user",
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        Storage.set(DB.users, users);

        return { success: true, message: "Registration successful", user: newUser };
    }

    static login(email, password) {
        const users = Storage.get(DB.users) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return { success: false, message: "Invalid email or password" };
        }

        // Remove password before storing session
        const sessionUser = { ...user };
        delete sessionUser.password;

        Storage.set(DB.currentUser, sessionUser);
        return { success: true, message: "Login successful", user: sessionUser };
    }

    static logout() {
        Storage.remove(DB.currentUser);
        window.location.href = "/TicketX-Pro/index.html";
    }

    static getCurrentUser() {
        return Storage.get(DB.currentUser);
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    static isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === "admin";
    }

    static updateProfile(name, phone) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: "Not logged in" };

        const users = Storage.get(DB.users) || [];
        const userIndex = users.findIndex(u => u.id === user.id);

        if (userIndex === -1) return { success: false, message: "User not found" };

        users[userIndex].name = name;
        users[userIndex].phone = phone;

        Storage.set(DB.users, users);

        // Update session
        user.name = name;
        user.phone = phone;
        Storage.set(DB.currentUser, user);

        return { success: true, message: "Profile updated", user };
    }
}

// Auth Guards
function requireLogin() {
    if (!Auth.isLoggedIn()) {
        window.location.href = "/TicketX-Pro/pages/login.html";
    }
}

function requireAdmin() {
    if (!Auth.isAdmin()) {
        window.location.href = "/TicketX-Pro/index.html";
    }
}

// Update navbar with user info
function updateNavbar() {
    const user = Auth.getCurrentUser();
    const loginBtn = document.querySelector(".btn-login");
    
    if (user && loginBtn) {
        loginBtn.textContent = user.name;
        loginBtn.onclick = () => showUserMenu(user);
    }
}

function showUserMenu(user) {
    // This can be expanded with a dropdown menu
    const action = confirm(`Welcome ${user.name}!\n\nView Profile (OK) or Logout (Cancel)?`);
    if (action) {
        window.location.href = "/TicketX-Pro/pages/user/dashboard.html";
    } else {
        Auth.logout();
    }
}

document.addEventListener("DOMContentLoaded", function() {
    initializeDefaultUsers();
    updateNavbar();
});
