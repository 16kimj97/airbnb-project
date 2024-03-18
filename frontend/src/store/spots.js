import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS_SUCCESS = "FETCH_SPOTS_SUCCESS";

// Action Creators
export const fetchSpotsSuccess = (spots) => ({ type: FETCH_SPOTS_SUCCESS, payload: spots });

// Fetch All Spots Thunk
export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await fetch("/api/spots", {  // Ensure the path is correct
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch spots. Server returned: " + response.statusText);
        }

        const data = await response.json();
        dispatch(fetchSpotsSuccess(data));
    } catch (error) {
        console.error("Failed to fetch spots:", error);
    }
};

// Reducer
const initialState = {
    spots: []
  };

  function spotReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_SPOTS_SUCCESS:
        return { ...state, spots: action.payload };
      default:
        return state;
    }
  }

export default spotReducer;
