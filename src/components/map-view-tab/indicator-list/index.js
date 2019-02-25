import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/map-view-tab/actions';

// selectors
import { getIndicators } from 'components/map-view-tab/selectors';

// component
import IndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    indicators: getIndicators(state)
  }),
  dispatch => ({ setFilters: (filter) => { dispatch(setFilters(filter)); } })
)(IndicatorList);
