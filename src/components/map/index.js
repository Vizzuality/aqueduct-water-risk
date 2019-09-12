import { connect } from 'react-redux';

// actions
import { toggleModal } from 'aqueduct-components';
import ShareModal from 'components/modal/share';
import {
  setMapLocation,
  setLayerParametrization,
  setPopupLocation,
  setPopupData,
  setLoading,
  setBoundaries
} from 'modules/map/actions';
import {
  onAddPoint,
  onRemovePoint,
  setSelectedData,
  onFetchAnalysis,
  onApplyAnalysis,
  onAddUnknownLocation,
  onUpdateLocation
} from 'modules/analyze-locations-tab/actions';
import { setAnalyzerOpen } from 'modules/settings/actions';

import IndicatorModal from 'components/ui/modal/indicator';

// utils
import { logEvent } from 'utils/analytics';

// constants
import { INDICATOR_DESCRIPTIONS } from 'constants/indicators';

// selectors
import { getColumns } from 'components/analyze-locations-tab/data-table/selectors';
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
    mapMode: state.app.mapMode,
    indicator: state.settings.filters.indicator,
    map: parseMapState(state),
    boundaries: state.map.boundaries,
    basemap: parseBasemap(state),
    layers: getUpdatedLayers(state),
    layerGroup: getLayerGroup(state),
    popup: state.map.popup,
    analysisPopupColumns: getColumns(state),
    loading: state.map.loading,
    analysisData: state.analyzeLocations.analysis.data,
    analysisSelectedData: state.analyzeLocations.analysis.selected,
    points: state.analyzeLocations.points.list,
    sidebarWidth: state.app.sidebarWidth
  }),
  dispatch => ({
    setMapParams: (params) => { dispatch(setMapLocation(params)); },
    setLayerParametrization: (params) => { dispatch(setLayerParametrization(params)); },
    onAddPoint: (point, isUnknown) => { dispatch(onAddPoint(point, isUnknown)); },
    onRemovePoint: (point) => { dispatch(onRemovePoint(point)); },
    toggleShareModal: () => {
      logEvent('Share', 'User opens share modal', 'Click');
      dispatch(toggleModal(true, { children: ShareModal }));
    },
    toggleSourceModal: (indicator) => {
      dispatch(toggleModal(true, {
        children: IndicatorModal,
        childrenProps: { info: INDICATOR_DESCRIPTIONS[indicator] }
      }));
    },
    setLoading: (loading) => { dispatch(setLoading(loading)); },
    setPopupData: (data) => { dispatch(setPopupData(data)); },
    setPopupLocation: (location) => { dispatch(setPopupLocation(location)); },
    setSelectedData: (selected) => { dispatch(setSelectedData(selected)); },
    onFetchAnalysis: () => { dispatch(onFetchAnalysis()); },
    onApplyAnalysis: () => { dispatch(onApplyAnalysis()); },
    onAddUnknownLocation: () => { dispatch(onAddUnknownLocation()); },
    onUpdateLocation: (location, index) => { dispatch(onUpdateLocation(location, index)); },
    setAnalyzerOpen: () => { dispatch(setAnalyzerOpen()); },
    setBoundaries: (boundaries) => { dispatch(setBoundaries(boundaries)); }
  })
)(MapComponent);
