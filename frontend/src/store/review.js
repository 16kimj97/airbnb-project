import { csrfFetch } from "./csrf"
import { fetchSpotById } from "./spots"

const GET_REVIEWS = '/reviews/viewReviews'
const DELETE_REVIEW = '/review/deleteReview'

const getReviewsSucess = (reviews) => {
    return{
        type: GET_REVIEWS,
        reviews
    }
}

const deleteReviewSuccess = (reviewId) => {
    return{
        type: DELETE_REVIEW,
        reviewId
    }
}

//Thunks
export const getAllReviews = (spotId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${spotId}/reviews`);
        if (!response.ok) {
            throw new Error('Could not fetch reviews');
        }
        const data = await response.json();

        const reversedReviews = data.Reviews.reverse();

        dispatch(getReviewsSucess(reversedReviews));
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

export const createReview = (reviews) => async (dispatch) => {
    const { review, stars, spotId } = reviews;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars,
        }),
    });

    const data = await response.json();
    dispatch(getAllReviews(spotId));
    dispatch(fetchSpotById(spotId));

    return data;
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteReviewSuccess(reviewId));
    } else {
        throw new Error('Error deleting the review');
    }
};

const initialState = {
    reviews: {}
  };


function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS: {
            const newState = { ...state };
            action.reviews.forEach(review => {
                newState[review.id] = review;
            });
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewReducer;
