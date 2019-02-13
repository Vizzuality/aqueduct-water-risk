import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/mapView';

// selectors
import { getIndicators } from './selectors';

// component
import Future from './component';

export default connect(
  state => ({
    indicators: getIndicators(state),
    currentIndicator: state.mapView.filters.indicator,
    scenario: state.mapView.filters.scenario,
    projection: state.mapView.filters.projection
  }),
  dispatch => ({ setFilters: (filter) => { dispatch(setFilters(filter)); } })
)(Future);
