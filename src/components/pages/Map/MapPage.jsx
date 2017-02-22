import React from 'react';
import { Sidebar } from 'aqueduct-components';
import Map from 'components/map/Map';

export default class MapPage extends React.Component {
  render() {
    const listeners = {
      click: () => {
        console.log('click');
      },
      dragend: () => {
        console.log('dragend');
      }
    };

    const mapMethods = {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      zoomControlPosition: 'topright',
      tileLayers: [
        { url: config.BASEMAP_LABEL_URL, zIndex: 0 },
        { url: config.BASEMAP_TILE_URL, zIndex: 1000 }
      ]
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
        />
      </div>
    );
  }
}

MapPage.propTypes = {
  layersActive: React.PropTypes.array
};
