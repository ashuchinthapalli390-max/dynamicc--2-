// ============ DUMMY FLIGHTS DATA ============

const DUMMY_FLIGHTS = [
    {
        id: "FL001",
        airline: "Air India",
        flightNumber: "AI-123",
        from: "Hyderabad",
        to: "Delhi",
        departure: "10:00",
        arrival: "12:15",
        duration: "2h 15m",
        price: 3500,
        seats: { economy: 120, business: 30 },
        available: { economy: 25, business: 5 },
        stops: 0,
        aircraft: "Boeing 787",
        rating: 4.2
    },
    {
        id: "FL002",
        airline: "IndiGo",
        flightNumber: "6E-456",
        from: "Hyderabad",
        to: "Mumbai",
        departure: "14:30",
        arrival: "16:00",
        duration: "1h 30m",
        price: 2800,
        seats: { economy: 150, business: 20 },
        available: { economy: 40, business: 8 },
        stops: 0,
        aircraft: "Airbus A320",
        rating: 4.5
    },
    {
        id: "FL003",
        airline: "SpiceJet",
        flightNumber: "SG-789",
        from: "Bangalore",
        to: "Hyderabad",
        departure: "09:15",
        arrival: "10:30",
        duration: "1h 15m",
        price: 2200,
        seats: { economy: 100, business: 0 },
        available: { economy: 18, business: 0 },
        stops: 0,
        aircraft: "Boeing 737",
        rating: 3.9
    },
    {
        id: "FL004",
        airline: "Vistara",
        flightNumber: "UK-234",
        from: "Hyderabad",
        to: "Kochi",
        departure: "16:45",
        arrival: "18:30",
        duration: "1h 45m",
        price: 3200,
        seats: { economy: 140, business: 25 },
        available: { economy: 35, business: 12 },
        stops: 0,
        aircraft: "Airbus A320",
        rating: 4.6
    },
    {
        id: "FL005",
        airline: "Air India Express",
        flightNumber: "IX-567",
        from: "Hyderabad",
        to: "Bangalore",
        departure: "11:00",
        arrival: "12:15",
        duration: "1h 15m",
        price: 2000,
        seats: { economy: 180, business: 0 },
        available: { economy: 50, business: 0 },
        stops: 0,
        aircraft: "Boeing 737",
        rating: 4.1
    }
];

// ============ FLIGHTS API MANAGER ============

class FlightsAPI {
    static searchFlights(from, to, date, passengers = 1, cabinClass = 'economy') {
        let results = DUMMY_FLIGHTS.filter(f => 
            f.from.toLowerCase() === from.toLowerCase() &&
            f.to.toLowerCase() === to.toLowerCase()
        );

        // Filter by available seats
        results = results.filter(f => f.available[cabinClass] >= passengers);

        return results;
    }

    static getFlightById(id) {
        return DUMMY_FLIGHTS.find(f => f.id === id);
    }

    static sortByPrice(flights) {
        return [...flights].sort((a, b) => a.price - b.price);
    }

    static sortByDuration(flights) {
        const parseTime = (timeStr) => {
            const parts = timeStr.split('h');
            const hours = parseInt(parts[0]);
            const minutes = parseInt(parts[1]) || 0;
            return hours * 60 + minutes;
        };
        return [...flights].sort((a, b) => 
            parseTime(a.duration) - parseTime(b.duration)
        );
    }

    static sortByRating(flights) {
        return [...flights].sort((a, b) => b.rating - a.rating);
    }

    static filterByAirline(flights, airline) {
        return flights.filter(f => f.airline === airline);
    }

    static filterByStops(flights, maxStops) {
        return flights.filter(f => f.stops <= maxStops);
    }

    static filterByPrice(flights, minPrice, maxPrice) {
        return flights.filter(f => f.price >= minPrice && f.price <= maxPrice);
    }

    static getAirlines() {
        return [...new Set(DUMMY_FLIGHTS.map(f => f.airline))];
    }

    static getPopularRoutes() {
        return [
            { from: "Hyderabad", to: "Delhi" },
            { from: "Hyderabad", to: "Mumbai" },
            { from: "Bangalore", to: "Hyderabad" },
            { from: "Hyderabad", to: "Kochi" }
        ];
    }

    // When API is ready, replace with real call
    static async fetchFromAmadeus(from, to, date, passengers) {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': 'Bearer YOUR_AMADEUS_TOKEN'
        //     }
        // };
        // const res = await fetch(
        //     `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${date}&adults=${passengers}`,
        //     options
        // );
        // return await res.json();

        console.log("Amadeus API call:", { from, to, date, passengers });
        return this.searchFlights(from, to, date, passengers);
    }
}
