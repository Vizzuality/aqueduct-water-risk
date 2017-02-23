/* Constants */
const SET_MAP_LOCATION = 'SET_MAP_LOCATION';

/* Initial state */
const initialState = {
  zoom: 2,
  latLng: {
    lat: 30,
    lng: -120
  }
};

/* Reducer */
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, {
        zoom: isNaN(action.payload.zoom) ? state.zoom : action.payload.zoom,
        latLng: {
          lat: isNaN(action.payload.latLng.lat) ? state.latLng.lat : action.payload.latLng.lat,
          lng: isNaN(action.payload.latLng.lng) ? state.latLng.lng : action.payload.latLng.lng
        }
      });
    default:
      return state;
  }
}

/* Action creators */
function setMapLocation(locationParams) {
  return {
    type: SET_MAP_LOCATION,
    payload: locationParams
  };
}

export { mapReducer, setMapLocation };
