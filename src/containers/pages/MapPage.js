import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import { setMapLocation, updateMapUrl } from 'modules/map';
import { setScope } from 'modules/scope';
import { setFilters } from 'modules/mapView';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state),
  mapState: state.map,
  scope: state.scope.name,
  mapView: state.mapView
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  },
  updateMapUrl: () => {
    dispatch(updateMapUrl());
  },
  setScope: (scope) => {
    dispatch(setScope(scope));
  },
  setFilters: (filter) => {
    dispatch(setFilters(filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
