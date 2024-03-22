import { csrfFetch } from "./csrf";

// Action Types
const FETCH_SPOTS = 'spots/FETCH_SPOTS';
const GET_SPOT_BY_ID = 'spots/GET_SPOT_BY_ID';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const GET_SPOT_BY_USER_ID = 'spots/GET_SPOT_BY_USER_ID';
const UPDATE_SPOT = 'spots/UPDATE_SPOTS'


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
//SpotbyId Action Creator
const getSpotByUserIdSuccess = (spots) => ({
    type: GET_SPOT_BY_USER_ID,
    payload: spots
});

const updateSpotSuccess = (spot) => ({
    type: UPDATE_SPOT,
    payload: spot,
})


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
        dispatch(createNewSpot(data.id))

        spot.SpotImages.map(img => {
            csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url: img.url,
                    preview: img.preview
                })
            })
        })
        return data;
    }
    if(!response.ok){
        throw new Error('Error creating new spot')
    }
}

// Thunk Action to Fetch Spots by User ID
export const getSpotByUserId = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/current`, {
            method: "GET"
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(getSpotByUserIdSuccess(data));
            return data;
        } else {
            throw new Error(`Failed to fetch spots for the current user`);
        }
    } catch (error) {
        console.error(`Error fetching spots for the current user:`, error);
    }
};

//Thunk action to update Spot
export const fetchUpdateSpot = (spot) => async (dispatch) => {
    const {
      id,
      country,
      address,
      city,
      state,
      lat,
      lng,
      description,
      name,
      price,
      previewImage,
      image2,
      image3,
      image4,
      image5,
    } = spot;

    try {
      const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          country,
          address,
          city,
          state,
          lat,
          lng,
          description,
          name,
          price,
          previewImage,
          image2,
          image3,
          image4,
          image5,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the spot.');
      }

      const updatedSpot = await response.json();
      dispatch(updateSpotSuccess(updatedSpot));
    } catch (error) {
      console.error('Error updating spot:', error);
    }
  };


// initial
const initialState = { spot: null, spots: [] };

//Reducer
function spotReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_SPOTS: {
        const spots = {};
        action.payload.Spots.forEach((spot) => {
          spots[spot.id] = spot;
        });
        return {
          ...state,
          spots,
        };
      }
      case GET_SPOT_BY_ID: {
        return {
          ...state,
          spot: action.payload,
        };
      }
      case GET_SPOT_BY_USER_ID: {
        return {
            ...state,
            spots: action.payload,
        };
    }
      default:
        return state;
    }
  }

  export default spotReducer;
