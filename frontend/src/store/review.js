import { csrfFetch } from "./csrf";
import { fetchSpotById } from "./spots";

const GET_REVIEWS = '/reviews/viewReviews';
const CREATE_REVIEW = '/review/createReview';
const DELETE_REVIEW = '/review/deleteReview';

const getReviewsSuccess = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

const createReviewSuccess = (review) => ({
    type: CREATE_REVIEW,
    review
});

const deleteReviewSuccess = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const getAllReviews = (spotId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/spots/${spotId}/reviews`);
        if (response.ok) {
            const data = await response.json();
            dispatch(getReviewsSuccess(data.Reviews));
        } else {
            throw new Error('Could not fetch reviews');
        }
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

export const createReview = (reviews) => async (dispatch) => {
    const { review, stars, spotId } = reviews;
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify({
                review,
                stars,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createReviewSuccess(data));
            dispatch(getAllReviews(spotId));
            dispatch(fetchSpotById(spotId));
            return data;
        } else {
            throw new Error('Error creating review');
        }
    } catch (error) {
        console.error('Error creating review:', error);
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            dispatch(deleteReviewSuccess(reviewId));
        } else {
            throw new Error('Error deleting the review');
        }
    } catch (error) {
        console.error('Error deleting review:', error);
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
            return {
                ...state,
                reviews: newState
            };
        }
        default:
            return state;
    }
}

export default reviewReducer;
