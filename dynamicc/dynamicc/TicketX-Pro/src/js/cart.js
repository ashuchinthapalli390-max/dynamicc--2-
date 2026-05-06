// This file manages the shopping cart functionality, including adding and removing items.

const cart = [];

// Function to add an item to the cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear current cart display

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price}</p>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
    });

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h4>Total: $${totalPrice}</h4>`;
    cartContainer.appendChild(totalElement);
}

// Function to get the current cart items
function getCartItems() {
    return cart;
}