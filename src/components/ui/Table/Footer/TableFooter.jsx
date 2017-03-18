import React from 'react';

export default class TableFooter extends React.Component {
  render() {
    const { pagination } = this.props;
    return (
      <div className="table-footer">
        {/* Paginator */}
        {pagination.enabled &&
          <ul className="paginator">
            <li className="paginator-link">
              <button className="paginator-btn" onClick={this.props.onPrevPage}>
                Prev
              </button>
            </li>
            <li className="paginator-link">
              <button className="paginator-btn" onClick={this.props.onNextPage}>
                Next
              </button>
            </li>
          </ul>
        }

        {/* Page locator */}
        {pagination.enabled &&
          <span>Page <span>{pagination.page + 1}</span> of <span>{pagination.total}</span></span>
        }
      </div>
    );
  }
}

TableFooter.propTypes = {
  pagination: React.PropTypes.object,
  onPrevPage: React.PropTypes.func,
  onNextPage: React.PropTypes.func
};

TableFooter.defaultProps = {
  pagination: {
    enabled: true,
    pageSize: 20,
    page: 0,
    total: null
  },
  onPrevPage: null,
  onNextPage: null
};
