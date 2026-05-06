// ============ STORAGE MANAGER ============

const DB = {
    users: "tx_users",
    currentUser: "tx_session",
    bookings: "tx_bookings",
    halls: "tx_halls",
    busData: "tx_bus",
    cart: "tx_cart",
    userLocations: "tx_user_locations"
};

class Storage {
    static get(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error("Storage get error:", e);
            return null;
        }
    }

    static set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Storage set error:", e);
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Storage remove error:", e);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (e) {
            console.error("Storage clear error:", e);
        }
    }

    static getAll() {
        const data = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("tx_")) {
                data[key] = this.get(key);
            }
        }
        return data;
    }
}

// Initialize mock data if not exists
function initializeMockData() {
    if (!Storage.get(DB.users)) {
        Storage.set(DB.users, [
            {
                id: "USER_1",
                name: "John Doe",
                email: "john@example.com",
                password: "123456", // In production, use hashing!
                phone: "9876543210",
                role: "user",
                createdAt: new Date().toISOString()
            },
            {
                id: "ADMIN_1",
                name: "Admin User",
                email: "admin@example.com",
                password: "admin123",
                phone: "9876543211",
                role: "admin",
                createdAt: new Date().toISOString()
            }
        ]);
    }

    if (!Storage.get(DB.bookings)) {
        Storage.set(DB.bookings, []);
    }

    if (!Storage.get(DB.halls)) {
        Storage.set(DB.halls, []);
    }

    if (!Storage.get(DB.cart)) {
        Storage.set(DB.cart, null);
    }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", initializeMockData);
