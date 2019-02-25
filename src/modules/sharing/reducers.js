import * as actions from './actions';

export default {
  [actions.setUrl]: (state, { payload }) => ({
    ...state,
    url: payload
  }),
  [actions.setLoading]: (state, { payload }) => ({
    ...state,
    loading: payload
  }),
  [actions.setError]: (state, { payload }) => ({
    ...state,
    error: payload
  })
};
