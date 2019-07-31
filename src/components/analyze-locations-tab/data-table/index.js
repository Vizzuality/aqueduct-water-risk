import { connect } from 'react-redux';

// actions
import { onRemovePoint, setSelectedData } from 'modules/analyze-locations-tab/actions';

// selectors
import { getColumns, getData } from './selectors';

// component
import DataTable from './component';

export default connect(
  state => ({
    columns: getColumns(state),
    data: getData(state),
    points: state.analyzeLocations.points.list,
    selected: state.analyzeLocations.analysis.selected
  }),
  {
    onRemovePoint,
    setSelectedData
  }
)(DataTable);
