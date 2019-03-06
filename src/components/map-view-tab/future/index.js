import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'modules/map-view-tab/actions';

import IndicatorModal from 'components/ui/modal/indicator';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// selectors
import { getIndicators } from './selectors';

// components
import Future from './component';

export default connect(
  state => ({
    indicators: getIndicators(state),
    currentIndicator: state.mapView.filters.indicator,
    scenario: state.mapView.filters.scenario
  }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    openModal: (indicator) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator] }
      }));
    }
  })
)(Future);
