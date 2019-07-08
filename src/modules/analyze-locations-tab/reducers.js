import * as actions from './actions';
import initialState from './initial-state';

export default {
  // points
  [actions.setPoints]: (state, { payload }) => ({
    ...state,
    points: {
      ...state.points,
      list: payload
    }
  }),
  [actions.clearPoints]: state => ({
    ...state,
    points: {
      ...state.points,
      list: initialState.points.list
    }
  }),
  [actions.setSelectedPoints]: (state, { payload }) => ({
    ...state,
    points: {
      ...state.points,
      selected: payload
    }
  }),
  // analysis
  [actions.setAnalysis]: (state, { payload }) => ({
    ...state,
    analysis: {
      ...state.analysis,
      data: payload
    }
  }),
  [actions.setAnalysisLoading]: (state, { payload }) => ({
    ...state,
    analysis: {
      ...state.analysis,
      loading: payload
    }
  }),
  [actions.setAnalysisError]: (state, { payload }) => ({
    ...state,
    analysis: {
      ...state.analysis,
      error: payload
    }
  }),
  [actions.clearAnalysis]: state => ({
    ...state,
    points: initialState.points,
    geostore: initialState.geostore,
    analysis: initialState.analysis
  }),
  [actions.setDownloadUrl]: (state, { payload }) => ({
    ...state,
    analysis: {
      ...state.analysis,
      downloadUrl: payload
    }
  }),
  [actions.setSelectedData]: (state, { payload }) => ({
    ...state,
    analysis: {
      ...state.analysis,
      selected: payload
    }
  }),
  // geostore
  [actions.setGeostore]: (state, { payload }) => ({
    ...state,
    geostore: {
      ...state.geostore,
      id: payload
    }
  }),
  [actions.setGeostoreLocations]: (state, { payload }) => ({
    ...state,
    geostore: {
      ...state.geostore,
      locations: payload
    }
  }),
  [actions.setGeostoreLoading]: (state, { payload }) => ({
    ...state,
    geostore: {
      ...state.geostore,
      loading: payload
    }
  }),
  [actions.setGeostoreError]: (state, { payload }) => ({
    ...state,
    geostore: {
      ...state.geostore,
      error: payload
    }
  })
};
