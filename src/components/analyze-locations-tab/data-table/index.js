import { connect } from 'react-redux';

// selectors
import { getColumns, parseData } from './selectors';

// component
import DataTable from './component';

export default connect(
  state => ({
    columns: getColumns(state),
    data: parseData(state),
    loading: state.analyzeLocations.analysis.loading
  }),
  null
)(DataTable);
