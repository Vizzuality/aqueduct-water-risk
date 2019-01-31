import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PluginLeaflet } from 'layer-manager/dist/layer-manager';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { Map as WRIMap } from 'wri-api-components/dist/bundle';
import {
  MapControls,
  ShareButton,
  ZoomControl,
  Legend
} from 'aqueduct-components';

// constants
import { BASEMAP_CONFIG, LABEL_LAYER_CONFIG } from './constants';

class MapComponent extends PureComponent {
  constructor(props) {
    super(props);

    this._updateMap = this.updateMap.bind(this);
    this._addPoint = this.addPoint.bind(this);
  }

  // TO-DO
  addPoint(event) {
    console.log(event);
    const { addPoint } = this.props;
    // this.props.addPoint(opts.latlng);
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
      layers,
      setMapParams,
      toggleSourceModal,
      toggleShareModal
    } = this.props;
    const { zoom, minZoom, maxZoom } = map;
    const events = {
      moveend: this._updateMap,
      click: this._addPoint
    };

    return (
      <div className="c-map">
        <WRIMap
          mapOptions={map}
          events={events}
          basemap={BASEMAP_CONFIG}
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
                {/* TO-DO: this has never worked. Fix. */}
                <ShareButton onClick={toggleShareModal} />
              </MapControls>

              <Legend
                className="-map"
                expanded
                // TO-DO: determine active layers
                layers={[]}
                filters={{}}
                onToggleInfo={toggleSourceModal}
              />
            </Fragment>
          }
        </WRIMap>
      </div>
    );
  }
}

MapComponent.propTypes = {
  map: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  setMapParams: PropTypes.func.isRequired,
  addPoint: PropTypes.func.isRequired,
  toggleSourceModal: PropTypes.func.isRequired,
  toggleShareModal: PropTypes.func.isRequired
};

export default MapComponent;
