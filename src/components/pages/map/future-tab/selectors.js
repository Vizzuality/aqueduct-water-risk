import { createSelector } from 'reselect';

// constants
import {
  ANALYZER_LOCATION_INDICATORS,
  DEFAULT_FUTURE_INDICATOR,
  FUTURE_INDICATORS_IDS,
  PARENT_CHILDREN_LAYER_RELATION
} from 'constants/indicators';

// states
const getCurrentIndicator = state => state.settings.filters.indicator;
const getProjection = state => state.settings.filters.projection;
const getPonderationScheme = state => state.settings.ponderation.scheme;

const updatesFutureIndicators = createSelector(
  [getCurrentIndicator, getProjection],
  (_currentIndicator, _projection) => ANALYZER_LOCATION_INDICATORS.map(_indicator => ({
    ...!_indicator.isFuture && { ..._indicator },
    ..._indicator.isFuture && ({
      ..._indicator,
      id: FUTURE_INDICATORS_IDS.includes(_currentIndicator) ? _currentIndicator : DEFAULT_FUTURE_INDICATOR[_projection]
    })
  }))
);


export const parseTimelineOptions = createSelector(
  [updatesFutureIndicators, getCurrentIndicator, getProjection, getPonderationScheme],
  (_updatedIndicators, _currentIndicator, _projection, _ponderationScheme) => {
    if (_ponderationScheme === 'custom') {
      return ANALYZER_LOCATION_INDICATORS.map((_indicator, index) => ({
        label: _indicator.name,
        value: _indicator.id,
        selected: index === 0,
        disabled: index !== 0
      }));
    }

    return _updatedIndicators.map(_indicator => ({
      label: _indicator.name,
      ...!_indicator.isFuture && {
        value: _indicator.id,
        selected: _indicator.id === _currentIndicator || PARENT_CHILDREN_LAYER_RELATION[_indicator.id] === _currentIndicator
      },
      ..._indicator.isFuture && {
        value: FUTURE_INDICATORS_IDS.includes(_currentIndicator) ? _currentIndicator : DEFAULT_FUTURE_INDICATOR[_projection],
        selected: _indicator.id === _currentIndicator
      }
    }));
  }

);

export default { parseTimelineOptions };
