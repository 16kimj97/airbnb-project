import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS_SUCCESS = "FETCH_SPOTS_SUCCESS";

// Action Creators
export const fetchSpotsSuccess = (spots) => ({
  type: FETCH_SPOTS_SUCCESS,
  payload: spots
});

// Thunk Actions
export const fetchSpots = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/spots");

    if (!response.ok) {
      throw new Error("Failed to fetch spots");
    }

    const data = await response.json();
    dispatch(fetchSpotsSuccess(data));
  } catch (error) {
    console.error("Failed to fetch spots:", error);
  }
};

// Initial State
const initialState = {
  allSpots: [],
  currentSpot: null
};

// Reducer
function spotReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPOTS_SUCCESS:
      return {
        ...state,
        allSpots: action.payload
      };
    default:
      return state;
  }
}

export default spotReducer;
