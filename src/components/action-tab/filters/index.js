import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { setFilters } from 'modules/settings/actions';

// component
import FutureFilters from './component';

export default connect(
  state => ({ filters: state.settings.filters }),
  {
    setFilters,
    toggleModal
  }
)(FutureFilters);
