// ============= Razorpay Payment Handler =============

class PaymentHandler {
    constructor() {
        this.razorpayKey = null;
        this.currentOrder = null;
    }

    // Initialize Razorpay
    async initializeRazorpay() {
        // Load Razorpay script
        if (!window.Razorpay) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }
    }

    // Process payment
    async processPayment(bookingData) {
        try {
            // Create order on backend
            const orderData = await ticketAPI.createPaymentOrder(
                bookingData.bookingId,
                bookingData.finalPrice
            );

            this.currentOrder = orderData;
            await this.initializeRazorpay();

            return new Promise((resolve, reject) => {
                const options = {
                    key: orderData.key,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    order_id: orderData.orderId,
                    
                    handler: async (response) => {
                        try {
                            // Verify payment
                            const verified = await ticketAPI.verifyPayment(
                                bookingData.bookingId,
                                response.razorpay_payment_id,
                                response.razorpay_order_id,
                                response.razorpay_signature
                            );

                            if (verified.success) {
                                resolve({
                                    success: true,
                                    paymentId: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id,
                                    message: 'Payment successful'
                                });
                            }
                        } catch (err) {
                            reject(err);
                        }
                    },

                    prefill: {
                        name: bookingData.userName || 'Customer',
                        email: bookingData.userEmail || '',
                        contact: bookingData.userPhone || ''
                    },

                    notes: {
                        bookingId: bookingData.bookingId,
                        category: bookingData.category
                    },

                    theme: {
                        color: '#1e90ff'
                    }
                };

                const rzp = new window.Razorpay(options);
                
                rzp.on('payment.failed', (response) => {
                    reject(new Error(`Payment failed: ${response.error.description}`));
                });

                rzp.open();
            });
        } catch (err) {
            console.error('Payment processing error:', err);
            throw err;
        }
    }

    // Validate payment amount
    validateAmount(amount) {
        const minAmount = 10; // Minimum 10 rupees
        const maxAmount = 500000; // Maximum 5 lakhs
        
        if (amount < minAmount || amount > maxAmount) {
            throw new Error(`Amount must be between ₹${minAmount} and ₹${maxAmount}`);
        }
        return true;
    }
}

// Create global instance
const paymentHandler = new PaymentHandler();

// ============= Promo Code Handler =============

class PromoCodeHandler {
    constructor() {
        this.appliedPromo = null;
        this.discount = 0;
    }

    async validateAndApplyPromo(code, totalAmount) {
        try {
            const result = await ticketAPI.validatePromoCode(code, totalAmount);
            
            if (result.valid) {
                this.appliedPromo = code;
                this.discount = result.discount;
                
                return {
                    success: true,
                    discount: result.discount,
                    finalAmount: result.finalAmount,
                    discountPercentage: result.discountPercentage,
                    message: `Promo applied! You saved ₹${Math.round(result.discount)}`
                };
            }
        } catch (err) {
            throw new Error(err.message || 'Invalid promo code');
        }
    }

    removePromo() {
        this.appliedPromo = null;
        this.discount = 0;
    }

    getAppliedPromo() {
        return this.appliedPromo;
    }

    getDiscount() {
        return this.discount;
    }
}

// Create global instance
const promoHandler = new PromoCodeHandler();
