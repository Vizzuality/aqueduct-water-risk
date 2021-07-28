import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

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
const getMapMode = state => state.app.mapMode;
const getMap = state => state.map;
const getBasemap = state => state.map.basemap;
const getLayers = state => state.layers.list;
const getParametrization = state => state.settings.filters;
const getPonderation = state => state.settings.ponderation;
const getPoints = state => state.analyzeLocations.points.list;
const getLayerUpdatedParams = state => state.map.layerParametrization;
const getSelectedData = state => state.analyzeLocations.analysis.selected;
const getAnalysisData = state => state.analyzeLocations.analysis.data;

const getMarkerLayer = createSelector(
  [getPoints, getAnalysisData, getSelectedData],
  (_points, _data, _selected) => [{
    ...MARKER_LAYER,
    id: uuidv4(),
    isMarkerLayer: true,
    layerConfig: {
      ...MARKER_LAYER.layerConfig,
      body: [..._points.map(({ lat, lng }) => L.marker(
        [lat, lng],
        { icon: L.divIcon({
          className: classnames('c-marker', {
            '-selected': _selected && isEqual({
              longitude: _data[_selected[0]] ? _data[_selected[0]].longitude : null,
              latitude: _data[_selected[0]] ? _data[_selected[0]].latitude : null
            }, { lat, lng })
          }),
          html: '<div class="marker-inner"></div>'
        })
        })
      )]
    },
    params: { id: uuidv4() }
  }]
);

const getFilteredLayers = createSelector(
  [getLayers, getMarkerLayer, getParametrization, getPonderation, getMapMode],
  (_layers, _markerLayer, _parametrization, _ponderation, _mapMode) => {
    if (!Object.keys(_layers).length) return [];

    const { scheme: ponderationScheme } = _ponderation;
    const { year, timeScale, indicator, predefined } = _parametrization;
    let layers = [];

    switch (true) {
      case (ponderationScheme === 'custom'):
        layers = _layers.custom;
        break;
      case (year === 'baseline' && timeScale === 'monthly' && ponderationScheme === 'DEF'):
        layers = _layers.monthly;
        break;
      case (year === 'baseline' && timeScale === 'annual' && predefined && ponderationScheme !== 'custom' && indicator !== 'w_awr_def_tot_cat'):
        layers = _layers.annual;
        break;
      case (year === 'baseline' && timeScale === 'annual' && predefined && ponderationScheme !== 'custom' && indicator === 'w_awr_def_tot_cat'):
        layers = _layers.weights;
        break;
      case (year === 'baseline' && timeScale === 'annual' && !predefined):
        layers = _layers.annual;
        break;
      case (year !== 'baseline'):
        layers = _layers.projected.filter(_layer => _layer.id === indicator);
        break;
      default:
        layers = _layers.annual;
    }

    return _mapMode === 'analysis' ?
      [..._markerLayer, ...layers] :
      [..._layers.hydrobasins, ..._layers.aquifers, ...layers];
  }
);

export const getUpdatedLayers = createSelector(
  [getFilteredLayers, getParametrization, getPonderation, getLayerUpdatedParams],
  (_activeLayers, _parametrization, _ponderation, _updatedLayerParams) => {
    if (!_activeLayers.length) return _activeLayers;

    const { indicator } = _parametrization;
    if (!indicator) return [];
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
