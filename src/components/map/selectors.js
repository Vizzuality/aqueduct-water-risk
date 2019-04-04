import { createSelector } from 'reselect';

// utils
import {
  getLayerParametrization,
  reduceParams,
  getLayerLegend
} from 'utils/layers';

// constants
import { INDICATOR_NAMES_RELATION, FUTURE_INDICATORS_IDS } from 'constants/indicators';
import {
  MAP_OPTIONS,
  BASEMAPS,
  MARKER_LAYER,
  HYDRO_LAYER,
  AQUIFER_LAYER
} from './constants';

// states
const getScope = state => state.app.scope;
const getMap = state => state.map;
const getBasemap = state => state.map.basemap;
const getLayers = state => state.layers.list;
const getParametrization = state => state.mapView.filters;
const getPonderation = state => state.mapView.ponderation;
const getPoints = state => state.analyzeLocations.points.list;
const getLayerUpdatedParams = state => state.map.layerParametrization;

const getMarkerLayer = createSelector(
  [getPoints],
  _points => ({
    ...MARKER_LAYER,
    id: `${MARKER_LAYER.id}-${new Date().getTime()}`,
    isMarkerLayer: true,
    layerConfig: {
      ...MARKER_LAYER.layerConfig,
      body: _points.map(m => L.marker(
        [m.lat, m.lng],
        { icon: L.divIcon({
          className: 'c-marker',
          html: '<div class="marker-inner"></div>'
        })
        }
      ))
    }
  })
);

const getFilteredLayers = createSelector(
  [getLayers, getMarkerLayer, getParametrization, getPonderation, getScope],
  (_layers, _markerLayer, _parametrization, _ponderation, _scope) => {
    if (!Object.keys(_layers).length) return [];

    const { scheme: ponderationScheme } = _ponderation;
    const { year, timeScale, indicator } = _parametrization;
    let layers = [];

    switch (true) {
      case (ponderationScheme === 'custom'):
        layers = _layers.custom;
        break;
      case (year === 'baseline' && timeScale === 'monthly' && ponderationScheme === 'DEF'):
        layers = _layers.monthly;
        break;
      case (year === 'baseline' && timeScale === 'annual' && ponderationScheme === 'DEF'):
        layers = _layers.annual;
        break;
      case (year === 'baseline' && timeScale === 'annual' && ponderationScheme !== 'custom' && ponderationScheme !== 'DEF'):
        layers = _layers.annual;
        break;
      case (year !== 'baseline'):
        layers = _layers.projected.filter(_layer => _layer.id === indicator);
        break;
      default:
        layers = _layers.annual;
    }

    return _scope === 'analyzeLocations' ? [...[_markerLayer], ...layers] : [..._layers.hydrobasins, ..._layers.aquifers, ...layers];
  }
);

export const getUpdatedLayers = createSelector(
  [getFilteredLayers, getParametrization, getPonderation, getLayerUpdatedParams],
  (_activeLayers, _parametrization, _ponderation, _updatedLayerParams) => {
    if (!_activeLayers.length) return _activeLayers;

    const { indicator } = _parametrization;
    const params = getLayerParametrization(_parametrization, _ponderation);

    return _activeLayers.map((_activeLayer, index) => ({
      ..._activeLayer,
      name: INDICATOR_NAMES_RELATION[indicator],
      active: true,
      // only applies opacity to the last layer (the higher one)
      ...(index === _activeLayers.length - 1) && { ..._updatedLayerParams },
      ...(_activeLayer.layerConfig.params_config && _activeLayer.layerConfig.params_config.length > 0) && {
        params: {
          ...reduceParams(_activeLayer.layerConfig.params_config),
          ...!!_activeLayer.layerConfig.body.url && { url: _activeLayers.layerConfig.body.url },
          ...params
        }
      },
      ...!FUTURE_INDICATORS_IDS.includes(_activeLayer.id) && { legendConfig: getLayerLegend(indicator) }
    }));
  }
);

export const getLayerGroup = createSelector(
  [getUpdatedLayers],
  _layers => ([{
    dataset: 'random_id',
    visibility: true,
    layers: _layers.filter(_layer => ![HYDRO_LAYER, AQUIFER_LAYER].includes(_layer.id) && !_layer.isMarkerLayer)
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

export const parseBasemap = createSelector(
  [getBasemap],
  (_basemap) => {
    const currentBasemap = BASEMAPS[_basemap] || {};
    const { value, options } = currentBasemap;

    return ({
      url: value,
      options
    });
  }
);

export default {
  parseMapState,
  getUpdatedLayers,
  parseBasemap
};
