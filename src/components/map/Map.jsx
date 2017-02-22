/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */

import React from 'react';
import L from 'leaflet/dist/leaflet';
import isEqual from 'lodash/isEqual';
import { Spinner } from 'aqueduct-components';
import LayerManager from './LayerManager';

const MAP_CONFIG = {
  zoom: 2,
  minZoom: 2,
  center: [30, -120],
  zoomControl: true,
  detectRetina: true
};

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
    const cfg = Object.assign({}, MAP_CONFIG, this.props.mapOptions);
    this.map = L.map(this.mapNode, cfg);

    // Add event listeners
    this.props.listeners && this.setMapEventListeners();
    // Exec leaflet methods
    this.props.mapMethods.zoomControlPosition && this.setZoomControlPosition();
    this.props.mapMethods.attribution && this.setAttribution();
    this.props.mapMethods.tileLayers && this.setTileLayers();

    // Add layers
    this.initLayerManager();
    this.props.layers.length && this.addLayer(this.props.layers);
  }

  componentWillReceiveProps(nextProps) {
    // TODO: check props.layers and props.mapOptions
    if (!isEqual(this.props.mapMethods.fitBounds, nextProps.mapMethods.fitBounds)) {
      this.map.fitBounds(nextProps.mapMethods.fitBounds);
    }
    if (!isEqual(this.props.layers, nextProps.layers)) {
      this.addLayer(nextProps.layers);
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
      this.map.on(eventName, (...args) => listeners[eventName](args));
    });
  }

  removeMapEventListeners() {
    const { listeners } = this.props;
    Object.keys[listeners].forEach(eventName => this.map.off(eventName));
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
    this.layerManager.addLayer(layer.id);
  }

  removeLayer(layer) {
    if (Array.isArray(layer)) {
      layer.forEach(l => this.layerManager.removeLayer(l.id));
      return;
    }
    this.layerManager.removeLayer(layer.id);
  }

  /* Render method */
  render() {
    return (
      <div className="c-map">
        <Spinner isLoading={this.state.loading} />
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  mapOptions: React.PropTypes.object,
  mapMethods: React.PropTypes.object,
  layers: React.PropTypes.array,
  listeners: React.PropTypes.object
};

Map.defaultProps = {
  mapOptions: {},
  mapMethods: {},
  layers: [],
  listeners: {}
};
