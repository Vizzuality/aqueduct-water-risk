import React, { Component, Fragment } from 'react';
import { func, object, string } from 'prop-types';

import { CustomSelect, InfoModal } from 'aqueduct-components';

import ContentModal from '../../ui/modal/content/';
import TooltipIcon from '../../ui/TooltipIcon';
import ThresholdSlider from './ThresholdSlider';

// constants
import { BASIN_MODAL_PROPS, WATER_RISK_PROPS  } from 'constants/filters';
import { LEGENDS, INDICATORS } from 'components/map/constants';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = { indicator: null, threshold: null };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.indicator !== nextState.indicator;
  }

  handleTooltipClick() {
    const { toggleModal } = this.props;
    return toggleModal(true, {
      children: ContentModal,
      childrenProps: BASIN_MODAL_PROPS
    });
  }

  handleInfoClick() {
    const { toggleAside } = this.props;
    return toggleAside(true, {
      children: InfoModal,
      childrenProps: WATER_RISK_PROPS
    });
  }

  handleIndicatorSelect(indicator) {
    this.setState({ indicator });
  }

  handleSliderChange(threshold=null) {
    this.setState({ threshold });
  }

  render() {
    const { name = '', setFilters, setTabFilters, tabFilters={} } = this.props;
    const indicator = this.state.indicator || tabFilters.action.indicator;
    const threshold = this.state.threshold || tabFilters.action.threshold;

    const indicators = Object.keys(LEGENDS)
      .filter((key) => Object.keys(INDICATORS).includes(key) )
      .map((key) => ({ label: INDICATORS[key], value: key } ));

    const handleApply = () => {
      const newFilters = {
        indicator,
        threshold: this.state.threshold
      };
      setFilters(newFilters);
      setTabFilters({action: newFilters})
    };

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
                      value={indicator}
                      placeholder={'Select Indicator'}
                      onValueChange={({ value }) => { this.handleIndicatorSelect(value) }}
                    />
                    <TooltipIcon handleClick={() => this.handleInfoClick()} />
                  </div>
                </div>
              </div>
            </div>
            { indicator &&
              <Fragment>
                <div className="filters-section">
                  <div className="c-filters-item">
                    <div className="filter-item-header" style={ {marginBottom: 65} }>
                      <span className="title">
                        <span>
                          <strong>{INDICATORS[indicator]} Desired Condition </strong> (adjust slider to change results)
                        </span>
                      </span>
                    </div>
                    <ThresholdSlider indicatorId={indicator} threshold={threshold} handleChange={(value) => this.handleSliderChange(value)} />
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
  filters: object,
  tabFilters: object,
  setFilters: func.isRequired,
  setTabFilters: func.isRequired,
  toggleModal: func.isRequired,
  toggleAside: func.isRequired
};

export default Filters;
