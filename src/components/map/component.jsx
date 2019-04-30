import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import {
  Map as WRIMap,
  MapPopup,
  Legend as VizzLegend,
  LegendItemToolbar,
  LegendListItem,
  LegendItemButtonInfo,
  LegendItemButtonOpacity
} from 'vizzuality-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Legend
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
      indicator,
      setLoading
    } = this.props;
    const {
      layers: nextLayers,
      indicator: nextIndicator
    } = nextProps;
    const layersChanged = !isEqual(layers, nextLayers);
    const indicatorChanged = !isEqual(indicator, nextIndicator);

    if ((layersChanged || indicatorChanged)) {
      setLoading(true);
      if (this.popup) this.popup._close();
    }
  }

  handlePoint(event) {
    const { latlng, layer } = event;
    const { onAddPoint, onRemovePoint } = this.props;
    if (layer) {
      const { editing: { _marker: { _latlng } } } = layer;
      const { lat, lng } = _latlng;
      onRemovePoint({ lat, lng });
    } else {
      onAddPoint(latlng);
    }
  }

  handleLayerOpacity(layer, opacity) {
    const { setLayerParametrization } = this.props;

    setLayerParametrization({ opacity });
  }

  handleClickMap(e, layer) {
    const { setPopupLocation, setPopupData } = this.props;
    const { latlng, data } = e;

    setPopupLocation(latlng);
    setPopupData({ [layer.id]: data });
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
      loading,
      indicator,
      mapMode,
      setMapParams,
      toggleSourceModal,
      toggleShareModal,
      layerGroup,
      popup,
      setLoading
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
                onReady={() => { if (loading) setLoading(false); }}
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
                      ...mapMode === 'analysis' && { click: (e) => { this.handlePoint(e); } },
                      ...mapMode === 'view' && { click: (e) => { this.handleClickMap(e, l); } }
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
                  <VizzLegend sortable={false}>
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
                        <Legend filters={{}} />
                      </LegendListItem>
                    ))}
                  </VizzLegend>
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
  loading: PropTypes.bool.isRequired,
  layers: PropTypes.array.isRequired,
  layerGroup: PropTypes.array.isRequired,
  indicator: PropTypes.string.isRequired,
  popup: PropTypes.object.isRequired,
  mapMode: PropTypes.string.isRequired,
  setMapParams: PropTypes.func.isRequired,
  setLayerParametrization: PropTypes.func.isRequired,
  setPopupLocation: PropTypes.func.isRequired,
  setPopupData: PropTypes.func.isRequired,
  onAddPoint: PropTypes.func.isRequired,
  onRemovePoint: PropTypes.func.isRequired,
  toggleSourceModal: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
};

export default MapComponent;
