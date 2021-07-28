import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters, setTabFilters } from 'modules/settings/actions';
import {
  onApplyAnalysis,
  clearAnalysis,
  setPoints,
  onSaveGeostore,
  onFetchAnalysis
} from 'modules/analyze-locations-tab/actions';

// selectors
//
// component
//

import AnalyzeLocations from './component';

export default connect(
  state => ({
    points: state.analyzeLocations.points.list,
    filters: state.settings.filters,
    tabFilters: state.settings.tabFilters,
    timeScale: state.settings.filters.timeScale,
    scheme: state.settings.ponderation.scheme,
    geoStore: state.analyzeLocations.geostore.id,
    downloadUrl: state.analyzeLocations.analysis.downloadUrl
  }),
  {
    toggleModal,
    setFilters,
    setTabFilters,
    onApplyAnalysis,
    clearAnalysis,
    setPoints,
    onSaveGeostore,
    onFetchAnalysis
  }
)(AnalyzeLocations);
