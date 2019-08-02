import { connect } from 'react-redux';

// component
import AnalysisModal from './component';

export default connect(
  state => ({ downloadUrl: state.analyzeLocations.analysis.downloadUrl }),
  null
)(AnalysisModal);
