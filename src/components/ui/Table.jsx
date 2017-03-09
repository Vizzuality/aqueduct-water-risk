import React from 'react';
import TableFilters from './TableFilters';
import isEqual from 'lodash/isEqual';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    this.setTableData(props);

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.filter = this.filter.bind(this);
    this.sort = this.sort.bind(this);
  }

  /* Component lifecycle */
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setTableData(nextProps);
    }
  }

  /* Component api */
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
      sort: {}
    };
  }

  getPageBounds(page) {
    const bottom = page * this.props.pageSize;
    const top = bottom + this.props.pageSize;
    return { bottom, top };
  }

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

  filter(q) {
    const query = {
      ...this.state.query,
      [q.field]: q.value
    };

    const data = this.props.data.filter((row) => {
      let match = true;
      Object.keys(query).forEach((field) => {
        match *= !!row[field].toString().toLowerCase().match(query[field].toString().toLowerCase());
      });
      return match;
    });

    this.setState({
      query,
      filteredData: data,
      totalPages: Math.ceil(data.length / this.props.pageSize)
    }, () => this.goToPage(0));
  }

  sort(s) {
    const sort = {
      [s.field]: s.value
    };

    const filteredData = this.state.filteredData.slice().sort((rowA, rowB) => {
      return rowA[s.field].toString().toLowerCase() > rowB[s.field].toString().toLowerCase() ? s.value : (s.value * -1);
    });

    this.setState({
      sort,
      filteredData
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
              <TableFilters
                field={c.value}
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
    const { filteredData } = this.state;
    const { bottom, top } = this.getPageBounds(this.state.currentPage);

    if (!filteredData.length) {
      return (
        <tr>
          <td colSpan={this.props.columns.length}>No results found</td>
        </tr>
      );
    }

    /* Apply pagination to filteredData */
    const paginatedData = filteredData.slice(bottom, top);

    return paginatedData.map((row, index) => {
      return (
        <tr key={index}>
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
  pageSize: React.PropTypes.number
};

/* Property default values */
CustomTable.defaultProps = {
  data: [],
  columns: [],
  paginated: true,
  pageSize: 2,
  initialPage: 0,
  filters: false
};
