import { createSelector } from 'reselect';

import { FUTURE_INDICATORS, DEFAULT_FUTURE_INDICATOR } from 'constants/indicators';

// states
const getCurrentIndicator = state => state.settings.filters.indicator;
const getProjection = state => state.settings.filters.projection;

export const setCurrentIndicator = createSelector(
  [getCurrentIndicator, getProjection],
  (_currentIndicator, _projection) => FUTURE_INDICATORS[_projection].includes(_currentIndicator) ? _currentIndicator : DEFAULT_FUTURE_INDICATOR[_projection]
);

export const getIndicators = createSelector(
  [getProjection],
  _projection => FUTURE_INDICATORS[_projection].map(_indicator => ({ label: _indicator.name, value: _indicator.id }))
);

export default {
  setCurrentIndicator,
  getIndicators
};
