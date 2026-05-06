const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Replace <style> block with <link>
content = content.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="neon-theme.css">');

// 2. Add splash screen after <body>
const splashScreenHTML = `<body>
    <!-- SPLASH SCREEN -->
    <div id="splash-screen">
        <svg class="splash-logo" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#00f3ff" />
                    <stop offset="100%" stop-color="#bc13fe" />
                </linearGradient>
            </defs>
            <rect x="10" y="20" width="80" height="60" rx="10" fill="none" stroke="url(#neonGrad)" stroke-width="4"/>
            <path d="M 10 40 L 20 40 A 10 10 0 0 1 20 60 L 10 60" fill="none" stroke="url(#neonGrad)" stroke-width="4"/>
            <path d="M 90 40 L 80 40 A 10 10 0 0 0 80 60 L 90 60" fill="none" stroke="url(#neonGrad)" stroke-width="4"/>
            <text x="50" y="55" font-family="Outfit" font-size="20" font-weight="800" fill="#fff" text-anchor="middle">TX</text>
        </svg>
        <div class="splash-text">TICKETX PRO</div>
        <div class="loader-bar"></div>
    </div>`;
content = content.replace(/<body>/, splashScreenHTML);

// 3. Update Navbar Logo
const newLogo = `<div class="navbar__logo" onclick="goHome()" style="cursor: pointer;">
                <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 8px #00f3ff);">
                    <rect x="10" y="20" width="80" height="60" rx="10" fill="none" stroke="#00f3ff" stroke-width="6"/>
                    <path d="M 10 40 L 20 40 A 10 10 0 0 1 20 60 L 10 60" fill="none" stroke="#00f3ff" stroke-width="6"/>
                    <path d="M 90 40 L 80 40 A 10 10 0 0 0 80 60 L 90 60" fill="none" stroke="#00f3ff" stroke-width="6"/>
                    <text x="50" y="56" font-family="Outfit" font-size="28" font-weight="800" fill="#fff" text-anchor="middle">TX</text>
                </svg> TicketX Pro
            </div>`;
content = content.replace(/<div class="navbar__logo"[\s\S]*?<\/div>/, newLogo);

// 4. Add Hotels tab
const newTabs = `<button class="tab-btn active" onclick="switchTab('movies')"><i class="fas fa-film"></i> Movies</button>
                        <button class="tab-btn" onclick="switchTab('trains')"><i class="fas fa-train"></i> Trains</button>
                        <button class="tab-btn" onclick="switchTab('flights')"><i class="fas fa-plane"></i> Flights</button>
                        <button class="tab-btn" onclick="switchTab('buses')"><i class="fas fa-bus"></i> Buses</button>
                        <button class="tab-btn" onclick="switchTab('events')"><i class="fas fa-music"></i> Events</button>
                        <button class="tab-btn" onclick="switchTab('hotels')"><i class="fas fa-hotel"></i> Hotels</button>`;
content = content.replace(/<button class="tab-btn active"[\s\S]*?Events<\/button>/, newTabs);

// 5. Add Offers Section & Hotels Grid
const eventsSection = `<!-- EVENTS SECTION -->
                <section>
                    <h2><i class="fas fa-music"></i> Events & Shows</h2>
                    <div class="grid grid-3" id="eventsGrid"></div>
                </section>`;

const addedSections = `<!-- EVENTS SECTION -->
                <section>
                    <h2><i class="fas fa-music"></i> Events & Shows</h2>
                    <div class="grid grid-3" id="eventsGrid"></div>
                </section>

                <!-- HOTELS SECTION -->
                <section style="display: none;" id="hotelsSection">
                    <h2><i class="fas fa-hotel"></i> Luxury Stays</h2>
                    <div class="grid grid-3" id="hotelsGrid"></div>
                </section>

                <!-- OFFERS SECTION -->
                <section id="offersSection">
                    <h2><i class="fas fa-tags"></i> Exclusive Offers</h2>
                    <div class="grid grid-3">
                        <div class="offer-card">
                            <h3>Welcome Bonus</h3>
                            <p style="color: #a0a0b0; margin: 10px 0;">Get 10% off on your first booking!</p>
                            <div class="offer-code">WELCOME10</div>
                            <p style="font-size: 12px; color: #666;">Valid for all users</p>
                        </div>
                        <div class="offer-card">
                            <h3>Mega Saver</h3>
                            <p style="color: #a0a0b0; margin: 10px 0;">Flat ₹500 off on flights & hotels!</p>
                            <div class="offer-code">FLAT500</div>
                            <p style="font-size: 12px; color: #666;">Min booking ₹5000</p>
                        </div>
                        <div class="offer-card">
                            <h3>Weekend Deal</h3>
                            <p style="color: #a0a0b0; margin: 10px 0;">Save 20% on events and movies!</p>
                            <div class="offer-code">SAVE20</div>
                            <p style="font-size: 12px; color: #666;">Valid till Sunday</p>
                        </div>
                    </div>
                </section>`;
content = content.replace(eventsSection, addedSections);

// 6. Add Hotels data and update switchTab logic
const appDataEvents = `events: [
                    { id: 14, name: 'Concert 2026', emoji: '🎤', price: 1500, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 500 },
                    { id: 15, name: 'Sports Event', emoji: '⚽', price: 800, category: 'events', rating: '⭐⭐⭐⭐', seats: 1000 },
                    { id: 16, name: 'Tech Conference', emoji: '💻', price: 2000, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 800 }
                ]`;
const appDataHotels = `events: [
                    { id: 14, name: 'Concert 2026', emoji: '🎤', price: 1500, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 500 },
                    { id: 15, name: 'Sports Event', emoji: '⚽', price: 800, category: 'events', rating: '⭐⭐⭐⭐', seats: 1000 },
                    { id: 16, name: 'Tech Conference', emoji: '💻', price: 2000, category: 'events', rating: '⭐⭐⭐⭐⭐', seats: 800 }
                ],
                hotels: [
                    { id: 17, name: 'Taj Palace', emoji: '🏨', price: 5000, category: 'hotels', rating: '⭐⭐⭐⭐⭐', seats: 50 },
                    { id: 18, name: 'Marriott Resort', emoji: '🏖️', price: 4000, category: 'hotels', rating: '⭐⭐⭐⭐⭐', seats: 40 },
                    { id: 19, name: 'City Inn', emoji: '🏢', price: 1500, category: 'hotels', rating: '⭐⭐⭐', seats: 100 }
                ]`;
content = content.replace(appDataEvents, appDataHotels);

// Add hotels grid rendering
const renderHomeOriginal = `renderGrid('eventsGrid', app.data.events);
            updateAuthButton();`;
const renderHomeNew = `renderGrid('eventsGrid', app.data.events);
            renderGrid('hotelsGrid', app.data.hotels);
            updateAuthButton();`;
content = content.replace(renderHomeOriginal, renderHomeNew);

// Add hotels to browse
const allItemsOriginal = `const allItems = [...app.data.movies, ...app.data.trains, ...app.data.flights, ...app.data.buses, ...app.data.events];`;
const allItemsNew = `const allItems = [...app.data.movies, ...app.data.trains, ...app.data.flights, ...app.data.buses, ...app.data.events, ...app.data.hotels];`;
content = content.replace(allItemsOriginal, allItemsNew);

// Update switchTab function logic for hotels
const switchTabOriginal = `document.getElementById('eventsGrid').parentElement.style.display = 'none';
            
            // Show selected section`;
const switchTabNew = `document.getElementById('eventsGrid').parentElement.style.display = 'none';
            document.getElementById('hotelsGrid').parentElement.style.display = 'none';
            
            // Show selected section`;
content = content.replace(switchTabOriginal, switchTabNew);

const switchTabEventsBlock = `} else if (tab === 'events') {
                document.getElementById('eventsGrid').parentElement.style.display = 'block';
                document.querySelector('h2').textContent = '🎪 Events & Shows';
            }`;
const switchTabEventsHotelsBlock = `} else if (tab === 'events') {
                document.getElementById('eventsGrid').parentElement.style.display = 'block';
                document.querySelector('#homeSection > div > section:nth-child(1) > h2').innerHTML = '<i class="fas fa-music"></i> Events & Shows';
            } else if (tab === 'hotels') {
                document.getElementById('hotelsGrid').parentElement.style.display = 'block';
                document.querySelector('#homeSection > div > section:nth-child(1) > h2').innerHTML = '<i class="fas fa-hotel"></i> Luxury Stays';
            }`;
// Doing a regex replace for the header setting because querySelector('h2') matches the first H2 which is Movies. In the original code it matched the first h2 which was buggy actually. Let's fix that too.
content = content.replace(/document\.querySelector\('h2'\)\.textContent = '🎬 Now Playing';/, `document.getElementById('moviesGrid').previousElementSibling.innerHTML = '<i class="fas fa-film"></i> Now Playing';`);
content = content.replace(/document\.querySelector\('h2'\)\.textContent = '🚂 Train Bookings';/, `document.getElementById('trainsGrid').previousElementSibling.innerHTML = '<i class="fas fa-train"></i> Train Bookings';`);
content = content.replace(/document\.querySelector\('h2'\)\.textContent = '✈️ Flight Bookings';/, `document.getElementById('flightsGrid').previousElementSibling.innerHTML = '<i class="fas fa-plane"></i> Flight Bookings';`);
content = content.replace(/document\.querySelector\('h2'\)\.textContent = '🚌 Bus Bookings';/, `document.getElementById('busesGrid').previousElementSibling.innerHTML = '<i class="fas fa-bus"></i> Bus Bookings';`);
content = content.replace(/document\.querySelector\('h2'\)\.textContent = '🎪 Events & Shows';/, `document.getElementById('eventsGrid').previousElementSibling.innerHTML = '<i class="fas fa-music"></i> Events & Shows';`);

// Inject Hotels into switchTab logic using simpler string manipulation since previous replace might be flaky:
content = content.replace(`document.getElementById('eventsGrid').parentElement.style.display = 'block';
            }`, `document.getElementById('eventsGrid').parentElement.style.display = 'block';
            } else if (tab === 'hotels') {
                document.getElementById('hotelsGrid').parentElement.style.display = 'block';
            }`);

// Also fix the initial view so that the first h2 updating works right... wait, I replaced the textContent ones.

// 7. Enhance AI Chat UI and Logic
// Replace thinking with typing indicator
const thinkingOriginal = `addChatMessage('🤖 Thinking...', 'bot');`;
const thinkingNew = `addChatMessage('<div class="typing-indicator"><span></span><span></span><span></span></div>', 'bot', true);`;
content = content.replace(thinkingOriginal, thinkingNew);

const removeThinkingOriginal = `const lastMsg = chatBody.lastChild;
                    if (lastMsg && lastMsg.textContent === '🤖 Thinking...') {
                        lastMsg.remove();
                    }`;
const removeThinkingNew = `const lastMsg = chatBody.lastChild;
                    if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) {
                        lastMsg.remove();
                    }`;
// Replace all occurrences
content = content.split(removeThinkingOriginal).join(removeThinkingNew);
// There is another one that might be different
content = content.replace(/if \(lastMsg && lastMsg.textContent === '🤖 Thinking\.\.\.'\) {[\s\S]*?}/g, `if (lastMsg && lastMsg.innerHTML.includes('typing-indicator')) { lastMsg.remove(); }`);

// Update addChatMessage to support HTML
const addChatOriginal = `messageDiv.textContent = message;`;
const addChatNew = `if (message.includes('<div class="typing-indicator"')) {
                messageDiv.innerHTML = message;
            } else {
                messageDiv.innerHTML = message;
            }`;
content = content.replace(addChatOriginal, addChatNew);

// 8. Add Splash screen removal on load
const onLoadOriginal = `loadStore();
            goHome();`;
const onLoadNew = `loadStore();
            goHome();
            
            // Remove splash screen after 2.5s
            setTimeout(() => {
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.classList.add('hidden');
                    setTimeout(() => splash.remove(), 800);
                }
            }, 2500);`;
content = content.replace(onLoadOriginal, onLoadNew);

fs.writeFileSync(indexPath, content);
console.log('Successfully updated index.html');
