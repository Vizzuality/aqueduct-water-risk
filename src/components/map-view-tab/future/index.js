import { connect } from 'react-redux';

// actions
import { updateUrl } from 'modules/url';
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
  dispatch => ({
    setFilters: (filter) => {
      dispatch(setFilters(filter));
      // TO-DO: remove updating url from here
      dispatch(updateUrl());
    }
  })
)(Future);
