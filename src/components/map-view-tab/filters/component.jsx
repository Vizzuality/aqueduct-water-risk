import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Timeline,
  Icon,
  CustomSelect,
  RadioGroup
} from 'aqueduct-components';

// constants
import {
  yearOptions,
  timeScaleOptions,
  projectionOptions,
  MONTH_OPTIONS
} from 'constants/filters';
import { FUTURE_INDICATORS } from 'constants/indicators';

class Filters extends PureComponent {
  onSelectTimeframe(value) {
    const { setFilters } = this.props;

    setFilters({
      year: value,
      ...value !== 'baseline' && { indicator: FUTURE_INDICATORS.absolute[0].id }
    });
  }

  onSelectTimeScale(value) {
    const { setFilters } = this.props;
    setFilters({
      timeScale: value,
      ...value === 'monthly' && {
        indicator: 'bws_cat',
        month: '1'
      }
    });
  }

  onSelectProjection(projection) {
    const { setFilters } = this.props;

    setFilters({
      projection,
      indicator: FUTURE_INDICATORS[projection][0].id
    });
  }

  render() {
    const {
      setFilters,
      openModal,
      filters: { year, projection, timeScale, month }
    } = this.props;

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
                  {/* year */}
                  <div className="c-filters-item">
                    <div className="filter-item-header">
                      <span className="title">Timeframe</span>
                      <button
                        type="button"
                        className="icon-container"
                        onClick={() => openModal('timeframe')}
                      >
                        <Icon name="icon-question" className="title-icon" />
                      </button>
                    </div>
                    <Timeline
                      items={yearOptions}
                      selected={yearOptions.find(i => i.value === year)}
                      onChange={({ value }) => { this.onSelectTimeframe(value); }}
                    />
                    {year !== 'baseline' &&
                      <div className="filters-group">
                        <RadioGroup
                          className="-filters -inline -primary"
                          items={projectionOptions}
                          selected={projection}
                          name="projection"
                          onChange={({ value }) => { this.onSelectProjection(value); }}
                        />
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="filters-section">
              <div className="row expanded collapse">
                {year === 'baseline' && (
                  <Fragment>
                    <div className="small-6 column">
                      {/* time scale */}
                      <div className="c-filters-item">
                        <div className="filter-item-header">
                          <span className="title">Time scale</span>
                          <button type="button" className="icon-container">
                            <Icon
                              name="icon-question"
                              className="title-icon"
                            />
                          </button>
                        </div>
                        <CustomSelect
                          className="-fixed"
                          options={timeScaleOptions}
                          value={timeScale}
                          onValueChange={({ value }) => { this.onSelectTimeScale(value); }}
                        />
                      </div>
                    </div>
                    {timeScale === 'monthly' && (
                      <div className="small-6 column">
                        {/* months */}
                        <div className="c-filters-item">
                          <div className="filter-item-header">
                            <span className="title">Month</span>
                          </div>
                          <CustomSelect
                            className="-fixed"
                            options={MONTH_OPTIONS}
                            value={month}
                            onValueChange={({ value }) => { setFilters({ month: value }); }}
                          />
                        </div>
                      </div>)}
                  </Fragment>)}
              </div>
            </div>
          </div>
        </Accordion>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};

export default Filters;
