import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import FutureFilters from 'components/future-tab/filters';
import FutureIndicators from 'components/future-tab/indicator-list';

// constants
import {
  FUTURE_INDICATORS,
  FUTURE_INDICATORS_IDS,
  DEFAULT_FUTURE_YEAR,
  DEFAULT_FUTURE_INDICATOR
} from 'constants/indicators';

class FutureTab extends PureComponent {

  componentWillMount() {
    const {
      setFilters,
      filters: { indicator, projection }
    } = this.props;
    const nextIndicator = FUTURE_INDICATORS[projection].includes(indicator) ? indicator : DEFAULT_FUTURE_INDICATOR[projection];

    setFilters({
      indicator: nextIndicator,
      year: DEFAULT_FUTURE_YEAR
    });
  }
  onChangeTimeline({ value }) {
    const { setFilters, geoStore, onFetchAnalysis } = this.props;

    setFilters({
      indicator: value,
      year: FUTURE_INDICATORS_IDS.includes(value) ? DEFAULT_FUTURE_YEAR : 'baseline'
    });

    if (geoStore) onFetchAnalysis();
  }

  toggleModal(children) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size: '-auto'
    });
  }

  render() {
    return (
      <div className="l-analyze-locations">
        <div className="l-filters">
          <FutureFilters />
        </div>

        <div className="l-container">
          <FutureIndicators />
        </div>
      </div>
    );
  }
}

FutureTab.propTypes = {
  filters: PropTypes.object.isRequired,
  geoStore: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

FutureTab.defaultProps = { geoStore: null };

export default FutureTab;
