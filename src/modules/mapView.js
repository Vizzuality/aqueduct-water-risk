/* Constants */
const SET_FILTERS = 'SET_FILTERS';

/* Initial state */
const initialState = {
  layers: {
    list: []
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

export { mapViewReducer, setFilters };
