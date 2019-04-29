

import { connect } from 'react-redux';

// actions
import {
  setPonderation,
  setFilters
} from 'modules/settings/actions';

// selectors
import { getPonderationLabel } from './selector';

// component
import WeightSelector from './component';

export default connect(
  state => ({
    ponderationLabel: getPonderationLabel(state),
    currentIndicator: state.settings.filters.indicator
  }),
  {
    setPonderation,
    setFilters
  }
)(WeightSelector);
