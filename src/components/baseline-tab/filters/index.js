import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { setFilters, setPonderation } from 'modules/settings/actions';

// component
import Filters from './component';

export default connect(
  state => ({ filters: state.settings.filters }),
  {
    setFilters,
    setPonderation,
    toggleModal
  }
)(Filters);
