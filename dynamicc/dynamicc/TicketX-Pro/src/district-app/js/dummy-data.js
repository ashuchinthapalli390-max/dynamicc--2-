const moviesData = [
    {
        id: 1,
        title: "Leo",
        language: "Tamil",
        duration: "2h 40m",
        rating: 4.5,
        votes: "120K",
        genre: "Action, Thriller",
        poster: "https://image.tmdb.org/t/p/w500/p9DKeXp6FPJtAQ1k13Z4zPPeXfas.jpg",
        banner: "https://image.tmdb.org/t/p/w1280/p9DKeXp6FPJtAQ1k13Z4zPPeXfas.jpg",
        description: "A mild-mannered cafe owner becomes a local hero through an act of violence, which sets off repercussions with connections to an old life he left behind."
    },
    {
        id: 2,
        title: "Salaar: Part 1 - Ceasefire",
        language: "Telugu",
        duration: "2h 55m",
        rating: 4.7,
        votes: "200K",
        genre: "Action, Drama",
        poster: "https://image.tmdb.org/t/p/w500/vybm1rE3hH7QngJnfGsz30yL47W.jpg",
        banner: "https://image.tmdb.org/t/p/w1280/vybm1rE3hH7QngJnfGsz30yL47W.jpg",
        description: "A gang leader makes a promise to his dying friend by taking on the other criminal gangs."
    },
    {
        id: 3,
        title: "Fighter",
        language: "Hindi",
        duration: "2h 46m",
        rating: 4.3,
        votes: "95K",
        genre: "Action, Thriller",
        poster: "https://image.tmdb.org/t/p/w500/zDZowwb9GZGEctAu2PCpjiPQAMM.jpg",
        banner: "https://image.tmdb.org/t/p/w1280/zDZowwb9GZGEctAu2PCpjiPQAMM.jpg",
        description: "Top IAF aviators come together in the face of imminent danger, to form Air Dragons."
    },
    {
        id: 4,
        title: "Dune: Part Two",
        language: "English",
        duration: "2h 46m",
        rating: 4.8,
        votes: "300K",
        genre: "Sci-Fi, Adventure",
        poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc91p.jpg",
        banner: "https://image.tmdb.org/t/p/w1280/1pdfLvkbY9ohJlCjQH2JGjjc91p.jpg",
        description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family."
    }
];

const theatresData = [
    {
        id: 101,
        name: "PVR: Inorbit Mall, Cyberabad",
        location: "Hitech City",
        formats: ["2D", "3D", "IMAX"],
        timings: ["10:00 AM", "01:30 PM", "05:00 PM", "09:30 PM"],
        price: 250
    },
    {
        id: 102,
        name: "AMB Cinemas: Gachibowli",
        location: "Gachibowli",
        formats: ["2D", "3D"],
        timings: ["11:00 AM", "02:45 PM", "06:30 PM", "10:15 PM"],
        price: 300
    },
    {
        id: 103,
        name: "Cinepolis: Nexus Mall",
        location: "Kukatpally",
        formats: ["2D", "4DX"],
        timings: ["09:30 AM", "12:45 PM", "04:00 PM", "08:15 PM"],
        price: 200
    },
    {
        id: 104,
        name: "Prasads Multiplex",
        location: "Necklace Road",
        formats: ["2D", "Large Screen"],
        timings: ["08:45 AM", "12:15 PM", "03:45 PM", "07:30 PM", "11:00 PM"],
        price: 150
    }
];

// Initialize LocalStorage if empty
if (!localStorage.getItem('movies')) {
    localStorage.setItem('movies', JSON.stringify(moviesData));
}
if (!localStorage.getItem('theatres')) {
    localStorage.setItem('theatres', JSON.stringify(theatresData));
}
if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
}
