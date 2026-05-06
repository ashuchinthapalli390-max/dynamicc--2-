// ============ FEEDBACK & RATINGS API ============

const DUMMY_FEEDBACKS = {
    movies: [
        {
            id: "FB001",
            movieId: 1,
            userId: "user1",
            rating: 5,
            title: "Amazing Inception!",
            comment: "One of the best sci-fi movies ever made. Mind-bending plot with excellent execution.",
            date: "2026-05-01",
            helpful: 245
        },
        {
            id: "FB002",
            movieId: 1,
            userId: "user2",
            rating: 4,
            title: "Great but complex",
            comment: "Great movie but requires attention. Loved the cinematography.",
            date: "2026-05-02",
            helpful: 152
        },
        {
            id: "FB003",
            movieId: 7,
            userId: "user3",
            rating: 5,
            title: "Best Telugu film",
            comment: "Arjun Reddy is absolutely brilliant. Vijay Deverakonda's performance is outstanding!",
            date: "2026-05-03",
            helpful: 389
        },
        {
            id: "FB004",
            movieId: 8,
            userId: "user4",
            rating: 5,
            title: "Eega - Masterpiece!",
            comment: "One of the most creative revenge stories. S.S. Rajamouli's direction is exceptional.",
            date: "2026-05-04",
            helpful: 420
        }
    ],
    events: [
        {
            id: "FBE001",
            eventId: "EVENT001",
            userId: "user5",
            rating: 5,
            title: "Amazing Dance Performance",
            comment: "Bollywood Dance Night was absolutely fantastic! Great performers and atmosphere.",
            date: "2026-05-05",
            helpful: 120
        }
    ]
};

class FeedbackAPI {
    // Get ratings for movies
    static getMovieRatings(movieId) {
        return DUMMY_FEEDBACKS.movies.filter(f => f.movieId == movieId);
    }

    // Get average rating for movie
    static getAverageMovieRating(movieId) {
        const ratings = this.getMovieRatings(movieId);
        if (ratings.length === 0) return 0;
        const avg = ratings.reduce((sum, f) => sum + f.rating, 0) / ratings.length;
        return avg.toFixed(1);
    }

    // Get all feedbacks
    static getAllFeedbacks() {
        return [...DUMMY_FEEDBACKS.movies, ...DUMMY_FEEDBACKS.events];
    }

    // Submit feedback
    static submitFeedback(type, itemId, userId, rating, title, comment) {
        const feedback = {
            id: "FB" + Math.random().toString().slice(2, 6),
            [type + 'Id']: itemId,
            userId: userId,
            rating: rating,
            title: title,
            comment: comment,
            date: new Date().toISOString().split('T')[0],
            helpful: 0
        };
        
        if (type === 'movie') {
            DUMMY_FEEDBACKS.movies.push(feedback);
        } else {
            DUMMY_FEEDBACKS.events.push(feedback);
        }
        
        return feedback;
    }

    // Get helpful count
    static markHelpful(feedbackId) {
        const feedback = this.getAllFeedbacks().find(f => f.id === feedbackId);
        if (feedback) {
            feedback.helpful += 1;
            return feedback.helpful;
        }
        return 0;
    }

    // Get distribution of ratings
    static getRatingDistribution(movieId) {
        const ratings = this.getMovieRatings(movieId);
        const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        
        ratings.forEach(f => {
            distribution[f.rating]++;
        });
        
        return distribution;
    }
}
