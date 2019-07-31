import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import { onAddPoint, onSaveGeostore, onFetchAnalysis, setGeostoreLocations, clearPoints } from 'modules/analyze-locations-tab/actions';
import { setMapMode } from 'modules/app/actions';
import { setAnalyzerOpen } from 'modules/settings/actions';

// component
import ImportTabAddresses from './component';

export default connect(
  null,
  {
    onAddPoint,
    onSaveGeostore,
    onFetchAnalysis,
    setGeostoreLocations,
    clearPoints,
    setMapMode,
    setAnalyzerOpen,
    toggleModal
  }
)(ImportTabAddresses);
