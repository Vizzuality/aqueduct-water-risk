import { connect } from 'react-redux';

// actions
import {
  setPonderation,
  setFilters
} from 'modules/map-view-tab/actions';

// component
import Presets from './component';

export default connect(
  state => ({
    ponderation: state.mapView.ponderation.scheme,
    currentIndicator: state.mapView.filters.indicator
  }),
  {
    setPonderation,
    setFilters
  }
)(Presets);
