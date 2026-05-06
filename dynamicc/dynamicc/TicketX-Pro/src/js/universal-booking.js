// ============= UNIVERSAL BOOKING HANDLER =============
// This works for all booking pages - Movies, Trains, Flights, Buses, Events

class UniversalBookingHandler {
    static bookNow(itemData) {
        // Check if logged in
        if (typeof userAuth !== 'undefined' && !userAuth.isLoggedIn()) {
            alert('Please login first!');
            window.location.href = '/pages/login.html';
            return;
        }

        // Validate item data
        if (!itemData.name || !itemData.price) {
            alert('Invalid booking data');
            return;
        }

        // Add to cart
        if (typeof bookingSystem !== 'undefined') {
            bookingSystem.addToCart({
                ...itemData,
                quantity: 1
            });

            // Show confirmation
            setTimeout(() => {
                if (confirm('Item added to cart! Go to checkout?')) {
                    window.location.href = '/pages/checkout.html';
                }
            }, 300);
        } else {
            alert('Booking system not initialized');
        }
    }

    static showBookingForm(item) {
        const form = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            " id="bookingModal" onclick="if(event.target.id === 'bookingModal') closeBookingModal();">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    max-width: 400px;
                    width: 90%;
                ">
                    <h2 style="color: var(--primary); margin-bottom: 20px;">🎫 Book Now</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <p><strong>${item.name}</strong></p>
                        <p style="color: #666; margin: 10px 0;">Category: ${item.category}</p>
                        <p style="color: #666; margin: 10px 0;">Price: <span style="color: var(--primary); font-weight: 600;">₹${item.price}</span></p>
                    </div>

                    <label style="display: block; margin-bottom: 10px; font-weight: 600;">Number of Tickets/Seats</label>
                    <input type="number" id="quantityInput" value="1" min="1" max="10" style="
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ddd;
                        border-radius: 6px;
                        margin-bottom: 20px;
                        box-sizing: border-box;
                    ">

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button onclick="closeBookingModal()" style="
                            padding: 10px;
                            background: #ddd;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">Cancel</button>
                        <button onclick="confirmBooking('${item.name}', ${item.price}, '${item.category}')" style="
                            padding: 10px;
                            background: var(--primary);
                            color: white;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 600;
                        ">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', form);
    }

    static viewDetails(item) {
        const details = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                z-index: 1500;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            " id="detailsModal" onclick="if(event.target.id === 'detailsModal') document.getElementById('detailsModal').remove();">
                <div style="
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                ">
                    <button onclick="document.getElementById('detailsModal').remove()" style="
                        float: right;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                    ">×</button>

                    <h2 style="color: var(--primary); margin-bottom: 20px;">${item.name}</h2>

                    <div style="margin-bottom: 15px;">
                        <strong>Category:</strong> ${item.category}
                    </div>

                    <div style="margin-bottom: 15px;">
                        <strong>Price:</strong> <span style="color: var(--primary); font-size: 18px;">₹${item.price}</span>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <strong>Description:</strong>
                        <p>${item.description || 'Premium booking experience'}</p>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <strong>Rating:</strong> ⭐ ${item.rating || '4.5'}/5
                    </div>

                    <button onclick="UniversalBookingHandler.showBookingForm(${JSON.stringify(item).replace(/"/g, '&quot;')})" style="
                        width: 100%;
                        padding: 12px;
                        background: var(--primary);
                        color: white;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        font-weight: 600;
                        margin-top: 20px;
                    ">🎫 Book Now</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', details);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.remove();
}

function confirmBooking(name, price, category) {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;

    if (typeof bookingSystem !== 'undefined') {
        bookingSystem.addToCart({
            name,
            price,
            category,
            quantity,
            id: 'ITEM' + Date.now()
        });

        closeBookingModal();

        // Show success and ask to checkout
        setTimeout(() => {
            if (confirm('✅ Added to cart! Proceed to checkout?')) {
                window.location.href = '/pages/checkout.html';
            }
        }, 500);
    }
}
