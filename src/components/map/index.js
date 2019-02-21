import { connect } from 'react-redux';

// actions
import { toggleModal, SourceModal } from 'aqueduct-components';
import ShareModal from 'components/modal/share';
import { setMapLocation, setLayerParametrization } from 'modules/map/actions';
import { onAddPoint } from 'modules/analyze-locations-tab/actions';

// selectors
import {
  parseMapState,
  getUpdatedLayers,
  getLayerGroup
} from './selectors';

// component
import MapComponent from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    map: parseMapState(state),
    layers: getUpdatedLayers(state),
    layerGroup: getLayerGroup(state)
  }),
  dispatch => ({
    setMapParams: (params) => { dispatch(setMapLocation(params)); },
    setLayerParametrization: (params) => { dispatch(setLayerParametrization(params)); },
    onAddPoint: (point) => { dispatch(onAddPoint(point)); },
    toggleShareModal: () => { dispatch(toggleModal(true, { children: ShareModal })); },
    toggleSourceModal: (layer) => {
      dispatch(toggleModal(true, {
        children: SourceModal,
        childrenProps: { layer }
      }));
    }
  })
)(MapComponent);
