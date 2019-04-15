import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setMapMode } from 'modules/app/actions';
import {
  onApplyAnalysis,
  clearAnalysis,
  onFetchAnalysis
} from 'modules/analyze-locations-tab/actions';

// component
import Analyzer from './component';

export default connect(
  state => ({
    geoStore: state.analyzeLocations.geostore.id,
    points: state.analyzeLocations.points.list,
    mapMode: state.app.mapMode,
    analysis: state.analyzeLocations.analysis,
    filters: state.settings.filters
  }),
  {
    toggleModal,
    onApplyAnalysis,
    clearAnalysis,
    onFetchAnalysis,
    setMapMode
  }
)(Analyzer);
