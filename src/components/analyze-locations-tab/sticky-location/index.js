import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { setScope } from 'modules/app/actions';

// component
import StickyLocation from './component';

export default connect(
  state => ({ scope: state.app.scope }),
  {
    setScope,
    toggleModal
  }
)(StickyLocation);
