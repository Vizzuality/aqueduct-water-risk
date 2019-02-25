import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'modules/map-view-tab/actions';
import { onApplyAnalysis, onClearAnalysis } from 'modules/analyze-locations-tab/actions';

// seleectors
import { parseTimelineOptions } from './selectors';

// component
import AnalyzeLocations from './component';

export default connect(
  state => ({
    timelineOptions: parseTimelineOptions(state),
    points: state.analyzeLocations.points.list,
    timeScale: state.mapView.filters.timeScale
  }),
  {
    toggleModal,
    setFilters,
    onApplyAnalysis,
    onClearAnalysis
  }
)(AnalyzeLocations);
