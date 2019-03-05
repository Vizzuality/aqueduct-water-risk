import * as actions from './actions';
import initialState from './initial-state';

export default {
  [actions.setMapLocation]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setBasemap]: (state, { payload }) => ({ ...state, basemap: payload }),
  [actions.setLayerParametrization]: (state, { payload }) => ({
    ...state,
    layerParametrization: {
      ...state.layerParametrization,
      ...payload
    }
  }),
  [actions.setPopup]: (state, { payload }) => ({
    ...state,
    popup: {
      ...state.popup,
      ...payload
    }
  }),
  [actions.clearPopup]: state => ({ ...state, popup: initialState.popup })
};
