import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { onAddPoint, onSaveGeostore } from 'modules/analyze-locations-tab/actions';

// component
import ImportFileModal from './component';

export default connect(
  null,
  {
    onAddPoint,
    onSaveGeostore,
    toggleModal
  }
)(ImportFileModal);
