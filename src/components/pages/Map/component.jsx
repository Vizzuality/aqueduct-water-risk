import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, SegmentedUi, Spinner } from 'aqueduct-components';
import isEqual from 'lodash/isEqual';

// components
import MapView from 'components/pages/map/map-view-tab';
import AnalyzeLocations from 'components/pages/map/analyze-locations-tab';
import MapComponent from 'components/map';

// constants
import { SCOPE_OPTIONS } from 'constants/app';

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
      updateUrl,
      analyzeLocations: { }
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
    const scopeChanged = scope !== nextScope;

    // updates URL if any of these params change
    if (filtersChanged || ponderationChanged || scopeChanged || mapStateChanged) updateUrl();
  }

  render() {
    const {
      scope,
      loading,
      setScope
    } = this.props;

    return (
      <div className="c-map-page l-map-page">
        <Sidebar setSidebarWidth={() => {}}>
          <SegmentedUi
            className="-tabs"
            items={SCOPE_OPTIONS}
            selected={scope}
            onChange={({ value }) => { setScope(value); }}
          />
          <div className="l-mapview-content">
            {scope === 'mapView' && (<MapView />)}
            {scope === 'analyzeLocations' &&
              (<AnalyzeLocations
                scope={scope}
                scheme={this.props.mapView.ponderation.scheme}
                geoStore={this.props.analyzeLocations.points.geoStore}
                points={this.props.analyzeLocations.points.list}
                setPoints={this.props.setPoints}
                setSelectedPoints={ids => this.props.setSelectedPoints(ids)}
                onPointRemove={id => this.props.removePoint(id)}
                setActiveLayers={this.props.setActiveLayers}
                setAnalysis={this.props.setAnalysis}
                setScope={this.props.setScope}
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
  analyzeLocations: PropTypes.object.isRequired,
  mapView: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  ponderation: PropTypes.object.isRequired,
  scope: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  mapState: PropTypes.object.isRequired,
  setScope: PropTypes.func.isRequired,
  updateUrl: PropTypes.func.isRequired,
  setActiveLayers: PropTypes.func,
  setAnalysis: PropTypes.func,
  removePoint: PropTypes.func,
  setSelectedPoints: PropTypes.func,
  getLayers: PropTypes.func.isRequired
};

export default MapPage;
