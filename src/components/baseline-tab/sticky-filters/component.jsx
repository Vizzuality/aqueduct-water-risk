import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomSelect, SegmentedUi } from 'aqueduct-components';

// constants
import { SCOPE_OPTIONS } from 'constants/app';
import { timeScaleOptions, MONTH_OPTIONS } from 'constants/filters';
import { INDICATOR_NAMES_RELATION } from 'constants/indicators';

class StickyFilters extends PureComponent {
  onSelectTimeScale(value) {
    const { setFilters } = this.props;
    setFilters({
      timeScale: value,
      ...value === 'monthly' && {
        indicator: 'bws_cat',
        month: '1'
      },
      ...value === 'annual' && { indicator: 'w_awr_def_tot_cat' }
    });
  }

  render() {
    const {
      scope,
      withScope,
      filters: {
        timeScale,
        indicator,
        month
      },
      setScope,
      setFilters
    } = this.props;

    return (
      <div className="c-sticky-filters">
        {withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={scope}
                  onChange={({ value }) => { setScope(value); }}
                />
              </div>
            </div>
          </div>
        }
        <div className="global-filters">
          <div>
            <span className="title">Indicator</span>
            <span className="value">{INDICATOR_NAMES_RELATION[indicator]}</span>
          </div>
          <div>
            <span className="title">Temporal resolution</span>
            <CustomSelect
              className="-gray"
              options={timeScaleOptions}
              value={timeScale}
              onValueChange={({ value }) => { this.onSelectTimeScale(value); }}
            />
          </div>
          {timeScale === 'monthly' && (
            <div>
              <span className="title">Month</span>
              <CustomSelect
                className="-gray"
                options={MONTH_OPTIONS}
                value={month}
                onValueChange={({ value }) => { setFilters({ month: value }); }}
              />
            </div>)}
        </div>
      </div>
    );
  }
}

StickyFilters.propTypes = {
  filters: PropTypes.object,
  scope: PropTypes.string,
  withScope: PropTypes.bool,
  setFilters: PropTypes.func,
  setScope: PropTypes.func
};

StickyFilters.defaultProps = { withScope: false };

export default StickyFilters;
