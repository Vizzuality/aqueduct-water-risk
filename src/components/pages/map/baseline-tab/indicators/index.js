import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { setAdvancedMode } from 'modules/app/actions';
import { setFilters, setPonderation } from 'modules/settings/actions';

// component
import Indicators from './component';

export default connect(
  state => ({
    advancedMode: state.app.advanced,
    currentIndicator: state.settings.filters.indicator,
    ponderation: state.settings.ponderation,
    timeScale: state.settings.filters.timeScale
  }),
  {
    setAdvancedMode,
    setFilters,
    setPonderation,
    toggleModal
  }
)(Indicators);
