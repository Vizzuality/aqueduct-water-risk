/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet/dist/leaflet';
import isEqual from 'lodash/isEqual';
import LayerManager from './LayerManager';
import { Spinner } from 'aqueduct-components';

const MAP_OPTIONS = {
  zoom: 2,
  minZoom: 2,
  center: [30, -120],
  zoomControl: true,
  detectRetina: true
};

function addOrRemove(oldItems, newItems, addCb, removeCb, updateCb) {
  // TODO: improve performace uning sets instead of looping over arrays
  // Remove
  oldItems.forEach(i => !newItems.find(ii => i.id === ii.id) && removeCb(i));

  // Add
  newItems.forEach(i => !oldItems.find(ii => i.id === ii.id) && addCb(i));

  // Update
  newItems.forEach((i) => {
    const old = oldItems.find(ii => i.id === ii.id);
    if (!!updateCb && !!old && !isEqual(old, i)) {
      updateCb(i);
    }
  });
}

export default class Map extends React.Component {

  /* Constructor */
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  /* Component Lyfecyle */
  componentDidMount() {
    this._mounted = true;
    const mapOptions = Object.assign({}, MAP_OPTIONS, this.props.mapOptions);
    this.map = L.map(this.mapNode, mapOptions);

    // Add event listeners
    this.props.listeners && this.setMapEventListeners();
    // Exec leaflet methods
    this.execMethods();
    // Add layers
    this.initLayerManager();
    this.props.layers && this.addLayer(this.props.layers);
    this.props.markers.length && this.addMarker(this.props.markers);
  }

  componentWillReceiveProps(nextProps) {
    // Fitbounds
    if (!isEqual(this.props.mapMethods.fitBounds, nextProps.mapMethods.fitBounds)) {
      this.map.fitBounds(nextProps.mapMethods.fitBounds);
    }
    // Layers
    if (!isEqual(this.props.layers, nextProps.layers)) {
      this.layerManager.removeAllLayers();
      this.addLayer(nextProps.layers[0]);
    }
    // Markers
    if (!isEqual(this.props.markers, nextProps.markers)) {
      addOrRemove(this.props.markers, nextProps.markers, marker => this.addMarker(marker), marker => this.removeMarker(marker.id), marker => this.updateMarker(marker));
    }
    // Zoom
    if (this.props.mapOptions.zoom !== nextProps.mapOptions.zoom) {
      this.map.setZoom(nextProps.mapOptions.zoom);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const loadingChanged = this.state.loading !== nextState.loading;
    return loadingChanged;
  }

  componentWillUnmount() {
    this._mounted = false;
    this.props.listeners && this.removeMapEventListeners();
    this.map.remove();
  }

  /* LayerManager initialization */
  initLayerManager() {
    const stopLoading = () => {
      this._mounted && this.setState({
        loading: false
      });
    };

    this.layerManager = new LayerManager(this.map, {
      onLayerAddedSuccess: stopLoading,
      onLayerAddedError: stopLoading
    });
  }

  /* MapMethods methods */
  execMethods() {
    Object.keys(this.props.mapMethods).forEach((name) => {
      const methodName = name.charAt(0).toUpperCase() + name.slice(1);
      const fnName = `set${methodName}`;
      typeof this[fnName] === 'function' && this[fnName].call(this);
    });
  }

  setAttribution() {
    this.map.attributionControl.addAttribution(this.props.mapMethods.attribution);
  }

  setZoomControlPosition() {
    this.map.zoomControl.setPosition(this.props.mapMethods.zoomControlPosition);
  }

  setTileLayers() {
    const { tileLayers } = this.props.mapMethods;
    tileLayers.forEach((tile) => {
      L.tileLayer(tile.url, tile.options || {}).addTo(this.map).setZIndex(tile.zIndex);
    });
  }

  /* Event listener methods */
  setMapEventListeners() {
    const { listeners } = this.props;
    Object.keys(listeners).forEach((eventName) => {
      this.map.on(eventName, (...args) => listeners[eventName](this.map, ...args));
    });
  }

  removeMapEventListeners() {
    const { listeners } = this.props;
    const eventNames = Object.keys[listeners];
    eventNames && eventNames.forEach(eventName => this.map.off(eventName));
  }

  /* Layer methods */
  addLayer(layer) {
    this.setState({
      loading: true
    });
    if (Array.isArray(layer)) {
      layer.forEach(l => this.layerManager.addLayer(l));
      return;
    }
    this.layerManager.addLayer(layer);
  }

  removeLayer(layer) {
    if (Array.isArray(layer)) {
      layer.forEach(l => this.layerManager.removeLayer(l.id));
      return;
    }
    this.layerManager.removeLayer(layer.id);
  }

  /* Marker methods */
  addMarker(marker) {
    if (Array.isArray(marker)) {
      marker.forEach(m => this.layerManager.addMarker(m, this.props.markerIcon));
      return;
    }
    this.layerManager.addMarker(marker, this.props.markerIcon);
  }

  removeMarker(markerId) {
    this.layerManager.removeMarker(markerId);
  }

  updateMarker(marker) {
    this.layerManager.updateMarker(marker);
  }

  /* Render method */
  render() {
    return (
      <div className="c-map">
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
        <Spinner isLoading={this.state.loading} />
      </div>
    );
  }
}

Map.propTypes = {
  mapOptions: React.PropTypes.object,
  mapMethods: React.PropTypes.object,
  layers: React.PropTypes.array,
  markers: React.PropTypes.array,
  markerIcon: React.PropTypes.object,
  listeners: React.PropTypes.object
};

Map.defaultProps = {
  mapOptions: {},
  mapMethods: {},
  layers: [],
  listeners: {},
  markers: []
};
