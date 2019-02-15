import { connect } from 'react-redux';
// TO-DO: remove this.
import { store } from 'main';

// actions
import { getLayers } from 'modules/layers/actions';
import { setScope, updateUrl } from 'modules/app/actions';
import { setPoints, setSelectedPoints, setAnalysis, saveOnGeostore } from 'modules/analyzeLocations';

// selectors
import getActiveLayers from 'selectors/layers_active';
import getCategorizedPoints from 'selectors/points_categorized';

// component
import MapPage from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    mapState: state.map,
    loading: state.layers.loading,
    mapView: state.mapView,
    filters: state.mapView.filters,
    ponderation: state.mapView.ponderation,
    analyzeLocations: state.analyzeLocations,
    layersActive: [] || getActiveLayers(state),
    pointsCategorized: getCategorizedPoints(state)
  }),
  dispatch => ({
    updateUrl() { dispatch(updateUrl()); },
    setScope(scope) { dispatch(setScope(scope)); },
    setPoints(points) {
      dispatch(setPoints(points));
      dispatch(saveOnGeostore(points));
    },
    setSelectedPoints(active) { dispatch(setSelectedPoints(active)); },
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
    setAnalysis(weights, points) { dispatch(setAnalysis(weights, points)); },
    getLayers() { dispatch(getLayers()); }
  })
)(MapPage);
