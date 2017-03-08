/* Constants */
const SET_POINTS = 'SET_POINTS';
const ADD_POINT = 'ADD_POINT';
const REMOVE_POINT = 'REMOVE_POINT';

/* Initial state */
const initialState = {
  points: []
};

/* Reducer */
function analyseLocataionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_POINTS: {
      return {
        ...state,
        points: action.payload
      };
    }
    case ADD_POINT: {
      const points = state.points.slice();
      points.push(action.payload);
      return {
        ...state,
        points
      };
    }
    case REMOVE_POINT: {
      const points = state.points.slice();
      points.splice(action.payload, 1);
      return {
        ...state,
        points
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
    payload: points.map(p => ({ ...p, id: Date.now() }))
  };
}

function addPoint(point) {
  return {
    type: ADD_POINT,
    payload: { ...point, id: Date.now() }
  };
}

function removePoint(pointIndex) {
  return {
    type: REMOVE_POINT,
    payload: pointIndex
  };
}

export { analyseLocataionsReducer, setPoints, addPoint, removePoint };
