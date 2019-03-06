import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setFilters } from 'modules/map-view-tab/actions';

// selectors
import { getIndicators } from 'components/map-view-tab/selectors';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// component
import IndicatorModal from 'components/ui/modal/indicator';
import AdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    indicators: getIndicators(state),
    ponderation: state.mapView.ponderation.scheme
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
)(AdvancedIndicatorList);
