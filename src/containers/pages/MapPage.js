import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import { setMapLocation } from 'modules/map';
import { updateUrl } from 'modules/url';
import { setScope } from 'modules/scope';
import { setFilters, setActiveLayers, setPonderation } from 'modules/mapView';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state),
  mapState: state.map,
  scope: state.scope.name,
  mapView: state.mapView
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateUrl());
  },
  updateUrl: () => {
    dispatch(updateUrl());
  },
  setScope: (scope) => {
    dispatch(setScope(scope));
    dispatch(updateUrl());
  },
  setFilters: (filter) => {
    dispatch(setFilters(filter));
    dispatch(updateUrl());
  },
  setActiveLayers: (layers) => {
    dispatch(setActiveLayers(layers));
    dispatch(updateUrl());
  },
  setPonderation: (ponderation) => {
    dispatch(setPonderation(ponderation));
    dispatch(updateUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
