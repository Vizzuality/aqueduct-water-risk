import { connect } from 'react-redux';
import { toggleModal } from 'aqueduct-components';

// actions
import { updateUrl } from 'modules/app/actions';
import { setPonderation } from 'modules/settings/actions';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// component
import IndicatorModal from 'components/ui/modal/indicator';
import CustomAdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.settings.filters.indicator,
    customPonderation: state.settings.ponderation.custom
  }),
  dispatch => ({
    updateUrl() { dispatch(updateUrl()); },
    setPonderation: (ponderation) => { dispatch(setPonderation(ponderation)); },
    openModal: (indicator) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator] }
      }));
    }
  })
)(CustomAdvancedIndicatorList);
