import { createSelector } from 'reselect';

// constants
import {
  INDICATOR_COLUMNS,
  FUTURE_INDICATORS_IDS
} from 'constants/indicators';

// utils
import { getProjectChangeColumn } from './utils';

// states
const getCurrentIndicator = state => state.settings.filters.indicator;
const getCurrentPonderation = state => state.settings.ponderation.scheme;
const getFilters = state => state.settings.filters;
const getAnalysisData = state => state.analyzeLocations.analysis.data;
const getLocations = state => state.analyzeLocations.geostore.locations;

export const getColumns = createSelector(
  [getCurrentIndicator, getFilters, getCurrentPonderation],
  (_currentIndicator, _filters, _ponderationScheme) => {
    let additionalColumns = [];
    const { timeScale } = _filters;

    if (timeScale !== 'monthly' && INDICATOR_COLUMNS[_currentIndicator]) additionalColumns = [...additionalColumns, ...INDICATOR_COLUMNS[_currentIndicator]];
    if (timeScale === 'monthly' && INDICATOR_COLUMNS.monthly[_currentIndicator]) additionalColumns = [...additionalColumns, ...INDICATOR_COLUMNS.monthly[_currentIndicator]];
    // if (INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[_currentIndicator]]) additionalColumns = [...additionalColumns, ...INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[_currentIndicator]]];
    if (FUTURE_INDICATORS_IDS.includes(_currentIndicator)) additionalColumns = [...getProjectChangeColumn(_filters)];

    if (_ponderationScheme === 'custom') {
      const customColumns = INDICATOR_COLUMNS.w_awr_def_tot_cat.map(_column => ({
        ..._column,
        value: 'label'
      }));

      return [
        ...INDICATOR_COLUMNS.common,
        ...customColumns
      ];
    }

    if (_ponderationScheme !== 'custom' && _ponderationScheme !== 'DEF') {
      if (FUTURE_INDICATORS_IDS.includes(_currentIndicator)) {
        return [
          ...INDICATOR_COLUMNS.common,
          ...getProjectChangeColumn(_filters)
        ];
      }

      const presetColumns = INDICATOR_COLUMNS.preset[_currentIndicator].map(_indicator => ({
        ..._indicator,
        value: _indicator.value.replace('def', _ponderationScheme.toLowerCase())
      }));

      return [
        ...INDICATOR_COLUMNS.common,
        ...presetColumns
      ];
    }

    return [
      ...INDICATOR_COLUMNS.common,
      ...additionalColumns
    ];
  });

export const getData = createSelector(
  [getAnalysisData, getLocations],
  (_data, _locations) => _locations.map((location, index) => ({
    ..._data[index],
    ...location
  }))
);

export default {
  getColumns,
  getData
};
