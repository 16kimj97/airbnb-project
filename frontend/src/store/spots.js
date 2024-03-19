// Action Types
const FETCH_SPOTS = 'spots/FETCH_SPOTS';

// Action Creator
const fetchSpotsSuccess = (spots) => ({
    type: FETCH_SPOTS,
    payload: spots
});

// Thunk Action
export const fetchSpots = () => async (dispatch) => {
    try {
        const response = await fetch("/api/spots");
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

// Reducer
const initialState = {};

function spotReducer(state = initialState, action) {
  switch (action.type) {
      case FETCH_SPOTS: {
          const newState = {};
          action.payload.Spots.forEach(spot => {
              newState[spot.id] = spot;
          });
          return newState;
      }
      default:
          return state;
  }
}

export default spotReducer;
