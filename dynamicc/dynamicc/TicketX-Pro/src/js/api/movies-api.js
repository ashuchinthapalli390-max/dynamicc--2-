// ============ DUMMY MOVIES DATA ============

const DUMMY_MOVIES = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        rating: 8.8,
        price: 250,
        duration: 148,
        language: "English",
        poster: "🎬",
        description: "A skilled thief who steals corporate secrets through the use of dream-sharing technology.",
        releaseDate: "2010-07-16",
        director: "Christopher Nolan"
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Action",
        rating: 9.0,
        price: 280,
        duration: 152,
        language: "English",
        poster: "🎬",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.",
        releaseDate: "2008-07-18",
        director: "Christopher Nolan"
    },
    {
        id: 3,
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 8.6,
        price: 300,
        duration: 169,
        language: "English",
        poster: "🎬",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        releaseDate: "2014-11-07",
        director: "Christopher Nolan"
    },
    {
        id: 4,
        title: "Parasite",
        genre: "Thriller",
        rating: 8.5,
        price: 220,
        duration: 132,
        language: "Korean",
        poster: "🎬",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship.",
        releaseDate: "2019-05-30",
        director: "Bong Joon-ho"
    },
    {
        id: 5,
        title: "Oppenheimer",
        genre: "Drama",
        rating: 8.3,
        price: 250,
        duration: 180,
        language: "English",
        poster: "🎬",
        description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        releaseDate: "2023-07-21",
        director: "Christopher Nolan"
    },
    {
        id: 6,
        title: "Dune",
        genre: "Sci-Fi",
        rating: 8.0,
        price: 280,
        duration: 166,
        language: "English",
        poster: "🎬",
        description: "Paul Atreides, a brilliant young man, must travel to the dangerous planet Dune.",
        releaseDate: "2021-10-22",
        director: "Denis Villeneuve"
    },
    
    // ========== TELUGU MOVIES ========== 
    {
        id: 7,
        title: "Arjun Reddy",
        genre: "Drama/Romance",
        rating: 8.9,
        price: 220,
        duration: 143,
        language: "Telugu",
        poster: "🎬",
        description: "A passionate love story of a young surgeon who spirals into self-destruction after his love rejects him.",
        releaseDate: "2017-06-22",
        director: "Sandeep Vanga",
        reviews: 4.8
    },
    {
        id: 8,
        title: "Eega",
        genre: "Thriller/Fantasy",
        rating: 8.7,
        price: 200,
        duration: 125,
        language: "Telugu",
        poster: "🎬",
        description: "A young man is reborn as a housefly to seek revenge on his killers.",
        releaseDate: "2012-08-02",
        director: "S.S. Rajamouli",
        reviews: 4.7
    },
    {
        id: 9,
        title: "Magadheera",
        genre: "Action/Romance",
        rating: 8.5,
        price: 240,
        duration: 180,
        language: "Telugu",
        poster: "🎬",
        description: "A man and woman discover they are reincarnations of medieval-era lovers torn apart by war.",
        releaseDate: "2009-07-31",
        director: "S.S. Rajamouli",
        reviews: 4.6
    },
    {
        id: 10,
        title: "Baahubali: The Beginning",
        genre: "Action/Adventure",
        rating: 8.3,
        price: 250,
        duration: 139,
        language: "Telugu",
        poster: "🎬",
        description: "An epic tale of two brothers on opposite sides of a war between two kingdoms.",
        releaseDate: "2015-07-10",
        director: "S.S. Rajamouli",
        reviews: 4.9
    },
    {
        id: 11,
        title: "Baahubali 2: The Conclusion",
        genre: "Action/Adventure",
        rating: 8.4,
        price: 260,
        duration: 167,
        language: "Telugu",
        poster: "🎬",
        description: "The conclusion of the epic Baahubali saga with grand battles and shocking revelations.",
        releaseDate: "2017-04-28",
        director: "S.S. Rajamouli",
        reviews: 4.8
    },
    {
        id: 12,
        title: "Ala Vaikunthapurramuloo",
        genre: "Action/Comedy",
        rating: 7.9,
        price: 200,
        duration: 142,
        language: "Telugu",
        poster: "🎬",
        description: "A man discovers his true identity and fights for justice while navigating family drama.",
        releaseDate: "2020-01-12",
        director: "Trivikram Srinivas",
        reviews: 4.5
    },
    {
        id: 13,
        title: "RRR",
        genre: "Action/Thriller",
        rating: 8.8,
        price: 280,
        duration: 187,
        language: "Telugu",
        poster: "🎬",
        description: "Two revolutionaries' fight against British imperialism in 1920s India with mind-blowing action.",
        releaseDate: "2022-03-25",
        director: "S.S. Rajamouli",
        reviews: 4.9
    },
    {
        id: 14,
        title: "Geetha Govindam",
        genre: "Romance/Comedy",
        rating: 7.8,
        price: 180,
        duration: 135,
        language: "Telugu",
        poster: "🎬",
        description: "A young man's romantic journey filled with misunderstandings and heartfelt moments.",
        releaseDate: "2018-08-15",
        director: "Parasuram",
        reviews: 4.4
    },
    {
        id: 15,
        title: "Kabali",
        genre: "Crime/Thriller",
        rating: 8.1,
        price: 210,
        duration: 140,
        language: "Telugu",
        poster: "🎬",
        description: "A man seeks revenge against the criminal underworld that destroyed his life.",
        releaseDate: "2016-07-22",
        director: "Pa. Ranjith",
        reviews: 4.3
    },
    {
        id: 16,
        title: "Jalsa",
        genre: "Thriller/Drama",
        rating: 8.2,
        price: 220,
        duration: 138,
        language: "Telugu",
        poster: "🎬",
        description: "A gripping thriller about accident responsibility and moral consequences.",
        releaseDate: "2022-03-18",
        director: "Suresh Trivikram",
        reviews: 4.6
    },
    {
        id: 17,
        title: "Kalki 2898 AD",
        genre: "Sci-Fi/Action",
        rating: 8.4,
        price: 300,
        duration: 176,
        language: "Telugu",
        poster: "ðŸŽ¬",
        description: "An epic dystopian action adventure set in a futuristic world.",
        releaseDate: "2024-06-27",
        director: "Nag Ashwin",
        reviews: 4.7
    },
    {
        id: 18,
        title: "Animal",
        genre: "Crime/Drama",
        rating: 7.9,
        price: 260,
        duration: 201,
        language: "Hindi",
        poster: "ðŸŽ¬",
        description: "A dark family drama with intense action and emotional conflict.",
        releaseDate: "2023-12-01",
        director: "Sandeep Reddy Vanga",
        reviews: 4.2
    },
    {
        id: 19,
        title: "Leo",
        genre: "Action/Thriller",
        rating: 7.8,
        price: 240,
        duration: 164,
        language: "Tamil",
        poster: "ðŸŽ¬",
        description: "A cafe owner with a mysterious past is pulled into a violent world.",
        releaseDate: "2023-10-19",
        director: "Lokesh Kanagaraj",
        reviews: 4.1
    },
    {
        id: 20,
        title: "Salaar",
        genre: "Action/Drama",
        rating: 8.0,
        price: 280,
        duration: 174,
        language: "Telugu",
        poster: "ðŸŽ¬",
        description: "Two lifelong friends become rivals in a kingdom built on power.",
        releaseDate: "2023-12-22",
        director: "Prashanth Neel",
        reviews: 4.4
    }
];

const DUMMY_SHOWTIMES = [
    { time: "10:00 AM", available: 25 },
    { time: "01:30 PM", available: 8 },
    { time: "04:45 PM", available: 0 },
    { time: "08:15 PM", available: 12 }
];

const DUMMY_THEATRES = [
    { id: 1, name: "Cineplex Premium", location: "Hyderabad", screens: 4 },
    { id: 2, name: "IMAX Theatre", location: "Hyderabad", screens: 2 },
    { id: 3, name: "PVR Cinemas", location: "Hyderabad", screens: 6 }
];

// ============ MOVIES API MANAGER ============

class MoviesAPI {
    static getAllMovies() {
        return DUMMY_MOVIES;
    }

    static getMovieById(id) {
        return DUMMY_MOVIES.find(m => m.id == id);
    }

    static searchMovies(query) {
        return DUMMY_MOVIES.filter(m =>
            m.title.toLowerCase().includes(query.toLowerCase()) ||
            m.genre.toLowerCase().includes(query.toLowerCase())
        );
    }

    static getMoviesByGenre(genre) {
        return DUMMY_MOVIES.filter(m => m.genre === genre);
    }

    static getShowtimes() {
        return DUMMY_SHOWTIMES;
    }

    static getTheatres() {
        return DUMMY_THEATRES;
    }

    static getTopRated() {
        return [...DUMMY_MOVIES].sort((a, b) => b.rating - a.rating).slice(0, 4);
    }

    static getLatest() {
        return [...DUMMY_MOVIES].sort((a, b) => 
            new Date(b.releaseDate) - new Date(a.releaseDate)
        ).slice(0, 4);
    }

    // When API is ready, replace with real call
    static async fetchFromTMDB(endpoint) {
        // const TMDB_KEY = "your_tmdb_key_here";
        // const res = await fetch(`https://api.themoviedb.org/3${endpoint}?api_key=${TMDB_KEY}&region=IN`);
        // return await res.json();
        
        console.log("TMDB API endpoint:", endpoint);
        return DUMMY_MOVIES;
    }
}
