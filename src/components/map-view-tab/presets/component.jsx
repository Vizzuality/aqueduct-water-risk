import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from 'aqueduct-components';

// constants
import { PRESET_OPTIONS } from 'constants/presets';

class Presets extends PureComponent {
  render() {
    const {
      ponderation,
      setPonderation
    } = this.props;

    return (
      <div className="c-presets">
        <span className="presets-title">Weighting Scheme Presets</span>
        <CustomSelect
          className="-big"
          options={PRESET_OPTIONS}
          value={ponderation}
          onValueChange={({ value }) => { setPonderation({ scheme: value }); }}
        />
      </div>
    );
  }
}

export default Presets;

Presets.propTypes = {
  ponderation: PropTypes.string.isRequired,
  setPonderation: PropTypes.func.isRequired
};
