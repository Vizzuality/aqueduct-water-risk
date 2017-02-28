import { dispatch } from 'main';

/* Constants */
const SET_MAP_LOCATION = 'SET_MAP_LOCATION';

/* Initial state */
const initialState = {
  latLng: {
    lat: 30,
    lng: -120
  },
  zoom: 3
};

/* Reducer */
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, action.payload);
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

function onEnterMapPage({ location }, replaceUrl, done) {
  // TODO: this check is not as consistent as it should be. The right solution could be grouping all map params inside "map"
  // if there are map position params
  if (location.query.zoom) {
    const map = {
      zoom: +location.query.zoom,
      latLng: {
        lat: +location.query.lat,
        lng: +location.query.lng
      }
    };
    dispatch(setMapLocation(map));
  }

  done();
}

export { mapReducer, setMapLocation, onEnterMapPage };
