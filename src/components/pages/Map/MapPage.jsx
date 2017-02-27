import React from 'react';
import { Sidebar, SegmentedUi } from 'aqueduct-components';
import Map from 'components/map/Map';
import Filters from 'components/filters/Filters';
import { tabOptions } from 'constants/mapView';
import { layers } from 'constants/layers';
import LayerList from 'components/layers/LayerList';

export default class MapPage extends React.Component {

  componentWillMount() {
    this.props.updateMapUrl();
  }

  render() {
    /* Map config */
    const updateMap = (map) => {
      this.props.setMapParams({
        zoom: map.getZoom(),
        latLng: map.getCenter()
      });
    };

    const listeners = {
      zoomend: updateMap,
      moveend: updateMap
    };

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      zoomControlPosition: 'topright',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
    };

    const mapOptions = {
      zoom: this.props.mapState.zoom,
      center: [this.props.mapState.latLng.lat, this.props.mapState.latLng.lng]
    };

    return (
      <div className="c-map-page l-map-page">
        <Sidebar setSidebarWidth={() => {}}>
          <SegmentedUi
            className="-tabs"
            items={tabOptions}
            selected={this.props.scope}
            onChange={selected => this.props.setScope(selected.value)}
          />
          <div className="l-mapview-content">
            { this.props.scope === 'mapView' &&
              <div>
                <Filters
                  filters={this.props.mapView.filters}
                  setFilters={this.props.setFilters}
                />
                <LayerList layers={layers} />
              </div>
            }
          </div>
        </Sidebar>
        <Map
          listeners={listeners}
          mapMethods={mapMethods}
          layers={this.props.layersActive}
          mapOptions={mapOptions}
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
  // Actions
  setMapParams: React.PropTypes.func,
  setScope: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func
};
