import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/map-view-tab/actions';

// selectors
import { getIndicators } from './selectors';

// component
import Future from './component';

export default connect(
  state => ({
    indicators: getIndicators(state),
    currentIndicator: state.mapView.filters.indicator,
    scenario: state.mapView.filters.scenario
  }),
  dispatch => ({ setFilters: (filter) => { dispatch(setFilters(filter)); } })
)(Future);
