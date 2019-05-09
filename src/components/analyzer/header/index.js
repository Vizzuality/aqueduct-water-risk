import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapMode } from 'modules/app/actions';
import { setAnalyzerOpen } from 'modules/settings/actions';
import { clearAnalysis } from 'modules/analyze-locations-tab/actions';

// component
import AnalyzerHeader from './component';

export default connect(
  state => ({
    points: state.analyzeLocations.points.list,
    mapMode: state.app.mapMode,
    analyzerOpen: state.settings.analyzer.open
  }),
  {
    toggleModal,
    clearAnalysis,
    setMapMode,
    setAnalyzerOpen
  }
)(AnalyzerHeader);
