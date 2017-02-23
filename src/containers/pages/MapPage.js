import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';
import { setMapLocation, updateMapUrl } from 'modules/map';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state),
  mapState: state.map
});

const mapDispatchToProps = dispatch => ({
  setMapParams: (params) => {
    dispatch(setMapLocation(params));
    dispatch(updateMapUrl());
  },
  updateMapUrl: () => {
    dispatch(updateMapUrl());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
