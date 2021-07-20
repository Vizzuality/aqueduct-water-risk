import React, { PureComponent, Fragment } from 'react';
import { func, string } from 'prop-types';
import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';
import { CustomSelect } from 'aqueduct-components';
import ThresholdSlider from './ThresholdSlider';

// constants
import { BASIN_MODAL_PROPS } from 'constants/filters';
import { LEGENDS, INDICATORS } from 'components/map/constants';

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

    const indicators = Object.keys(LEGENDS)
      .filter((key) => Object.keys(INDICATORS).includes(key) )
      .map((key) => ({ label: INDICATORS[key], value: key } ));

    const handleApply = () => {
      console.log('Update filters!')
    }

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
              <Fragment>
                <div className="filters-section">
                  <div className="c-filters-item">
                    <div className="filter-item-header" style={ {marginBottom: 65} }>
                      <span className="title">
                        <span>
                          <strong>{INDICATORS[activeIndicatorId]} Desired Condition </strong> (adjust slider to change results)
                        </span>
                      </span>
                    </div>
                    <ThresholdSlider indicatorId={activeIndicatorId} />
                  </div>
                </div>
                <div style={{ marginTop: 20 }} className="c-btn-menu -theme-secondary">
                  <button className="btn-menu-btn -shout" onClick={handleApply}>Apply Changes</button>
                </div>
              </Fragment>
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
