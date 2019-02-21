import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import {
  Map as WRIMap,
  Legend,
  LegendItemToolbar,
  LegendListItem,
  LegendItemTypes,
  LegendItemButtonInfo,
  LegendItemButtonOpacity
} from 'wri-api-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl
} from 'aqueduct-components';

// components
import BasemapControl from './basemap-control';

// constants
import { LABEL_LAYER_CONFIG } from './constants';

class MapComponent extends PureComponent {
  addPoint(event) {
    const { latlng } = event;
    const { onAddPoint } = this.props;
    onAddPoint(latlng);
  }

  handleLayerOpacity(layer, opacity) {
    const { setLayerParametrization } = this.props;

    setLayerParametrization({ opacity });
  }

  updateMap(event, map) {
    const { setMapParams } = this.props;

    setMapParams({
      zoom: map.getZoom(),
      center: map.getCenter()
    });
  }

  render() {
    const {
      map,
      basemap,
      layers,
      scope,
      setMapParams,
      toggleSourceModal,
      toggleShareModal,
      layerGroup
    } = this.props;
    const { zoom, minZoom, maxZoom } = map;
    const events = {
      moveend: (e, _map) => { this.updateMap(e, _map); },
      ...scope === 'analyzeLocations' && { click: (e) => { this.addPoint(e); } }
    };

    return (
      <div className="c-map">
        <WRIMap
          mapOptions={map}
          events={events}
          basemap={basemap}
          label={LABEL_LAYER_CONFIG}
        >
          {_map =>
            <Fragment>
              <LayerManager
                map={_map}
                plugin={PluginLeaflet}
              >
                {layers.map((l, i) => (
                  <Layer
                    {...l}
                    key={l.id}
                    opacity={l.opacity}
                    zIndex={1000 - i}
                    {...l.params && { params: l.params }}
                    {...l.sqlParams && { sqlParams: l.sqlParams }}
                    {...l.decodeParams && { decodeParams: l.decodeParams }}
                  />
                  ))}
              </LayerManager>

              <MapControls>
                <ZoomControl
                  zoom={zoom}
                  minZoom={minZoom}
                  maxZoom={maxZoom}
                  onZoomChange={(_zoom) => { setMapParams({ zoom: _zoom }); }}
                />
                <BasemapControl />
                <ShareButton onClick={toggleShareModal} />
              </MapControls>

              {layers.length && (
                <div className="l-map-legend">
                  <Legend sortable={false}>
                    {layerGroup.map((_layerGroup, i) => (
                      <LegendListItem
                        index={i}
                        key={_layerGroup.dataset}
                        onChangeInfo={(_layer) => { toggleSourceModal(_layer); }}
                        onChangeOpacity={(_layer, _opacity) => { this.handleLayerOpacity(_layer, _opacity); }}
                        layerGroup={_layerGroup}
                        toolbar={(
                          <LegendItemToolbar>
                            <LegendItemButtonOpacity
                              trackStyle={{ backgroundColor: '#2E57B8' }}
                              handleStyle={{ backgroundColor: '#2E57B8' }}
                            />
                            <LegendItemButtonInfo />
                          </LegendItemToolbar>
                        )}
                      >
                        <LegendItemTypes />
                      </LegendListItem>
                    ))}
                  </Legend>
                </div>)}
            </Fragment>
          }
        </WRIMap>
      </div>
    );
  }
}

MapComponent.propTypes = {
  map: PropTypes.object.isRequired,
  basemap: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  layerGroup: PropTypes.array.isRequired,
  scope: PropTypes.string.isRequired,
  setMapParams: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired,
  onAddPoint: PropTypes.func.isRequired,
  toggleSourceModal: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired
};

export default MapComponent;
