import React from 'react';

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);

    const { data } = props;
    const numPages = Math.ceil(data.length / props.pageSize);
    const bounds = this.getPageBounds(props.initialPage);

    this.state = {
      data: props.data.slice(bounds.bottom, bounds.upper),
      currentPage: 0,
      numPages
    };

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  getPageBounds(page) {
    const bottom = page * this.props.pageSize;
    const upper = bottom + this.props.pageSize;
    return { bottom, upper };
  }

  nextPage() {
    if (this.state.currentPage === this.state.numPages - 1) return;
    const currentPage = this.state.currentPage + 1;
    this.goToPage(currentPage);
  }

  prevPage() {
    if (this.state.currentPage === 0) return;
    const currentPage = this.state.currentPage - 1;
    this.goToPage(currentPage);
  }

  goToPage(page) {
    const bounds = this.getPageBounds(page);

    this.setState({
      currentPage: page,
      data: this.props.data.slice(bounds.bottom, bounds.upper)
    });
  }

  render() {
    return (
      <div className="c-table">
        {/* Table */}
        <table className="table">
          <thead>
            <tr>
              {/* Table head */}
              {this.props.columns.map((c, index) => <th key={index}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {/* Table content */}
            {this.state.data.map((row, index) => <tr key={index}>{this.props.columns.map((col, i) => <td key={i}>{row[col.value]}</td>)}</tr>)}
          </tbody>
        </table>
        {/* Paginator */
          this.props.paginated &&
          <div className="table-footer">
            <ul className="paginator">
              <li><button onClick={this.prevPage}>Prev</button></li>
              <li><button onClick={this.nextPage}>Next</button></li>
            </ul>
            <span>{`Page ${this.state.currentPage + 1} of ${this.state.numPages}`}</span>
          </div>
        }
      </div>
    );
  }
}

CustomTable.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  paginated: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  initialPage: React.PropTypes.number
};
CustomTable.defaultProps = {
  data: [],
  columns: [],
  paginated: true,
  pageSize: 2,
  initialPage: 0
};
