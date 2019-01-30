import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, SegmentedUi } from 'aqueduct-components';

// components
import MapView from 'components/pages/Map/_MapView';
import MapComponent from 'components/map';
import AnalyzeLocations from 'components/pages/Map/_AnalyzeLocations';
import { SCOPE_OPTIONS } from 'constants/mapView';
import { INDICATOR_COLUMNS } from 'constants/indicators';
import { layers, PARENT_CHILDREN_LAYER_RELATION } from 'constants/layers';

export default class MapPage extends PureComponent {
  componentWillMount() {
    this.props.updateUrl();
  }

  // TO-DO: move this to analyzeLocation component
  getIndicatorColumns() {
    const activeLayer = this.props.mapView.layers.active[0];
    const defaultLayer = layers[0].id;
    const columnIndicator = INDICATOR_COLUMNS[activeLayer] || INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[activeLayer]];

    return activeLayer !== defaultLayer ?
      [...INDICATOR_COLUMNS[defaultLayer], ...columnIndicator] : INDICATOR_COLUMNS[defaultLayer];
  }

  render() {
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
                columns={this.getIndicatorColumns()}
                data={this.props.analyzeLocations.weights}
                scope={this.props.scope}
                scheme={this.props.mapView.ponderation.scheme}
                geoStore={this.props.analyzeLocations.points.geoStore}
                points={this.props.analyzeLocations.points.list}
                loading={this.props.analyzeLocations.loading}
                setPoints={this.props.setPoints}
                setSelectedPoints={ids => this.props.setSelectedPoints(ids)}
                onPointRemove={id => this.props.removePoint(id)}
                setActiveLayers={this.props.setActiveLayers}
                setAnalysis={this.props.setAnalysis}
                setScope={this.props.setScope}
                layersActive={this.props.mapView.layers.active}
              />
            }
          </div>
        </Sidebar>

        <MapComponent />
      </div>
    );
  }
}

MapPage.propTypes = {
  // State
  analyzeLocations: PropTypes.object,
  mapView: PropTypes.object,
  scope: PropTypes.string,
  // Selector
  layersActive: PropTypes.array,
  // Actions
  setScope: PropTypes.func,
  updateUrl: PropTypes.func,
  setFilters: PropTypes.func,
  setActiveLayers: PropTypes.func,
  setPonderation: PropTypes.func,
  setAnalysis: PropTypes.func,
  removePoint: PropTypes.func,
  setSelectedPoints: PropTypes.func
};
