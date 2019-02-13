import { createSelector } from 'reselect';

// utils
import {
  getAnnualParametrization,
  getMonthlyParametrization,
  getProjectedParametrization,
  getCustomPonderationParametrization,
  reduceParams
} from 'utils/layers';

// constants
import { MAP_OPTIONS } from './constants';

// states
const getMap = state => state.map;
const getLayers = state => state.layers.list;
const getParametrization = state => state.mapView.filters;
const getPonderation = state => state.mapView.ponderation;

const getFilteredLayers = createSelector(
  [getLayers, getParametrization, getPonderation],
  (_layers, _parametrization, _ponderation) => {
    if (!Object.keys(_layers).length) return [];

    const { scheme: ponderationScheme } = _ponderation;
    const { year, timeScale, indicator } = _parametrization;

    if (ponderationScheme === 'custom') return _layers.custom;

    if (ponderationScheme !== 'custom' && ponderationScheme !== 'DEF') return _layers.custom_weights;

    if (year !== 'baseline') return _layers.projected.filter(_layer => _layer.id === indicator);

    // if (timeScale === 'annual') return _layers[timeScale];

    // if (timeScale === 'monthly') return _layers[timeScale];

    return _layers[timeScale];
  }
);

export const getUpdatedLayers = createSelector(
  [getFilteredLayers, getParametrization, getPonderation],
  (_activeLayers, _parametrization, _ponderation) => {
    if (!_activeLayers.length) return _activeLayers;

    const { year, timeScale } = _parametrization;
    const {
      scheme: ponderationScheme,
      custom: customPonderation
    } = _ponderation;

    let params = {};

    if (year !== 'baseline') params = getProjectedParametrization(_parametrization);
    if (timeScale === 'annual' && year === 'baseline') params = getAnnualParametrization(_parametrization);
    if (timeScale === 'monthly' && year === 'baseline') params = getMonthlyParametrization(_parametrization);
    if (ponderationScheme === 'custom') params = getCustomPonderationParametrization(customPonderation);

    return _activeLayers.map(_activeLayer => ({
      ..._activeLayer,
      ...(_activeLayer.layerConfig.params_config && _activeLayer.layerConfig.params_config.length > 0) && {
        params: {
          ...reduceParams(_activeLayer.layerConfig.params_config),
          ...!!_activeLayer.layerConfig.body.url && { url: _activeLayers.layerConfig.body.url },
          ...params
        }
      }
    }));
  }
);

export const parseMapState = createSelector(
  [getMap],
  ({ zoom, center }) => ({
    zoom,
    center,
    ...MAP_OPTIONS
  })
);

export default {
  parseMapState,
  getUpdatedLayers
};
