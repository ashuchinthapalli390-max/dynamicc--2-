// ============= QR Code Scanner & Verifier =============

class QRCodeScanner {
    constructor() {
        this.isScanning = false;
        this.videoStream = null;
        this.codeReader = null;
        this.canvas = null;
        this.context = null;
    }

    // Initialize camera for QR scanning
    async initializeCamera(videoElement) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            videoElement.srcObject = stream;
            this.videoStream = stream;
            this.isScanning = true;

            // Start continuous scanning
            this.continuousCapture(videoElement);
            return true;
        } catch (err) {
            console.error('Camera access error:', err);
            throw new Error('Unable to access camera');
        }
    }

    // Continuous QR code detection
    continuousCapture(videoElement) {
        if (!this.isScanning) return;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        context.drawImage(videoElement, 0, 0);

        // Try to detect QR code
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = this.decodeQRCode(imageData);

        if (code) {
            this.stopScanning();
            return code;
        }

        requestAnimationFrame(() => this.continuousCapture(videoElement));
    }

    // Decode QR code from image data
    decodeQRCode(imageData) {
        // This requires jsQR library
        if (typeof jsQR !== 'undefined') {
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            return code ? code.data : null;
        }
        return null;
    }

    // Stop scanning
    stopScanning() {
        this.isScanning = false;
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
        }
    }

    // Manual QR code input
    parseManualInput(qrData) {
        const parts = qrData.split('|');
        if (parts.length < 3) {
            throw new Error('Invalid QR code format');
        }

        return {
            system: parts[0],
            bookingId: parts[1],
            userId: parts[2],
            timestamp: parts[3]
        };
    }
}

// ============= QR Code Verifier =============

class QRCodeVerifier {
    constructor() {
        this.lastVerifiedBooking = null;
    }

    // Verify QR code
    async verifyQRCode(qrData) {
        try {
            const result = await ticketAPI.verifyQRCode(qrData);

            if (result.valid) {
                this.lastVerifiedBooking = result;
                return {
                    success: true,
                    booking: result,
                    message: 'Booking verified successfully'
                };
            }
        } catch (err) {
            throw new Error(err.message || 'QR verification failed');
        }
    }

    // Get booking details from QR
    async getBookingFromQR(bookingId) {
        try {
            const booking = await ticketAPI.getBookingDetails(bookingId);
            return booking;
        } catch (err) {
            throw new Error('Unable to retrieve booking details');
        }
    }

    // Display QR code for booking
    async displayQRCode(bookingId) {
        try {
            const qrData = await ticketAPI.getQRCode(bookingId);
            return qrData.qrCode;
        } catch (err) {
            throw new Error('Unable to display QR code');
        }
    }

    // Download QR code as image
    downloadQRCode(qrDataUrl, bookingId) {
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `ticket-${bookingId}.png`;
        link.click();
    }

    // Get last verified booking
    getLastVerifiedBooking() {
        return this.lastVerifiedBooking;
    }
}

// ============= UI Components for QR =============

class QRCodeUI {
    // Display QR code modal
    static showQRCodeModal(qrCodeDataUrl, bookingDetails) {
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal__overlay"></div>
            <div class="qr-modal__content">
                <button class="qr-modal__close">&times;</button>
                
                <h2>Your Booking Ticket</h2>
                
                <div class="qr-code__container">
                    <img src="${qrCodeDataUrl}" alt="QR Code" class="qr-code__image">
                </div>
                
                <div class="booking-details">
                    <p><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
                    <p><strong>Category:</strong> ${bookingDetails.category}</p>
                    <p><strong>Seats:</strong> ${JSON.stringify(bookingDetails.seats)}</p>
                    <p><strong>Amount:</strong> ₹${bookingDetails.totalPrice}</p>
                    <p><strong>Status:</strong> <span class="badge-success">${bookingDetails.status}</span></p>
                </div>
                
                <div class="qr-modal__actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary">
                        Close
                    </button>
                    <button onclick="qrVerifier.downloadQRCode('${qrCodeDataUrl}', '${bookingDetails.bookingId}')" class="btn btn-primary">
                        Download
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.querySelector('.qr-modal__close').addEventListener('click', () => modal.remove());
    }

    // Show scanner interface
    static showScannerInterface() {
        const scanner = document.createElement('div');
        scanner.className = 'qr-scanner';
        scanner.innerHTML = `
            <div class="qr-scanner__overlay"></div>
            <div class="qr-scanner__container">
                <button class="qr-scanner__close">&times;</button>
                <h2>Scan QR Code</h2>
                <video class="qr-scanner__video" autoplay playsinline></video>
                <div class="qr-scanner__actions">
                    <button class="btn btn-secondary" id="stopScannerBtn">Stop Scanning</button>
                </div>
            </div>
        `;

        document.body.appendChild(scanner);
        return scanner;
    }
}

// Create global instances
const qrScanner = new QRCodeScanner();
const qrVerifier = new QRCodeVerifier();
