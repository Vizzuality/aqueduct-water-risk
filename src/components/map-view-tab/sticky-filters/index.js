import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/map-view-tab/actions';
import { setScope } from 'modules/app/actions';

// component
import StickyFilters from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    filters: state.mapView.filters
  }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    setScope: (scope) => { dispatch(setScope(scope)); }
  })
)(StickyFilters);
