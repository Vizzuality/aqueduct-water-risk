import { createSelector } from 'reselect';
import { format } from 'd3-format';

// constants
import {
  INDICATOR_COLUMNS,
  FUTURE_INDICATORS_IDS,
  EXCLUSIVE_MONTHLY_INDICATORS,
  PARENT_CHILDREN_LAYER_RELATION
} from 'constants/indicators';

// utils
import { getProjectChangeColumn } from './utils';

// states
const getAnalysisData = state => state.analyzeLocations.analysis.data;
const getCurrentIndicator = state => state.mapView.filters.indicator;
const getFilters = state => state.mapView.filters;

export const getColumns = createSelector(
  [getCurrentIndicator, getFilters],
  (_currentIndicator, _filters) => [
    ...INDICATOR_COLUMNS.common,
    ...FUTURE_INDICATORS_IDS.includes(_currentIndicator) ?
      getProjectChangeColumn(_filters) :
      [...INDICATOR_COLUMNS[_currentIndicator] || [...INDICATOR_COLUMNS.monthly[_currentIndicator]] || INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[_currentIndicator]]]
  ]);

// export const parseData = createSelector(
//   [getAnalysisData],
//   _data => _data.map((d) => {
//     const parseObject = {};
//     Object.keys(d).forEach((key) => {
//       parseObject[key] = isNaN(d[key]) ? d[key] : format('.2f')(d[key]);
//     });
//     return parseObject;
//   }));

export default {
  getColumns,
  // parseData
};
