import { connect } from 'react-redux';

import {
  toggleModal,
  InfoModal,
  APP_DEFINITIONS
} from 'aqueduct-components';

// actions
import { setFilters, setPonderation } from 'modules/mapView';
// component
import Filters from './component';

export default connect(
  state => ({ filters: state.mapView.filters }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    setPonderation: (filter) => { dispatch(setPonderation(filter)); },
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
