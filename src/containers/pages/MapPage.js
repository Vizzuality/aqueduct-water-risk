import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import getCategorizedPoints from 'selectors/points_categorized';
import { setMapLocation } from 'modules/map';
import { updateUrl } from 'modules/url';
import { setScope } from 'modules/scope';
import { setFilters, setActiveLayers, setPonderation } from 'modules/mapView';
import { setPoints, setSelectedPoints, setAnalysis, saveOnGeostore } from 'modules/analyzeLocations';
import { store } from 'main';

const mapStateToProps = state => ({
  scope: state.scope.name,
  mapState: state.map,
  mapView: state.mapView,
  analyzeLocations: state.analyzeLocations,
  layersActive: getActiveLayers(state),
  pointsCategorized: getCategorizedPoints(state)
});

const mapDispatchToProps = dispatch => ({
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
  setSelectedPoints(active) {
    dispatch(setSelectedPoints(active));
  },
  addPoint(point) {
    const points = store.getState().analyzeLocations.points.list.slice();
    points.push(point);
    dispatch(setPoints(points));
    dispatch(saveOnGeostore(points));
  },
  removePoint(id) {
    const points = store.getState().analyzeLocations.points.list.slice();
    const pointIndex = points.findIndex(point => point.id === id);
    points.splice(pointIndex, 1);
    dispatch(setPoints(points));
    dispatch(saveOnGeostore(points));
  },
  setAnalysis(weights, points) {
    dispatch(setAnalysis(weights, points));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
