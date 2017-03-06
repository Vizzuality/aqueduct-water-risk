import React from 'react';
import TableFilters from './TableFilters';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    const { data } = props;
    const totalPages = Math.ceil(data.length / props.pageSize);
    const bounds = this.getPageBounds(props.initialPage);

    /*
      Initial state
      - props.data => original data
      - filteredData => original data with filters (if any) applied
      - displayedData => filteredData with pagination
    */
    this.state = {
      filteredData: props.data,
      displayedData: props.data.slice(bounds.bottom, bounds.top),
      currentPage: 0,
      totalPages
    };

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.filter = this.filter.bind(this);

    // Aux variables
    this.query = {};
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
    const { bottom, top } = this.getPageBounds(page);

    this.setState({
      currentPage: page,
      displayedData: this.state.filteredData.slice(bottom, top)
    });
  }

  filter(query) {
    this.query[query.field] = query.value;
    const data = this.props.data.filter((row) => {
      let match = true;
      let matched;
      Object.keys(this.query).forEach((field) => {
        matched = !!row[field].toString().match(this.query[field]);
        match *= matched;
      });
      return match;
    });
    this.setState({
      filteredData: data,
      totalPages: Math.ceil(data.length / this.props.pageSize)
    }, () => this.goToPage(0));
  }

  /* Partial renders */
  renderTableContent() {
    return this.state.displayedData.map((row, index) => {
      return (
        <tr key={index}>
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
        <div className="table-header">
          {/* Page locator */
            this.props.paginated &&
              <span>Page <span>{this.state.currentPage + 1}</span> of <span>{this.state.totalPages}</span></span>
          }
        </div>
        <table className="table">
          <thead>
            <tr>
              {/* Table head */}
              {this.props.columns.map((c, index) => <th key={index}>{c.label}{this.props.filters && <TableFilters field={c.value} onChange={this.filter} />}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* Table content */
              this.renderTableContent()
            }
          </tbody>
        </table>
        <div className="table-footer">
          {/* Paginator */
            this.props.paginated &&
              <ul className="paginator">
                <li className="paginator-link"><button className="paginator-btn" onClick={this.prevPage}>Prev</button></li>
                <li className="paginator-link"><button className="paginator-btn" onClick={this.nextPage}>Next</button></li>
              </ul>
          }
        </div>
      </div>
    );
  }
}

CustomTable.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  paginated: React.PropTypes.bool,
  filters: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  initialPage: React.PropTypes.number
};
CustomTable.defaultProps = {
  data: [],
  columns: [],
  paginated: true,
  pageSize: 2,
  initialPage: 0,
  filters: false
};
