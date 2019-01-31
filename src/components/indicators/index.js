import { connect } from 'react-redux';

// component
import Indicators from './component';

export default connect(
  state => ({
    ponderation: state.mapView.ponderation,
    year: state.mapView.filters.year,
    timeScale: state.mapView.filters.timeScale
  }),
  null
)(Indicators);
