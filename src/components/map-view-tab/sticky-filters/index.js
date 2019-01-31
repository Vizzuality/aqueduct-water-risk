import { connect } from 'react-redux';

// actions
import { updateUrl } from 'modules/url';
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
    setFilters: (filter) => {
      dispatch(setFilters(filter));
      // TO-DO: remove updating url from here
      dispatch(updateUrl());
    },
    setScope: (scope) => { dispatch(setScope(scope)); }
  })
)(StickyFilters);
