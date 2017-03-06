import React from 'react';
import { Sidebar, SegmentedUi } from 'aqueduct-components';
import Map from 'components/map/Map';
import Filters from 'components/filters/Filters';
import { tabOptions } from 'constants/mapView';
import { layers } from 'constants/layers';
import LayerList from 'components/layers/LayerList';
import CustomTable from 'components/ui/Table'

export default class MapPage extends React.Component {

  componentWillMount() {
    this.props.updateUrl();
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

    const columns = [
      {
        label: 'Field a',
        value: 'fieldA'
      },
      {
        label: 'Field b',
        value: 'fieldB'
      },
      {
        label: 'Field c',
        value: 'fieldC'
      },
      {
        label: 'Field d',
        value: 'fieldD'
      }
    ];

    const data = [
      {
        name: 'Pepe',
        fieldA: 1,
        fieldB: 13,
        fieldC: 31,
        fieldD: 16
      },
      {
        name: 'Pepe',
        fieldA: 22,
        fieldB: 552,
        fieldC: 27,
        fieldD: 82
      },
      {
        name: 'Pepe',
        fieldA: 13,
        fieldB: 344,
        fieldC: 73,
        fieldD: 32
      },
      {
        name: 'Pepe',
        fieldA: 45,
        fieldB: 64,
        fieldC: 0,
        fieldD: 422
      },
      {
        name: 'Pepe',
        fieldA: 775,
        fieldB: 58,
        fieldC: 15,
        fieldD: 56
      },
      {
        name: 'Pepe',
        fieldA: 19,
        fieldB: 12,
        fieldC: 1111,
        fieldD: 5
      },
      {
        name: 'Pepe',
        fieldA: 20,
        fieldB: 'Hola mundo',
        fieldC: 'jejeje',
        fieldD: 55
      },
      {
        name: 'Pepe',
        fieldA: 1,
        fieldB: 33,
        fieldC: 663,
        fieldD: 35
      },
      {
        name: 'Pepe',
        fieldA: 42,
        fieldB: 234,
        fieldC: 46,
        fieldD: 24
      },
      {
        name: 'Pepe',
        fieldA: 5343,
        fieldB: 65,
        fieldC: 534,
        fieldD: 'Hello world'
      }
    ];

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
                <LayerList
                  activeLayers={this.props.mapView.layers.active}
                  layers={layers}
                  onSelectLayer={this.props.setActiveLayers}
                  year={this.props.mapView.filters.year}
                  ponderation={this.props.mapView.ponderation.scheme}
                  scenario={this.props.mapView.filters.scenario}
                  setFilters={this.props.setFilters}
                  setPonderation={this.props.setPonderation}
                />
              </div>
            }
            { this.props.scope === 'analyseLocations' &&
              <CustomTable columns={columns} data={data} pageSize={4} filters />
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
  updateUrl: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  setActiveLayers: React.PropTypes.func,
  setPonderation: React.PropTypes.func
};
