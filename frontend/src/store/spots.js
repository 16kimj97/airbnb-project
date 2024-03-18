import { csrfFetch } from "./csrf";

const FETCH_SPOTS_SUCCESS = "FETCH_SPOTS_SUCCESS";

export const fetchSpotsSuccess = (spots) => ({
    type: FETCH_SPOTS_SUCCESS,
    payload: spots
  });


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
