import { get, post } from 'utils/request';
import { toGeoJsonCollection } from 'utils/geojson';
import { updateUrl } from 'modules/url';

/* Constants */
const SET_POINTS = 'SET_POINTS';
const SET_GEOSTORE_ID = 'SET_GEOSTORE_ID';

/* Initial state */
const initialState = {
  points: {
    list: [],
    geoStore: undefined
  }
};

/* Reducer */
function analyseLocationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POINTS: {
      return {
        points: {
          ...state.points,
          list: action.payload
        }
      };
    }
    case SET_GEOSTORE_ID: {
      return {
        points: {
          ...state.points,
          geoStore: action.payload
        }
      };
    }
    default:
      return state;
  }
}

/* Actions */
function setPoints(points) {
  return {
    type: SET_POINTS,
    payload: points.map((p, index) => ({ ...p, id: `${Date.now()}${index}` }))
  };
}

function setGeostoreId(id) {
  return {
    type: SET_GEOSTORE_ID,
    payload: id
  };
}

function fetchFromGeostore(id) {
  return (dispatch) => {
    get({
      url: `${config.API_URL}/geostore/${id}`,
      onSuccess: (data) => {
        const points = data.data.attributes.geojson.features.map(p => (
          { lat: p.geometry.coordinates[0], lng: p.geometry.coordinates[1] }
        ));
        dispatch(setPoints(points));
      }
    });
  };
}

function saveOnGeostore(points) {
  return (dispatch) => {
    post({
      url: `${config.API_URL}/geostore`,
      body: toGeoJsonCollection(points),
      onSuccess: (data) => {
        dispatch(setGeostoreId(data.data.id));
        dispatch(updateUrl());
      }
    });
  };
}

export { analyseLocationsReducer, setPoints, saveOnGeostore, fetchFromGeostore, setGeostoreId };
