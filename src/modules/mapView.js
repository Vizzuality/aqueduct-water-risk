// constants
import { PRESET_VALUES } from 'constants/presets';

// actions
const SET_FILTERS = 'SET_FILTERS';
const SET_PONDERATION = 'SET_PONDERATION';

// initial state
const initialState = {
  filters: {
    year: 'baseline',
    month: '1',
    changeFromBaseline: false,
    indicator: 'w_awr_def_tot_cat',
    scenario: 'optimistic',
    timeScale: 'annual',
    projection: 'absolute'
  },
  ponderation: {
    scheme: 'DEF',
    custom: PRESET_VALUES.custom
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
    // case SET_ACTIVE_LAYERS:
    //   return { ...state, layers: { active: action.payload } };
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

// function setActiveLayers(layers) {
//   return {
//     type: SET_ACTIVE_LAYERS,
//     payload: layers
//   };
// }

export { mapViewReducer, setFilters, setPonderation };
