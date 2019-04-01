import { createAction, createThunkAction } from 'redux-tools';

// services
import { fetchGeostore, saveGeostore } from 'services/geostore';
import { fetchAnalysis } from 'services/analysis';

// utils
import { parseWeights } from 'utils/weights';
import { getAnalysisType, filterData } from 'utils/analysis';

// points
export const setPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-POINTS');
export const setSelectedPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-SELECTED-POINTS');
// analysis
export const setAnalysis = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS');
export const setAnalysisLoading = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-LOADING');
export const setAnalysisError = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-ERROR');
export const clearAnalysis = createAction('ANALYZE-LOCATIONS-TAB__CLEAR-ANALYSIS');
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

        if (!features[0]) {
          dispatch(setGeostoreError('Error: there are no geometries in this geostore'));
          dispatch(setGeostoreLoading(false));
        }

        const points = features[0].geometry.coordinates.map(_coordinate => ({
          lat: _coordinate[0],
          lng: _coordinate[1]
        }));

        dispatch(setPoints(points));
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

    return saveGeostore(list)
      .then((data) => {
        dispatch(setGeostore(data.id));
        dispatch(setGeostoreLoading(false));
      })
      .catch((err) => {
        dispatch(setGeostoreError(err));
        dispatch(setGeostoreLoading(false));
      });
  });

export const onFetchAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__FETCH-ANALYSIS', () =>
  (dispatch, getState) => {
    const {
      analyzeLocations: { geostore: { id } },
      mapView: {
        filters: { month, year, projection, indicator, timeScale },
        ponderation
      }
    } = getState();
    const { scheme } = ponderation;
    const analysis_type = getAnalysisType(timeScale, scheme, year);
    const params = {
      geostore: id,
      analysis_type,
      month,
      year,
      change_type: projection === 'absolute' ? 'future_value' : 'change_from_baseline',
      indicator,
      wscheme: `[${parseWeights(ponderation)}]`
    };

    dispatch(setAnalysisLoading(true));
    dispatch(setAnalysisError(null));

    console.log(params)

    return fetchAnalysis(params)
      .then((analysis) => {
        const { data } = analysis;
        console.log(data)
        const filteredData = filterData(data, indicator);
        console.log(filteredData)

        dispatch(setAnalysis(filteredData));
        dispatch(setAnalysisLoading(false));
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


export default {
  setPoints,
  setSelectedPoints,
  setGeostore,
  setAnalysis,
  setAnalysisLoading,
  setAnalysisError,
  clearAnalysis,
  getGeostore,
  onSaveGeostore,
  onAddPoint,
  onApplyAnalysis
};
