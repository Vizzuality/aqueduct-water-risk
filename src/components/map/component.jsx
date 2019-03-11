import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import {
  Map as WRIMap,
  MapPopup,
  Legend,
  LegendItemToolbar,
  LegendListItem,
  LegendItemTypes,
  LegendItemButtonInfo,
  LegendItemButtonOpacity
} from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl
} from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// components
import BasemapControl from './basemap-control';
import Popup from './popup';

// constants
import { LABEL_LAYER_CONFIG } from './constants';

class MapComponent extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const {
      layers,
      indicator
    } = this.props;
    const {
      layers: nextLayers,
      indicator: nextIndicator
    } = nextProps;
    const layersChanged = !isEqual(layers, nextLayers);
    const indicatorChanged = !isEqual(indicator, nextIndicator);

    if ((layersChanged || indicatorChanged) && this.popup) this.popup._close();
  }

  addPoint(event) {
    const { latlng } = event;
    const { onAddPoint } = this.props;
    onAddPoint(latlng);
  }

  handleLayerOpacity(layer, opacity) {
    const { setLayerParametrization } = this.props;

    setLayerParametrization({ opacity });
  }

  handleClickMap(e) {
    const { setPopup } = this.props;
    const { latlng, data } = e;

    setPopup({
      latlng,
      data
    });
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
      indicator,
      scope,
      setMapParams,
      toggleSourceModal,
      toggleShareModal,
      layerGroup,
      popup
    } = this.props;
    const { zoom, minZoom, maxZoom } = map;
    const mapEvents = { moveend: (e, _map) => { this.updateMap(e, _map); } };

    return (
      <div className="l-map">
        <WRIMap
          mapOptions={map}
          events={mapEvents}
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
                    {... l.interactionConfig && {
                      interactivity: ['carto', 'cartodb'].includes(l.provider)
                        ? (l.interactionConfig.output || []).map(o => o.column)
                        : true
                    }}
                    events={{
                      ...scope === 'analyzeLocations' && { click: (e) => { this.addPoint(e); } },
                      ...scope === 'mapView' && { click: (e) => { this.handleClickMap(e); } }
                    }}
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

              <MapPopup
                map={_map}
                latlng={popup.latlng}
                data={{
                  layers,
                  data: popup.data
                }}
                onReady={(_popup) => { this.popup = _popup; }}
              >
                <Popup />
              </MapPopup>

              {layers.length && (
                <div className="l-map-legend">
                  <Legend sortable={false}>
                    {layerGroup.map((_layerGroup, i) => (
                      <LegendListItem
                        index={i}
                        key={_layerGroup.dataset}
                        onChangeInfo={() => { toggleSourceModal(indicator); }}
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
  indicator: PropTypes.string.isRequired,
  popup: PropTypes.object.isRequired,
  scope: PropTypes.string.isRequired,
  setMapParams: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  onAddPoint: PropTypes.func.isRequired,
  toggleSourceModal: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired
};

export default MapComponent;
