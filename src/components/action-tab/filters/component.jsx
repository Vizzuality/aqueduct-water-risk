import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';
import { CustomSelect } from 'aqueduct-components';

// constants
import { BASIN_MODAL_PROPS } from 'constants/filters';
import { LEGENDS } from 'components/map/constants';

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

    const indicatorDictionary = {
      bws_cat: 'Baseline Water Stress',
      bwd_cat: 'Baseline Water Depletion',
      gtd_cat: 'Groundwater Table Decline',
      cep_cat: 'Coastal Eutrophication Potential',
      udw_cat: 'Unimproved/No Drinking Water',
      usa_cat: 'Unimproved/No Sanitation'
    };
    const indicators = Object.keys(LEGENDS)
      .filter((key) => Object.keys(indicatorDictionary).includes(key) )
      .map((key) => ({ label: indicatorDictionary[key], value: key } ));

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
              <div className="row expanded collapse">
                <div className="small-8 column">
                  <div className="c-filters-item">
                    <CustomSelect
                      options={indicators}
                      value={null}
                      onValueChange={({ value }) => { console.log(value) }}
                    />
                  </div>
                </div>
              </div>
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
