/* Constants */
const SET_FILTERS = 'SET_FILTERS';
const SET_ACTIVE_LAYERS = 'SET_ACTIVE_LAYERS';
const SET_PONDERATION = 'SET_PONDERATION';

/* Initial state */
const initialState = {
  layers: {
    active: ['000001']
  },
  filters: {
    year: 'baseline',
    changeFromBaseline: false,
    scenario: 'optimistic',
    timeScale: 'annual',
    geoScale: 'global',
    projection: 'absolute'
  },
  ponderation: {
    scheme: '_default',
    custom: {}
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
    case SET_PONDERATION: {
      return {
        ...state,
        ponderation: {
          ...state.ponderation,
          ...action.payload,
          custom: {
            ...state.ponderation.custom,
            ...action.payload.custom
          }
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

function setPonderation(value) {
  return {
    type: SET_PONDERATION,
    payload: value
  };
}

function setActiveLayers(layers) {
  return {
    type: SET_ACTIVE_LAYERS,
    payload: layers
  };
}

export { mapViewReducer, setFilters, setActiveLayers, setPonderation };
