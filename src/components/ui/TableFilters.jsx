import React from 'react';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: true
    };
  }

  render() {
    return (
      <div className="c-table-filters">
        <span>Table filters</span>
      </div>
    );
  }
}

TableFilters.propTypes = {};
TableFilters.defaultProps = {};
