import { connect } from 'react-redux';

// selectors
import { getColumns } from './selectors';

// component
import DataTable from './component';

export default connect(
  state => ({
    columns: getColumns(state),
    data: state.analyzeLocations.analysis.data,
    loading: state.analyzeLocations.analysis.loading
  }),
  null
)(DataTable);
