import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import CustomTable from 'components/ui/Table/Table';

class DataTable extends PureComponent {
  render() {
    const {
      columns,
      data,
      selected
    } = this.props;

    return (
      <CustomTable
        columns={columns}
        data={data}
        selected={selected}
        onToggleSelectedRow={(index) => {
          const { setSelectedData } = this.props;
          setSelectedData(index);
        }}
        onRowDelete={(row, index) => {
          const {
            points,
            selected: selectedData,
            onRemovePoint,
            setSelectedData
          } = this.props;

          const pointToRemove = points[index];

          if (pointToRemove) {
            if (selectedData.includes(index)) setSelectedData([]);
            return onRemovePoint(pointToRemove);
          }

          throw new Error('Point to delete not found');
        }}
        actions={{
          showable: false,
          editable: false,
          removable: true
        }}
        pagination={{
          enabled: true,
          pageSize: 100,
          page: 0
        }}
      />
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onRemovePoint: PropTypes.func.isRequired,
  setSelectedData: PropTypes.func.isRequired
};

export default DataTable;
