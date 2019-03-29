import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { setFilters, setPonderation } from 'modules/map-view-tab/actions';

// selectors
import { getTimeFrameOptions } from './selectors';

// component
import Filters from './component';

export default connect(
  state => ({
    filters: state.mapView.filters,
    timeframeOptions: getTimeFrameOptions(state)
  }),
  {
    setFilters,
    setPonderation,
    toggleModal
  }
)(Filters);
