import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Timeline,
  Icon,
  CustomSelect,
  RadioGroup,
  APP_DEFINITIONS,
  InfoModal
} from 'aqueduct-components';

// constants
import {
  projectionOptions,
  timeScaleOptions,
  MONTH_OPTIONS,
  TIMEFRAME_MODAL_DESCRIPTION
} from 'constants/filters';
import { INDICATORS, FUTURE_INDICATORS } from 'constants/indicators';

class Filters extends PureComponent {

  onClickInfoFilters(slug) {
    const { toggleModal } = this.props;

    if (slug === 'temporal-resolution') {
      return toggleModal(true, {
        children: InfoModal,
        childrenProps: {
          info: TIMEFRAME_MODAL_DESCRIPTION
        }
      });
    }

    return toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: APP_DEFINITIONS[slug]
      }
    });
  }

  onSelectTimeframe(year) {
    const {
      filters: { year: prevYear, projection, timeScale },
      setFilters,
      setPonderation
    } = this.props;

    setFilters({
      year,
      ...(year !== 'baseline' && (!['2030', '2040'].includes(prevYear))) && { indicator: FUTURE_INDICATORS[projection][0].id },
      ...(year === 'baseline' && timeScale === 'annual') && { indicator: INDICATORS[0].id },
      ...(year === 'baseline' && timeScale === 'monthly') && { indicator: 'bws_cat' }
    });

    if (year !== 'baseline') setPonderation({ scheme: 'DEF' });
  }

  onSelectTimeScale(value) {
    const {
      setFilters,
      setPonderation
    } = this.props;

    setFilters({
      timeScale: value,
      ...value === 'monthly' && {
        indicator: 'bws_cat',
        month: '1'
      },
      ...value === 'annual' && { indicator: 'w_awr_def_tot_cat' }
    });

    if (value === 'monthly') setPonderation({ scheme: 'DEF' });
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
      filters: { year, projection, timeScale, month },
      timeframeOptions
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
                        onClick={() => this.onClickInfoFilters('timeframe')}
                      >
                        <Icon name="icon-question" className="title-icon" />
                      </button>
                    </div>
                    <Timeline
                      items={timeframeOptions}
                      selected={timeframeOptions.find(i => i.value === year)}
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
                          <span className="title">Temporal resolution</span>
                          <button
                            type="button"
                            className="icon-container"
                            onClick={() => this.onClickInfoFilters('temporal-resolution')}
                          >
                            <Icon
                              name="icon-question"
                              className="title-icon"
                            />
                          </button>
                        </div>
                        <div className="time-scale-container">
                          <RadioGroup
                            name="time-scale"
                            className="-inline"
                            items={timeScaleOptions}
                            selected={timeScale}
                            onChange={({ value }) => { this.onSelectTimeScale(value); }}
                          />
                        </div>
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
  timeframeOptions: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  setPonderation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Filters;
