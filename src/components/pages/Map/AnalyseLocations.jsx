import React from 'react';
import CustomTable from 'components/ui/Table';

export default class AnalyseLocations extends React.Component {
  render() {
    return (
      <CustomTable
        columns={this.props.columns}
        data={this.props.data}
        pageSize={20}
        filters
        onSelectedRows={(rows) => console.info(rows)}
      />
    );
  }
}

AnalyseLocations.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array
};
