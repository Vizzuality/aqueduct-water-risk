import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { setPonderation } from 'modules/map-view-tab/actions';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// component
import IndicatorModal from 'components/ui/modal/indicator';
import CustomAdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    customPonderation: state.mapView.ponderation.custom
  }),
  dispatch => ({
    setPonderation(ponderation) {
      dispatch(setPonderation(ponderation));
    },
    openModal: (indicator) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator] }
      }));
    }
  })
)(CustomAdvancedIndicatorList);
