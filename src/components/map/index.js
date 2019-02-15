import { connect } from 'react-redux';

// actions
import { toggleModal, SourceModal } from 'aqueduct-components';
import ShareModal from 'components/modal/share';
import { setMapLocation } from 'modules/map/actions';
import { updateUrl } from 'modules/app/actions';

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
    map: parseMapState(state),
    layers: getUpdatedLayers(state),
    layerGroup: getLayerGroup(state)
  }),
  dispatch => ({
    setMapParams: (params) => {
      dispatch(setMapLocation(params));
      dispatch(updateUrl());
    },
    // addPoint(point) {
    //   const points = store.getState().analyzeLocations.points.list.slice();
    //   points.push(point);
    //   dispatch(setPoints(points));
    //   dispatch(saveOnGeostore(points));
    // },
    addPoint: () => {},
    toggleShareModal: () => { dispatch(toggleModal(true, { children: ShareModal })); },
    toggleSourceModal: (layer) => {
      dispatch(toggleModal(true, {
        children: SourceModal,
        childrenProps: { layer }
      }));
    }
  })
)(MapComponent);
