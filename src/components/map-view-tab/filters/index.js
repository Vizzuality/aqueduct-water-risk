import { connect } from 'react-redux';

import {
  toggleModal,
  InfoModal,
  APP_DEFINITIONS
} from 'aqueduct-components';

// actions
import { updateUrl } from 'modules/url';
import { setFilters } from 'modules/mapView';
// component
import Filters from './component';

export default connect(
  state => ({ filters: state.mapView.filters }),
  dispatch => ({
    setFilters: (filter) => {
      dispatch(setFilters(filter));
      // TO-DO: remove updating url from here
      dispatch(updateUrl());
    },
    openModal: (slug) => {
      dispatch(toggleModal(true, {
        children: InfoModal,
        childrenProps: {
          info: APP_DEFINITIONS[slug]
        }
      }));
    }
  })
)(Filters);
