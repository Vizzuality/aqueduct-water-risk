import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import CustomTable from 'components/ui/Table/Table';

class DataTable extends PureComponent {
  render() {
    const {
      columns,
      data,
      loading
    } = this.props;

    console.log(columns)

    return (
      <CustomTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={20}
        actions={{
          showable: false,
          editable: false,
          removable: false
        }}
        pagination={{
          enabled: true,
          pageSize: 20,
          page: 0
        }}
      />
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default DataTable;
