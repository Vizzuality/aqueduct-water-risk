import * as actions from './actions';

export default {
  [actions.setFilters]: (state, { payload }) => ({
    ...state,
    filters: {
      ...state.filters,
      ...payload
    }
  }),
  [actions.setTabFilters]: (state, { payload }) => ({
    ...state,
    ...payload
  }),
  [actions.setPonderation]: (state, { payload }) => ({
    ...state,
    ponderation: {
      ...state.ponderation,
      ...payload,
      custom: {
        ...state.ponderation.custom,
        ...payload.custom
      }
    }
  }),
  [actions.setAnalyzerOpen]: (state, { payload }) => ({
    ...state,
    analyzer: { open: payload }
  })
};
