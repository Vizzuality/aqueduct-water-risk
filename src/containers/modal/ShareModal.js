import { connect } from 'react-redux';
import { ShareModal } from 'aqueduct-components';
import { getShareUrl } from 'modules/share';

const mapStateToProps = ({ share }) => ({
  share
});

export default connect(mapStateToProps, {
  getShareUrl
})(ShareModal);
