import { connect } from 'react-redux';

// actions
import { setFilters, setTabFilters } from 'modules/settings/actions';
import { toggleModal } from 'aqueduct-components';
import { toggleAside } from 'modules/aside/reducers';

// component
import ActionFilters from './component';

export default connect(
  state => ({ filters: state.settings.filters, tabFilters: state.settings.tabFilters }),
  {
    setFilters,
    setTabFilters,
    toggleModal,
    toggleAside
  }
)(ActionFilters);
