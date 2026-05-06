// Images Configuration with Real URLs from Free Image Services

const IMAGES = {
    // Movies - High quality movie posters and stills
    movies: [
        {
            id: 1,
            title: "Pushpa 2: The Rule",
            image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
            poster: "🎬"
        },
        {
            id: 2,
            title: "Salaar 2",
            image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
            poster: "🎬"
        },
        {
            id: 3,
            title: "Article 370",
            image: "https://images.unsplash.com/photo-1533613220915-09d8d842adc1?w=400&h=600&fit=crop",
            poster: "🎬"
        },
        {
            id: 4,
            title: "Fighter",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=600&fit=crop",
            poster: "🎬"
        },
        {
            id: 5,
            title: "Bhaiyya Ji",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
            poster: "🎬"
        }
    ],
    
    // Trains - Railway stations and trains
    trains: [
        {
            id: 1,
            title: "Rajdhani Express",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            icon: "🚂"
        },
        {
            id: 2,
            title: "Shatabdi Express",
            image: "https://images.unsplash.com/photo-1534081333198-5ac0e903a08f?w=400&h=300&fit=crop",
            icon: "🚂"
        },
        {
            id: 3,
            title: "Local Express",
            image: "https://images.unsplash.com/photo-1519167758481-dc8986ba6c28?w=400&h=300&fit=crop",
            icon: "🚂"
        }
    ],
    
    // Flights - Airplanes and airports
    flights: [
        {
            id: 1,
            title: "Air India",
            image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop",
            icon: "✈️"
        },
        {
            id: 2,
            title: "Indigo Flight",
            image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=300&fit=crop",
            icon: "✈️"
        },
        {
            id: 3,
            title: "SpiceJet",
            image: "https://images.unsplash.com/photo-1552849287-83eb741e070d?w=400&h=300&fit=crop",
            icon: "✈️"
        }
    ],
    
    // Bus - Buses and highways
    buses: [
        {
            id: 1,
            title: "Premium Coach",
            image: "https://images.unsplash.com/photo-1570125909519-271b9d97b72f?w=400&h=300&fit=crop",
            icon: "🚌"
        },
        {
            id: 2,
            title: "Luxury Bus",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
            icon: "🚌"
        },
        {
            id: 3,
            title: "AC Volvo",
            image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop",
            icon: "🚌"
        }
    ],
    
    // Hero Images
    hero: [
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=400&fit=crop",
        "https://images.unsplash.com/photo-1570125909519-271b9d97b72f?w=1200&h=400&fit=crop"
    ],
    
    // Categories
    categories: {
        movies: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=300&h=300&fit=crop",
        trains: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=300&fit=crop",
        flights: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop",
        bus: "https://images.unsplash.com/photo-1570125909519-271b9d97b72f?w=300&h=300&fit=crop"
    }
};

// Get image by category and id
function getImage(category, id) {
    if (IMAGES[category] && IMAGES[category][id - 1]) {
        return IMAGES[category][id - 1].image;
    }
    return getDefaultImage();
}

// Get default placeholder image
function getDefaultImage() {
    return "https://images.unsplash.com/photo-1518640467387-5f2a6a51ead8?w=400&h=600&fit=crop";
}

// Get category image
function getCategoryImage(category) {
    return IMAGES.categories[category] || getDefaultImage();
}

// Get all images for category
function getCategoryImages(category) {
    return IMAGES[category] || [];
}
