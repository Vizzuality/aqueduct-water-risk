import React, { PureComponent } from 'react';
import { func, string } from 'prop-types';
import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';
import { CustomSelect } from 'aqueduct-components';
import ThresholdSlider from './ThresholdSlider';

// constants
import { BASIN_MODAL_PROPS } from 'constants/filters';
import { LEGENDS } from 'components/map/constants';

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { activeIndicatorId: null };
  }

  handleTooltipClick() {
    const { toggleModal } = this.props;
    return toggleModal(true, {
      children: ContentModal,
      childrenProps: BASIN_MODAL_PROPS
    });
  }

  handleInfoClick() {
    console.log('toggle info');
  }

  handleIndicatorSelect(activeIndicatorId) {
    this.setState({ activeIndicatorId});
  }

  render() {
    const { name = '' } = this.props;
    const { activeIndicatorId = null } = this.state;

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
                  <div className="c-filters-item -inline">
                    <CustomSelect
                      options={indicators}
                      value={activeIndicatorId}
                      placeholder={'Select Indicator'}
                      onValueChange={({ value }) => { this.handleIndicatorSelect(value) }}
                    />
                    <TooltipIcon handleClick={() => this.handleInfoClick()} />
                  </div>
                </div>
              </div>
            </div>
            { activeIndicatorId &&
              <div className="filters-section">
                <ThresholdSlider indicatorId={activeIndicatorId} />
              </div>
            }
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
