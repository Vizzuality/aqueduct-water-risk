import { createSelector } from 'reselect';

// constants
import { TIMEFRAME_OPTIONS } from 'constants/filters';
import { MONTHLY_TIMEFRAME } from './constants';

// states
const getTimeScale = state => state.mapView.filters.timeScale;

export const getTimeFrameOptions = createSelector(
  [getTimeScale],
  _timeScale => TIMEFRAME_OPTIONS.map(_timeScaleOption => ({
    ..._timeScaleOption,
    ..._timeScale === 'monthly' && { disabled: !MONTHLY_TIMEFRAME.includes(_timeScaleOption.value) }
  }))
);

export default { getTimeFrameOptions };
