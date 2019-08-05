import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'modules/settings/actions';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// components
import IndicatorModal from 'components/ui/modal/indicator';
import Future from './component';

// selectors
import { getIndicators } from './selectors';

export default connect(
  state => ({
    indicators: getIndicators(state),
    currentIndicator: state.settings.filters.indicator,
    scenario: state.settings.filters.scenario
  }),
  dispatch => ({
    setFilters: (filter) => { dispatch(setFilters(filter)); },
    openModal: (indicator, scenario) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator](scenario) }
      }));
    }
  })
)(Future);
