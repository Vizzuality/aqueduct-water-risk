import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, SegmentedUi, Spinner } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// components
import MapView from 'components/pages/map/map-view';
import AnalyzeLocations from 'components/pages/map/_AnalyzeLocations';
import MapComponent from 'components/map';

// constants
import { SCOPE_OPTIONS } from 'constants/mapView';
import { INDICATORS, INDICATOR_COLUMNS, PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

class MapPage extends PureComponent {
  componentWillMount() {
    const {
      getLayers,
      updateUrl
    } = this.props;

    getLayers();
    updateUrl();
  }

  componentWillReceiveProps(nextProps) {
    const {
      filters,
      ponderation,
      scope,
      mapState,
      updateUrl
    } = this.props;
    const {
      filters: nextFilters,
      ponderation: nextPonderation,
      scope: nextScope,
      mapState: nextMapState
    } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);
    const mapStateChanged = !isEqual(mapState, nextMapState);
    const ponderationChanged = ponderation.scheme !== nextPonderation.scheme;
    const scopeChanged = scope.name !== nextScope.name;

    // updates URL if any of these params change
    if (filtersChanged || ponderationChanged || scopeChanged || mapStateChanged) updateUrl();
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
    const { scope, loading } = this.props;

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
        {loading && (
          <Spinner
            isLoading={loading}
            className="-map"
          />
        )}
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
  loading: PropTypes.bool.isRequired,
  mapState: PropTypes.object.isRequired,
  setScope: PropTypes.func,
  updateUrl: PropTypes.func,
  setActiveLayers: PropTypes.func,
  setAnalysis: PropTypes.func,
  removePoint: PropTypes.func,
  setSelectedPoints: PropTypes.func,
  getLayers: PropTypes.func.isRequired
};

export default MapPage;
