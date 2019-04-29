import { createSelector } from 'reselect';

import { INDICATORS, EXCLUSIVE_MONTHLY_INDICATORS } from 'constants/indicators';

// states
const getTimeScale = state => state.settings.filters.timeScale;

export const getIndicators = createSelector(
  [getTimeScale],
  (_timeScale) => {
    if (_timeScale === 'annual') return INDICATORS;

    if (_timeScale === 'monthly') {
      return INDICATORS.map(_indicator => ({
        ..._indicator,
        disabled: !EXCLUSIVE_MONTHLY_INDICATORS.includes(_indicator.id),
        ..._indicator.children && { children: _indicator.children.map(_childIndicator => ({
          ..._childIndicator,
          disabled: !EXCLUSIVE_MONTHLY_INDICATORS.includes(_childIndicator.id),
          ..._childIndicator.children && { children: _childIndicator.children.map(_nephewIndicator => ({
            ..._nephewIndicator,
            disabled: !EXCLUSIVE_MONTHLY_INDICATORS.includes(_nephewIndicator.id)
          })) }
        })) }
      }));
    }

    return INDICATORS;
  }
);

export default { getIndicators };
