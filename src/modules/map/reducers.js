import * as actions from './actions';

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
  })
};
