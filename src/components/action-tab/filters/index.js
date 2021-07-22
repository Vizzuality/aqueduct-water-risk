import { connect } from 'react-redux';

// actions
import { setFilters } from 'modules/settings/actions';
import { toggleModal } from 'aqueduct-components';
import { toggleAside } from 'modules/aside/reducers';

// component
import FutureFilters from './component';

export default connect(
  state => ({ filters: state.settings.filters }),
  {
    setFilters,
    toggleModal,
    toggleAside
  }
)(FutureFilters);
