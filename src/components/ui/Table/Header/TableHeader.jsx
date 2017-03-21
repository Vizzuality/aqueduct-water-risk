import React from 'react';

import TableHeaderActions from './TableHeaderActions';


export default class TableHeader extends React.Component {
  render() {
    const { actions, columns, columnValues, columnQueries, filteredData, onFilter, onSort } = this.props;
    return (
      <thead>
        <tr>
          {(actions.showable || actions.editable || actions.removable) && !!filteredData.length &&
            <th />
          }
          {columns.map((c, index) => {
            return (
              <th key={index}>
                <span className="th-wrapper">
                  <span>{c.label}</span>

                  <TableHeaderActions
                    field={c.value}
                    values={columnValues[c.value]}
                    selected={columnQueries[c.value]}
                    onFilter={onFilter}
                    onSort={onSort}
                  />
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  actions: React.PropTypes.object,
  columns: React.PropTypes.array,
  columnValues: React.PropTypes.object,
  columnQueries: React.PropTypes.object,
  filteredData: React.PropTypes.array,
  onFilter: React.PropTypes.func,
  onSort: React.PropTypes.func
};

TableHeader.defaultProps = {
  columns: [],
  columnValues: {},
  columnQueries: {},
  filteredData: [],
  onFilter: null,
  onSort: null
};
