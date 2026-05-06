import os

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

backend_script = """
    <!-- EXPRESS BACKEND INTEGRATION -->
    <script>
        const API_BASE = 'http://localhost:3000/api';

        // Override loadData to fetch from API
        async function fetchInitialData() {
            try {
                const endpoints = ['movies', 'trains', 'flights', 'buses', 'events', 'hotels'];
                const promises = endpoints.map(ep => fetch(`${API_BASE}/${ep}`).then(res => res.json()));
                const results = await Promise.all(promises);
                
                endpoints.forEach((ep, i) => {
                    app.data[ep] = results[i];
                });
                console.log('✅ Data loaded from Node.js Express Backend');
            } catch (err) {
                console.warn('⚠️ Node.js server unreachable. Using hardcoded fallback data.');
            }
        }

        // Initialize with API data
        window.addEventListener('DOMContentLoaded', async () => {
            await fetchInitialData();
            
            // Re-render the initial views with the loaded data
            if (!document.getElementById('homeSection').classList.contains('hidden')) {
                renderHome();
            }
        });

        // Override confirmBooking to use API
        async function confirmBooking() {
            if (!app.store.currentUser) {
                openModal('authModal');
                showNotification('Please login to continue', 'info');
                return;
            }

            const confirmBtn = document.querySelector('#bookingModal .btn-primary:last-child');
            if(!confirmBtn) return;
            const originalText = confirmBtn.innerHTML;
            confirmBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Confirming...';

            try {
                const bookingData = {
                    category: app.store.currentBooking.category,
                    itemId: app.store.currentBooking.id,
                    seats: app.store.selectedSeats,
                    total: app.store.currentBooking.price * app.store.selectedSeats.length,
                    date: new Date().toLocaleDateString(),
                    items: app.store.selectedSeats.map(s => ({
                        name: `Seat ${s}`,
                        emoji: app.store.currentBooking.emoji
                    }))
                };

                // POST to backend
                const res = await fetch(`${API_BASE}/bookings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bookingData)
                });
                
                if (!res.ok) throw new Error('Backend error');
                
                const savedBooking = await res.json();
                
                // Add QR code locally for display
                savedBooking.qrCode = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKETX-' + savedBooking.id;
                savedBooking.status = 'Confirmed';

                app.store.bookings.push(savedBooking);
                saveStore();
                
                closeModal('bookingModal');
                showNotification('Booking Confirmed via Express API!', 'success');
                switchView('dashboard');
            } catch (err) {
                console.error('Booking failed via API, falling back to local.', err);
                
                // Fallback to local
                const booking = {
                    id: Date.now().toString().slice(-6),
                    category: app.store.currentBooking.category,
                    items: app.store.selectedSeats.map(s => ({
                        name: `Seat ${s}`,
                        emoji: app.store.currentBooking.emoji
                    })),
                    total: app.store.currentBooking.price * app.store.selectedSeats.length,
                    date: new Date().toLocaleDateString(),
                    status: 'Confirmed',
                    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TICKETX-' + Date.now()
                };
                app.store.bookings.push(booking);
                saveStore();
                closeModal('bookingModal');
                showNotification('Booking Confirmed (Local Fallback)', 'success');
                switchView('dashboard');
            } finally {
                confirmBtn.innerHTML = originalText;
            }
        }
        
        // Override Login
        async function handleLogin(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                if(!res.ok) throw new Error('Invalid credentials');
                const data = await res.json();
                
                app.store.currentUser = data.user;
                saveStore();
                closeModal('authModal');
                updateAuthButton();
                showNotification('Welcome back!', 'success');
                if(!document.getElementById('profileSection').classList.contains('hidden')) {
                    renderProfile();
                }
            } catch(err) {
                // Fallback to local
                const user = app.store.users.find(u => u.email === email && u.password === password);
                if (user) {
                    app.store.currentUser = user;
                    saveStore();
                    closeModal('authModal');
                    updateAuthButton();
                    showNotification('Welcome back (Local)!', 'success');
                } else {
                    showNotification('Invalid email or password', 'error');
                }
            }
        }
    </script>
"""

if 'EXPRESS BACKEND INTEGRATION' not in content:
    content = content.replace('</body>', backend_script + '\n</body>')
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Frontend updated with backend integration')
else:
    print('Frontend already updated')
