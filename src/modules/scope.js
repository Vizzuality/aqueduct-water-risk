/* Constants */
const SET_SCOPE = 'SET_SCOPE';

/* Initial state */
const initialState = {
  name: 'mapView'
};

/* Reducer */
function scopeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCOPE:
      return { name: action.payload };
    default:
      return state;
  }
}

/* Action creators */
function setScope(scope) {
  return {
    type: SET_SCOPE,
    payload: scope
  };
}

export { scopeReducer, setScope };
