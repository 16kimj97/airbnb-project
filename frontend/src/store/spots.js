import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS = 'spots/FETCH_SPOTS';
const GET_SPOT_BY_ID = 'spots/GET_SPOT_BY_ID';

// Action Creator For Fetching Spots
const fetchSpotsSuccess = (spots) => ({
    type: FETCH_SPOTS,
    payload: spots
});
//GetSpotById Action Creator
const getSpotByIdSuccess = (spot) => ({
  type: GET_SPOT_BY_ID,
  payload: spot
});


// Thunk Action fetchspots
export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch("/api/spots");
        if (response.ok) {
            const data = await response.json();
            dispatch(fetchSpotsSuccess(data));
        } else {
            throw new Error("Failed to fetch all spots");
        }
    } catch (error) {
        console.error("Error fetching all spots:", error);
    }
};

//ThunkAction FetchSpotById
export const fetchSpotById = (spotId) => async (dispatch) => {
  try {
      const response = await csrfFetch(`/api/spots/${spotId}`);
      if (response.ok) {
          const data = await response.json();
          dispatch(getSpotByIdSuccess(data));
      } else {
          throw new Error(`Failed to fetch the spot with ID: ${spotId}`);
      }
  } catch (error) {
      console.error(`Error fetching the spot with ID: ${spotId}:`, error);
  }
};


// initial
const initialState = { spot: null, spots: [] };

//Reducer
function spotReducer(state = initialState, action) {
  switch (action.type) {
      case FETCH_SPOTS: {
          const spots = {};
          action.payload.Spots.forEach(spot => {
              spots[spot.id] = spot;
          });
          return {
              ...state,
              spots
          };
      }
      case GET_SPOT_BY_ID: {
          return {
              ...state,
              spot: action.payload
          };
      }
      default:
          return state;
  }
}

export default spotReducer;
