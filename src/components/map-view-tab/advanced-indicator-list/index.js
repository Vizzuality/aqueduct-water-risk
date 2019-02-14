import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/mapView';

// selectors
import { getIndicators } from 'components/map-view-tab/selectors';

// component
import AdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    indicators: getIndicators(state),
    ponderation: state.mapView.ponderation.scheme
  }),
  dispatch => ({ setFilters: (filter) => { dispatch(setFilters(filter)); } })
)(AdvancedIndicatorList);
