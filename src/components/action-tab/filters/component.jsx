import React, { PureComponent } from 'react';
import { func, object, string } from 'prop-types';
import { Icon } from 'aqueduct-components';
import TooltipIcon from '../../ui/TooltipIcon';

// constants

class Filters extends PureComponent {
  render() {
    const { name = '' } = this.props;

    return (
      <div>
        <div className="c-filters-header">
          <h1 className="title">{name}</h1>
        </div>
        <div className="c-filters">
          <div className="filters-section">
            <div className="c-filters-item">
              <div className="filter-item-header">
                <span className="title">Highlight basins exceeding desired condition threshold</span>
                <TooltipIcon handleClick={() => {console.log('Show Modal')}} />
              </div>
            </div>
            <div className="filters-section">
              <div className="c-filters-item" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  setFilters: func.isRequired,
  filters: object.isRequired,
  name: string.isRequired,
};

export default Filters;
