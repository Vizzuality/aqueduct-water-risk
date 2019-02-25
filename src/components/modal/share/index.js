import { connect } from 'react-redux';

// component
import { ShareModal } from 'aqueduct-components';

// actions
import { getShareUrl } from 'modules/sharing/actions';

export default connect(
  state => ({ share: state.share }),
  { getShareUrl }
)(ShareModal);
