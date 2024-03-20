import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS = 'spots/FETCH_SPOTS';
const GET_SPOT_BY_ID = 'spots/GET_SPOT_BY_ID';
export const CREATE_SPOT = 'spots/CREATE_SPOT';

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
//CreateSpot Action creator
export const createSpotSuccess = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot,
    };
};


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

//Create a spot
export const createNewSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(viewSpot(data.id))

        spot.SpotImages.map(img => {
            csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url: img.url
                })
            })
        })
        return data;
    }
    if(!response.ok){
        throw new Error('Error creating new spot')
    }
}



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
      case CREATE_SPOT: {
        return {
          ...state,
          spots: [...state.spots, action.payload]
        };
      }
      default:
        return state;
    }
  }

export default spotReducer;
