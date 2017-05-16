import L from 'leaflet/dist/leaflet';
import React from 'react';
import {
  MapControls,
  Sidebar,
  SegmentedUi,
  ShareButton,
  Legend,
  SourceModal,
  ZoomControl,
  toggleModal
} from 'aqueduct-components';

import { dispatch } from 'main';
import ShareModal from 'containers/modal/ShareModal';
import Map from 'components/map/Map';
import MapView from 'components/pages/Map/_MapView';
import AnalyzeLocations from 'components/pages/Map/_AnalyzeLocations';
import { SCOPE_OPTIONS } from 'constants/mapView';
import { layers } from 'constants/layers';
import { sqlParamsParse } from 'utils/parsings';

export default class MapPage extends React.Component {

  constructor(props) {
    super(props);

    // BINDINGS
    this.toggleShareModal = this.toggleShareModal.bind(this);
    this.toggleSourceModal = this.toggleSourceModal.bind(this);
  }

  componentWillMount() {
    this.props.updateUrl();
  }

  // MODAL EVENTS
  toggleShareModal() {
    dispatch(toggleModal(true, {
      children: ShareModal
    }));
  }

  toggleSourceModal(layer) {
    dispatch(toggleModal(true, {
      children: SourceModal,
      childrenProps: layer
    }));
  }

  render() {
    /* Map config */
    const updateMap = (map) => {
      this.props.setMapParams({
        zoom: map.getZoom(),
        latLng: map.getCenter()
      });
    };

    const addPoint = (map, opts) => {
      this.props.addPoint(opts.latlng);
    };

    const listeners = {
      moveend: updateMap,
      click: addPoint
    };

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 1000 },
        { url: config.BASEMAP_TILE_URL, zIndex: 0 }
      ]
    };

    const mapOptions = {
      zoom: this.props.mapState.zoom,
      minZoom: 2,
      maxZoom: 15,
      zoomControl: false,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };

    const columns = [
      {
        label: 'Lat',
        value: 'lat'
      },
      {
        label: 'Lng',
        value: 'lng'
      }
    ];

    const markerIcon = L.divIcon({
      className: 'c-marker',
      html: '<div class="marker-inner"></div>'
    });

    // Layers sql parsing
    const layer = this.props.layersActive.length ? this.props.layersActive[0] : null;
    let parsedLayer = null;

    if (layer) {
      parsedLayer = sqlParamsParse(layer, this.props.mapView);
    }

    return (
      <div className="c-map-page l-map-page">
        <Sidebar setSidebarWidth={() => {}}>
          <SegmentedUi
            className="-tabs"
            items={SCOPE_OPTIONS}
            selected={this.props.scope}
            onChange={selected => this.props.setScope(selected.value)}
          />
          <div className="l-mapview-content">
            { this.props.scope === 'mapView' &&
              <MapView
                mapView={this.props.mapView}
                layers={layers}
                scope={this.props.scope}
                onSelectLayer={this.props.setActiveLayers}
                setFilters={this.props.setFilters}
                setScope={this.props.setScope}
                setPonderation={this.props.setPonderation}
              />
            }
            { this.props.scope === 'analyzeLocations' &&
              <AnalyzeLocations
                columns={columns}
                data={this.props.pointsCategorized}
                scope={this.props.scope}
                setSelectedPoints={ids => this.props.setSelectedPoints(ids)}
                onPointRemove={id => this.props.removePoint(id)}
                setActiveLayers={this.props.setActiveLayers}
                setScope={this.props.setScope}
                layersActive={this.props.mapView.layers.active}
              />
            }
          </div>
        </Sidebar>

        {/* Map */}
        <Map
          mapOptions={mapOptions}
          mapMethods={mapMethods}
          listeners={listeners}
          layers={parsedLayer ? [parsedLayer] : []}
          markers={this.props.scope === 'analyzeLocations' ? this.props.pointsCategorized : []}
          markerIcon={markerIcon}
        />

        {/* Map controls */}
        <MapControls>
          <ZoomControl
            zoom={this.props.mapState.zoom}
            minZoom={this.props.mapState.minZoom}
            maxZoom={this.props.mapState.maxZoom}
            onZoomChange={zoom => this.props.setMapParams({ zoom })}
          />
          {/* Share button */}
          <ShareButton
            onClick={this.toggleShareModal}
          />
        </MapControls>

        {/* Legend */}
        <Legend
          className="-map"
          expanded
          layers={this.props.layersActive}
          filters={{}}
          onToggleInfo={this.toggleSourceModal}
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  // State
  mapState: React.PropTypes.object,
  mapView: React.PropTypes.object,
  scope: React.PropTypes.string,
  // Selector
  layersActive: React.PropTypes.array,
  pointsCategorized: React.PropTypes.array,
  // Actions
  setMapParams: React.PropTypes.func,
  setScope: React.PropTypes.func,
  updateUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  setActiveLayers: React.PropTypes.func,
  setPonderation: React.PropTypes.func,
  addPoint: React.PropTypes.func,
  removePoint: React.PropTypes.func,
  setSelectedPoints: React.PropTypes.func
};
