/* Constants */
const SET_FILTERS = 'SET_FILTERS';
const SET_ACTIVE_LAYERS = 'SET_ACTIVE_LAYERS';
const SET_PONDERATION = 'SET_PONDERATION';

/* Initial state */
const initialState = {
  layers: {
    active: ['overall_water_risk']
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
    scheme: 'default',
    custom: {
      water_stress: 1,
      interannual_variability: 1,
      seasonal_variability: 1,
      flood_occurrence: 1,
      drought_severity: 1,
      upstream_storage: 1,
      groundwater_stress: 1,
      return_flow_ratio: 1,
      upstream_protected_land: 1,
      media_coverage: 1,
      access_to_water: 1,
      threatened_amphibians: 1
    }
  }
};

/* Reducer */
function mapViewReducer(state = initialState, action) {
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
