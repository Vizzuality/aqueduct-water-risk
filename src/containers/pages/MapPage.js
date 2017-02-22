import { connect } from 'react-redux';
import MapPage from 'components/pages/Map/MapPage';
import getActiveLayers from 'selectors/layers_active';

const mapStateToProps = state => ({
  layersActive: getActiveLayers(state)
});

export default connect(mapStateToProps, null)(MapPage);
