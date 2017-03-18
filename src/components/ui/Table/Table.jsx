import React from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

import TableHeader from './Header/TableHeader';
import TableFooter from './Footer/TableFooter';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};

    // Bindings
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);

    this.toggleSelectedRow = this.toggleSelectedRow.bind(this);
  }

  /**
   * COMPONENT LIFECYCLE
  */
  componentWillMount() {
    this.setState(this.setTableData(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setState(this.setTableData(nextProps));
    }
  }

  /**
   * HELPERS
   * - setTableData
   * - getColumnValues
   * - getPageBounds
  */
  setTableData(props) {
    return {
      filteredData: props.data,
      pagination: {
        ...props.pagination,
        total: Math.ceil(props.data.length / props.pagination.pageSize)
      },
      sort: {},
      // Rows
      selectedRows: [],
      // Columns
      columnValues: this.getColumnValues(props.data),
      columnQueries: {}
    };
  }

  getColumns(data) {
    return uniq(flatten(data.map(d => Object.keys(d))));
  }

  getColumnValues(data) {
    const columnsKeys = this.getColumns(data);
    const columns = {};

    columnsKeys.forEach((key) => {
      const values = uniq(data.map(d => d[key]))
                     .sort((a, b) => a - b)
                     .map(d => d.toString());
      columns[key] = values;
    });

    return columns;
  }

  getPageBounds(page) {
    const bottom = page * this.state.pagination.pageSize;
    const top = bottom + this.state.pagination.pageSize;
    return { bottom, top };
  }

  /**
   * UI EVENTS
   * - onNextPage
   * - onPrevPage
   * - toggleSelectedRow
  */
  onNextPage() {
    if (this.state.pagination.page === this.state.pagination.total - 1) return;
    this.goToPage(this.state.pagination.page + 1);
  }

  onPrevPage() {
    if (this.state.pagination.page === 0) return;
    this.goToPage(this.state.pagination.page - 1);
  }

  goToPage(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page
      }
    });
  }

  toggleSelectedRow(row) {
    const selectedRows = this.state.selectedRows.slice();
    const index = selectedRows.indexOf(row.id);

    // Toggle the active dataset
    if (index !== -1) {
      selectedRows.splice(index, 1);
    } else {
      selectedRows.push(row.id);
    }

    this.setState({ selectedRows }, () => {
      this.props.onSelectedRows && this.props.onSelectedRows(this.state.selectedRows);
    });
  }

  filter(q) {
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
      columnQueries,
      filteredData,
      selectedRows: [],
      pagination: {
        ...this.state.pagination,
        total: Math.ceil(filteredData.length / this.state.pagination.pageSize)
      }
    }, () => {
      this.goToPage(0);
      this.props.onSelectedRows && this.props.onSelectedRows(this.state.selectedRows);
    });
  }

  sort(s) {
    const sort = {
      field: s.field,
      value: s.value
    };
    this.setState({
      sort
    }, () => this.goToPage(0));
  }

  renderTableContent() {
    let { filteredData } = this.state;
    const { sort, selectedRows } = this.state;
    const { bottom, top } = this.getPageBounds(this.state.pagination.page);

    if (!filteredData.length) {
      return (
        <tr>
          <td colSpan={this.props.columns.length}>No results found</td>
        </tr>
      );
    }

    /* Apply sorting to filteredData */
    if (!isEmpty(sort)) {
      filteredData = filteredData.slice().sort((rowA, rowB) => {
        return rowA[sort.field].toString().toLowerCase() > rowB[sort.field].toString().toLowerCase() ? sort.value : (sort.value * -1);
      });
    }

    /* Apply pagination to filteredData */
    filteredData = filteredData.slice(bottom, top);

    return filteredData.map((row, index) => {
      const selectedClass = classnames({
        '-selected': selectedRows.includes(row.id)
      });
      return (
        <tr className={`${selectedClass}`} onClick={() => this.toggleSelectedRow(row)} key={index}>
          {this.props.columns.map((col, i) => <td key={i}>{row[col.value]}</td>)}
        </tr>
      );
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
            onFilter={this.filter}
            onSort={this.sort}
          />

          <tbody>
            {/* Table content */}
            {this.renderTableContent()}
          </tbody>

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
