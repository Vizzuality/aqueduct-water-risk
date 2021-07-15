import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';

// constants
import { BASIN_MODAL_PROPS } from 'constants/filters';

class Filters extends PureComponent {
  handleTooltipClick() {
    const { toggleModal } = this.props;
    return toggleModal(true, {
      children: ContentModal,
      childrenProps: BASIN_MODAL_PROPS
    });
  }
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
                <TooltipIcon handleClick={() => this.handleTooltipClick()} />
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
  name: string.isRequired,
  toggleModal: func.isRequired
};

export default Filters;
