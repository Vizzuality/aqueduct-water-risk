import React from 'react';
import { Sidebar, Map } from 'aqueduct-components';

export default class MapPage extends React.Component {
  render() {
    const mapConfig = {
      zoom: 3,
      latLng: {
        lat: 0,
        lng: 0
      }
    };
    return (
      <div className="c-map-page l-map-page">
        <Sidebar setSidebarWidth={() => {}}>
          <h1>Sidebar</h1>
          <div>Content</div>
        </Sidebar>
        <Map mapConfig={mapConfig} layersActive={[]} LayerManager={() => {}} setMapParams={() => {}} />
      </div>
    );
  }
}
