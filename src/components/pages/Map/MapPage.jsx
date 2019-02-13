import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, SegmentedUi } from 'aqueduct-components';

// components
import MapView from 'components/pages/Map/map-view';
import MapComponent from 'components/map';
import AnalyzeLocations from 'components/pages/Map/_AnalyzeLocations';
import { SCOPE_OPTIONS } from 'constants/mapView';
import { INDICATORS, INDICATOR_COLUMNS, PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

export default class MapPage extends PureComponent {
  componentWillMount() {
    const { getLayers, updateUrl } = this.props;

    getLayers();
    updateUrl();
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters: { year, timeScale },
      ponderation: { scheme },
      getLayers
    } = this.props;
    const {
      filters: nextFilters,
      ponderation: { scheme: nextScheme }
    } = nextProps;
    const { year: nextYear, timeScale: nextTimeScale } = nextFilters;

    if (
      (year === 'baseline' && nextYear !== 'baseline') ||
      (year !== 'baseline' && nextYear === 'baseline') ||
      (timeScale !== nextTimeScale) ||
      (scheme !== nextScheme)) {
      getLayers();
    }
  }

  // TO-DO: move this to analyzeLocation component
  getIndicatorColumns() {
    const activeLayer = this.props.mapView.layers.active[0];
    const defaultLayer = INDICATORS[0].id;
    const columnIndicator = INDICATOR_COLUMNS[activeLayer] || INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[activeLayer]];

    return activeLayer !== defaultLayer ?
      [...INDICATOR_COLUMNS[defaultLayer], ...columnIndicator] : INDICATOR_COLUMNS[defaultLayer];
  }

  render() {
    const { scope } = this.props;

    return (
      <div className="c-map-page l-map-page">
        <Sidebar setSidebarWidth={() => {}}>
          <SegmentedUi
            className="-tabs"
            items={SCOPE_OPTIONS}
            selected={scope}
            onChange={({ value }) => { this.props.setScope(value); }}
          />
          <div className="l-mapview-content">
            {scope === 'mapView' && (<MapView />)}
            {scope === 'analyzeLocations' &&
              (<AnalyzeLocations
                columns={this.getIndicatorColumns()}
                data={this.props.analyzeLocations.weights}
                scope={scope}
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
              />)
            }
          </div>
        </Sidebar>
        <MapComponent />
      </div>
    );
  }
}

MapPage.propTypes = {
  analyzeLocations: PropTypes.object,
  mapView: PropTypes.object,
  filters: PropTypes.object.isRequired,
  ponderation: PropTypes.object.isRequired,
  scope: PropTypes.string,
  setScope: PropTypes.func,
  updateUrl: PropTypes.func,
  setActiveLayers: PropTypes.func,
  setAnalysis: PropTypes.func,
  removePoint: PropTypes.func,
  setSelectedPoints: PropTypes.func,
  getLayers: PropTypes.func.isRequired
};
