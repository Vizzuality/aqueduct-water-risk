import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/mapView';
import { setScope } from 'modules/scope';

// component
import StickyFilters from './component';

export default connect(
  state => ({
    scope: state.scope.name,
    filters: state.mapView.filters
  }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    setScope: (scope) => { dispatch(setScope(scope)); }
  })
)(StickyFilters);
