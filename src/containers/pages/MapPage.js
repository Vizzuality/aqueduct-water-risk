import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import { setMapLocation } from 'modules/map';
import { updateUrl } from 'modules/url';
import { setScope } from 'modules/scope';
import { setFilters, setActiveLayers, setPonderation } from 'modules/mapView';
import { setPoints, addPoint, removePoint } from 'modules/analyseLocations';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state),
  mapState: state.map,
  scope: state.scope.name,
  mapView: state.mapView,
  points: state.analyseLocations.points
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
  },
  setPoints: (points) => {
    dispatch(setPoints(points));
  },
  addPoint: (point) => {
    dispatch(addPoint(point));
  },
  removePoint: (pointIndex) => {
    dispatch(removePoint(pointIndex));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
