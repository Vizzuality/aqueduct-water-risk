import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import ShareModal from 'components/modal/share';
import {
  setMapLocation,
  setLayerParametrization,
  setPopupLocation,
  setPopupData,
  setLoading
} from 'modules/map/actions';
import { onAddPoint } from 'modules/analyze-locations-tab/actions';

import IndicatorModal from 'components/ui/modal/indicator';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// selectors
import {
  parseMapState,
  parseBasemap,
  getUpdatedLayers,
  getLayerGroup
} from './selectors';


// component
import MapComponent from './component';

export default connect(
  state => ({
    scope: state.app.scope,
    indicator: state.mapView.filters.indicator,
    map: parseMapState(state),
    basemap: parseBasemap(state),
    layers: getUpdatedLayers(state),
    layerGroup: getLayerGroup(state),
    popup: state.map.popup,
    loading: state.map.loading
  }),
  dispatch => ({
    setMapParams: (params) => { dispatch(setMapLocation(params)); },
    setLayerParametrization: (params) => { dispatch(setLayerParametrization(params)); },
    onAddPoint: (point) => { dispatch(onAddPoint(point)); },
    toggleShareModal: () => { dispatch(toggleModal(true, { children: ShareModal })); },
    toggleSourceModal: (indicator) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator] }
      }));
    },
    setLoading: (loading) => { dispatch(setLoading(loading)); },
    setPopupData: (data) => { dispatch(setPopupData(data)); },
    setPopupLocation: (location) => { dispatch(setPopupLocation(location)); }
  })
)(MapComponent);
