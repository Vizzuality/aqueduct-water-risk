import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import CustomTable from 'components/ui/Table/Table';

class DataTable extends PureComponent {
  render() {
    const {
      columns,
      data
    } = this.props;

    return (
      <CustomTable
        columns={columns}
        data={data}
        pageSize={5}
        actions={{
          showable: false,
          editable: false,
          removable: false
        }}
        pagination={{
          enabled: true,
          pageSize: 5,
          page: 0
        }}
      />
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default DataTable;
