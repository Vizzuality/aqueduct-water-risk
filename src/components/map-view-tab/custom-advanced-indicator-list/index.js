import { connect } from 'react-redux';

// actions
import { setPonderation } from 'modules/map-view-tab/actions';

// component
import CustomAdvancedIndicatorList from './component';

export default connect(
  state => ({
    currentIndicator: state.mapView.filters.indicator,
    customPonderation: state.mapView.ponderation.custom
  }),
  dispatch => ({
    setPonderation(ponderation) {
      dispatch(setPonderation(ponderation));
    }
  })
)(CustomAdvancedIndicatorList);
