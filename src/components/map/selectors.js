import { createSelector } from 'reselect';

// utils
import {
  getLayerParametrization,
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

    if (year === 'baseline' && timeScale === 'monthly' && ponderationScheme === 'DEF') return _layers.monthly;

    if (year === 'baseline' && timeScale === 'annual' && ponderationScheme === 'DEF') return _layers.annual;

    // predefined weights
    if (timeScale === 'annual' && ponderationScheme !== 'custom' && ponderationScheme !== 'DEF') return _layers.weights;

    // future
    if (year !== 'baseline') return _layers.projected.filter(_layer => _layer.id === indicator);

    return _layers.annual;
  }
);

export const getUpdatedLayers = createSelector(
  [getFilteredLayers, getParametrization, getPonderation],
  (_activeLayers, _parametrization, _ponderation) => {
    if (!_activeLayers.length) return _activeLayers;

    const params = getLayerParametrization(_parametrization, _ponderation);

    return _activeLayers.map(_activeLayer => ({
      ..._activeLayer,
      active: true,
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

export const getLayerGroup = createSelector(
  [getUpdatedLayers],
  _layers => ([{
    dataset: 'random_id',
    visibility: true,
    layers: _layers
  }])
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
