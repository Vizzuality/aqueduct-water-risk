/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import 'whatwg-fetch';
import L from 'leaflet/dist/leaflet';
import esri from 'esri-leaflet';

// adding support for esri
L.esri = esri;

export default class LayerManager {

  // Constructor
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._mapRequests = {};
    this._layersLoading = {};
    this._rejectLayersLoading = false;
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
  }

  /*
    Public methods
  */
  addLayer(layer, opts = {}) {
    const method = {
      leaflet: this._addLeafletLayer,
      arcgis: this._addEsriLayer,
      cartodb: this._addCartoLayer
    }[layer.provider];

    method && method.call(this, layer, opts);
    this._execCallback()
      .then(() => {
        this._onLayerAddedSuccess && this._onLayerAddedSuccess();
      })
      .catch(() => {
        this._layersLoading = {};
        this._rejectLayersLoading = false;
        this._onLayerAddedError && this._onLayerAddedError();
      });
  }

  removeLayer(layerId) {
    if (this._mapLayers[layerId]) {
      this._map.removeLayer(this._mapLayers[layerId]);
      delete this._mapLayers[layerId];
    }
  }

  removeLayers() {
    Object.keys(this._mapLayers).forEach((id) => {
      if (this._mapLayers[id]) {
        this._map.removeLayer(this._mapLayers[id]);
        delete this._mapLayers[id];
      }
    });
    this._layersLoading = {};
  }

  /*
    Private methods
  */
  _execCallback() {
    return new Promise((resolve, reject) => {
      const loop = () => {
        if (!Object.keys(this._layersLoading).length) return resolve();
        if (this._rejectLayersLoading) return reject();
        setTimeout(loop);
      };
      setTimeout(loop);
    });
  }

  _addLeafletLayer(layerSpec, { zIndex }) {
    const layerData = layerSpec.layerConfig;

    let layer;

    layerData.id = layerSpec.id;
    this._layersLoading[layerData.id] = true;

    // Transforming data layer
    // TODO: improve this
    if (layerData.body.crs && L.CRS[layerData.body.crs]) {
      layerData.body.crs = L.CRS[layerData.body.crs.replace(':', '')];
      layerData.body.pane = 'tilePane';
    }

    switch (layerData.type) {
      case 'wms':
        layer = new L.tileLayer.wms(layerData.url, layerData.body); // eslint-disable-line
        break;
      case 'tileLayer':
        if (layerData.body.indexOf('style: "function') >= 0) {
          layerData.body.style = eval(`(${layerData.body.style})`); // eslint-disable-line
        }
        layer = new L.tileLayer(layerData.url, layerData.body); // eslint-disable-line
        break;
      default:
        delete this._layersLoading[layerData.id];
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        delete this._layersLoading[layerData.id];
      });
      if (zIndex) {
        layer.setZIndex(zIndex);
      }
      this._mapLayers[layerData.id] = layer;
    }
  }

  _addEsriLayer(layerSpec, { zIndex }) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id;

    this._layersLoading[layer.id] = true;
    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      layerConfig.pane = 'tilePane';
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`); // eslint-disable-line
      }
      const newLayer = L.esri[layer.type](layerConfig);

      newLayer.on('load', () => {
        delete this._layersLoading[layer.id];
        const layerElement = this._map.getPane('tilePane').lastChild;
        if (zIndex) {
          layerElement.style.zIndex = zIndex;
        }
        layerElement.id = layer.id;
      });
      newLayer.addTo(this._map);
      this._mapLayers[layer.id] = newLayer;
    } else {
      this._rejectLayersLoading = true;
      throw new Error('"type" specified in layer spec doesn`t exist');
    }
  }

  _addCartoLayer(layer) {
    if (this._mapRequests[layer.id]) {
      if (this._mapRequests[layer.id].readyState !== 4) {
        this._mapRequests[layer.id].abort();
        delete this._mapRequests[layer.id];
        delete this._layersLoading[layer.id];
      }
    }
    this._layersLoading[layer.id] = true;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', `https://${layer.layerConfig.account}.carto.com/api/v1/map`);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.send(JSON.stringify(layer.layerConfig.body));

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          const data = JSON.parse(xmlhttp.responseText);

          const tileUrl = `https://${layer.layerConfig.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;

          this._mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this._map).setZIndex(9999);

          this._mapLayers[layer.id].on('load', () => {
            delete this._layersLoading[layer.id];
          });
          this._mapLayers[layer.id].on('tileerror', () => {
            this._rejectLayersLoading = true;
          });
        } else {
          this._rejectLayersLoading = true;
        }
      }
    };

    this._mapRequests[layer.id] = xmlhttp;
    return xmlhttp;
  }
}
