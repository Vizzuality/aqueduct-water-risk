import { createAction, createThunkAction } from 'redux-tools';
import compact from 'lodash/compact';

// services
import { fetchGeostore, saveGeostore } from 'services/geostore';
import { fetchAnalysis } from 'services/analysis';

// utils
import { parseWeights } from 'utils/weights';
import { getAnalysisType, filterData } from 'utils/analysis';
import { logEvent } from 'utils/analytics';

// constants
import { FUTURE_LAYERS_GROUPS } from 'constants/analysis';


// points
export const setPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-POINTS');
export const clearPoints = createAction('ANALYZE-LOCATIONS-TAB__CLEAR-POINTS');
export const setSelectedPoints = createAction('ANALYZE-LOCATIONS-TAB__SET-SELECTED-POINTS');
// analysis
export const setAnalysis = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS');
export const setAnalysisLoading = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-LOADING');
export const setAnalysisError = createAction('ANALYZE-LOCATIONS-TAB__SET-ANALYSIS-ERROR');
export const setDownloadUrl = createAction('ANALYZE-LOCATIONS-TAB__SET-DOWNLOAD-ERROR');
export const setSelectedData = createAction('ANALYZE-LOCATIONS-TAB__SET-SELECTED-DATA');
export const clearAnalysis = createAction('ANALYZE-LOCATIONS-TAB__CLEAR-ANALYSIS');
// geostore
export const setGeostore = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE');
export const setGeostoreLocations = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE-LOCATIONS');
export const setGeostoreLoading = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE-LOADING');
export const setGeostoreError = createAction('ANALYZE-LOCATIONS-TAB__SET-GEOSTORE-ERROR');

export const onFetchAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__FETCH-ANALYSIS', () =>
  (dispatch, getState) => {
    const {
      analyzeLocations: {
        geostore: { id, locations }
      },
      settings: {
        filters: { month, year, projection, indicator, timeScale, scenario },
        ponderation
      }
    } = getState();
    const { scheme } = ponderation;
    const analysis_type = getAnalysisType(timeScale, scheme, year);
    const _locations = locations.map(_location => `''${_location.location_name}''`);
    const _input_address = locations.map(_location => `''${_location.input_address}''`);
    const _match_address = locations.map(_location => `''${_location.match_address}''`);
    const _ids = compact(locations.map(_location => (_location.id || _location.row)));
    const params = {
      geostore: id,
      analysis_type,
      ...locations.length && { locations: `[${_locations.toString()}]` },
      ..._input_address.length && { input_address: `[${_input_address.toString()}]` },
      ..._match_address.length && { match_address: `[${_match_address.toString()}]` },
      ..._ids.length && { ids: `[${_ids.toString()}]` },
      month,
      year,
      scenario,
      change_type: projection === 'absolute' ? 'future_value' : 'change_from_baseline',
      wscheme: `'[${parseWeights(ponderation)}]'`
    };


    let _indicator = indicator;
    if (analysis_type === 'projected' && indicator) {
      _indicator = FUTURE_LAYERS_GROUPS[indicator];
    }
    params.indicator = _indicator || '""';

    dispatch(setAnalysisError(null));

    return fetchAnalysis(params)
      .then((analysis) => {
        const { data, analysis_type: analysisType, downloadUrl } = analysis;
        if (['annual', 'monthly'].includes(analysisType) && (scheme === 'DEF')) {
          const filteredData = filterData(data, indicator, scheme);
          dispatch(setAnalysis(filteredData));
        } else {
          dispatch(setAnalysis(data));
        }
        logEvent('Analysis', 'Analyze Locations', 'Complete Analysis');
        dispatch(setDownloadUrl(downloadUrl.split('=')[1]));
        dispatch(setAnalysisLoading(false));
      })
      .catch((err) => {
        dispatch(setAnalysisError(err));
        dispatch(setAnalysisLoading(false));
      });
  });

export const getGeostore = createThunkAction('ANALYZE-LOCATIONS-TAB__GET-GEOSTORE', () =>
  (dispatch, getState) => {
    const { analyzeLocations: { geostore: { id } } } = getState();

    dispatch(setGeostoreLoading(true));
    dispatch(setGeostoreError(null));

    return fetchGeostore(id)
      .then((geoStore) => {
        const { geojson: { features } } = geoStore;

        if (!features[0]) {
          dispatch(setGeostoreError('Error: there are no geometries in this geostore'));
          dispatch(setGeostoreLoading(false));
        }

        const points = features[0].geometry.coordinates.map(_coordinate => ({ lat: _coordinate[1], lng: _coordinate[0] }));
        const locations = features[0].properties.locations || [];

        dispatch(setPoints(points));
        dispatch(setGeostoreLocations(locations));
        dispatch(onFetchAnalysis());
      })
      .catch((err) => {
        dispatch(setGeostoreError(err));
        dispatch(setGeostoreLoading(false));
      });
  });

export const onSaveGeostore = createThunkAction('ANALYZE-LOCATIONS-TAB__SAVE-GEOSTORE', () =>
  (dispatch, getState) => {
    const {
      analyzeLocations: {
        points: { list },
        geostore: { locations }
      } } = getState();

    dispatch(setGeostoreLoading(true));
    dispatch(setGeostoreError(null));

    return saveGeostore(list, { locations })
      .then((data) => {
        dispatch(setGeostore(data.id));
        dispatch(setGeostoreLoading(false));
      })
      .catch((err) => {
        dispatch(setGeostoreError(err));
        dispatch(setGeostoreLoading(false));
      });
  });

export const onAddUnknownLocation = createThunkAction('ANALYZE-LOCATIONS-ADD-UNKNOWN-LOCATION', () =>
  (dispatch, getState) => {
    const { analyzeLocations: { geostore: { locations } } } = getState();
    const nextLocations = [...locations];

    nextLocations.push({
      location_name: `Location ${locations.length + 1}`,
      input_address: '-',
      match_address: '-'
    });

    dispatch(setGeostoreLocations(nextLocations));
  });

export const onAddPoint = createThunkAction('ANALYZE-LOCATIONS-TAB__ADD-POINT', point =>
  (dispatch, getState) => {
    const {
      analyzeLocations: { points: { list } }
    } = getState();
    const points = Array.isArray(point) ?
      [...list, ...point] : [...list, point];

    dispatch(setPoints(points));
  });

export const onRemoveLocation = createThunkAction('ANALYZE-LOCATIONS-TAB__REMOVE-LOCATION', indexToRemove =>
  (dispatch, getState) => {
    const { analyzeLocations: { geostore: { locations } } } = getState();
    const nextLocations = [...locations];

    nextLocations.splice(indexToRemove, 1);

    dispatch(setGeostoreLocations(nextLocations));
  });

export const onRemovePoint = createThunkAction('ANALYZE-LOCATIONS-TAB__REMOVE-POINT', point =>
  (dispatch, getState) => {
    const { analyzeLocations: { points: { list } } } = getState();
    const points = list.filter(_point => (_point.lat !== point.lat) && (_point.lng !== point.lng));
    const indexPoint = list.findIndex(_point => (_point.lat === point.lat) && (_point.lng === point.lng));

    dispatch(setPoints(points));
    dispatch(onRemoveLocation(indexPoint));
  });

export const onAddLocation = createThunkAction('ANALYZE-LOCATIONS-ADD-LOCATION', location =>
  (dispatch, getState) => {
    const { analyzeLocations: { geostore: { locations } } } = getState();
    const nextLocations = [...locations];

    nextLocations.push(location);

    dispatch(setGeostoreLocations(nextLocations));
  });

export const onUpdateLocation = createThunkAction('ANALYZE-LOCATIONS-TAB__UPDATE-LOCATION', location =>
  (dispatch, getState) => {
    const { analyzeLocations: {
      geostore: { locations },
      analysis: { selected }
    } } = getState();
    const nextLocations = [...locations];

    if (selected[0] !== null) {
      nextLocations.splice(selected[0], 1, location);
      dispatch(setGeostoreLocations(nextLocations));
    }
  });

export const onApplyAnalysis = createThunkAction('ANALYZE-LOCATIONS-TAB__APPLY-ANALYSIS', () =>
  (dispatch, getState) => {
    const { analyzeLocations: {
      points: { list },
      geostore: { locations }
    } } = getState();

    dispatch(setAnalysisLoading(true));

    saveGeostore(list, { locations })
      .then(({ id }) => {
        dispatch(setGeostore(id));
        dispatch(onFetchAnalysis());
      });
  });


export default {
  setPoints,
  clearPoints,
  setSelectedPoints,
  setGeostore,
  setGeostoreLocations,
  setAnalysis,
  setAnalysisLoading,
  setAnalysisError,
  setDownloadUrl,
  setSelectedData,
  clearAnalysis,
  getGeostore,
  onSaveGeostore,
  onAddPoint,
  onRemovePoint,
  onApplyAnalysis,
  onUpdateLocation,
  onAddLocation,
  onAddUnknownLocation,
  onRemoveLocation
};
