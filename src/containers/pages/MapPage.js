import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import { setMapLocation } from 'modules/map';
import { updateUrl } from 'modules/url';
import { setScope } from 'modules/scope';
import { setFilters, setActiveLayers, setPonderation } from 'modules/mapView';
import { setPoints, saveOnGeostore } from 'modules/analyseLocations';
import { store } from 'main';
import { toggleModal } from 'aqueduct-components';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state),
  mapState: state.map,
  scope: state.scope.name,
  mapView: state.mapView,
  points: state.analyseLocations.points.list
});

const mapDispatchToProps = dispatch => ({
  toggleModal(opened, opts) {
    dispatch(toggleModal(opened, opts));
  },
  setMapParams(params) {
    dispatch(setMapLocation(params));
    dispatch(updateUrl());
  },
  updateUrl() {
    dispatch(updateUrl());
  },
  setScope(scope) {
    dispatch(setScope(scope));
    dispatch(updateUrl());
  },
  setFilters(filter) {
    dispatch(setFilters(filter));
    dispatch(updateUrl());
  },
  setActiveLayers(layers) {
    dispatch(setActiveLayers(layers));
    dispatch(updateUrl());
  },
  setPonderation(ponderation) {
    dispatch(setPonderation(ponderation));
    dispatch(updateUrl());
  },
  setPoints(points) {
    dispatch(setPoints(points));
    dispatch(saveOnGeostore(points));
  },
  addPoint(point) {
    const points = store.getState().analyseLocations.points.list.slice();
    points.push(point);
    dispatch(setPoints(points));
    dispatch(saveOnGeostore(points));
  },
  removePoint(id) {
    const points = store.getState().analyseLocations.points.list.slice();
    const pointIndex = points.findIndex(point => point.id === id);
    points.splice(pointIndex, 1);
    dispatch(setPoints(points));
    dispatch(saveOnGeostore(points));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
