import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { onAddPoint, onSaveGeostore, onFetchAnalysis } from 'modules/analyze-locations-tab/actions';
import { setMapMode } from 'modules/app/actions';
import { setAnalyzerOpen } from 'modules/settings/actions';

// component
import AddressForm from './component';

export default connect(
  null,
  {
    onAddPoint,
    onSaveGeostore,
    onFetchAnalysis,
    toggleModal,
    setMapMode,
    setAnalyzerOpen
  }
)(AddressForm);
