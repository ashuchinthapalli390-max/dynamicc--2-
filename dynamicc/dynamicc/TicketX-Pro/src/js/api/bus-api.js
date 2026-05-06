// ============ DUMMY BUS DATA ============

const DUMMY_BUSES = [
    {
        id: "BUS001",
        operator: "RedBus",
        busType: "AC Sleeper",
        from: "Hyderabad",
        to: "Bangalore",
        departure: "22:00",
        arrival: "06:30",
        duration: "8h 30m",
        distance: 570,
        price: 850,
        seats: 48,
        available: 12,
        amenities: ["WiFi", "Charging", "Blanket", "Water"],
        rating: 4.3,
        stops: 3,
        image: "🚌"
    },
    {
        id: "BUS002",
        operator: "SRS Travels",
        busType: "AC Sleeper",
        from: "Hyderabad",
        to: "Mumbai",
        departure: "19:00",
        arrival: "07:00",
        duration: "12h",
        distance: 715,
        price: 1200,
        seats: 40,
        available: 5,
        amenities: ["WiFi", "Pillow", "Blanket", "Snacks"],
        rating: 4.1,
        stops: 5,
        image: "🚌"
    },
    {
        id: "BUS003",
        operator: "VRL Travels",
        busType: "Semi Sleeper",
        from: "Hyderabad",
        to: "Bangalore",
        departure: "20:00",
        arrival: "05:30",
        duration: "9h 30m",
        distance: 570,
        price: 650,
        seats: 50,
        available: 20,
        amenities: ["AC", "Charging", "Water"],
        rating: 3.9,
        stops: 4,
        image: "🚌"
    },
    {
        id: "BUS004",
        operator: "Orange Tours",
        busType: "AC Chair",
        from: "Bangalore",
        to: "Hyderabad",
        departure: "14:00",
        arrival: "22:30",
        duration: "8h 30m",
        distance: 570,
        price: 550,
        seats: 55,
        available: 30,
        amenities: ["AC", "Water", "Charging"],
        rating: 4.0,
        stops: 2,
        image: "🚌"
    },
    {
        id: "BUS005",
        operator: "Kallada Travels",
        busType: "AC Sleeper",
        from: "Hyderabad",
        to: "Kochi",
        departure: "18:00",
        arrival: "10:00",
        duration: "16h",
        distance: 680,
        price: 1400,
        seats: 44,
        available: 8,
        amenities: ["WiFi", "Pillow", "Blanket", "Snacks", "Medical Kit"],
        rating: 4.4,
        stops: 6,
        image: "🚌"
    }
];

// ============ BUS API MANAGER ============

class BusAPI {
    static searchBuses(from, to, date) {
        let results = DUMMY_BUSES.filter(b => 
            b.from.toLowerCase() === from.toLowerCase() &&
            b.to.toLowerCase() === to.toLowerCase()
        );

        return results;
    }

    static getBusById(id) {
        return DUMMY_BUSES.find(b => b.id === id);
    }

    static sortByPrice(buses) {
        return [...buses].sort((a, b) => a.price - b.price);
    }

    static sortByDuration(buses) {
        const parseTime = (timeStr) => {
            const parts = timeStr.split('h');
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]) || 0;
            return hours * 60 + minutes;
        };
        return [...buses].sort((a, b) => 
            parseTime(a.duration) - parseTime(b.duration)
        );
    }

    static sortByRating(buses) {
        return [...buses].sort((a, b) => b.rating - a.rating);
    }

    static filterByBusType(buses, busType) {
        return buses.filter(b => b.busType === busType);
    }

    static filterByPrice(buses, minPrice, maxPrice) {
        return buses.filter(b => b.price >= minPrice && b.price <= maxPrice);
    }

    static filterByAmenity(buses, amenity) {
        return buses.filter(b => b.amenities.includes(amenity));
    }

    static getUniqueBusTypes() {
        return [...new Set(DUMMY_BUSES.map(b => b.busType))];
    }

    static getUniqueAmenities() {
        const amenities = new Set();
        DUMMY_BUSES.forEach(b => {
            b.amenities.forEach(a => amenities.add(a));
        });
        return Array.from(amenities);
    }

    static getPopularRoutes() {
        return [
            { from: "Hyderabad", to: "Bangalore" },
            { from: "Hyderabad", to: "Mumbai" },
            { from: "Bangalore", to: "Hyderabad" },
            { from: "Hyderabad", to: "Kochi" }
        ];
    }

    // When API is ready, replace with real call
    static async fetchFromRedBus(from, to, date) {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': 'your_rapidapi_key',
        //         'X-RapidAPI-Host': 'redbus.p.rapidapi.com'
        //     }
        // };
        // const res = await fetch(
        //     `https://redbus.api.rapidapi.com/searchBuses?from=${from}&to=${to}&date=${date}`,
        //     options
        // );
        // return await res.json();

        console.log("RedBus API call:", { from, to, date });
        return this.searchBuses(from, to, date);
    }
}
