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
      advanced,
      mapState,
      geostore,
      updateUrl
    } = this.props;
    const {
      filters: nextFilters,
      ponderation: nextPonderation,
      scope: nextScope,
      advanced: nextAdvanced,
      mapState: nextMapState,
      geostore: nextGeostore
    } = nextProps;

    const filtersChanged = !isEqual(filters, nextFilters);
    const mapStateChanged = !isEqual(mapState, nextMapState);
    const ponderationChanged = ponderation.scheme !== nextPonderation.scheme;
    const scopeChanged = scope !== nextScope;
    const advancedModeChanged = advanced !== nextAdvanced;
    const geostoreChanged = geostore !== nextGeostore;

    // updates URL if any of these params change
    if (filtersChanged || ponderationChanged
      || scopeChanged || mapStateChanged
      || advancedModeChanged || geostoreChanged) updateUrl();
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
            {scope === 'analyzeLocations' && (<AnalyzeLocations />)}
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
  filters: PropTypes.object.isRequired,
  ponderation: PropTypes.object.isRequired,
  scope: PropTypes.string.isRequired,
  advanced: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  mapState: PropTypes.object.isRequired,
  geostore: PropTypes.any,
  setScope: PropTypes.func.isRequired,
  updateUrl: PropTypes.func.isRequired,
  getLayers: PropTypes.func.isRequired
};

MapPage.defaultProps = { geostore: null };

export default MapPage;
