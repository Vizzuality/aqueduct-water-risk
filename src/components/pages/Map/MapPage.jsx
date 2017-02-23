import React from 'react';
import { Sidebar } from 'aqueduct-components';
import Map from 'components/map/Map';

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
      dragend: updateMap
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
          <h1>Sidebar</h1>
          <div>Content</div>
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
  layersActive: React.PropTypes.array,
  setMapParams: React.PropTypes.func,
  updateMapUrl: React.PropTypes.func,
  mapState: React.PropTypes.object
};
