/* Constants */
const SET_FILTERS = 'SET_FILTERS';
const SET_ACTIVE_LAYERS = 'SET_ACTIVE_LAYERS';

/* Initial state */
const initialState = {
  layers: {
    active: []
  },
  filters: {
    year: 'baseline',
    changeFromBaseline: false,
    scenario: 'optimistic',
    timeScale: 'annual',
    geoScale: 'global'
  },
  weight: {
    mode: 'default',
    scheme: {
      default: 'agriculture',
      advanced: {}
    }
  }
};

/* Reducer */
function mapViewReducer(state = initialState, action) {
  // TODO: define reductions
  switch (action.type) {
    case SET_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    }
    case SET_ACTIVE_LAYERS:
      return { ...state, layers: { active: action.payload } };
    default:
      return state;
  }
}

/* Actions */
function setFilters(value) {
  return {
    type: SET_FILTERS,
    payload: value
  };
}

function setActiveLayers(layers) {
  return {
    type: SET_ACTIVE_LAYERS,
    payload: layers
  };
}

export { mapViewReducer, setFilters, setActiveLayers };
