import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/settings/actions';

// selectors
import { getIndicators } from './selectors';

// components
import Future from './component';

export default connect(
  state => ({
    indicators: getIndicators(state),
    currentIndicator: state.settings.filters.indicator
  }),
  dispatch => ({ setFilters: (filter) => { dispatch(setFilters(filter)); } })
)(Future);
