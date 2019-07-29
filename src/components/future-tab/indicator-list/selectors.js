import { createSelector } from 'reselect';

import { FUTURE_INDICATORS } from 'constants/indicators';

// states
const getProjection = state => state.settings.filters.projection;

export const getIndicators = createSelector(
  [getProjection],
  _projection => FUTURE_INDICATORS[_projection].map(_indicator => ({ label: _indicator.name, value: _indicator.id }))
);

export default { getIndicators };
