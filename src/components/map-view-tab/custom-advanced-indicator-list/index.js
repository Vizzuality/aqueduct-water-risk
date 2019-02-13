import { connect } from 'react-redux';

// actions
import { setPonderation } from 'modules/mapView';

// component
import CustomAdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    customPonderation: state.mapView.ponderation.custom
  }),
  dispatch => ({
    setCustomValue(customPonderation) {
      dispatch(setPonderation({ custom: customPonderation }));
    }
  })
)(CustomAdvancedIndicatorList);
