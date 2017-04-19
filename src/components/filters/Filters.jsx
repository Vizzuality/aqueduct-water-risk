import React from 'react';

// AQ COMPONENTS
import {
  APP_DEFINITIONS,
  Accordion,
  Timeline,
  Icon,
  InfoModal,
  CustomSelect,
  RadioGroup
} from 'aqueduct-components';

// CONSTANTS
import {
  yearOptions,
  timeScaleOptions,
  spaceScaleOptions,
  projectionOptions
} from 'constants/filters';

// ACTIONS
import { toggleModal } from 'modules/modal';

export default class Filters extends React.Component {

  openModal(slug) {
    toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: APP_DEFINITIONS[slug]
      }
    });
  }

  render() {
    return (
      <div className="c-filters">
        <Accordion
          className="-filters"
          opened
          contentPosition="top"
          toggleIcon={<Icon name="icon-arrow-up-2" className="filters-collapse-btn" />}
        >
          <div>
            <div className="filters-section">
              <div className="row expanded collapse">
                <div className="small-12 columns">
                  {/* Year */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Timeframe</span>
                      <button
                        type="button"
                        className="icon-container"
                        onClick={() => this.openModal('timeframe')}
                      >
                        <Icon name="icon-question" className="title-icon" />
                      </button>
                    </div>
                    <Timeline
                      items={yearOptions}
                      selected={yearOptions.find(i => i.value === this.props.filters.year)}
                      onChange={selected => this.props.setFilters({ year: selected.value })}
                    />
                    {this.props.filters.year !== 'baseline' &&
                      <div className="filters-group">
                        <RadioGroup
                          className="-filters -inline -primary"
                          items={projectionOptions}
                          defaultValue={this.props.filters.projection}
                          name="projection"
                          onChange={selected => this.props.setFilters({ projection: selected.value })}
                        />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="filters-section">
              <div className="row expanded collapse">
                {this.props.filters.year === 'baseline' &&
                  <div className="small-6 column">
                    {/* Time scale */}
                    <div className="c-filters-item">
                      <div className="filter-item-header">
                        <span className="title">Time scale</span>
                        <button type="button" className="icon-container">
                          <Icon name="icon-question" className="title-icon" />
                        </button>
                      </div>
                      <CustomSelect
                        className="-fixed"
                        options={timeScaleOptions}
                        value={this.props.filters.timeScale}
                        onValueChange={selected => this.props.setFilters({ timeScale: selected.value })}
                      />
                    </div>
                  </div>
                }
                <div className="small-6 column">
                  {/* Space scale */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Scale</span>
                      <button type="button" className="icon-container">
                        <Icon name="icon-question" className="title-icon" />
                      </button>
                    </div>
                    <CustomSelect
                      className="-fixed"
                      options={spaceScaleOptions}
                      value={this.props.filters.geoScale}
                      onValueChange={selected => this.props.setFilters({ geoScale: selected.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: React.PropTypes.object,
  setFilters: React.PropTypes.func
};
