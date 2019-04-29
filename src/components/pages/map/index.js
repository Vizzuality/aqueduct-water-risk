import { connect } from 'react-redux';

// actions
import { getLayers } from 'modules/layers/actions';
import { setScope, updateUrl } from 'modules/app/actions';
import { setSelectedPoints, setAnalysis } from 'modules/analyze-locations-tab/actions';
import { setFilters, setAnalyzerOpen } from 'modules/settings/actions';

// component
import MapPage from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    advanced: state.app.advanced,
    mapState: state.map,
    loading: state.layers.loading || state.map.loading,
    filters: state.settings.filters,
    ponderation: state.settings.ponderation,
    geostore: state.analyzeLocations.geostore.id,
    analysis: state.analyzeLocations.analysis,
    analyzerOpen: state.settings.analyzer.open
  }),
  {
    updateUrl,
    setScope,
    setSelectedPoints,
    setAnalysis,
    getLayers,
    setFilters,
    setAnalyzerOpen
  }
)(MapPage);
