import React from 'react';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

import TableHeader from './Header/TableHeader';
import TableContent from './Content/TableContent';
import TableFooter from './Footer/TableFooter';

export default class CustomTable extends React.Component {

  /**
   * STATIC METHODS
   * - getColumnKeys
   * - getColumnValues
   * - setTableData
  */
  static getColumnKeys(data) {
    return uniq(flatten(data.map(d => Object.keys(d))));
  }

  static getColumnValues(data) {
    const columnsKeys = CustomTable.getColumnKeys(data);
    const columns = {};

    columnsKeys.forEach((key) => {
      const values = uniq(data.map(d => d[key]))
                     .sort((a, b) => a - b)
                     .map(d => d.toString());
      columns[key] = values;
    });

    return columns;
  }

  static setTableData(props) {
    const data = props.filteredData || props.data;

    return {
      filteredData: data,
      pagination: {
        ...props.pagination,
        total: Math.ceil(data.length / props.pagination.pageSize)
      },
      // Columns
      columnValues: CustomTable.getColumnValues(data)
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      sort: {},
      // Rows
      rowSelection: []
    };

    // Bindings
    this.onChangePage = this.onChangePage.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);

    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onSelectedRows = this.onSelectedRows.bind(this);
  }

  /**
   * COMPONENT LIFECYCLE
  */
  componentWillMount() {
    this.setState(CustomTable.setTableData(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState(CustomTable.setTableData(nextProps));
    }
  }

  /**
   * UI EVENTS
   * - onSelectedRows
   * - onDeleteRow
   * - onFilter
   * - onSort
   * - onChangePage
  */
  onSelectedRows(row) {
    const { rowSelection } = this.state;
    const index = rowSelection.indexOf(row.id);

    // Toggle the active dataset
    if (index !== -1) {
      rowSelection.splice(index, 1);
    } else {
      rowSelection.push(row.id);
    }

    this.setState({ rowSelection }, () => {
      this.props.onSelectedRows && this.props.onSelectedRows(this.state.rowSelection);
    });
  }

  onDeleteRow(id) {
    const { filteredData } = this.state;
    const index = filteredData.findIndex(row => row.id === id);
    filteredData.splice(index, 1);

    this.setState({ filteredData }, () => {
      // CustomTable.setTableData(this.state);
      // TODO: It will reload the table, we should re-think about it
      this.props.onDeleteRow && this.props.onDeleteRow(id);
    });
  }

  onFilter(q) {
    const columnQueries = {
      ...this.state.columnQueries,
      [q.field]: q.value
    };

    const filteredData = this.props.data.filter((row) => {
      return Object.keys(columnQueries).map((field) => {
        return columnQueries[field].map((val) => {
          return !!row[field].toString().toLowerCase().match(val.toString().toLowerCase());
        }).some(match => match);
      }).every(match => match);
    });

    this.setState({
      filteredData,
      columnQueries,
      rowSelection: [],
      pagination: {
        ...this.state.pagination,
        total: Math.ceil(filteredData.length / this.state.pagination.pageSize)
      }
    }, () => {
      this.onChangePage(0);
      this.props.onSelectedRows && this.props.onSelectedRows(this.state.rowSelection);
    });
  }

  onSort(s) {
    const sort = {
      field: s.field,
      value: s.value
    };
    this.setState({
      sort
    }, () => this.onChangePage(0));
  }

  /**
   * HELPERS
   * - onChangePage
  */
  onChangePage(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page
      }
    });
  }

  /* Render */
  render() {
    return (
      <div className="c-table">
        {/* Table */}
        <div className="table-header" />
        <table className="table">

          {/* Table header */}
          <TableHeader
            actions={this.props.actions}
            columns={this.props.columns}
            columnValues={this.state.columnValues}
            columnQueries={this.state.columnQueries}
            onFilter={this.onFilter}
            onSort={this.onSort}
          />

          {/* Table content */}
          <TableContent
            {...this.props}
            {...this.state}
            onSelectedRows={this.onSelectedRows}
            onDeleteRow={this.onDeleteRow}
          />

        </table>
        {/* Table footer */}
        <TableFooter
          pagination={this.state.pagination}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

/* Property typing */
CustomTable.propTypes = {
  actions: React.PropTypes.object,
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  pagination: React.PropTypes.object,
  onSelectedRows: React.PropTypes.func,
  onDeleteRow: React.PropTypes.func
};

/* Property default values */
CustomTable.defaultProps = {
  actions: {},
  data: [],
  columns: [],
  pagination: {
    enabled: true,
    pageSize: 20,
    page: 0,
    total: null
  },
  onSelectedRows: null,
  onDeleteRow: null
};
