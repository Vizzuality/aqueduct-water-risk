import { connect } from 'react-redux';

// component
import AnalysisModal from './component';

export default connect(
  state => ({
    analysis: state.analyzeLocations.analysis,
    downloadUrl: state.analyzeLocations.analysis.downloadUrl
  }),
  null
)(AnalysisModal);
