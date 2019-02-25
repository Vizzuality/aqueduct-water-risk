import { connect } from 'react-redux';

// selectors
import { getData } from './selectors';

// component
import PonderationChart from './component';

export default connect(
  state => ({ data: getData(state) }),
  null
)(PonderationChart);
