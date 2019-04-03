import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/map-view-tab/actions';
import { onFetchAnalysis } from 'modules/analyze-locations-tab/actions';

// selectors
import { getMonthlyOptions } from './selectors';

// component
import MonthlyIndicators from './component';

export default connect(
  state => ({ timelineOptions: getMonthlyOptions(state) }),
  {
    setFilters,
    onFetchAnalysis
  }
)(MonthlyIndicators);
