import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'modules/map-view-tab/actions';
import { onApplyAnalysis, onClearAnalysis, setPoints, onSaveGeostore } from 'modules/analyze-locations-tab/actions';

// seleectors
import { parseTimelineOptions } from './selectors';

// component
import AnalyzeLocations from './component';

export default connect(
  state => ({
    timelineOptions: parseTimelineOptions(state),
    points: state.analyzeLocations.points.list,
    timeScale: state.mapView.filters.timeScale,
    scheme: state.mapView.ponderation.scheme,
    geoStore: state.analyzeLocations.geostore.id
  }),
  {
    toggleModal,
    setFilters,
    onApplyAnalysis,
    onClearAnalysis,
    setPoints,
    onSaveGeostore
  }
)(AnalyzeLocations);
