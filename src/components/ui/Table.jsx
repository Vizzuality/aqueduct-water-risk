import React from 'react';
import classnames from 'classnames';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';

import TableHeaderActions from './TableHeaderActions';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    this.setTableData(props);

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);

    // Table
    this.toggleSelectedRow = this.toggleSelectedRow.bind(this);
  }

  /* Component lifecycle */
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setTableData(nextProps);
    }
  }

  /**
   * HELPERS
   * - setTableData
   * - getColumnValues
   * - getPageBounds
  */
  setTableData(props) {
    const { data } = props;
    const totalPages = Math.ceil(data.length / props.pageSize);

    /*
      Initial state
      - props.data => original data
      - filteredData => original data with filters and/or sort (if any) applied
    */
    this.state = {
      filteredData: props.data,
      currentPage: (this.state && this.state.currentPage) || 0,
      totalPages,
      query: {},
      sort: {},
      selectedRows: [],
      columns: this.getColumnValues(props.data)
    };
  }

  getColumnValues(data) {
    const columnsKeys = uniq(flatten(data.map(d => Object.keys(d))));
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
    const bottom = page * this.props.pageSize;
    const top = bottom + this.props.pageSize;
    return { bottom, top };
  }

  /**
   * UI EVENTS
   * - nextPage
   * - prevPage
   * - toggleSelectedRow
  */
  nextPage() {
    if (this.state.currentPage === this.state.totalPages - 1) return;
    this.goToPage(this.state.currentPage + 1);
  }

  prevPage() {
    if (this.state.currentPage === 0) return;
    this.goToPage(this.state.currentPage - 1);
  }

  goToPage(page) {
    this.setState({
      currentPage: page
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
    const query = {
      ...this.state.query,
      [q.field]: q.value
    };

    const filteredData = this.props.data.filter((row) => {
      return Object.keys(query).map((field) => {
        return query[field].map((val) => {
          return !!row[field].toString().toLowerCase().match(val.toString().toLowerCase());
        }).some(match => match);
      }).every(match => match);
    });

    this.setState({
      query,
      filteredData,
      selectedRows: [],
      totalPages: Math.ceil(filteredData.length / this.props.pageSize)
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

  /* Partial renders */
  renderTableHead() {
    return this.props.columns.map((c, index) => {
      return (
        <th key={index}>
          <span className="th-wrapper">
            <span>{c.label}</span>
            {this.props.filters &&
              <TableHeaderActions
                field={c.value}
                values={this.state.columns[c.value]}
                selected={this.state.query[c.value]}
                onFilter={this.filter}
                onSort={this.sort}
              />
            }
          </span>
        </th>
      );
    });
  }

  renderTableContent() {
    let { filteredData } = this.state;
    const { sort, selectedRows } = this.state;
    const { bottom, top } = this.getPageBounds(this.state.currentPage);

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

  renderTableFooter() {
    return (
      <div className="table-footer">
        {/* Paginator */}
        {this.props.paginated &&
          <ul className="paginator">
            <li className="paginator-link"><button className="paginator-btn" onClick={this.prevPage}>Prev</button></li>
            <li className="paginator-link"><button className="paginator-btn" onClick={this.nextPage}>Next</button></li>
          </ul>
        }
        {/* Page locator */}
        {this.props.paginated &&
          <span>Page <span>{this.state.currentPage + 1}</span> of <span>{this.state.totalPages}</span></span>
        }
      </div>
    );
  }

  /* Render */
  render() {
    return (
      <div className="c-table">
        {/* Table */}
        <div className="table-header" />
        <table className="table">
          <thead>
            <tr>
              {/* Table head */}
              {this.renderTableHead()}
            </tr>
          </thead>
          <tbody>
            {/* Table content */}
            {this.renderTableContent()}
          </tbody>
        </table>
        {/* Table footer */}
        {this.renderTableFooter()}
      </div>
    );
  }
}

/* Property typing */
CustomTable.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  paginated: React.PropTypes.bool,
  filters: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  onSelectedRows: React.PropTypes.func
};

/* Property default values */
CustomTable.defaultProps = {
  data: [],
  columns: [],
  paginated: true,
  pageSize: 10,
  initialPage: 0,
  filters: false,
  onSelectedRows: null
};
