

import { connect } from 'react-redux';

// actions
import {
  setPonderation,
  setFilters
} from 'modules/map-view-tab/actions';

// selectors
import { getPonderationLabel } from './selector';

// component
import WeightSelector from './component';

export default connect(
  state => ({
    ponderationLabel: getPonderationLabel(state),
    currentIndicator: state.mapView.filters.indicator
  }),
  {
    setPonderation,
    setFilters
  }
)(WeightSelector);
