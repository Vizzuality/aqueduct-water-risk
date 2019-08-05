import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  RadioGroup,
  Timeline,
  APP_DEFINITIONS,
  InfoModal
} from 'aqueduct-components';

// constants
import { SCENARIO_OPTIONS } from 'constants/app';
import {
  projectionOptions,
  SCENARIO_MODAL_DESCRIPTION,
  TIMEFRAME_OPTIONS
} from 'constants/filters';
import { FUTURE_INDICATORS_SWAP } from 'constants/indicators';

class Filters extends PureComponent {
  onClickInfoFilters(slug) {
    const { toggleModal } = this.props;

    if (slug === 'scenarios') {
      return toggleModal(true, {
        children: InfoModal,
        childrenProps: { info: SCENARIO_MODAL_DESCRIPTION }
      });
    }

    return toggleModal(true, {
      children: InfoModal,
      childrenProps: { info: APP_DEFINITIONS[slug] }
    });
  }

  onSelectProjection(projection) {
    const {
      setFilters,
      filters: { indicator }
    } = this.props;

    setFilters({
      projection,
      indicator: FUTURE_INDICATORS_SWAP[projection][indicator]
    });
  }

  render() {
    const {
      setFilters,
      filters: { year, projection, scenario }
    } = this.props;

    return (
      <div className="c-filters">
        <div className="filters-section">
          <div className="row expanded collapse">
            <div className="small-12 columns">
              {/* year */}
              <div className="c-filters-item">
                <div className="filter-item-header">
                  <span className="title">Timeframe</span>
                </div>
                <Timeline
                  items={TIMEFRAME_OPTIONS}
                  selected={TIMEFRAME_OPTIONS.find(i => i.value === year)}
                  onChange={({ value }) => { setFilters({ year: value }); }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="filters-section">
          <div className="row expanded collapse">
            <div className="small-12">
              {/* scenarios */}
              <div className="c-filters-item">
                <div className="filter-item-header">
                  <span className="title">Scenarios</span>
                  <button
                    type="button"
                    className="icon-container"
                    onClick={() => this.onClickInfoFilters('scenarios')}
                  >
                    <Icon
                      name="icon-question"
                      className="title-icon"
                    />
                  </button>

                </div>
                <div className="time-scale-container">
                  <RadioGroup
                    name="scenario"
                    items={SCENARIO_OPTIONS}
                    onChange={({ value }) => { setFilters({ scenario: value }); }}
                    selected={scenario}
                    className="-inline"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="filters-section">
          <div className="row expanded-collapse">
            <div className="small-12">
              {/* time scale */}
              <div className="c-filters-item">
                <div className="filter-item-header">
                  <span className="title">Unit of Measurement</span>
                </div>
                <div className="time-scale-container">
                  <RadioGroup
                    name="time-scale"
                    className="-inline"
                    items={projectionOptions}
                    selected={projection}
                    onChange={({ value }) => { this.onSelectProjection(value); }}
                  />
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
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Filters;
