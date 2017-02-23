/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import L from 'leaflet/dist/leaflet';
import esri from 'esri-leaflet';
import { post } from 'utils/request';

// adding support for esri
L.esri = esri;

export default class LayerManager {

  /* Constructor */
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
  }

  /* Public methods */
  addLayer(layer, opts = {}) {
    const method = {
      cartodb: this._addCartoLayer
    }[layer.provider];

    method && method.call(this, layer, opts);
  }

  removeLayer(layerId) {
    if (this._mapLayers[layerId]) {
      this._map.removeLayer(this._mapLayers[layerId]);
      delete this._mapLayers[layerId];
    }
  }

  /* Private methods */
  _addCartoLayer(layer) {
    const onSuccess = (data) => {
      const tileUrl = `https://${layer.layerConfig.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
      this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(9999);
      this._mapLayers[layer.id].on('load', () => {
        this._onLayerAddedSuccess();
      });
      this._mapLayers[layer.id].on('tileerror', () => {
        this._onLayerAddedError();
      });
    };

    const request = post({
      url: `https://${layer.layerConfig.account}.carto.com/api/v1/map`,
      body: layer.layerConfig.body,
      onSuccess,
      onError: this._onLayerAddedError
    });

    return request;
  }
}
