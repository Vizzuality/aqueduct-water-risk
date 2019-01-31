import * as actions from './actions';

export default {
  [actions.setLayers]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setError]: (state, { payload }) => ({ ...state, error: payload })
};
