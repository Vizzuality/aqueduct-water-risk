import React from 'react';
import isEqual from 'lodash/isEqual';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

import TableHeader from './Header/TableHeader';
import TableContent from './Content/TableContent';
import TableFooter from './Footer/TableFooter';

export default class CustomTable extends React.Component {

  static getColumns(data) {
    return uniq(flatten(data.map(d => Object.keys(d))));
  }

  static getColumnValues(data) {
    const columnsKeys = CustomTable.getColumns(data);
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
    return {
      filteredData: props.data,
      pagination: {
        ...props.pagination,
        total: Math.ceil(props.data.length / props.pagination.pageSize)
      },
      sort: {},
      // Rows
      rowSelection: [],
      // Columns
      columnValues: CustomTable.getColumnValues(props.data),
      columnQueries: {}
    };
  }

  constructor(props) {
    super(props);

    this.state = {};

    // Bindings
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSort = this.onSort.bind(this);

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
   * - onNextPage
   * - onPrevPage
   * - onSelectedRows
  */
  onNextPage() {
    if (this.state.pagination.page === this.state.pagination.total - 1) return;
    this.goToPage(this.state.pagination.page + 1);
  }

  onPrevPage() {
    if (this.state.pagination.page === 0) return;
    this.goToPage(this.state.pagination.page - 1);
  }

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
      this.goToPage(0);
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
    }, () => this.goToPage(0));
  }

  /**
   * HELPERS
   * - goToPage
  */
  goToPage(page) {
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
          />

        </table>
        {/* Table footer */}
        <TableFooter
          pagination={this.state.pagination}
          onPrevPage={this.onPrevPage}
          onNextPage={this.onNextPage}
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
  onSelectedRows: React.PropTypes.func
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
  onSelectedRows: null
};
