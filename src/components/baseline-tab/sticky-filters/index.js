import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/settings/actions';
import { setScope } from 'modules/app/actions';

// component
import StickyFilters from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    filters: state.settings.filters
  }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    setScope: (scope) => { dispatch(setScope(scope)); }
  })
)(StickyFilters);
