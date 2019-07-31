import * as actions from './actions';

export default {
  [actions.setMapLocation]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setBasemap]: (state, { payload }) => ({ ...state, basemap: payload }),
  [actions.setLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setBoundaries]: (state, { payload }) => ({ ...state, boundaries: payload }),
  [actions.setLayerParametrization]: (state, { payload }) => ({
    ...state,
    layerParametrization: {
      ...state.layerParametrization,
      ...payload
    }
  }),
  [actions.setPopupLocation]: (state, { payload }) => ({
    ...state,
    popup: {
      ...state.popup,
      latlng: payload
    }
  }),
  [actions.setPopupData]: (state, { payload }) => ({
    ...state,
    popup: {
      ...state.popup,
      data: payload
    }
  })
};
