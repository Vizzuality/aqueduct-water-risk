import { connect } from 'react-redux';

// actions
import { setPonderation } from 'modules/map-view-tab/actions';

// component
import Presets from './component';

export default connect(
  state => ({ ponderation: state.mapView.ponderation.scheme }),
  dispatch => ({ setPonderation: (ponderation) => { dispatch(setPonderation(ponderation)); } })
)(Presets);
