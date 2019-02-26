import { connect } from 'react-redux';

// actions
import { setAdvancedMode } from 'modules/app/actions';
import { setFilters, setPonderation } from 'modules/map-view-tab/actions';

// component
import Indicators from './component';

export default connect(
  state => ({
    advancedMode: state.app.advanced,
    currentIndicator: state.mapView.filters.indicator,
    ponderation: state.mapView.ponderation,
    year: state.mapView.filters.year,
    timeScale: state.mapView.filters.timeScale
  }),
  {
    setAdvancedMode,
    setFilters,
    setPonderation
  }
)(Indicators);
