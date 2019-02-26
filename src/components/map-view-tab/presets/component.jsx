import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from 'aqueduct-components';

// constants
import { PRESET_OPTIONS } from 'constants/presets';
import { PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

class Presets extends PureComponent {
  handlePonderation(scheme) {
    const {
      currentIndicator,
      setPonderation,
      setFilters
    } = this.props;

    setPonderation({ scheme });

    setFilters({ ...PARENT_CHILDREN_LAYER_RELATION[currentIndicator] && { indicator: PARENT_CHILDREN_LAYER_RELATION[currentIndicator] } });
  }

  render() {
    const { ponderation } = this.props;

    return (
      <div className="c-presets">
        <span className="presets-title">Weighting Scheme Presets</span>
        <CustomSelect
          className="-big"
          options={PRESET_OPTIONS}
          value={ponderation}
          onValueChange={({ value }) => { this.handlePonderation(value); }}
        />
      </div>
    );
  }
}

export default Presets;

Presets.propTypes = {
  ponderation: PropTypes.string.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  setPonderation: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};
