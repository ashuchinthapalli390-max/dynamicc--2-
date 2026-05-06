
        // ============ GLOBAL STATE ============
        const app = {
            store: {
                users: [
                    { email: 'demo@ticketx.com', password: 'Demo123!', name: 'Demo User', phone: '9876543210', wallet: 10000 },
                    { email: 'test@ticketx.com', password: 'Test123!', name: 'Test User', phone: '9876543211', wallet: 10000 }
                ],
                currentUser: null,
                cart: [],
                bookings: [],
                currentBooking: null,
                selectedSeats: []
            },

            
            // Demo Data
            data: {
                movies: [
                    { id: 1, name: 'Leo', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80', languages: ['Tamil', 'Telugu', 'Hindi'], formats: ['2D', 'IMAX'], price: 250, category: 'movies', rating: '⭐⭐⭐⭐⭐', seats: 48 },
                    { id: 2, name: 'Salaar', image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80', languages: ['Telugu', 'Hindi'], formats: ['2D'], price: 300, category: 'movies', rating: '⭐⭐⭐⭐⭐', seats: 48 },
                    { id: 3, name: 'Fighter', image: 'https://images.unsplash.com/photo-1605786419794-2e90c8f5e714?w=400&q=80', languages: ['Hindi'], formats: ['2D', '3D'], price: 250, category: 'movies', rating: '⭐⭐⭐⭐', seats: 48 },
                    { id: 4, name: 'Dune: Part Two', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80', languages: ['English', 'Hindi'], formats: ['IMAX', '4DX'], price: 350, category: 'movies', rating: '⭐⭐⭐⭐⭐', seats: 48 }
                ],
                trains: [
                    { id: 5, name: 'Vande Bharat Exp', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80', from: 'Delhi', to: 'Varanasi', price: 1500, category: 'trains', rating: '⭐⭐⭐⭐⭐', seats: 72 },
                    { id: 6, name: 'Rajdhani Express', image: 'https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?w=400&q=80', from: 'Mumbai', to: 'Delhi', price: 2800, category: 'trains', rating: '⭐⭐⭐⭐⭐', seats: 72 },
                    { id: 7, name: 'Shatabdi Express', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=400&q=80', from: 'Chennai', to: 'Bangalore', price: 1100, category: 'trains', rating: '⭐⭐⭐⭐', seats: 96 }
                ],
                flights: [
                    { id: 8, name: 'Air India AI101', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', location: 'Non-stop', price: 5000, category: 'flights', rating: '⭐⭐⭐⭐⭐', seats: 180 },
                    { id: 9, name: 'IndiGo 6E202', image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=400&q=80', location: '1 Stop', price: 3500, category: 'flights', rating: '⭐⭐⭐⭐', seats: 180 },
                    { id: 10, name: 'Vistara UK301', image: 'https://images.unsplash.com/photo-1569154941061-e231b4732ef1?w=400&q=80', location: 'Non-stop', price: 4500, category: 'flights', rating: '⭐⭐⭐⭐⭐', seats: 180 }
                ],
                buses: [
                    { id: 11, name: 'IntrCity SmartBus', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80', formats: ['AC Sleeper'], price: 1200, category: 'buses', rating: '⭐⭐⭐⭐', seats: 42 },
                    { id: 12, name: 'Orange Travels', image: 'https://images.unsplash.com/photo-1570125909232-eb263c85f48c?w=400&q=80', formats: ['Non-AC Seater'], price: 800, category: 'buses', rating: '⭐⭐⭐', seats: 42 },
                    { id: 13, name: 'VRL Travels', image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&q=80', formats: ['Volvo Multi-Axle'], price: 1500, category: 'buses', rating: '⭐⭐⭐⭐⭐', seats: 32 }
                ],
                events: [
                    { id: 14, name: 'Sunburn Arena', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80', location: 'Stadium', price: 2500, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 500 },
                    { id: 15, name: 'IPL Final 2026', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80', location: 'Cricket Ground', price: 3000, category: 'events', rating: '⭐⭐⭐⭐', seats: 1000 },
                    { id: 16, name: 'Tech Summit', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80', location: 'Convention Center', price: 1500, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 800 }
                ],
                hotels: [
                    { 
                        id: 17, name: 'Taj Palace', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', location: 'Marine Drive, Mumbai', 
                        category: 'hotels', rating: '⭐⭐⭐⭐⭐ 4.9', 
                        amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant'],
                        description: 'Experience luxury at its finest with breathtaking ocean views and world-class hospitality.',
                        rooms: [
                            { type: 'Standard Room', price: 15000, capacity: '2 Adults', features: '1 King Bed, City View', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80' },
                            { type: 'Deluxe Sea View', price: 22000, capacity: '2 Adults, 1 Child', features: '1 King Bed, Ocean View, Balcony', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80' },
                            { type: 'Presidential Suite', price: 55000, capacity: '4 Adults', features: '2 Bedrooms, Living Area, Private Pool', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' }
                        ]
                    },
                    { 
                        id: 18, name: 'Marriott Resort', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80', location: 'Baga Beach, Goa', 
                        category: 'hotels', rating: '⭐⭐⭐⭐⭐ 4.7', 
                        amenities: ['Free WiFi', 'Pool', 'Beachfront', 'Bar'],
                        description: 'A vibrant beachfront resort perfect for a relaxing getaway or exciting water sports.',
                        rooms: [
                            { type: 'Standard Room', price: 12000, capacity: '2 Adults', features: '1 Queen Bed, Garden View', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&q=80' },
                            { type: 'Suite', price: 18000, capacity: '3 Adults', features: '1 King Bed, Sofa Bed, Ocean View', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' }
                        ]
                    },
                    { 
                        id: 19, name: 'ITC Kohinoor', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d1398c?w=600&q=80', location: 'Hitech City, Hyderabad', 
                        category: 'hotels', rating: '⭐⭐⭐⭐⭐ 4.8', 
                        amenities: ['Free WiFi', 'Gym', 'Business Center', 'Restaurant'],
                        description: 'Premium business hotel offering ultimate comfort in the heart of the IT hub.',
                        rooms: [
                            { type: 'Executive Room', price: 9500, capacity: '2 Adults', features: '1 King Bed, Work Desk', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80' },
                            { type: 'Club Room', price: 14000, capacity: '2 Adults', features: '1 King Bed, Club Lounge Access', image: 'https://images.unsplash.com/photo-1598928506311-c55dd121a977?w=400&q=80' }
                        ]
                    }
                ]
            }
        };

        // ============ STORAGE FUNCTIONS ============
        function loadStore() {
            try {
                const saved = localStorage.getItem('ticketxStore');
                if (saved) {
                    const data = JSON.parse(saved);
                    app.store.currentUser = data.currentUser;
                    app.store.bookings = data.bookings || [];
                    app.store.cart = data.cart || [];
                }
            } catch(e) {
                console.error('Error loading store:', e);
            }
        }

        function saveStore() {
            try {
                localStorage.setItem('ticketxStore', JSON.stringify({
                    currentUser: app.store.currentUser,
                    bookings: app.store.bookings,
                    cart: app.store.cart
                }));
            } catch(e) {
                console.error('Error saving store:', e);
            }
        }

        // ============ UI FUNCTIONS ============
        function goHome() {
            document.getElementById('homeSection').classList.remove('hidden');
            document.getElementById('browseSection').classList.add('hidden');
            document.getElementById('dashboardSection').classList.add('hidden');
            document.getElementById('profileSection').classList.add('hidden');
            loadStore();
            renderHome();
        }

        function switchView(view) {
            loadStore();
            if ((view === 'dashboard' || view === 'profile') && !app.store.currentUser) {
                openModal('authModal');
                showNotification('Please login to access this section', 'info');
                return;
            }

            document.getElementById('homeSection').classList.add('hidden');
            document.getElementById('browseSection').classList.add('hidden');
            document.getElementById('dashboardSection').classList.add('hidden');
            document.getElementById('profileSection').classList.add('hidden');

            if (view === 'browse') {
                document.getElementById('browseSection').classList.remove('hidden');
                renderAllItems();
            } else if (view === 'dashboard') {
                document.getElementById('dashboardSection').classList.remove('hidden');
                renderDashboard();
            } else if (view === 'profile') {
                document.getElementById('profileSection').classList.remove('hidden');
                renderProfile();
            }
        }

        function renderHome() {
            showSkeleton('moviesGrid', 'grid');
            showSkeleton('trainsGrid', 'list');
            showSkeleton('flightsGrid', 'list');
            showSkeleton('busesGrid', 'list');
            showSkeleton('eventsGrid', 'grid');
            showSkeleton('hotelsGrid', 'grid');
            
            setTimeout(() => {
                renderGrid('moviesGrid', app.data.movies);
                renderTrainList('trainsGrid', app.data.trains);
                renderFlightList('flightsGrid', app.data.flights);
                renderBusList('busesGrid', app.data.buses);
                renderGrid('eventsGrid', app.data.events);
                renderHotelsList('hotelsGrid', app.data.hotels);
            }, 600);
            updateAuthButton();
        }

        function showSkeleton(elementId, type) {
            const grid = document.getElementById(elementId);
            const skeletons = Array(3).fill(0).map(() => {
                if (type === 'list') {
                    return `<div style="background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-bottom: 15px; height: 120px; animation: pulse 1.5s infinite; opacity: 0.5;"></div>`;
                }
                return `<div class="card" style="height: 350px; animation: pulse 1.5s infinite; opacity: 0.5;"></div>`;
            }).join('');
            grid.innerHTML = skeletons;
        }

        function renderTrainList(elementId, items) {
            const grid = document.getElementById(elementId);
            grid.style.display = 'block'; // Ensure it's not grid layout
            grid.innerHTML = items.map(item => `
                <div class="list-row" style="background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div>
                        <h3 style="margin: 0 0 5px 0;">${item.name} <span style="font-size: 12px; color: var(--primary); border: 1px solid rgba(0,243,255,0.3); background: rgba(0,243,255,0.1); padding: 2px 6px; border-radius: 4px; margin-left: 10px;">${item.id}109</span></h3>
                        <p style="margin: 0; color: var(--text-muted); font-size: 14px;"><i class="fas fa-train" style="color: #aaa;"></i> ${item.from} <i class="fas fa-long-arrow-alt-right" style="margin: 0 5px;"></i> ${item.to}</p>
                        <div style="display: flex; gap: 15px; margin-top: 15px; align-items: center;">
                            <span style="background: rgba(0,255,0,0.1); color: #0f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; border: 1px solid rgba(0,255,0,0.2);">Available: ${item.seats}</span>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                                <span style="color: #ccc;">Confirm Probability:</span>
                                <div style="width: 100px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                    <div style="width: ${Math.floor(Math.random() * 40 + 60)}%; height: 100%; background: linear-gradient(90deg, #ff9f43, #1dd1a1);"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0 0 15px 0; color: var(--primary); font-size: 28px;">₹${item.price}</h2>
                        <button class="btn btn-outline btn-sm" style="margin-right: 10px;" onclick="showNotification('PNR Status: Confirmed', 'success')">Check PNR</button>
                        <button class="btn btn-primary btn-sm" onclick="openBooking(${item.id})">Book Seat</button>
                    </div>
                </div>
            `).join('');
        }

        
        function renderHotelsList(elementId, items) {
            const grid = document.getElementById(elementId);
            grid.style.display = 'block';
            grid.innerHTML = items.map(item => {
                const distance = (Math.random() * 5 + 1).toFixed(1);
                const isPopular = Math.random() > 0.5;
                const startingPrice = item.rooms && item.rooms[0] ? item.rooms[0].price : item.price;
                return `
                <div class="list-row" style="background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <div style="position:relative;">
                            <img src="${item.image}" style="width: 180px; height: 130px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1);">
                            ${isPopular ? `<span style="position:absolute; top:-10px; left:-10px; background:var(--warning); color:black; font-size:10px; padding:4px 10px; border-radius:12px; font-weight:bold; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">🔥 Popular Choice</span>` : ''}
                        </div>
                        <div>
                            <h3 style="margin: 0 0 5px 0; font-size: 22px; color:white;">${item.name} <span style="font-size:12px; font-weight:normal; color:var(--primary); margin-left:10px;">${item.rating}</span></h3>
                            <p style="margin: 0 0 12px 0; color: var(--text-muted); font-size: 14px;"><i class="fas fa-map-marker-alt" style="color:var(--danger)"></i> ${item.location} <span style="color:#888;">(${distance} km away)</span></p>
                            <div style="display: flex; gap: 8px;">
                                ${(item.amenities || []).map(a => `<span style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); padding:4px 10px; border-radius:6px; font-size:11px; color:#ccc;"><i class="fas fa-check" style="color:var(--secondary); margin-right:4px;"></i>${a}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div style="text-align: right; min-width: 150px;">
                        <p style="margin:0 0 5px 0; font-size:12px; color:var(--text-muted);">Starts from</p>
                        <h2 style="margin: 0 0 15px 0; color: var(--primary); font-size: 28px;">₹${startingPrice}<span style="font-size:14px; color:#888;">/nt</span></h2>
                        <button class="btn btn-primary btn-sm" onclick="openHotelDetails(${item.id})" style="padding: 10px 30px; font-size:14px;">View Details</button>
                    </div>
                </div>
            `}).join('');
        }

        function renderBusList(elementId, items) {
            const grid = document.getElementById(elementId);
            grid.style.display = 'block';
            grid.innerHTML = items.map(item => `
                <div class="list-row" style="background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; gap: 20px; align-items: center;">
                        <img src="${item.image}" style="width: 100px; height: 100px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255,255,255,0.1);">
                        <div>
                            <h3 style="margin: 0 0 8px 0; font-size: 20px;">${item.name}</h3>
                            <p style="margin: 0; color: var(--text-muted); font-size: 14px;">${item.formats ? item.formats.join(', ') : 'AC Sleeper'}</p>
                            <p style="margin: 8px 0 0 0; color: #ccc; font-size: 13px;"><i class="fas fa-clock" style="color: var(--secondary);"></i> Dep: 21:00 | Arr: 06:00 <span style="font-size: 11px; color: #888;">(Next Day)</span></p>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0 0 10px 0; color: var(--primary); font-size: 26px;">₹${item.price}</h2>
                        <p style="margin: 0 0 15px 0; font-size: 13px; color: #1dd1a1;"><i class="fas fa-check-circle"></i> ${item.seats} Seats Left</p>
                        <button class="btn btn-primary btn-sm" onclick="openBooking(${item.id})" style="padding: 8px 25px;">Select Seats</button>
                    </div>
                </div>
            `).join('');
        }

        function renderFlightList(elementId, items) {
            const grid = document.getElementById(elementId);
            grid.style.display = 'block';
            grid.innerHTML = items.map(item => `
                <div class="list-row" style="background: rgba(20,20,30,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 20px; width: 30%;">
                        <img src="${item.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
                        <div>
                            <h3 style="margin: 0; font-size: 16px;">${item.name}</h3>
                            <p style="margin: 5px 0 0 0; color: var(--text-muted); font-size: 12px;">${item.location}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 20px; width: 40%;">
                        <div style="text-align: right;">
                            <h3 style="margin: 0;">10:00</h3>
                            <p style="margin: 0; font-size: 12px; color: #888;">DEL</p>
                        </div>
                        <div style="text-align: center;">
                            <p style="margin: 0 0 5px 0; font-size: 11px; color: #aaa;">2h 15m</p>
                            <div style="width: 100px; height: 2px; background: rgba(255,255,255,0.2); position: relative;">
                                <i class="fas fa-plane" style="position: absolute; top: -7px; left: 50%; transform: translateX(-50%); color: var(--primary);"></i>
                            </div>
                        </div>
                        <div style="text-align: left;">
                            <h3 style="margin: 0;">12:15</h3>
                            <p style="margin: 0; font-size: 12px; color: #888;">BOM</p>
                        </div>
                    </div>
                    <div style="text-align: right; width: 30%;">
                        <h2 style="margin: 0 0 10px 0; color: var(--primary);">₹${item.price}</h2>
                        <button class="btn btn-primary btn-sm" onclick="openBooking(${item.id})">Book Flight</button>
                    </div>
                </div>
            `).join('');
        }

        function renderGrid(elementId, items) {
            const grid = document.getElementById(elementId);
            grid.innerHTML = items.map(item => `
                <div class="card">
                    <div class="card-image">
                        ${item.emoji}
                        <span class="card-badge">₹${item.price}</span>
                    </div>
                    <div class="card-body">
                        <div class="card-title">${item.name}</div>
                        <div class="card-subtitle">
                            <span>${item.rating}</span>
                        </div>
                        <div class="card-price">₹${item.price}</div>
                        <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="openBooking(${item.id})">
                            <i class="fas fa-bookmark"></i> Book Now
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function renderAllItems() {
            const allItems = [...app.data.movies, ...app.data.trains, ...app.data.flights, ...app.data.buses, ...app.data.events, ...app.data.hotels];
            renderGrid('browseGrid', allItems);
        }

        function filterMovies(tag, btn) {
            const buttons = btn.parentElement.querySelectorAll('button');
            buttons.forEach(b => b.className = 'btn btn-outline btn-sm');
            btn.className = 'btn btn-primary btn-sm';
            
            if (tag === 'All') {
                renderGrid('moviesGrid', app.data.movies);
                return;
            }
            const filtered = app.data.movies.filter(m => (m.languages && m.languages.includes(tag)) || (m.formats && m.formats.includes(tag)));
            renderGrid('moviesGrid', filtered);
        }

        function handleSearch(event) {
            const query = event.target.value.toLowerCase();
            if (query.length < 2 && query.length > 0) return;
            
            if (query.length === 0) {
                renderHome();
                return;
            }
            
            const filteredMovies = app.data.movies.filter(m => m.name.toLowerCase().includes(query) || (m.languages && m.languages.join(' ').toLowerCase().includes(query)));
            const filteredEvents = app.data.events.filter(e => e.name.toLowerCase().includes(query) || e.location.toLowerCase().includes(query));
            
            renderGrid('moviesGrid', filteredMovies);
            renderGrid('eventsGrid', filteredEvents);
        }

        function switchTab(tab) {
            // Update active button
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Hide all sections
            document.getElementById('moviesGrid').parentElement.style.display = 'none';
            document.getElementById('trainsSection').style.display = 'none';
            document.getElementById('flightsGrid').parentElement.style.display = 'none';
            document.getElementById('busesSection').style.display = 'none';
            document.getElementById('eventsGrid').parentElement.style.display = 'none';
            document.getElementById('hotelsSection').style.display = 'none';
            
            // Show selected section
            if (tab === 'movies') {
                document.getElementById('moviesGrid').parentElement.style.display = 'block';
                document.getElementById('moviesGrid').previousElementSibling.innerHTML = '<i class="fas fa-film"></i> Now Playing';
            } else if (tab === 'trains') {
                document.getElementById('trainsSection').style.display = 'block';
                document.getElementById('trainsGrid').previousElementSibling.innerHTML = '<i class="fas fa-train"></i> Train Bookings';
            } else if (tab === 'flights') {
                document.getElementById('flightsGrid').parentElement.style.display = 'block';
                document.getElementById('flightsGrid').previousElementSibling.innerHTML = '<i class="fas fa-plane"></i> Flight Bookings';
            } else if (tab === 'buses') {
                document.getElementById('busesSection').style.display = 'block';
                document.getElementById('busesGrid').previousElementSibling.innerHTML = '<i class="fas fa-bus"></i> Bus Bookings';
            } else if (tab === 'events') {
                document.getElementById('eventsGrid').parentElement.style.display = 'block';
                document.getElementById('eventsGrid').previousElementSibling.innerHTML = '<i class="fas fa-music"></i> Events & Shows';
            }
        }

        function openModal(id) {
            document.getElementById(id).classList.add('show');
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('show');
        }

        // ============ AUTH FUNCTIONS ============
        function toggleAuth() {
            loadStore();
            if (app.store.currentUser) {
                logout();
            } else {
                openModal('authModal');
            }
        }

        function login() {
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showNotification('❌ Please fill all fields', 'error');
                return;
            }

            const user = app.store.users.find(u => u.email === email && u.password === password);
            if (user) {
                app.store.currentUser = { ...user };
                app.store.bookings = [];
                app.store.cart = [];
                saveStore();
                showNotification(`✅ Welcome back, ${user.name}!`, 'success');
                closeModal('authModal');
                updateAuthButton();
                setTimeout(() => goHome(), 500);
            } else {
                showNotification('❌ Invalid credentials', 'error');
            }
        }

        function signup() {
            const email = document.getElementById('signupEmail').value;
            const name = document.getElementById('signupName').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;

            if (!email || !name || !phone || password.length < 6) {
                showNotification('❌ All fields required, password min 6 chars', 'error');
                return;
            }

            if (app.store.users.find(u => u.email === email)) {
                showNotification('❌ Email already exists', 'error');
                return;
            }

            app.store.users.push({ email, password, name, phone, wallet: 5000 });
            app.store.currentUser = { email, name, phone, wallet: 5000 };
            app.store.bookings = [];
            app.store.cart = [];
            saveStore();
            showNotification('✅ Account created successfully!', 'success');
            closeModal('authModal');
            updateAuthButton();
            setTimeout(() => goHome(), 500);
        }

        function logout() {
            showNotification('Logging out...', 'info');
            app.store.currentUser = null;
            app.store.cart = [];
            saveStore();
            updateAuthButton();
            setTimeout(() => goHome(), 1000);
        }

        function switchForm() {
            document.getElementById('loginForm').style.display = 
                document.getElementById('loginForm').style.display === 'none' ? 'block' : 'none';
            document.getElementById('signupForm').style.display = 
                document.getElementById('signupForm').style.display === 'none' ? 'block' : 'none';
        }

        function updateAuthButton() {
            const authBtn = document.getElementById('authBtn');
            if (app.store.currentUser) {
                authBtn.innerHTML = `
                    <div class="user-dropdown" style="position: relative; cursor: pointer; padding: 5px 10px; background: rgba(0, 243, 255, 0.1); border-radius: 20px; border: 1px solid rgba(0, 243, 255, 0.3);" onclick="document.getElementById('profileMenu').classList.toggle('hidden')">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-user-circle" style="font-size: 20px; color: var(--primary);"></i>
                            <span style="font-weight: 600;">${app.store.currentUser.name.split(' ')[0]}</span>
                            <i class="fas fa-chevron-down" style="font-size: 10px; color: var(--text-muted);"></i>
                        </div>
                        <div id="profileMenu" class="hidden" style="position: absolute; right: 0; top: calc(100% + 10px); background: #0f0f1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 10px; width: 160px; z-index: 1000; box-shadow: 0 10px 25px rgba(0,0,0,0.8);">
                            <a href="#" onclick="switchView('profile'); document.getElementById('profileMenu').classList.add('hidden'); return false;" style="display: block; padding: 10px; color: white; text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'"><i class="fas fa-user" style="width: 20px; color: var(--primary);"></i> Profile</a>
                            <a href="#" onclick="switchView('dashboard'); document.getElementById('profileMenu').classList.add('hidden'); return false;" style="display: block; padding: 10px; color: white; text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'"><i class="fas fa-ticket-alt" style="width: 20px; color: var(--secondary);"></i> Bookings</a>
                            <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0;"></div>
                            <a href="#" onclick="logout(); return false;" style="display: block; padding: 10px; color: #ff4757; text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,71,87,0.1)'" onmouseout="this.style.background='transparent'"><i class="fas fa-sign-out-alt" style="width: 20px;"></i> Logout</a>
                        </div>
                    </div>
                `;
            } else {
                authBtn.innerHTML = `<button class="btn btn-primary btn-sm" onclick="toggleAuth()" style="border-radius: 20px; padding: 8px 20px;"><i class="fas fa-sign-in-alt"></i> Login</button>`;
            }
        }

        // ============ BOOKING FUNCTIONS ============
        function getItemById(id) {
            for (let category in app.data) {
                if (Array.isArray(app.data[category])) {
                    const item = app.data[category].find(i => i.id === id);
                    if (item) return item;
                }
            }
            return null;
        }

                function openBooking(id) {
            loadStore();
            if (!app.store.currentUser) {
                showNotification('❌ Please login first', 'error');
                openModal('authModal');
                return;
            }

            const item = getItemById(id);
            if (!item) return;

            app.store.currentBooking = item;
            app.store.selectedSeats = [];
            
            const itemType = getItemTypeFromCurrentBooking();
            if (itemType === 'movies') {
                document.getElementById('movieDetailsTitle').textContent = item.name;
                document.getElementById('movieDetailsPoster').src = item.image;
                document.getElementById('movieDetailsBg').style.backgroundImage = `url('${item.image}')`;
                document.getElementById('movieDetailsRating').innerHTML = item.rating;
                document.getElementById('movieDetailsLanguages').innerHTML = item.languages ? item.languages.join(', ') : 'All Languages';
                document.getElementById('movieDetailsFormats').innerHTML = item.formats ? item.formats.join(', ') : '2D';
                
                document.getElementById('btnBookMovie').onclick = () => {
                    closeModal('movieDetailsModal');
                    showTheatresForMovie(item);
                };
                openModal('movieDetailsModal');
                return;
            }

            document.getElementById('bookingDetails').innerHTML = `
                <div style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="font-size: 32px; margin: 0 0 10px 0;">${item.emoji}</p>
                    <p style="font-size: 24px; margin: 0 0 5px 0; font-weight: 700;">${item.name}</p>
                    <p style="margin: 0; opacity: 0.9;">Price per ticket: <strong>₹${item.price}</strong></p>
                </div>
            `;

            renderSeats(item.seats);
            openModal('bookingModal');
        }

        function renderSeats(totalSeats) {
            const seatGrid = document.getElementById('seatGrid');
            const itemType = getItemTypeFromCurrentBooking();
            let seatsHtml = '';

            if (itemType === 'movies') {
                // Movie Theater Layout: 8 columns x rows
                const cols = 8;
                const rows = Math.ceil(totalSeats / cols);
                seatsHtml = '<div style="display: grid; grid-template-columns: repeat(' + cols + ', 1fr); gap: 8px; margin-bottom: 20px;">';
                seatsHtml += '<div style="grid-column: 1 / -1; text-align: center; font-weight: bold; color: #666; margin-bottom: 10px;">🎬 Screen 🎬</div>';
                
                for (let i = 1; i <= totalSeats; i++) {
                    const row = Math.ceil(i / cols);
                    const col = ((i - 1) % cols) + 1;
                    const seatLabel = String.fromCharCode(64 + row) + col;
                    const isReserved = Math.random() < 0.2;
                    const isSelected = app.store.selectedSeats.includes(i);
                    const seatClass = isReserved ? 'reserved' : isSelected ? 'selected' : '';
                    
                    seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${i}, this)" title="${seatLabel}" ${isReserved ? 'style="cursor: not-allowed;"' : ''}>${seatLabel}</div>`;
                }
                seatsHtml += '</div>';
            if (itemType === 'trains') {
                seatsHtml = '<div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px; max-width: 400px; margin: 0 auto; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 12px;">';
                for (let cabin = 1; cabin <= 3; cabin++) {
                    seatsHtml += `<div style="border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; background: rgba(255,255,255,0.02);">
                        <div style="font-size: 10px; color: #888; text-align: center; margin-bottom: 10px;">Cabin ${cabin}</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 30px 1fr 1fr; gap: 5px; text-align: center;">`;
                    
                    const types = ['LB', 'MB', 'UB', '', 'SL', 'SU'];
                    types.forEach((type, idx) => {
                        if (type === '') {
                            seatsHtml += `<div></div>`; // Aisle
                            return;
                        }
                        const seatNo = (cabin - 1) * 5 + (idx > 3 ? idx - 1 : idx + 1);
                        const isReserved = Math.random() < 0.3;
                        const isSelected = app.store.selectedSeats.includes(seatNo);
                        const seatClass = isReserved ? 'reserved' : isSelected ? 'selected' : '';
                        const style = isReserved ? 'background:rgba(255,0,85,0.1); border-color:rgba(255,0,85,0.2); color:rgba(255,0,85,0.4); cursor:not-allowed;' : 'background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:var(--text-muted);';
                        
                        seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${seatNo}, this)" style="height: 40px; display:flex; flex-direction: column; align-items:center; justify-content:center; font-size:12px; font-weight:600; border-radius:4px; cursor:pointer; ${style}"><span style="font-size: 14px;">${seatNo}</span><span style="font-size: 8px;">${type}</span></div>`;
                    });
                    seatsHtml += `</div></div>`;
                }
                seatsHtml += '</div>';
            } else if (itemType === 'buses') {
                seatsHtml = '<div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 20px;">';
                
                // Lower Deck
                seatsHtml += `<div style="background: rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px 20px 5px 5px; padding: 20px; padding-top: 40px; position: relative;">
                    <div style="position: absolute; top: 10px; right: 20px; width: 30px; height: 30px; border: 1px solid #555; border-radius: 50%; display:flex; align-items:center; justify-content:center;"><i class="fas fa-steering-wheel" style="font-size:12px; color:#555;"></i></div>
                    <div style="text-align: center; font-size: 10px; color: #888; margin-bottom: 20px;">LOWER DECK</div>
                    <div style="display: grid; grid-template-columns: 40px 20px 40px 40px; gap: 10px;">`;
                for(let i=1; i<=15; i++) {
                    const isReserved = Math.random() < 0.2;
                    const style = isReserved ? 'background:rgba(255,0,85,0.1); border-color:rgba(255,0,85,0.2); color:rgba(255,0,85,0.4); cursor:not-allowed;' : 'background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:var(--text-muted);';
                    if (i % 3 === 2) seatsHtml += `<div></div>`; // Aisle
                    seatsHtml += `<div class="seat ${isReserved?'reserved':''}" onclick="toggleSeat(${i}, this)" style="height: 60px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; border-radius:6px; cursor:pointer; ${style}">${i}</div>`;
                }
                seatsHtml += `</div></div>`;
                
                // Upper Deck
                seatsHtml += `<div style="background: rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.1); border-radius: 20px 20px 5px 5px; padding: 20px; padding-top: 40px;">
                    <div style="text-align: center; font-size: 10px; color: #888; margin-bottom: 20px;">UPPER DECK (SLEEPER)</div>
                    <div style="display: grid; grid-template-columns: 40px 20px 40px 40px; gap: 10px;">`;
                for(let i=16; i<=30; i++) {
                    const isReserved = Math.random() < 0.2;
                    const style = isReserved ? 'background:rgba(255,0,85,0.1); border-color:rgba(255,0,85,0.2); color:rgba(255,0,85,0.4); cursor:not-allowed;' : 'background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:var(--text-muted);';
                    if (i % 3 === 2) seatsHtml += `<div></div>`; // Aisle
                    seatsHtml += `<div class="seat ${isReserved?'reserved':''}" onclick="toggleSeat(${i}, this)" style="height: 80px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; border-radius:6px; cursor:pointer; ${style}">${i}</div>`;
                }
                seatsHtml += `</div></div>`;
                
                seatsHtml += '</div>';
            }
            } else if (itemType === 'flights') {
                // Airplane Layout: A-F columns with rows
                const cols = 6;
                const rows = Math.ceil(totalSeats / cols);
                seatsHtml = '<div style="display: grid; grid-template-columns: repeat(' + cols + ', 1fr); gap: 8px; margin-bottom: 20px;">';
                
                for (let i = 1; i <= totalSeats; i++) {
                    const row = Math.ceil(i / cols);
                    const col = ((i - 1) % cols);
                    const colLabel = String.fromCharCode(65 + col);
                    const seatLabel = row + colLabel;
                    const isReserved = Math.random() < 0.2;
                    const isSelected = app.store.selectedSeats.includes(i);
                    const seatClass = isReserved ? 'reserved' : isSelected ? 'selected' : '';
                    
                    if (col === 2 || col === 3) {
                        seatsHtml += '<div></div>';
                        continue;
                    }
                    seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${i}, this)" title="${seatLabel}" ${isReserved ? 'style="cursor: not-allowed;"' : ''}>${colLabel}</div>`;
                }
                seatsHtml += '</div>';
            } else if (itemType === 'buses') {
                // Bus Layout: 2 columns with aisle
                seatsHtml = '<div style="display: grid; grid-template-columns: 1fr 20px 1fr; gap: 10px; margin-bottom: 20px; align-items: center;">';
                seatsHtml += '<div style="grid-column: 1 / 4; text-align: center; font-weight: bold; color: #666;">🚌 Front 🚌</div>';
                
                for (let i = 1; i <= totalSeats; i++) {
                    const side = i % 2;
                    const row = Math.ceil(i / 2);
                    const seatLabel = 'Seat ' + i;
                    const isReserved = Math.random() < 0.2;
                    const isSelected = app.store.selectedSeats.includes(i);
                    const seatClass = isReserved ? 'reserved' : isSelected ? 'selected' : '';
                    
                    if (side === 1) {
                        seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${i}, this)" title="${seatLabel}" ${isReserved ? 'style="cursor: not-allowed;"' : ''}>${i}</div>`;
                    } else {
                        seatsHtml += `<div style="grid-column: 2;"></div>`;
                        seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${i}, this)" title="${seatLabel}" ${isReserved ? 'style="cursor: not-allowed;"' : ''}>${i}</div>`;
                    }
                }
                seatsHtml += '</div>';
            } else {
                // Generic/Events Layout: flexible grid
                const cols = 6;
                seatsHtml = '<div style="display: grid; grid-template-columns: repeat(' + cols + ', 1fr); gap: 10px; margin-bottom: 20px;">';
                
                for (let i = 1; i <= totalSeats; i++) {
                    const isReserved = Math.random() < 0.2;
                    const isSelected = app.store.selectedSeats.includes(i);
                    const seatClass = isReserved ? 'reserved' : isSelected ? 'selected' : '';
                    
                    seatsHtml += `<div class="seat ${seatClass}" onclick="toggleSeat(${i}, this)" ${isReserved ? 'style="cursor: not-allowed;"' : ''}>${i}</div>`;
                }
                seatsHtml += '</div>';
            }
            
            seatGrid.innerHTML = seatsHtml;
            updateSeatCount();
        }
        
        function getItemTypeFromCurrentBooking() {
            const item = app.store.currentBooking;
            if (app.data.movies.find(m => m.id === item.id)) return 'movies';
            if (app.data.trains.find(t => t.id === item.id)) return 'trains';
            if (app.data.flights.find(f => f.id === item.id)) return 'flights';
            if (app.data.buses.find(b => b.id === item.id)) return 'buses';
            return 'events';
        }

        function toggleSeat(seatNo, element) {
            if (element.classList.contains('reserved')) return;
            
            const quantity = parseInt(document.getElementById('quantity').value);
            
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
                app.store.selectedSeats = app.store.selectedSeats.filter(s => s !== seatNo);
            } else {
                if (app.store.selectedSeats.length < quantity) {
                    element.classList.add('selected');
                    app.store.selectedSeats.push(seatNo);
                } else {
                    showNotification(`❌ You can only select ${quantity} seat(s)`, 'warning');
                }
            }
            updateSeatCount();
        }

        function updateSeatCount() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const selected = app.store.selectedSeats.length;
            document.getElementById('selectedSeatsCount').textContent = selected;
            
            if (selected !== quantity) {
                showNotification(`Select ${quantity} seat(s). Currently selected: ${selected}`, 'info');
            }
        }

        function addToCart() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const selected = app.store.selectedSeats.length;

            if (selected !== quantity) {
                showNotification(`❌ Please select exactly ${quantity} seat(s)`, 'error');
                return;
            }

            const { name, price, emoji } = app.store.currentBooking;
            
            app.store.cart.push({
                id: Date.now(),
                name,
                price,
                emoji,
                quantity,
                seats: [...app.store.selectedSeats],
                total: price * quantity
            });

            saveStore();
            showNotification(`✅ ${quantity} ticket(s) added to cart!`, 'success');
            closeModal('bookingModal');

            setTimeout(() => {
                if (confirm('View cart and checkout?')) {
                    openCheckout();
                }
            }, 500);
        }

        function openCheckout() {
            loadStore();
            if (app.store.cart.length === 0) {
                showNotification('❌ Cart is empty', 'error');
                return;
            }

            let summary = app.store.cart.map((item, idx) => `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border);">
                    <div>
                        <p style="margin: 0; font-weight: 600;">
                            ${item.emoji} ${item.name} <span class="badge">x${item.quantity}</span>
                        </p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #999;">
                            Seats: ${item.seats.join(', ')}
                        </p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; font-weight: 700; font-size: 16px; color: var(--primary);">₹${item.total}</p>
                        <button class="btn btn-danger btn-sm" style="margin-top: 5px;" onclick="removeFromCart(${idx})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');

            const total = app.store.cart.reduce((sum, item) => sum + item.total, 0);
            summary += `
                <div style="padding-top: 12px; border-top: 2px solid var(--primary); display: flex; justify-content: space-between; margin-top: 12px;">
                    <strong>Total Amount:</strong>
                    <strong style="color: var(--primary); font-size: 20px;">₹${total}</strong>
                </div>
            `;

            document.getElementById('cartSummary').innerHTML = summary;
            openModal('checkoutModal');
        }

        function removeFromCart(index) {
            app.store.cart.splice(index, 1);
            saveStore();
            openCheckout();
            showNotification('Item removed from cart', 'info');
        }

        function clearCart() {
            app.store.cart = [];
            saveStore();
            showNotification('Cart cleared', 'info');
        }

        let selectedPaymentMethod = 'card';
        
        function selectPaymentMethod(method, button) {
            selectedPaymentMethod = method;
            document.querySelectorAll('[id^="paymentMethod"]').forEach(btn => btn.classList.remove('btn-primary', 'btn-outline'));
            document.querySelectorAll('[id^="paymentMethod"]').forEach(btn => btn.classList.add('btn-outline'));
            button.classList.remove('btn-outline');
            button.classList.add('btn-primary');
            
            document.getElementById('cardPayment').style.display = 'none';
            document.getElementById('upiPayment').style.display = 'none';
            document.getElementById('googlePayPayment').style.display = 'none';
            document.getElementById('paytmPayment').style.display = 'none';
            document.getElementById('scannerPayment').style.display = 'none';
            
            if (method === 'card') document.getElementById('cardPayment').style.display = 'block';
            else if (method === 'upi') document.getElementById('upiPayment').style.display = 'block';
            else if (method === 'googlepay') document.getElementById('googlePayPayment').style.display = 'block';
            else if (method === 'paytm') document.getElementById('paytmPayment').style.display = 'block';
            else if (method === 'scanner') document.getElementById('scannerPayment').style.display = 'block';
        }
        
        function startUPIScanner() {
            showNotification('📱 Camera access requested...', 'info');
            alert('UPI Scanner Demo:\nPoint camera at QR code\n\nIn production, integrate with browser Camera API and QR code scanning library');
        }
        
        function processPayment() {
            loadStore();
            const total = app.store.cart.reduce((sum, item) => sum + item.total, 0);

            if (app.store.currentUser.wallet < total) {
                showNotification('❌ Insufficient wallet balance', 'error');
                return;
            }

            const paymentMethodName = {
                'card': 'Credit/Debit Card',
                'upi': 'UPI',
                'googlepay': 'Google Pay',
                'paytm': 'Paytm',
                'scanner': 'UPI Scanner'
            }[selectedPaymentMethod];
            
            showNotification(`⏳ Processing payment via ${paymentMethodName}... <span class="loading"></span>`, 'info');

            setTimeout(() => {
                // Simulate payment processing
                const success = Math.random() > 0.1; // 90% success rate
                
                if (success) {
                    app.store.currentUser.wallet -= total;

                    const bookingId = 'BOOK' + Date.now();
                    const booking = {
                        id: bookingId,
                        items: app.store.cart,
                        total: total,
                        date: new Date().toLocaleDateString(),
                        time: new Date().toLocaleTimeString(),
                        paymentMethod: paymentMethodName,
                        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}`,
                        status: 'Confirmed'
                    };

                    app.store.bookings.push(booking);
                    app.store.cart = [];
                    saveStore();

                    showNotification(`✅ Payment successful via ${paymentMethodName}!`, 'success');
                    closeModal('checkoutModal');

                    // Show confirmation
                    showConfirmation(booking);
                } else {
                    showNotification(`❌ Payment failed. Please try again with ${paymentMethodName}`, 'error');
                }
            }, 2000);
        }

        function showConfirmation(booking) {
            let itemsHtml = booking.items.map(item => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${item.emoji} ${item.name}</span>
                    <span>₹${item.total}</span>
                </div>
            `).join('');

            document.getElementById('confirmationDetails').innerHTML = `
                <div style="margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600;"><i class="fas fa-receipt"></i> Booking Details</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Booking ID:</strong> ${booking.id}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${booking.date} ${booking.time}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Status:</strong> <span class="booking-status">${booking.status}</span></p>
                </div>
                <div style="border-top: 1px solid var(--border); padding-top: 15px;">
                    <p style="margin: 0 0 10px 0; font-weight: 600;"><i class="fas fa-list"></i> Items</p>
                    ${itemsHtml}
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border); font-weight: 700;">
                        <span>Total:</span>
                        <span style="color: var(--primary); font-size: 18px;">₹${booking.total}</span>
                    </div>
                </div>
            `;

            document.getElementById('qrCodeImg').src = booking.qrCode;
            document.getElementById('bookingId').textContent = `Booking ID: ${booking.id}`;

            closeModal('checkoutModal');
            openModal('confirmationModal');
        }

        function downloadQR() {
            const qrImg = document.getElementById('qrCodeImg');
            const link = document.createElement('a');
            link.href = qrImg.src;
            link.download = 'ticket-' + app.store.bookings[app.store.bookings.length - 1].id + '.png';
            link.click();
            showNotification('✅ Ticket downloaded!', 'success');
        }

        
        // ============ DISTRICT APP STYLE MOVIE BOOKING ============
        const districtTheatres = {
            'Hyderabad': [
                { name: "PVR: Inorbit Mall", location: "Cyberabad", formats: ["2D", "3D", "IMAX"], timings: ["10:00 AM", "01:30 PM", "05:00 PM", "09:30 PM"], price: 250 },
                { name: "AMB Cinemas", location: "Gachibowli", formats: ["2D", "3D"], timings: ["11:00 AM", "02:45 PM", "06:30 PM"], price: 300 },
                { name: "Prasads Multiplex", location: "Necklace Road", formats: ["2D", "Large Screen"], timings: ["08:45 AM", "12:15 PM", "07:30 PM"], price: 150 }
            ],
            'Mumbai': [
                { name: "PVR: Juhu", location: "Juhu", formats: ["2D", "3D"], timings: ["09:00 AM", "12:30 PM", "04:00 PM", "08:30 PM"], price: 350 },
                { name: "INOX: Nariman Point", location: "Nariman Point", formats: ["2D", "IMAX"], timings: ["11:00 AM", "03:45 PM", "07:30 PM"], price: 400 }
            ],
            'Delhi': [
                { name: "PVR: Select City Walk", location: "Saket", formats: ["2D", "4DX"], timings: ["10:30 AM", "02:00 PM", "06:15 PM"], price: 300 },
                { name: "Cinepolis", location: "Rohini", formats: ["2D"], timings: ["09:00 AM", "01:30 PM", "05:00 PM"], price: 250 }
            ]
        };

        let selectedDistrictTheatre = null;
        let selectedDistrictTime = null;
        let activeLocation = 'Hyderabad';

        function showTheatresForMovie(movie) {
            const locSelect = document.getElementById('globalLocation');
            activeLocation = locSelect ? locSelect.value : 'Hyderabad';
            
            let theatres = districtTheatres[activeLocation];
            if (!theatres) theatres = districtTheatres['Hyderabad']; // Fallback
            
            document.getElementById('theatresMovieTitle').innerHTML = `Select Theatre for <span style="color:var(--primary);">${movie.name}</span> in ${activeLocation}`;
            const list = document.getElementById('theatresList');
            
            if (theatres.length === 0) {
                list.innerHTML = `<p style="color:var(--text-muted); text-align:center; padding:20px;">No theatres found in ${activeLocation}</p>`;
            } else {
                let html = '';
                
                // Group 1
                html += `<div style="margin-top: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-location-arrow" style="color: var(--primary);"></i>
                    <h4 style="margin: 0; color: white; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">Nearby (Within 5km)</h4>
                    <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.1);"></div>
                </div>`;
                
                theatres.forEach((t, idx) => {
                    if (idx === 2) {
                        // Group 2
                        html += `<div style="margin-top: 30px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-building" style="color: var(--secondary);"></i>
                            <h4 style="margin: 0; color: white; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">City Center</h4>
                            <div style="flex: 1; height: 1px; background: rgba(255,255,255,0.1);"></div>
                        </div>`;
                    }
                    
                    const distance = (Math.random() * 5 + 1).toFixed(1);
                    html += `
                    <div style="background: rgba(20,20,30,0.8); padding: 20px; margin-bottom: 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.2s;" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.05)'">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                            <div>
                                <h3 style="margin:0; color:white; font-size: 18px;">${t.name}</h3>
                                <p style="margin:5px 0 0 0; font-size:13px; color:var(--text-muted);">
                                    <i class="fas fa-map-marker-alt" style="color:var(--danger)"></i> ${t.location} <span style="color:#aaa; font-size:11px;">(${distance} km away)</span> &nbsp;|&nbsp; 
                                    <i class="fas fa-video"></i> ${t.formats.join(', ')}
                                </p>
                            </div>
                        </div>
                        <div style="display:flex; gap: 12px; flex-wrap: wrap;">
                            ${t.timings.map(time => {
                                const occupancy = Math.random();
                                let statusColor = '#00b894'; // Green
                                let statusTag = 'Available';
                                
                                if (occupancy > 0.85) {
                                    statusColor = '#d63031'; // Red
                                    statusTag = 'Almost Full';
                                } else if (occupancy > 0.6) {
                                    statusColor = '#e17055'; // Orange
                                    statusTag = 'Filling Fast';
                                }
                                
                                return `<div style="position:relative; display:inline-block; margin-top:10px;">
                                    <button class="btn btn-sm" style="border-radius: 6px; background: transparent; border: 1px solid ${statusColor}; color: ${statusColor}; font-weight: 600; padding: 6px 12px; transition: 0.2s; cursor: pointer;" onmouseover="this.style.background='${statusColor}22'" onmouseout="this.style.background='transparent'" onclick="selectDistrictShow(${idx}, '${time}')">${time}</button>
                                    <span style="position:absolute; top:-10px; right:-5px; color:${statusColor}; font-size:9px; font-weight:bold; background: rgba(0,0,0,0.8); padding: 1px 4px; border-radius: 3px; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">${statusTag}</span>
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                `});
                list.innerHTML = html;
            }
            openModal('theatresModal');
        }

        function selectDistrictShow(theatreIdx, time) {
            let theatres = districtTheatres[activeLocation] || districtTheatres['Hyderabad'];
            selectedDistrictTheatre = theatres[theatreIdx];
            selectedDistrictTime = time;
            app.store.currentBooking.price = selectedDistrictTheatre.price;
            
            closeModal('theatresModal');
            openDistrictSeatModal();
        }

        function openDistrictSeatModal() {
            document.getElementById('districtSeatInfo').innerHTML = `
                <h3>${selectedDistrictTheatre.name}</h3>
                <p style="color:var(--text-muted);">${selectedDistrictTheatre.location} | ${selectedDistrictTime}</p>
            `;
            
            const grid = document.getElementById('districtSeatGrid');
            grid.innerHTML = '';
            
            const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // A-J
            let html = '<div style="display:flex; flex-direction:column; gap:10px; align-items:center;">';
            
            rows.forEach(rowLetter => {
                html += `<div style="display:flex; gap:10px; align-items:center;">
                    <div style="width:20px; font-weight:bold; color:var(--text-muted); text-align:center;">${rowLetter}</div>
                    <div style="display:flex; gap:8px;">`;
                
                for(let col = 1; col <= 12; col++) { // 1-12
                    if (col === 7) html += `<div style="width:30px;"></div>`; // Larger Aisle
                    const seatId = rowLetter + col;
                    const isBooked = Math.random() < 0.25;
                    const cssClass = isBooked ? 'booked' : '';
                    html += `<div class="district-seat ${cssClass}" onclick="toggleDistrictSeat('${seatId}', this)">${col}</div>`;
                }
                html += `</div></div>`;
            });
            html += '</div>';
            
            grid.innerHTML = html;
            
            app.store.selectedSeats = [];
            updateLivePrice();
            
            openModal('districtSeatModal');
        }

        function toggleDistrictSeat(el, seatId) {
            if(el.classList.contains('reserved')) return;
            
            if(el.classList.contains('selected')) {
                el.classList.remove('selected');
                app.store.selectedSeats = app.store.selectedSeats.filter(s => s !== seatId);
                el.style.background = 'rgba(255,255,255,0.05)';
                el.style.color = 'var(--text-muted)';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.boxShadow = 'none';
            } else {
                el.classList.add('selected');
                app.store.selectedSeats.push(seatId);
                el.style.background = 'var(--primary)';
                el.style.color = '#000';
                el.style.borderColor = 'var(--primary)';
                el.style.boxShadow = '0 0 15px rgba(0, 243, 255, 0.4)';
            }
            updateDistrictSummary();
        }

        function updateDistrictSummary() {
            const count = app.store.selectedSeats.length;
            document.getElementById('districtSeatCount').innerHTML = count > 0 ? `${app.store.selectedSeats.join(', ')} <br><span style="color:white;">${count} ticket(s)</span>` : 'No seats selected';
            document.getElementById('districtTotalPrice').textContent = `₹${count * selectedDistrictTheatre.price}`;
        }

        function confirmDistrictSeats() {
            if(app.store.selectedSeats.length === 0) {
                showNotification('❌ Please select at least 1 seat', 'error');
                return;
            }
            
            const count = app.store.selectedSeats.length;
            const total = count * selectedDistrictTheatre.price;
            
            app.store.cart.push({
                id: Date.now(),
                name: app.store.currentBooking.name + ` (${selectedDistrictTheatre.name} | ${selectedDistrictTime})`,
                price: selectedDistrictTheatre.price,
                emoji: app.store.currentBooking.emoji,
                quantity: count,
                seats: [...app.store.selectedSeats],
                total: total
            });

            saveStore();
            showNotification(`✅ ${count} ticket(s) added to cart!`, 'success');
            closeModal('districtSeatModal');

            setTimeout(() => {
                openCheckout();
            }, 500);
        }

        // ============ DASHBOARD FUNCTIONS ============
        function renderDashboard() {
            loadStore();
            const bookings = app.store.bookings;
            const totalSpent = bookings.reduce((sum, b) => sum + b.total, 0);
            const confirmCount = bookings.filter(b => b.status === 'Confirmed').length;

            document.getElementById('totalBookings').textContent = bookings.length;
            document.getElementById('totalSpent').textContent = '₹' + totalSpent;
            document.getElementById('walletBalance').textContent = '₹' + app.store.currentUser.wallet;
            document.getElementById('confirmedBookings').textContent = confirmCount;

            if (bookings.length === 0) {
                document.getElementById('bookingsList').innerHTML = '';
                document.getElementById('noBookingsMsg').classList.remove('hidden');
                return;
            }

            document.getElementById('noBookingsMsg').classList.add('hidden');

            const bookingsHtml = bookings.map(booking => `
                <div class="booking-item">
                    <div class="booking-info">
                        <h3><i class="fas fa-ticket-alt"></i> Booking #${booking.id}</h3>
                        <div class="booking-details">
                            <p><strong>Date:</strong> ${booking.date} ${booking.time}</p>
                            <p><strong>Items:</strong> ${booking.items.map(i => `${i.emoji} ${i.name}`).join(', ')}</p>
                            <p><strong>Total Amount:</strong> ₹${booking.total}</p>
                            <span class="booking-status">${booking.status}</span>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <img src="${booking.qrCode}" alt="QR Code" style="width: 120px; height: 120px; border-radius: 8px; margin-bottom: 10px;">
                        <button class="btn btn-primary btn-sm" onclick="downloadBookingQR('${booking.qrCode}', '${booking.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `).join('');

            document.getElementById('bookingsList').innerHTML = bookingsHtml;
        }

        function downloadBookingQR(qrUrl, bookingId) {
            const link = document.createElement('a');
            link.href = qrUrl;
            link.download = 'ticket-' + bookingId + '.png';
            link.click();
            showNotification('✅ Ticket downloaded!', 'success');
        }

        // ============ PROFILE FUNCTIONS ============
        function renderProfile() {
            loadStore();
            const user = app.store.currentUser;

            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileEmail').textContent = user.email;
            document.getElementById('viewEmail').textContent = user.email;
            document.getElementById('viewPhone').textContent = user.phone;
            document.getElementById('walletBalanceProfile').textContent = '₹' + user.wallet;

            document.getElementById('editName').value = user.name;
            document.getElementById('editPhone').value = user.phone;
            document.getElementById('editPassword').value = '';
        }

        function toggleEditProfile() {
            document.getElementById('editProfileForm').classList.toggle('hidden');
            document.getElementById('profileView').classList.toggle('hidden');
        }

        function saveProfile() {
            const name = document.getElementById('editName').value;
            const phone = document.getElementById('editPhone').value;
            const password = document.getElementById('editPassword').value;

            if (!name || !phone) {
                showNotification('❌ All fields required', 'error');
                return;
            }

            app.store.currentUser.name = name;
            app.store.currentUser.phone = phone;
            if (password.length >= 6) {
                const userIndex = app.store.users.findIndex(u => u.email === app.store.currentUser.email);
                if (userIndex !== -1) {
                    app.store.users[userIndex].password = password;
                }
                app.store.currentUser.password = password;
            }

            saveStore();
            showNotification('✅ Profile updated successfully!', 'success');
            toggleEditProfile();
            renderProfile();
            updateAuthButton();
        }

        function addWallet() {
            const amount = prompt('Enter amount to add (₹):', '500');
            if (amount && !isNaN(amount) && amount > 0) {
                app.store.currentUser.wallet += parseInt(amount);
                saveStore();
                showNotification(`✅ ₹${amount} added to wallet!`, 'success');
                renderProfile();
                updateAuthButton();
            }
        }

        // ============ CHATBOT FUNCTIONS ============
        let geminiApiKey = localStorage.getItem('geminiApiKey') || 'AIzaSyBeGKIfgrtrfnJ-q-WiuS060JBdPGGFXr4';
        
        // Auto-save the API key on load
        if (geminiApiKey) {
            localStorage.setItem('geminiApiKey', geminiApiKey);
        }
        
        function toggleChat() {
            document.getElementById('chatWindow').classList.toggle('show');
            if (document.getElementById('chatWindow').classList.contains('show')) {
                document.getElementById('chatInput').focus();
                if (document.getElementById('chatBody').children.length === 0) {
                    addChatMessage('🤖 Gemini AI Ready! I\'m powered by Google Gemini AI and ready to help you with any questions about TicketX Pro! Ask me anything! 🚀', 'bot');
                }
            }
        }

        function sendChat() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;

            addChatMessage(message, 'user');
            input.value = '';

            setTimeout(() => {
                if (geminiApiKey) {
                    getGeminiResponse(message);
                } else {
                    const response = getDefaultResponse(message);
                    addChatMessage(response, 'bot');
                }
            }, 500);
        }

        function handleChatInput(event) {
            if (event.key === 'Enter') {
                sendChat();
            }
        }
        
        async function getGeminiResponse(message) {
            try {
                addChatMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'bot');
                
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + geminiApiKey, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a helpful TicketX Pro booking assistant. Answer briefly about: ticket booking, seat selection, payment methods, QR codes, wallet, cancellations, and refunds. If asked about unrelated topics, politely redirect. User asks: ${message}`
                            }]
                        }]
                    })
                });
                
                const data = await response.json();
                
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    const aiResponse = data.candidates[0].content.parts[0].text;
                    // Remove the thinking message first
                    const chatBody = document.getElementById('chatBody');
                    const lastMsg = chatBody.lastChild;
                    if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) {
                        lastMsg.remove();
                    }
                    addChatMessage(aiResponse, 'bot');
                } else {
                    // Remove thinking message and show error
                    const chatBody = document.getElementById('chatBody');
                    const lastMsg = chatBody.lastChild;
                    if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) {
                        lastMsg.remove();
                    }
                    addChatMessage('Sorry, I encountered an error. Please try again or check your API key.', 'bot');
                }
            } catch (error) {
                console.error('Gemini API error:', error);
                const chatBody = document.getElementById('chatBody');
                const lastMsg = chatBody.lastChild;
                if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) {
                    lastMsg.remove();
                }
                addChatMessage('Unable to connect to AI. Using default responses. Error: ' + error.message, 'bot');
                setTimeout(() => {
                    const defaultResponse = getDefaultResponse(message);
                    addChatMessage(defaultResponse, 'bot');
                }, 1000);
            }
        }

        function getDefaultResponse(message) {
            const msg = message.toLowerCase();
            
            if (msg.includes('api') || msg.includes('gemini') || msg.includes('key')) {
                return '🔑 To enable Gemini AI:\n1. Get your API key from Google AI Studio\n2. Click Settings in chat\n3. Paste your API key\n4. Save - AI will be fully enabled!';
            } else if (msg.includes('price') || msg.includes('cost')) {
                return '💰 Our prices:\n• Movies: ₹200-300\n• Trains: ₹100-800\n• Flights: ₹2000-3000\n• Buses: ₹200-1000\n• Events: ₹800-2000';
            } else if (msg.includes('book') || msg.includes('booking')) {
                return '📚 To book:\n1. Browse categories\n2. Click "Book Now"\n3. Select seats\n4. Add to cart\n5. Checkout\n6. Choose payment method\n7. Done!';
            } else if (msg.includes('payment') || msg.includes('pay')) {
                return '💳 Payment Methods:\n✓ Credit/Debit Card\n✓ UPI\n✓ Google Pay\n✓ Paytm\n✓ UPI Scanner';
            } else if (msg.includes('refund')) {
                return '💰 Refunds processed in 5-7 days for cancelled bookings.';
            } else if (msg.includes('seat')) {
                return '🎯 Seats vary by ticket type:\n• Movies: Theater layout (A-H rows)\n• Trains: Coach layout\n• Flights: Airplane (A-F columns)\n• Buses: Side-by-side\n• Events: General';
            } else if (msg.includes('qr')) {
                return '📲 Your QR code:\n✓ Generated after booking\n✓ Shown on confirmation\n✓ Download from dashboard\n✓ Show at venue';
            } else if (msg.includes('hi') || msg.includes('hello')) {
                return '👋 Hello! How can I help you with TicketX Pro?';
            }
            
            return '🤖 I can help with booking, payment methods, seats, QR codes, refunds, and more. What would you like to know?';
        }

        function addChatMessage(message, sender) {
            const chatBody = document.getElementById('chatBody');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}`;
            messageDiv.innerHTML = message;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        function showAPIKeyModal() {
            const key = prompt('🔑 Enter your Google Gemini API Key:\n\nCurrent: ' + (geminiApiKey ? geminiApiKey.substring(0, 10) + '...' : 'Not set') + '\n\nGet it free from:\nhttps://makersuite.google.com/app/apikey\n\nNote: Current key is already loaded!', geminiApiKey);
            if (key) {
                geminiApiKey = key.trim();
                localStorage.setItem('geminiApiKey', geminiApiKey);
                showNotification('✅ API Key updated! AI is now enabled.', 'success');
                addChatMessage('🤖 AI Assistant restarted with new API key! Ready to help!', 'bot');
            }
        }

        // ============ UTILITY FUNCTIONS ============
        function showNotification(message, type) {
            const notif = document.createElement('div');
            notif.className = `notification ${type}`;
            notif.innerHTML = message;
            document.body.appendChild(notif);
            setTimeout(() => notif.remove(), 4000);
        }

        
        function toggleDistrictSeat(seatId, el) {
            if (el.classList.contains('booked')) return;
            
            if (el.classList.contains('selected')) {
                el.classList.remove('selected');
                app.store.selectedSeats = app.store.selectedSeats.filter(s => s !== seatId);
            } else {
                if (app.store.selectedSeats.length >= 6) {
                    showNotification('Maximum 6 seats allowed', 'error');
                    return;
                }
                el.classList.add('selected');
                app.store.selectedSeats.push(seatId);
            }
            updateLivePrice();
        }

        function updateLivePrice() {
            const count = app.store.selectedSeats.length;
            const price = app.store.currentBooking.price * count;
            const livePriceElement = document.getElementById('districtLivePrice');
            if(livePriceElement) {
                livePriceElement.textContent = price;
            }
            
            const btn = document.getElementById('districtProceedBtn');
            if(btn) {
                if (count > 0) {
                    btn.innerHTML = `Book ${count} Ticket(s) • ₹${price}`;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                } else {
                    btn.innerHTML = `Select Seats to Proceed`;
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                }
            }
        }
        
        function proceedDistrictBooking() {
            if(app.store.selectedSeats.length === 0) {
                showNotification('❌ Please select at least 1 seat', 'error');
                return;
            }
            
            const count = app.store.selectedSeats.length;
            const total = count * selectedDistrictTheatre.price;
            
            app.store.cart.push({
                id: Date.now(),
                name: app.store.currentBooking.name + ` (${selectedDistrictTheatre.name} | ${selectedDistrictTime})`,
                price: selectedDistrictTheatre.price,
                emoji: app.store.currentBooking.emoji || '🍿',
                quantity: count,
                seats: [...app.store.selectedSeats],
                total: total
            });

            saveStore();
            showNotification(`✅ ${count} ticket(s) added to cart!`, 'success');
            closeModal('districtSeatModal');

            setTimeout(() => {
                if (confirm('View cart and checkout?')) {
                    openCheckout();
                }
            }, 500);
        }

        
        // ============ HOTELS LOGIC ============
        let selectedHotel = null;
        let selectedRoom = null;

        function openHotelDetails(hotelId) {
            loadStore();
            if (!app.store.currentUser) {
                showNotification('❌ Please login first', 'error');
                openModal('authModal');
                return;
            }

            const hotel = app.data.hotels.find(h => h.id === hotelId);
            if (!hotel) return;
            selectedHotel = hotel;

            document.getElementById('hotelDetailsTitle').textContent = hotel.name;
            document.getElementById('hotelDetailsLocation').innerHTML = `<i class="fas fa-map-marker-alt" style="color:var(--danger)"></i> ${hotel.location}`;
            document.getElementById('hotelDetailsRating').textContent = hotel.rating;
            document.getElementById('hotelDetailsBg').style.backgroundImage = `url('${hotel.image}')`;
            document.getElementById('hotelDetailsDesc').textContent = hotel.description;

            document.getElementById('hotelDetailsAmenities').innerHTML = hotel.amenities.map(a => 
                `<span style="background:rgba(0, 243, 255, 0.1); border:1px solid rgba(0, 243, 255, 0.3); color:var(--primary); padding:6px 15px; border-radius:20px; font-size:13px;"><i class="fas fa-check"></i> ${a}</span>`
            ).join('');

            document.getElementById('hotelRoomsList').innerHTML = hotel.rooms.map((room, idx) => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 15px; display: flex; gap: 20px;">
                    <img src="${room.image}" style="width: 140px; height: 110px; border-radius: 8px; object-fit: cover;">
                    <div style="flex: 1;">
                        <h4 style="margin: 0 0 5px 0; color: white; font-size: 18px;">${room.type}</h4>
                        <p style="margin: 0 0 5px 0; font-size: 13px; color: var(--text-muted);"><i class="fas fa-user-friends"></i> ${room.capacity}</p>
                        <p style="margin: 0 0 10px 0; font-size: 12px; color: #aaa;">${room.features}</p>
                        <p style="margin: 0; font-size: 11px; color: var(--warning);"><i class="fas fa-fire"></i> Limited rooms left</p>
                    </div>
                    <div style="text-align: right; min-width: 120px;">
                        <h3 style="margin: 0 0 10px 0; color: var(--primary);">₹${room.price}<span style="font-size:12px; color:#888;">/nt</span></h3>
                        <button class="btn btn-outline btn-sm" onclick="selectHotelRoom(${idx})" style="width: 100%; padding:8px;">Select Room</button>
                    </div>
                </div>
            `).join('');

            openModal('hotelDetailsModal');
        }

        function selectHotelRoom(roomIdx) {
            selectedRoom = selectedHotel.rooms[roomIdx];
            closeModal('hotelDetailsModal');
            
            document.getElementById('bookingHotelName').textContent = selectedHotel.name;
            document.getElementById('bookingRoomName').textContent = selectedRoom.type;
            
            // Set default dates
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            document.getElementById('hotelCheckIn').value = today.toISOString().split('T')[0];
            document.getElementById('hotelCheckOut').value = tomorrow.toISOString().split('T')[0];
            
            calculateHotelPrice();
            openModal('hotelBookingModal');
        }

        function calculateHotelPrice() {
            const checkIn = new Date(document.getElementById('hotelCheckIn').value);
            const checkOut = new Date(document.getElementById('hotelCheckOut').value);
            
            if (checkOut <= checkIn) {
                showNotification('Check-out date must be after Check-in', 'warning');
                document.getElementById('hotelTotalPrice').textContent = '0';
                return 0;
            }

            const diffTime = Math.abs(checkOut - checkIn);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            const guestsSelect = document.getElementById('hotelGuests').value;
            const roomsNeeded = guestsSelect === '4' ? 2 : 1; 

            const subtotal = selectedRoom.price * diffDays * roomsNeeded;
            const taxes = subtotal * 0.10;
            const total = subtotal + taxes;

            document.getElementById('hotelCalculationText').textContent = `₹${selectedRoom.price} x ${diffDays} Night(s) x ${roomsNeeded} Room(s)`;
            document.getElementById('hotelSubtotal').textContent = `₹${subtotal}`;
            document.getElementById('hotelTaxes').textContent = `₹${taxes}`;
            document.getElementById('hotelTotalPrice').textContent = total;
            
            return total;
        }

        function confirmHotelBooking() {
            const total = calculateHotelPrice();
            if (total === 0) return;

            const checkIn = document.getElementById('hotelCheckIn').value;
            const checkOut = document.getElementById('hotelCheckOut').value;
            const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));

            app.store.cart.push({
                id: Date.now(),
                name: `${selectedHotel.name} - ${selectedRoom.type} (${nights} Nights)`,
                price: total,
                emoji: '🏨',
                quantity: 1,
                seats: [],
                total: total
            });

            saveStore();
            showNotification(`✅ Hotel room added to cart!`, 'success');
            closeModal('hotelBookingModal');

            setTimeout(() => {
                if (confirm('View cart and checkout?')) {
                    openCheckout();
                }
            }, 500);
        }

        // ============ INITIALIZATION ============
        window.addEventListener('load', () => {
            loadStore();
            goHome();
            
            // Remove splash screen after 2.5s
            setTimeout(() => {
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.classList.add('hidden');
                    setTimeout(() => splash.remove(), 800);
                }
            }, 4000);
            
            // Initial chat message
            addChatMessage('Hi! 👋 I\'m here to help. Click me anytime!', 'bot');
        });

        // Prevent default link behavior
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.href === '#') {
                e.preventDefault();
            }
        });
    