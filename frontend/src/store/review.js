import { csrfFetch } from "./csrf"

const GET_REVIEWS = '/reviews/viewReviews'
const CREATE_REVIEW = '/review/createReview'
const DELETE_REVIEW = '/review/deleteReview'

const getReviewsSucess = (reviews) => {
    return{
        type: GET_REVIEWS,
        reviews
    }
}

const createReviewSuccess = (review) =>{
    return{
        type: CREATE_REVIEW,
        review
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
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getReviewsSucess(data.Reviews));  // Assuming data.Reviews is the array you want
    } else {
        throw new Error('Could not fetch reviews');
    }
};

export const createReview = (review, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(createReviewSuccess(data));
        return data;
    } else {
        throw new Error('Error creating new review');
    }
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
        case CREATE_REVIEW: {
            const newState = { ...state, [action.review.id]: action.review };
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
