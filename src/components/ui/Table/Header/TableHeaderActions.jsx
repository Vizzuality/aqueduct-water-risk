import React from 'react';
import TableFilters from './TableFilters';
import TableSorts from './TableSorts';


export default class TableHeaderActions extends React.Component {
  render() {
    return (
      <div className="c-table-header-actions">
        <ul>
          <li>
            <TableSorts {...this.props} />
          </li>
          <li>
            <TableFilters {...this.props} />
          </li>
        </ul>
      </div>
    );
  }
}

TableHeaderActions.propTypes = {
  field: React.PropTypes.string.isRequired,
  values: React.PropTypes.array,
  selected: React.PropTypes.array,
  onFilter: React.PropTypes.func,
  onSort: React.PropTypes.func
};

TableHeaderActions.defaultProps = {
  onChange: null,
  selected: null
};
