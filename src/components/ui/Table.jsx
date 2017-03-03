import React from 'react';
import TableFilters from './TableFilters';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    const { data } = props;
    const numPages = Math.ceil(data.length / props.pageSize);
    const bounds = this.getPageBounds(props.initialPage);

    this.state = {
      data: props.data.slice(bounds.bottom, bounds.top),
      currentPage: 0,
      numPages
    };

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  getPageBounds(page) {
    const bottom = page * this.props.pageSize;
    const top = bottom + this.props.pageSize;
    return { bottom, top };
  }

  nextPage() {
    if (this.state.currentPage === this.state.numPages - 1) return;
    this.goToPage(this.state.currentPage + 1);
  }

  prevPage() {
    if (this.state.currentPage === 0) return;
    this.goToPage(this.state.currentPage - 1);
  }

  goToPage(page) {
    const bounds = this.getPageBounds(page);

    this.setState({
      currentPage: page,
      data: this.props.data.slice(bounds.bottom, bounds.top)
    });
  }

  render() {
    return (
      <div className="c-table">
        {/* Table */}
        <div className="table-header">
          {/* Page locator */
            this.props.paginated &&
              <span>{`Page ${this.state.currentPage + 1} of ${this.state.numPages}`}</span>
          }
        </div>
        <table className="table">
          <thead>
            <tr>
              {/* Table head */}
              {this.props.columns.map((c, index) => <th key={index}>{c.label}{this.props.filters && <TableFilters />}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* Table content */}
            {this.state.data.map((row, index) => <tr key={index}>{this.props.columns.map((col, i) => <td key={i}>{row[col.value]}</td>)}</tr>)}
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
