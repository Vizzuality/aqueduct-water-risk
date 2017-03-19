import React from 'react';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
import isEqual from 'lodash/isEqual';

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
    const data = props.data;

    return {
      data,
      // Columns
      columnValues: CustomTable.getColumnValues(data)
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      pagination: props.pagination,
      sort: {},
      // Columns
      columnQueries: {},
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
    this.setState(CustomTable.setTableData(this.props), () => {
      this.filter();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.state.data, nextProps.data)) {
      // TODO: check if the data has changed to reload all the data or only to filter it
      this.setState(CustomTable.setTableData(nextProps), () => {
        this.filter();
      });
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
    const data = this.state.data.slice();
    const index = data.findIndex(row => row.id === id);
    data.splice(index, 1);

    this.setState({ data }, () => {
      this.filter();
      this.props.onDeleteRow && this.props.onDeleteRow(id);
    });
  }

  onFilter(q) {
    let columnQueries = {};

    // Let's use null when you select all the values, so whenever you add more points to
    // the map they will be selected
    if (q.value) {
      columnQueries = {
        ...this.state.columnQueries,
        [q.field]: q.value
      };
    } else {
      !!columnQueries[q.field] && delete columnQueries[q.field];
    }

    this.setState({
      columnQueries
    }, () => {
      this.filter();
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

  onChangePage(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page
      }
    });
  }

  /**
   * FILTER
   * - filter
  */
  filter() {
    const { columnQueries, pagination } = this.state;

    const filteredData = this.state.data.filter((row) => {
      return Object.keys(columnQueries).map((field) => {
        return columnQueries[field].map((val) => {
          return !!row[field].toString().toLowerCase().match(val.toString().toLowerCase());
        }).some(match => match);
      }).every(match => match);
    });

    const total = Math.ceil(filteredData.length / pagination.pageSize);
    // Check if the page is equal to the total
    const page = (pagination.page !== 0 && pagination.page === total) ? pagination.page - 1 : pagination.page;

    this.setState({
      filteredData,
      rowSelection: [],
      pagination: {
        ...pagination,
        page,
        total
      }
    }, () => {
      this.props.onSelectedRows && this.props.onSelectedRows(this.state.rowSelection);
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
