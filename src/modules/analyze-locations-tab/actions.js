import { createAction, createThunkAction } from 'redux-tools';

// services
import { fetchGeostore, saveGeostore } from 'services/geostore';
import { fetchAnalysis } from 'services/analysis';

// utils
import { parseWeights } from 'utils/weights';

import initialState from './initial-state';

// points
export const setPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-POINTS');
export const setSelectedPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-SELECTED-POINTS');
// analysis
export const setAnalysis = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS');
export const setAnalysisLoading = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-LOADING');
export const setAnalysisError = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-ERROR');
// geostore
export const setGeostore = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE');
export const setGeostoreLoading = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE-LOADING');
export const setGeostoreError = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE-ERROR');

export const getGeostore = createThunkAction('ANALYZE-LOCATIONS-TAB__GET-GEOSTORE', () =>
  (dispatch, getState) => {
    const { analyzeLocations: { geostore: { id } } } = getState();

    dispatch(setGeostoreLoading(true));
    dispatch(setGeostoreError(null));

    fetchGeostore(id)
      .then((geoStore) => {
        const { geojson: { features } } = geoStore;

        const points = features.map(p => ({
          lat: p.geometry.coordinates[0],
          lng: p.geometry.coordinates[1]
        }));
        // TO-DO: remove sample data when we can retrieve points from geostore
        const samplePoints = [
          { lat: 14.26438308756265, lng: 14.062500000000002 },
          { lat: 5.266007882805498, lng: 2.8125 },
          { lat: 44.84029065139799, lng: 16.523437500000004 },
          { lat: -7.362466865535738, lng: -3.1640625000000004 }
        ];

        dispatch(setPoints(samplePoints));
      })
      .catch((err) => {
        dispatch(setGeostoreError(err));
        dispatch(setGeostoreLoading(false));
      });
  });

export const onSaveGeostore = createThunkAction('ANALYZE-LOCATIONS-TAB__SAVE-GEOSTORE', () =>
  (dispatch, getState) => {
    const { analyzeLocations: { points: { list } } } = getState();

    dispatch(setGeostoreLoading(true));
    dispatch(setGeostoreError(null));

    saveGeostore(list)
      .then((data) => {
        dispatch(setGeostore(data.id));
        dispatch(setGeostoreLoading(false));
        // dispatch(updateUrl());
      })
      .catch((err) => {
        dispatch(setGeostoreError(err));
        dispatch(setGeostoreLoading(false));
      });
  });

export const onFetchAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__FETCH-ANALYSIS', () =>
  (dispatch, getState) => {
    const {
      points: { geostore },
      mapView: { ponderation }
    } = getState();
    const params = {
      geostore,
      wscheme: `[${parseWeights(ponderation)}]`
    };

    dispatch(setAnalysisLoading(true));
    dispatch(setAnalysisError(null));

    return fetchAnalysis(params)
      .then((data) => {
        dispatch(setAnalysis(data));
        dispatch(setAnalysisLoading(false));
        // dispatch(updateUrl());
      })
      .catch((err) => {
        dispatch(setAnalysisError(err));
        dispatch(setAnalysisLoading(false));
      });
  });

export const onAddPoint = createThunkAction('ANALYZE-LOCATIONS-TAB__ADD-POINT', point =>
  (dispatch, getState) => {
    const { analyzeLocations: { points: { list } } } = getState();

    const points = Array.isArray(point) ?
      [...list, ...point] : [...list, point];
    dispatch(setPoints(points));
  });

export const onApplyAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__APPLY-ANALYSIS', () =>
  (dispatch, getState) => {
    const { analyzeLocations: { points: { list } } } = getState();

    saveGeostore(list)
      .then(({ id }) => {
        dispatch(setGeostore(id));
        dispatch(onFetchAnalysis());
      });
  });


export const onClearAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__CLEAR-ANALYSIS', () =>
  (dispatch) => {
    const {
      points: { list },
      geostore: { id }
    } = initialState;

    dispatch(setPoints(list));
    dispatch(setGeostore(id));
  });

export default {
  setPoints,
  setSelectedPoints,
  setGeostore,
  setAnalysis,
  setAnalysisLoading,
  setAnalysisError,
  getGeostore,
  onSaveGeostore,
  onAddPoint,
  onApplyAnalysis,
  onClearAnalysis
};
