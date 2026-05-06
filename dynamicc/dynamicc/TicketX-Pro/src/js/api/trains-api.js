// ============ DUMMY TRAINS DATA ============

const DUMMY_TRAINS = [
    {
        id: "TR001",
        name: "Hyderabad Express",
        number: "17201",
        from: "Hyderabad",
        to: "Delhi",
        departure: "22:00",
        arrival: "09:45",
        duration: "11h 45m",
        distance: 850,
        classes: {
            "Sleeper": { seats: 200, price: 850, available: 45 },
            "AC 3-Tier": { seats: 150, price: 1200, available: 20 },
            "AC 2-Tier": { seats: 100, price: 1800, available: 5 }
        },
        rating: 4.2,
        stops: 8
    },
    {
        id: "TR002",
        name: "Rajdhani Express",
        number: "12001",
        from: "Hyderabad",
        to: "Mumbai",
        departure: "15:30",
        arrival: "07:20",
        duration: "15h 50m",
        distance: 715,
        classes: {
            "Sleeper": { seats: 150, price: 750, available: 30 },
            "AC 3-Tier": { seats: 100, price: 1100, available: 25 }
        },
        rating: 4.5,
        stops: 6
    },
    {
        id: "TR003",
        name: "Shatabdi Express",
        number: "12001",
        from: "Bangalore",
        to: "Hyderabad",
        departure: "06:00",
        arrival: "09:30",
        duration: "3h 30m",
        distance: 570,
        classes: {
            "Executive Chair": { seats: 60, price: 900, available: 12 },
            "Ordinary Chair": { seats: 120, price: 500, available: 35 }
        },
        rating: 4.3,
        stops: 4
    },
    {
        id: "TR004",
        name: "Kerala Express",
        number: "12625",
        from: "Hyderabad",
        to: "Kochi",
        departure: "14:20",
        arrival: "06:15",
        duration: "15h 55m",
        distance: 680,
        classes: {
            "Sleeper": { seats: 200, price: 800, available: 50 },
            "AC 3-Tier": { seats: 120, price: 1300, available: 18 }
        },
        rating: 4.4,
        stops: 10
    },
    {
        id: "TR005",
        name: "Deccan Intercity",
        number: "17311",
        from: "Hyderabad",
        to: "Bangalore",
        departure: "07:15",
        arrival: "16:10",
        duration: "8h 55m",
        distance: 570,
        classes: {
            "Sleeper": { seats: 220, price: 700, available: 62 },
            "AC 3-Tier": { seats: 140, price: 1050, available: 38 },
            "AC 2-Tier": { seats: 90, price: 1550, available: 12 }
        },
        rating: 4.3,
        stops: 7
    },
    {
        id: "TR006",
        name: "Capital Superfast",
        number: "12908",
        from: "Delhi",
        to: "Mumbai",
        departure: "20:35",
        arrival: "10:20",
        duration: "13h 45m",
        distance: 1380,
        classes: {
            "Sleeper": { seats: 260, price: 980, available: 70 },
            "AC 3-Tier": { seats: 180, price: 1480, available: 34 },
            "AC 2-Tier": { seats: 110, price: 2280, available: 16 }
        },
        rating: 4.6,
        stops: 9
    },
    {
        id: "TR007",
        name: "Coastal Runner",
        number: "16622",
        from: "Mumbai",
        to: "Kochi",
        departure: "18:10",
        arrival: "11:45",
        duration: "17h 35m",
        distance: 1260,
        classes: {
            "Sleeper": { seats: 210, price: 930, available: 55 },
            "AC 3-Tier": { seats: 130, price: 1420, available: 28 }
        },
        rating: 4.2,
        stops: 12
    },
    {
        id: "TR008",
        name: "Southern Link Express",
        number: "12698",
        from: "Bangalore",
        to: "Delhi",
        departure: "16:25",
        arrival: "09:15",
        duration: "16h 50m",
        distance: 1740,
        classes: {
            "Sleeper": { seats: 240, price: 1150, available: 48 },
            "AC 3-Tier": { seats: 160, price: 1750, available: 31 },
            "AC 2-Tier": { seats: 95, price: 2550, available: 11 }
        },
        rating: 4.5,
        stops: 11
    }
];

// ============ TRAINS API MANAGER ============

class TrainsAPI {
    static searchTrains(from, to, date, travelClass = null) {
        let results = DUMMY_TRAINS.filter(t => 
            t.from.toLowerCase() === from.toLowerCase() &&
            t.to.toLowerCase() === to.toLowerCase()
        );

        if (travelClass) {
            results = results.filter(t => t.classes[travelClass]);
        }

        return results;
    }

    static getTrainById(id) {
        return DUMMY_TRAINS.find(t => t.id === id);
    }

    static getAvailableClasses(trainId) {
        const train = this.getTrainById(trainId);
        if (!train) return [];
        return Object.keys(train.classes);
    }

    static getClassDetails(trainId, className) {
        const train = this.getTrainById(trainId);
        if (!train) return null;
        return train.classes[className];
    }

    static getPopularRoutes() {
        return [
            { from: "Hyderabad", to: "Delhi" },
            { from: "Hyderabad", to: "Mumbai" },
            { from: "Bangalore", to: "Hyderabad" },
            { from: "Hyderabad", to: "Kochi" },
            { from: "Hyderabad", to: "Bangalore" },
            { from: "Delhi", to: "Mumbai" },
            { from: "Mumbai", to: "Kochi" },
            { from: "Bangalore", to: "Delhi" }
        ];
    }

    static getTrainsBetweenDates(from, to, startDate, endDate) {
        // In real implementation, filter by date range
        return this.searchTrains(from, to);
    }

    // When API is ready, replace with real call
    static async fetchFromRapidAPI(from, to, date) {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': 'your_rapidapi_key',
        //         'X-RapidAPI-Host': 'railway.api.rapid.api'
        //     }
        // };
        // const res = await fetch(`https://railway-api.com/search?from=${from}&to=${to}&date=${date}`, options);
        // return await res.json();
        
        console.log("Railway API call:", { from, to, date });
        return this.searchTrains(from, to, date);
    }
}
