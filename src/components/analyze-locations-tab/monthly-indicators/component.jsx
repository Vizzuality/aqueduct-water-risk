import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import { Timeline } from 'aqueduct-components';

class MonthlyIndicators extends PureComponent {
  onChangeTimeline({ value }) {
    const { setFilters, onFetchAnalysis } = this.props;

    setFilters({ indicator: value });
    onFetchAnalysis();
  }

  render() {
    const { timelineOptions } = this.props;

    return (
      <Timeline
        className="-sand"
        items={timelineOptions}
        selected={timelineOptions.find(opt => opt.selected)}
        onChange={(option) => { this.onChangeTimeline(option); }}
      />
    );
  }
}

MonthlyIndicators.propTypes = {
  timelineOptions: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired
};

export default MonthlyIndicators;
