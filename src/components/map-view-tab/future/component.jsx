import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'aqueduct-components';

// constants
import { SCENARIO_OPTIONS } from 'constants/app';

class Future extends PureComponent {
  render() {
    const {
      indicators,
      currentIndicator,
      scenario,
      projection,
      setFilters
    } = this.props;

    return (
      <div className="c-future">
        <div className="future-group">
          <span className="future-title">
            {projection === 'absolute' ? 'Projected in...' : 'Projected changes in...'}
          </span>
          <RadioGroup
            name="indicator"
            items={indicators}
            onChange={({ value }) => { setFilters({ indicator: value }); }}
            selected={currentIndicator}
            className="-secondary"
          />
        </div>
        <div className="future-group">
          <span className="future-title">Scenario</span>
          <p>Future water availibility depends on how the world grows. These possible scenarios are based on the IPCC 5th assessment report.</p>
          <RadioGroup
            name="scenario"
            items={SCENARIO_OPTIONS}
            onChange={({ value }) => { setFilters({ scenario: value }); }}
            selected={scenario}
            className="-inline -secondary"
          />
        </div>
      </div>
    );
  }
}

Future.propTypes = {
  scenario: PropTypes.string.isRequired,
  projection: PropTypes.string.isRequired,
  indicators: PropTypes.array.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default Future;
