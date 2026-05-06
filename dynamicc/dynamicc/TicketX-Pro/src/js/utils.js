function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`;
}

function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}