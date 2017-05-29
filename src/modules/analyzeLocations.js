import { get, post } from 'aqueduct-components';
import { toGeoJsonCollection } from 'utils/geojson';
import { parseWeights } from 'utils/weights';
import { updateUrl } from 'modules/url';

/* Constants */
const SET_POINTS = 'SET_POINTS';
const SET_SELECTED_POINTS = 'SET_SELECTED_POINTS';
const SET_GEOSTORE_ID = 'SET_GEOSTORE_ID';
const SET_ANALYSIS_DATA = 'SET_ANALYSIS_DATA';
const SET_ANALYSIS_LOADING = 'SET_ANALYSIS_LOADING';
const SET_ANALYSIS_SUCCESS = 'SET_ANALYSIS_SUCCESS';

/* Initial state */
const initialState = {
  loading: false,
  error: false,
  points: {
    list: [],
    selected: [],
    geoStore: undefined
  },
  weights: []
};

/* Reducer */
function analyzeLocationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POINTS: {
      return {
        ...state,
        points: {
          ...state.points,
          list: action.payload
        }
      };
    }
    case SET_SELECTED_POINTS: {
      return {
        ...state,
        points: {
          ...state.points,
          selected: action.payload
        }
      };
    }
    case SET_GEOSTORE_ID: {
      return {
        ...state,
        points: {
          ...state.points,
          geoStore: action.payload
        }
      };
    }
    case SET_ANALYSIS_DATA: {
      return {
        ...state,
        weights: action.payload
      };
    }
    case SET_ANALYSIS_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case SET_ANALYSIS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false
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
    payload: points.map((p, index) => {
      return {
        ...p,
        id: p.id || `${Date.now()}${index}`
      };
    })
  };
}

function setSelectedPoints(selected) {
  return {
    type: SET_SELECTED_POINTS,
    payload: selected
  };
}

function setGeostoreId(id) {
  return {
    type: SET_GEOSTORE_ID,
    payload: id
  };
}

function setAnalysisData(data) {
  return {
    type: SET_ANALYSIS_DATA,
    payload: data
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
      headers: [
        {
          key: 'Content-Type',
          value: 'application/json'
        }
      ],
      body: toGeoJsonCollection(points),
      onSuccess: (data) => {
        dispatch(setGeostoreId(data.data.id));
        dispatch(updateUrl());
      }
    });
  };
}

function setAnalysis(weightScheme, points) {
  const parsedWeights = parseWeights(weightScheme);
  let parsedPoints = [];
  let query = '';

  if (points.length) {
    parsedPoints = points.map(point => `''POINT(${point.lng} ${point.lat})''`);
  }

  if (parsedWeights) {
    query = `select * from get_aqpoints('[${parsedWeights.toString()}]', '[${parsedPoints.toString()}]')`;
  }

  return (dispatch) => {
    const formData = new FormData();
    formData.append('q', query);

    dispatch({ type: SET_ANALYSIS_LOADING });
    post({
      type: 'POST',
      url: 'https://wri-01.carto.com/api/v2/sql',
      body: formData,
      multipart: true,
      onSuccess: ({ rows }) => {
        dispatch(setAnalysisData(rows));
        dispatch({ type: SET_ANALYSIS_SUCCESS });
      }
    });
  };
}

export { analyzeLocationsReducer, setPoints, setSelectedPoints, setAnalysis, saveOnGeostore, fetchFromGeostore, setGeostoreId };
