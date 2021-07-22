// CONSTANTS
const ASIDE_TOGGLE = 'ASIDE_TOGGLE';
const ASIDE_SET_OPTIONS = 'ASIDE_SET_OPTIONS';

// ACTIONS
export function closeAside() {
  return dispatch => dispatch({ type: ASIDE_TOGGLE });
}

export function toggleAside(opened, opts = {}) {
  return (dispatch) => {
    if (opened && opts) {
      dispatch({ type: ASIDE_SET_OPTIONS, payload: opts });
    }
    dispatch({ type: ASIDE_TOGGLE, payload: opened });
  };
}

function setAsideOptions(opts) {
  return function (dispatch) {
    return dispatch({ type: ASIDE_SET_OPTIONS, payload: opts });
  };
}

// REDUCER
const initialState = {
  opened: false,
  options: {
    children: null,
    childrenProps: null
  }
};

export function asideReducer(state = initialState, action) {
  switch (action.type) {
    case ASIDE_TOGGLE:
      return Object.assign({}, state, { opened: action.payload });
    case ASIDE_SET_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    default:
      return state;
  }
}
