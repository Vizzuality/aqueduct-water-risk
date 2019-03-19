import { connect } from 'react-redux';

// actions
import { getLayers } from 'modules/layers/actions';
import { setScope, updateUrl } from 'modules/app/actions';
import { setSelectedPoints, setAnalysis } from 'modules/analyze-locations-tab/actions';

// component
import MapPage from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    advanced: state.app.advanced,
    mapState: state.map,
    loading: state.layers.loading || state.map.loading,
    filters: state.mapView.filters,
    ponderation: state.mapView.ponderation,
    geostore: state.analyzeLocations.geostore.id
  }),
  {
    updateUrl,
    setScope,
    setSelectedPoints,
    setAnalysis,
    getLayers
  }
)(MapPage);
