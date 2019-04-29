import { createSelector } from 'reselect';

// constants
import {
  INDICATORS,
  EXCLUSIVE_MONTHLY_INDICATORS
} from 'constants/indicators';

// states
const getCurrentIndicator = state => state.settings.filters.indicator;

export const getMonthlyOptions = createSelector(
  [getCurrentIndicator],
  _currentIndicator => INDICATORS[0].children[0].children
    .filter(_indicator => EXCLUSIVE_MONTHLY_INDICATORS.includes(_indicator.id))
    .map(_indicator => ({
      label: _indicator.name,
      value: _indicator.id,
      ..._indicator.id === _currentIndicator && { selected: true }
    }))
);

export default { getMonthlyOptions };
