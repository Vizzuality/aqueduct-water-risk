import * as actions from './actions';

export default {
  [actions.setMapLocation]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setLayerParametrization]: (state, { payload }) => ({
    ...state,
    layerParametrization: {
      ...state.layerParametrization,
      ...payload
    }
  })
};
