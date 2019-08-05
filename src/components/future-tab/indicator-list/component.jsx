import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'aqueduct-components';

class FutureIndicatorList extends PureComponent {
  handleModal({ value }) {
    const { openModal, scenario } = this.props;

    openModal(value, scenario);
  }

  render() {
    const {
      indicators,
      currentIndicator,
      setFilters
    } = this.props;

    return (
      <div className="c-future">
        <div className="future-group">
          <div className="layerlist-header">
            <span className="future-title">
              Indicators
            </span>
          </div>
          <RadioGroup
            name="indicator"
            items={indicators}
            onChange={({ value }) => { setFilters({ indicator: value }); }}
            selected={currentIndicator}
            className="-secondary"
            onInfo={(item) => { this.handleModal(item); }}
          />
        </div>
      </div>
    );
  }
}

FutureIndicatorList.propTypes = {
  indicators: PropTypes.array.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  scenario: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired
};

export default FutureIndicatorList;
