import { connect } from 'react-redux';
import App from 'components/app/App';
import { getDatasets } from 'modules/datasets';

export default connect(null, {
  getDatasets
})(App);
