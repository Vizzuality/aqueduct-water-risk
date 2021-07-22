import { connect } from 'react-redux';
import AsideContext from './component';

import { toggleAside, closeAside } from '../../modules/aside/reducers';

export default connect(
  state => ({ aside: state.aside }),
  { toggleAside, closeAside }
)(AsideContext);
